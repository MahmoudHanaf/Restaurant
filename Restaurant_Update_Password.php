<?php
     include("db_con.php");

     $json =file_get_contents('php://input');
    $obj = json_decode($json ,true);
    $user_email= $obj['user_email'];
    $user_password= $obj['user_password'];
    
      
    if($user_email && $user_password ){

     $sql =mysqli_query($con,"UPDATE `user` SET `user_password`='$user_password'WHERE user_email ='$user_email'");
      
     if(mysqli_affected_rows($con)){
        
        $select=mysqli_query($con,"SELECT user_email FROM `user` WHERE user_email='$user_email'");
        
        if(mysqli_num_rows($select) >0){
          echo json_encode ($user_email);
        }else{
            echo "this Email not found";
        }
  
     }else{
        echo "Eroor";
     }




    }else{
        echo "Eroor";
    }
  
    
   



    ?>