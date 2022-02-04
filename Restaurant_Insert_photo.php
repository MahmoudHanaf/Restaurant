<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $photo_uri= $obj['photo_uri'];
  $email= $obj['email'];
  $password= $obj['password'];

// $photo_uri= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufOKKnOlUtMAaD1JNvT56vVKFN6zNhAHZbf5T1bxLh1CDPnjOpRlXyroHTPOh9vwczXs&usqp=CAU';
// $email= 'Ahmed@gmail.com';
// $password= '123789';

  if($photo_uri && $email && $password ){

    $sql =mysqli_query($con,"UPDATE `user` SET `user_photo`='$photo_uri' WHERE user_email='$email' AND user_password='$password'");
 
        if(mysqli_affected_rows($con) >0){
            
            echo "Sucess";


        }else{
            echo "Eror";
        }


  }else{
      echo "Eroor";
  }

?>  