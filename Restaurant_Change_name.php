
<?php

include("db_con.php");


$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$name= $obj['name'];


$email ='Mahmoud@gmail.com';
$password ='789123';


 if($name){

    $sql =mysqli_query($con ,"UPDATE `user` SET `user_name`='$name' WHERE user_email='$email' AND user_password ='$password'");
 
    if(mysqli_affected_rows($con) >0){
   
        echo "Success";
    }else{
        echo "Eroor";
    }

 }else{
     echo "Eroor";
 }


?>