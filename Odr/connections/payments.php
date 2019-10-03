<?php
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

include 'common.php';
$body = file_get_contents('php://input'); 
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $order = $body['order'];
    $user = $body['user'];

    $payer = new Payer();
    $payer->setPaymentMethod("paypal");

    $item = new Item();
    $item->setName($order['item'])
    ->setCurrency('USD')
    ->setQuantity($order['quantity'])
    ->setSku("123123")
    ->setPrice($order['price']);

    $amount = new Amount();
    $amount->setCurrency("USD")
    ->setTotal($order['total'])
    ->setDetails($details);

    $transaction = new Transaction();
    $transaction->setAmount($amount)
    ->setItemList($item)
    ->setDescription("Payment description")
    ->setInvoiceNumber(uniqid());

    $baseUrl = getBaseUrl();
    $redirectUrls = new RedirectUrls();
    $redirectUrls->setReturnUrl("$baseUrl/ExecutePayment.php?success=true")
    ->setCancelUrl("$baseUrl/ExecutePayment.php?success=false");

    $payment = new Payment();
    $payment->setIntent("sale")
        ->setPayer($payer)
        ->setRedirectUrls($redirectUrls)
        ->setTransactions(array($transaction));

    try {
        $payment->create($apiContext);
        return $payment;
    } catch (Exception $ex) {
        return ['error'=>"error"];
    }
}