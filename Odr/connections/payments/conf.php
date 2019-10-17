<?php
require '../../vendor/autoload.php';

use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;

$baseUrl = "localhost/odr/connections";
$paypalConfig = [
    'client_id' => 'AXSSiQ8-qSuTNYsmn80fIEGoYYzXqpMiPIoUqLwJ_vfDI7tg7w3mSIMD4vzbeoWh6F3JXqfB1V56rgdF',
    'client_secret' => 'EHJu_Cvi0cLfQp7UJ4qk3xCLuBNQiXsnGtMnzjQQ03FBcLfh5NddLiz6dfNvUMPq_fuRcKwX6qqx25OL',
    'return_url' => '$baseUrl/ExecutePayment.php?success=true',
    'cancel_url' => '$baseUrl/ExecutePayment.php?success=false'
];

$apiContext = getApiContext(
    $paypalConfig['client_id'],
    $paypalConfig['client_secret'],
    true
);

function getApiContext($clientId, $clientSecret, $enableSandbox = false)
{
    $apiContext = new ApiContext(
        new OAuthTokenCredential($clientId, $clientSecret)
    );
    $apiContext->setConfig([
        'mode' => $enableSandbox ? 'sandbox' : 'live'
    ]);
    return $apiContext;
}