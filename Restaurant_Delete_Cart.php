<?php

include("db_con.php");


$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$cart_id= $obj['cart_id'];


//  $cart_id =5;

 if($cart_id){

    $sql =mysqli_query($con ,"DELETE FROM `cart` WHERE cart_id='$cart_id'");
 
    if(mysqli_affected_rows($con) >0){
   
        echo "Success";
    }else{
        echo "Eroor";
    }

 }else{
     echo "Eroor";
 }


?>