<?php
// GitHub OAuth Handler für Decap CMS
// Client ID: Ov23liDR9KJEvauhqnf5

// Enable debug mode if requested
$debug = isset($_GET['debug']) && $_GET['debug'] === 'true';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$client_id = 'Ov23liDR9KJEvauhqnf5';
$client_secret = getenv('GITHUB_CLIENT_SECRET');

if (!$client_secret) {
    http_response_code(500);
    echo json_encode(['error' => 'GitHub Client Secret not configured', 'detail' => 'Environment variable GITHUB_CLIENT_SECRET is not set']);
    exit;
}

if (isset($_GET['code'])) {
    // Step 2: Exchange code for access token
    $code = $_GET['code'];
    $state = $_GET['state'] ?? '';
    
    // Log the incoming request for debugging
    error_log("OAuth callback received - Code: " . substr($code, 0, 10) . "..., State: " . $state);
    
    $token_url = 'https://github.com/login/oauth/access_token';
    
    $data = [
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $code,
        'redirect_uri' => 'https://www.kiramariecremer.de/admin/auth.php'
    ];
    
    // Debug: Show what we're sending (without the full secret)
    if ($debug) {
        echo json_encode([
            'debug' => true,
            'step' => 'token_exchange',
            'request_url' => $token_url,
            'request_data' => [
                'client_id' => $client_id,
                'client_secret' => substr($client_secret, 0, 4) . '...' . substr($client_secret, -4),
                'code' => substr($code, 0, 10) . '...',
            ],
            'request_method' => 'POST',
            'content_type' => 'application/x-www-form-urlencoded'
        ]);
        exit;
    }
    
    // GitHub expects form-encoded data, NOT JSON!
    $options = [
        'http' => [
            'header' => [
                "Content-type: application/x-www-form-urlencoded\r\n",
                "Accept: application/json\r\n",
                "User-Agent: kira-cms\r\n"
            ],
            'method' => 'POST',
            'content' => http_build_query($data), // Form-encoded, not JSON!
            'ignore_errors' => true
        ]
    ];
    
    $context = stream_context_create($options);
    $response = @file_get_contents($token_url, false, $context);
    
    // Get response headers for debugging
    $response_headers = $http_response_header ?? [];
    
    if ($response === FALSE) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to connect to GitHub', 
            'detail' => 'Could not reach GitHub API'
        ]);
        exit;
    }
    
    // Check if response is HTML (error page)
    $is_html = strpos($response, '<!DOCTYPE') !== false || strpos($response, '<html') !== false;
    
    if ($is_html) {
        // Extract title from HTML if possible
        preg_match('/<title>(.*?)<\/title>/', $response, $title_matches);
        $page_title = $title_matches[1] ?? 'Unknown HTML response';
        
        http_response_code(400);
        echo json_encode([
            'error' => 'GitHub returned HTML instead of JSON',
            'detail' => 'This usually means the OAuth code is invalid, expired, or already used',
            'page_title' => $page_title,
            'response_headers' => $response_headers,
            'suggestions' => [
                'Try initiating the OAuth flow again',
                'Ensure you are not reusing an old OAuth code',
                'OAuth codes expire after 10 minutes',
                'OAuth codes can only be used once'
            ]
        ]);
        exit;
    }
    
    // Try to decode as JSON first
    $token_data = json_decode($response, true);
    
    // If not JSON, it might be form-encoded response
    if ($token_data === null && $response) {
        parse_str($response, $token_data);
    }
    
    if (isset($token_data['access_token'])) {
        // Success! Return token to CMS
        echo json_encode([
            'token' => $token_data['access_token'],
            'provider' => 'github'
        ]);
    } else {
        // Handle specific GitHub OAuth errors
        $error_message = 'Failed to obtain access token';
        $error_detail = 'Unknown error';
        
        if (isset($token_data['error'])) {
            switch ($token_data['error']) {
                case 'bad_verification_code':
                    $error_detail = 'The OAuth code is invalid or has expired. Please try logging in again.';
                    break;
                case 'incorrect_client_credentials':
                    $error_detail = 'The client ID or secret is incorrect.';
                    break;
                case 'redirect_uri_mismatch':
                    $error_detail = 'The redirect URI does not match the one configured in the GitHub OAuth app.';
                    break;
                default:
                    $error_detail = $token_data['error_description'] ?? $token_data['error'];
            }
        }
        
        http_response_code(400);
        echo json_encode([
            'error' => $error_message,
            'detail' => $error_detail,
            'github_response' => $token_data,
            'debug_info' => [
                'client_id' => $client_id,
                'code_preview' => substr($code, 0, 10) . '...',
                'secret_configured' => !empty($client_secret),
                'response_headers' => $response_headers
            ]
        ]);
    }
} else {
    // Step 1: Redirect to GitHub OAuth
    $redirect_uri = 'https://www.kiramariecremer.de/admin/auth.php';
    $scope = 'repo,user';
    $state = bin2hex(random_bytes(16));
    
    // Store state in session for verification (if sessions are available)
    if (session_status() == PHP_SESSION_NONE) {
        @session_start();
    }
    $_SESSION['oauth_state'] = $state;
    
    $auth_url = "https://github.com/login/oauth/authorize?" . http_build_query([
        'client_id' => $client_id,
        'redirect_uri' => $redirect_uri,
        'scope' => $scope,
        'state' => $state
    ]);
    
    header("Location: $auth_url");
    exit;
}
?> 