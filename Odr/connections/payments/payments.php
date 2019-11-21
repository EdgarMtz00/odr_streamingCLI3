<?php
header("Access-Control-Allow-Origin: *");
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Api\PayerInfo;

require ('../common.php');
require ('conf.php');

$body = json_decode(file_get_contents('php://input')); 
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    //informacion de la peticion
    $emoteId = $body['id'];
    $id = $body['user'];
    $str = "pendiente";

    //query del emoticon
    $q = mysqli_query($conn, "Select * from emoticon where idEmoticon = '$emoteId'");
    $order = mysqli_fetch_assoc($q);

    //informacion pago para paypal
    $payer = new Payer();
    $payer_info = new PayerInfo;
    $payer_info->setExternalRememberMeId($id);
    $payer->setPaymentMethod("paypal");
    $payer->setPayerInfo($payer_info);

    //articulo a comprar
    $item = new Item();
    $item->setName($order['NombreDeEmoticon'])
    ->setCurrency('MXN')
    ->setQuantity(1)
    ->setSku("123")
    ->setPrice(150);
    //cantidad a pagar total
    $amount = new Amount();
    $amount->setCurrency("MXN")
    ->setTotal(150);

    //listado total de articulos
    $itemList = new ItemList();
    $itemList->setItems(array($item));

    //informacion completa de la transaccion
    $transaction = new Transaction();
    $transaction->setAmount($amount)
    ->setItemList($itemList)
    ->setDescription("ODR emote")
    ->setInvoiceNumber(uniqid());

    //a donde paypal enviara el resultado de la compra
    $baseUrl = "https://odrstreaming.000webhostapp.com/Odr/connections"; //pendiente dominio web
    $redirectUrls = new RedirectUrls();
    $redirectUrls->setReturnUrl("$baseUrl/ExecutePayment.php")
    ->setCancelUrl("$baseUrl/ExecutePayment.php");

    //informacion completa de la operacion a realizar mediante paypal
    $payment = new Payment();
    $payment->setIntent("sale")
        ->setPayer($payer)
        ->setRedirectUrls($redirectUrls)
        ->setTransactions(array($transaction));

    try {
        $payment->create($apiContext);
        $payer = $payment->payer;
        
    echo $id;
    echo $emoteId;
    print_r($payer->getPayerInfo());
    //crear relacion usuario emoticon
    $c = mysqli_query($conn, "insert into usuarioemoticon (id, IdUsuario,  IdEmoticon, estado) values  ('$payer->PayerId'$id', '$emoteId', '$str')");

        echo '{"url":"' . $payment->getApprovalLink() . '"}';  
        header('url' . $payment->getApprovalLink());
        return $payment;
    } catch (Exception $e) {

        print_r($e->getMessage());
        print_r($e->getData());
        return ['error'=>"error"];
    }
}