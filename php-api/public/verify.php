<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require '../utils/verify-jwt.php';

$decoded = verify_dynamic_cookie();
echo json_encode(["payload" => $decoded]);
