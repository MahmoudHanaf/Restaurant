<?php
     include("db_con.php");

     $json =file_get_contents('php://input');
    $obj = json_decode($json ,true);
    $user_email= $obj['user_email'];
    $user_password= $obj['user_password'];
    $new_password= $obj['new_password'];

    // $user_email='Mahmoud@gmail.com';
    // $user_password='369258';
    // $new_password='789123';
    
      
    if($user_email && $user_password && $new_password ){

     $sql =mysqli_query($con,"UPDATE `user` SET `user_password`='$new_password'WHERE user_email ='$user_email' AND user_password ='$user_password'");
      
     
        if(mysqli_affected_rows($con) >0){
           echo json_encode("Your new Password is " . $new_password);
        }else{
            echo "Error";
        }
  
     



    }else{
        echo "Eroor";
    }
  
    
   



    ?>