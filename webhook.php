<?php
/**
 * GitHub Webhook Handler für Kira Marie Website
 * 
 * Setup:
 * 1. Diese Datei auf den Server hochladen
 * 2. In GitHub Repo Settings > Webhooks:
 *    - URL: https://www.kiramariecremer.de/webhook.php
 *    - Content type: application/json
 *    - Events: Just the push event
 *    - Secret: (optional, für mehr Sicherheit)
 */

// Logging aktivieren
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log-Datei für Debugging
$logFile = __DIR__ . '/webhook.log';

function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

writeLog("Webhook called");

// Nur POST-Requests verarbeiten
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    writeLog("Method not allowed: " . $_SERVER['REQUEST_METHOD']);
    exit('Method not allowed');
}

// GitHub Payload lesen
$payload = file_get_contents('php://input');
$data = json_decode($payload, true);

if (!$data) {
    http_response_code(400);
    writeLog("Invalid JSON payload");
    exit('Invalid payload');
}

writeLog("Payload received: " . substr($payload, 0, 200) . "...");

// Nur auf main branch pushes reagieren
if (!isset($data['ref']) || $data['ref'] !== 'refs/heads/main') {
    writeLog("Not a main branch push, ignoring");
    exit('Not a main branch push');
}

writeLog("Main branch push detected, starting deployment");

// Pfad zum Website-Verzeichnis (anpassen!)
$websiteDir = __DIR__;

// Git pull ausführen
$gitCommand = "cd $websiteDir && git pull origin main 2>&1";
writeLog("Executing: $gitCommand");
exec($gitCommand, $gitOutput, $gitReturn);

if ($gitReturn !== 0) {
    writeLog("Git pull failed: " . implode("\n", $gitOutput));
    http_response_code(500);
    exit('Git pull failed');
}

writeLog("Git pull successful: " . implode("\n", $gitOutput));

// Build-Script ausführen
$buildCommand = "cd $websiteDir && ./build.sh 2>&1";
writeLog("Executing: $buildCommand");
exec($buildCommand, $buildOutput, $buildReturn);

if ($buildReturn !== 0) {
    writeLog("Build failed: " . implode("\n", $buildOutput));
    http_response_code(500);
    exit('Build failed');
}

writeLog("Build successful: " . implode("\n", $buildOutput));

// Erfolg melden
http_response_code(200);
writeLog("Deployment completed successfully");
echo "Deployment successful!";
?> 