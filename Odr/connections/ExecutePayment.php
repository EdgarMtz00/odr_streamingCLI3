<?php
    require ('common.php');
    require('payments/conf.php');
    
    use PayPal\Api\Payment;

    if (empty($_GET['paymentId']) || empty($_GET['PayerID'])) {
        throw new Exception('The response is missing the paymentId and PayerID');
    }

    $paymentId = $_GET['paymentId'];
    $payment = Payment::get($paymentId, $apiContext);
    $execution = new PaymentExecution();
    $execution->setPayerId($_GET['PayerID']);
    try {
        // Take the payment
        $payment->execute($execution, $apiContext);
        echo 'pago realizado';
        print_r($payment);
        header( "Location: https://odrstreaming.000webhostapp.com/" );
    } catch (Exception $e) {
        // Failed to take payment
    }