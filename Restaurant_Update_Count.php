
<?php

include("db_con.php");


$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$cart_id= $obj['cart_id'];
$cart_count=$obj['cart_count'];


//  $cart_id =5;

 if($cart_id){

    $sql =mysqli_query($con ,"UPDATE `cart` SET `cart_count`='$cart_count' WHERE cart_id='$cart_id'");
 
    if(mysqli_affected_rows($con) >0){
   
        echo "Success";
    }else{
        echo "Eroor";
    }

 }else{
     echo "Eroor";
 }


?>