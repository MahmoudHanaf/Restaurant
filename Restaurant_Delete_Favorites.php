<?php

include("db_con.php");


$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$like_id= $obj['like_id'];


//  $cart_id =5;

 if($like_id){

    $sql =mysqli_query($con ,"DELETE FROM `likes` WHERE like_id='$like_id'");
 
    if(mysqli_affected_rows($con) >0){
   
        echo "Success";
    }else{
        echo json_encode("Eroor");
    }

 }else{
     echo "Eroor";
 }


?>