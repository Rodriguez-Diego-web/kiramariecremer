<?php
// Direct route fallback for /funke-rss  
header('Content-Type: text/html; charset=UTF-8');
readfile(__DIR__ . '/index.html');
?> 