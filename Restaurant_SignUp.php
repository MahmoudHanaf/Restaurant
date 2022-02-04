<?php
  
  include("db_con.php");

  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $user_name= $obj['user_name'];
  $user_email= $obj['user_email'];
  $user_password= $obj['user_password'];
  $user_phone= $obj['user_phone'];
  

//    $user_name ="Mohammed";
//    $user_email ="Medo502@gmail.com";
//    $user_password ="456123";
//    $user_phone ="01235846321";
//    $user_address ="Alex";


   if($user_name && $user_email && $user_password && $user_phone ){

    $select = mysqli_query($con,"SELECT * FROM `user` WHERE user_email='$user_email'");

    if(mysqli_num_rows($select) == 0){

        $sql =mysqli_query($con ,"INSERT INTO `user`(`user_name`, `user_email`, `user_password`, `user_phone`)
        VALUES ('$user_name','$user_email','$user_password','$user_phone')");

            if(mysqli_affected_rows($con) >0){

                $user_id = mysqli_insert_id($con);
                echo json_encode($user_id);

            }else {
                echo "Eroor";
            }


    }else{
        echo "This Email is found";
    }


   
     
      



    }


   else{
       echo "Eroor";
   }

  




?>