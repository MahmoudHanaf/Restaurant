
<?php
  include("db_con.php");
   
  $sql =mysqli_query($con,"SELECT order_id FROM `orders` WHERE 1");
   $Data =array();
    while($row =mysqli_fetch_object($sql)){
      $Data =$row ;
    }

 
  $order_id =$Data->order_id;
  echo json_encode($order_id);
  

?>