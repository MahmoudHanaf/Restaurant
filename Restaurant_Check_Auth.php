<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $email= $obj['email'];
  $password= $obj['password'];
   
   $Data =array();

  if($email && $password ){

    $sql =mysqli_query($con,"SELECT `user_id`, `user_name`, `user_photo` FROM `user` WHERE user_email='$email' AND user_password='$password'");
 
     if(mysqli_num_rows($sql) >0){

        while($row = mysqli_fetch_object($sql)){
            $Data [] = $row ;
         }
   
         echo json_encode($Data);


     }else{
         echo "Eroor";
     }

     
  }else{
      echo "Eroor";
  }

?>  

