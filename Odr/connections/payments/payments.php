<?php
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

require ('../common.php');
require ('conf.php');

$body = json_decode(file_get_contents('php://input')); 
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $order = $body->order;
    $user = $body->user;

    $payer = new Payer();
    $payer->setPaymentMethod("paypal");
    $item = new Item();
    $item->setName($order->item)
    ->setCurrency('USD')
    ->setQuantity($order->quantity)
    ->setSku("123")
    ->setPrice($order->price);

    $amount = new Amount();
    $amount->setCurrency("USD")
    ->setTotal($order->price * $order->quantity);

    $itemList = new ItemList();
    $itemList->setItems(array($item));

    $transaction = new Transaction();
    $transaction->setAmount($amount)
    ->setItemList($itemList)
    ->setDescription("Payment description")
    ->setInvoiceNumber(uniqid());

    $baseUrl = "https://yourdomein.org/odr/connections";
    $redirectUrls = new RedirectUrls();
    $redirectUrls->setReturnUrl("$baseUrl/ExecutePayment.php")
    ->setCancelUrl("$baseUrl/ExecutePayment.php?");

    $payment = new Payment();
    $payment->setIntent("sale")
        ->setPayer($payer)
        ->setRedirectUrls($redirectUrls)
        ->setTransactions(array($transaction));

    try {
        $payment->create($apiContext);
        header('location:' . $payment->getApprovalLink());
        return $payment;
    } catch (Exception $e) {

        print_r($e->getMessage());
        print_r($e->getData());
        return ['error'=>"error"];
    }
}