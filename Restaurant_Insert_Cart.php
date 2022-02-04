<?php
  include("db_con.php");



  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $cart_price= $obj['cart_price'];
  $cart_count= $obj['cart_count'];
  $order_id = $obj['order_id'];
  $kind_id= $obj['kind_id'];

//    $cart_price= 60;
//   $cart_count=1;
//   $order_id=1;
//   $kind_id=1;

  if($cart_price && $cart_count && $order_id && $kind_id){

    $sql =mysqli_query($con,"INSERT INTO `cart`(`cart_price`, `cart_count`, `order_cart_id`, `kind_cart_id`) VALUES
    ('$cart_price','$cart_count','$order_id','$kind_id')");
 
        if(mysqli_affected_rows($con) >0){
            
            $cart_id =mysqli_insert_id($con);
            echo json_encode($cart_id);


        }else{
            echo "Erorr";
        }


  }else{
      echo "Eroor";
  }
 
 
  





?>