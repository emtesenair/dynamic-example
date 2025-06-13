<?php
require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Dotenv\Dotenv;

function verify_dynamic_cookie() {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $jwt = $_COOKIE['DYNAMIC_JWT_TOKEN'] ?? '';

    if (!$jwt) {
        http_response_code(401);
        echo json_encode(["error" => "Missing token"]);
        exit;
    }

    $jwksUrl = 'https://app.dynamic.xyz/api/v0/sdk/' . $_ENV['DYNAMIC_ENV_ID'] . '/.well-known/jwks';
    $jwks = json_decode(file_get_contents($jwksUrl), true);
    $keys = JWK::parseKeySet($jwks);

    try {
        return JWT::decode($jwt, $keys);
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
        exit;
    }
}