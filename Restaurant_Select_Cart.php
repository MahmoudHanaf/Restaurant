
<?php
  include("db_con.php");

  $Data= array();
 
 
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $order_id= $obj['order_id'];
  $email= $obj['email'];
  $password= $obj['password'];
   //   $order_id=3;

  $sql = mysqli_query($con,"SELECT kinds.kind_name,kinds.kind_photo,kinds.kind_content ,cart_price,cart_count,cart_id  FROM `kinds`,`user`,`cart` WHERE 
  cart.kind_cart_id=kind_id AND user.user_email='$email' 
  AND user.user_password='$password' AND cart.order_cart_id='$order_id'");
  

  if(mysqli_num_rows($sql) > 0){

     while($row =mysqli_fetch_object($sql)){
        
        $Data []= $row ;
       
     }

     echo json_encode($Data);
    

  }else{
      echo json_encode("No Data");
  }

?>