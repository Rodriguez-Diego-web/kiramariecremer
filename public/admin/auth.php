<?php
// GitHub OAuth Handler für Decap CMS
// Client ID: Ov23liDR9KJEvauhqnf5

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
    
    $data = [
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $code,
    ];
    
    $options = [
        'http' => [
            'header' => [
                "Content-type: application/json\r\n",
                "Accept: application/json\r\n",
                "User-Agent: kira-cms\r\n"
            ],
            'method' => 'POST',
            'content' => json_encode($data),
            'ignore_errors' => true // Get response even on HTTP error
        ]
    ];
    
    $context = stream_context_create($options);
    $response = @file_get_contents('https://github.com/login/oauth/access_token', false, $context);
    
    // Get HTTP response headers
    $http_response_header_local = $http_response_header ?? [];
    
    if ($response === FALSE) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to connect to GitHub', 
            'detail' => 'Could not reach GitHub API',
            'http_headers' => $http_response_header_local
        ]);
        exit;
    }
    
    $token_data = json_decode($response, true);
    
    // If response is not JSON, show raw response
    if ($token_data === null && $response !== '') {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid response from GitHub',
            'raw_response' => substr($response, 0, 500), // First 500 chars
            'http_headers' => $http_response_header_local
        ]);
        exit;
    }
    
    if (isset($token_data['access_token'])) {
        // Return token to CMS
        echo json_encode([
            'token' => $token_data['access_token'],
            'provider' => 'github'
        ]);
    } else {
        // Log the actual error from GitHub
        http_response_code(400);
        echo json_encode([
            'error' => 'Failed to obtain access token', 
            'github_response' => $token_data,
            'raw_response' => $response ? substr($response, 0, 500) : null,
            'http_headers' => $http_response_header_local,
            'debug_info' => [
                'client_id' => $client_id,
                'code_length' => strlen($code),
                'secret_set' => !empty($client_secret),
                'secret_length' => strlen($client_secret)
            ]
        ]);
    }
} else {
    // Step 1: Redirect to GitHub OAuth
    $redirect_uri = 'https://www.kiramariecremer.de/admin/auth.php';
    $scope = 'repo,user';
    
    $auth_url = "https://github.com/login/oauth/authorize?" . http_build_query([
        'client_id' => $client_id,
        'redirect_uri' => $redirect_uri,
        'scope' => $scope,
        'state' => bin2hex(random_bytes(16))
    ]);
    
    header("Location: $auth_url");
    exit;
}
?> 