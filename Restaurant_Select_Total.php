
<?php
  include("db_con.php");

  $Data= array();
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $order_id= $obj['order_id'];
 


  $sql =mysqli_query($con,"SELECT sum(cart_price * cart_count) as sum FROM `cart` WHERE order_cart_id='$order_id'");

  if(mysqli_num_rows($sql) >0){

   $row =mysqli_fetch_object($sql);

    $sum =$row->sum;
    echo json_encode($sum);

  }else{
      echo "Eroor";
  }

?>