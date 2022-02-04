
<?php

include("db_con.php");

$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$email= $obj['email'];
$password= $obj['password'];


// $email ='Mahmoud@gmail.com';
// $password='000000';

$Data =array();

$sql =mysqli_query($con,"SELECT kinds.kind_name, kinds.kind_photo,kinds.kind_content,cart.cart_price,cart.cart_count,orders.order_date
 FROM `user`,`orders`,`cart`,`kinds` WHERE user_email='$email' AND user_password ='$password' AND
orders.order_user_id= user_id AND
cart.order_cart_id =orders.order_id AND
cart.kind_cart_id =kinds.kind_id ORDER BY orders.order_date DESC");

if(mysqli_num_rows($sql) >0){

  while($row=mysqli_fetch_object($sql)){
    
     $Data []= $row ;
  }
     echo json_encode ($Data);
  

}else{
   echo "Eroor";
}

?>