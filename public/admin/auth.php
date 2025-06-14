<?php
// GitHub OAuth Handler für Decap CMS
// Client ID: 0v231iDR9KJEvauhqnf5

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$client_id = '0v231iDR9KJEvauhqnf5';
$client_secret = getenv('GITHUB_CLIENT_SECRET'); // Muss als Umgebungsvariable gesetzt werden

if (!$client_secret) {
    http_response_code(500);
    echo json_encode(['error' => 'GitHub Client Secret not configured']);
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
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents('https://github.com/login/oauth/access_token', false, $context);
    
    if ($response === FALSE) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to get access token']);
        exit;
    }
    
    $token_data = json_decode($response, true);
    
    if (isset($token_data['access_token'])) {
        // Return token to CMS
        echo json_encode([
            'token' => $token_data['access_token'],
            'provider' => 'github'
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Failed to obtain access token', 'response' => $token_data]);
    }
} else {
    // Step 1: Redirect to GitHub OAuth
    $redirect_uri = 'https://www.kiramariecremer.de/admin/auth.php';
    $scope = 'repo,user';
    
    $auth_url = "https://github.com/login/oauth/authorize?" . http_build_query([
        'client_id' => $client_id,
        'redirect_uri' => $redirect_uri,
        'scope' => $scope,
        'state' => bin2hex(random_bytes(16)) // CSRF protection
    ]);
    
    header("Location: $auth_url");
    exit;
}
?> 