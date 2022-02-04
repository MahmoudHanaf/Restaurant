<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $user_id= $obj['user_id'];
  $kind_id= $obj['kind_id'];
 


  if($user_id && $kind_id ){

    $select=mysqli_query($con,"SELECT * FROM `likes` WHERE like_user_id='$user_id' AND like_kind_id ='$kind_id'");

    if(mysqli_num_rows($select) >0){
         echo "This product in favourit";
    }else{


      $sql =mysqli_query($con,"INSERT INTO `likes`(`like_user_id`, `like_kind_id`) VALUES ('$user_id','$kind_id')");
 
      if(mysqli_affected_rows($con) >0){
          
         $like_id= mysqli_insert_id($con);
         echo json_encode($like_id);


      }else{
          echo "Eror";
      }


    }

  

  }else{
      echo "Eroor";
  }

?>  