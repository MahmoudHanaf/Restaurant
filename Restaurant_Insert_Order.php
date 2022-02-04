<?php
  include("db_con.php");



  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $order_user_id= $obj['order_user_id'];
  $order_total= $obj['order_total'];
//   $order_date = $obj['order_date'];
  $order_note= $obj['order_note'];
  $order_latitude= $obj['order_latitude'];
  $order_longitude= $obj['order_longitude'];
  $order_latitudeDelta=$obj['order_latitudeDelta'];
  $order_longitudeDelta =$obj['order_longitudeDelta'];

//    $cart_price= 60;
//   $cart_count=1;
//   $order_id=1;
//   $kind_id=1;

  if($order_user_id && $order_total  && $order_latitude && $order_longitude && $order_latitudeDelta && $order_longitudeDelta ){

    $sql =mysqli_query($con,"INSERT INTO `orders`(`order_user_id`, `order_date`, `order_total`, `order_note`, `order_latitude`, `order_longitude`, `order_latitudeDelta`, `order_longitudeDelta`) 
    VALUES ('$order_user_id',DATE_ADD(now(),interval 0 hour),'$order_total','$order_note','$order_latitude','$order_longitude','$order_latitudeDelta','$order_longitudeDelta')");
 
        if(mysqli_affected_rows($con) >0){
            
            $order_id =mysqli_insert_id($con);
            echo json_encode($order_id);


        }else{
            echo "Eror";
        }


  }else{
      echo "Eroor";
  }
 
 
  





?>