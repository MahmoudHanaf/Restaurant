<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $email= $obj['email'];
  $password= $obj['password'];
 

  if($email && $password ){

    $sql =mysqli_query($con,"SELECT `user_id`, `user_name`, `user_photo` FROM `user` WHERE user_email='$email' AND user_password='$password'");
 
     if(mysqli_num_rows($sql) >0){
           
        $Data=mysqli_fetch_object($sql);
        echo json_encode($Data);

     }else{
         echo "Eroor";
     }


  }else{
      echo "Eroor";
  }

?>  