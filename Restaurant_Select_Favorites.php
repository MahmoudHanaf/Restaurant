<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $user_id= $obj['user_id'];
  
  $Data =array();

  if($user_id ){

    $sql =mysqli_query($con,"SELECT kinds.kind_name,kinds.kind_photo,kinds.kind_content,kinds.kind_small ,likes.like_id FROM `likes`,`user`,`kinds` WHERE like_user_id='$user_id' AND like_kind_id=kinds.kind_id AND user.user_id='$user_id'");
 
     if(mysqli_num_rows($sql) >0){
         while($row =mysqli_fetch_object($sql)){
           $Data []=$row ;
         }  
         
         echo json_encode($Data);

     }else{
         echo "Eroor";
     }


  }else{
      echo "Eroor";
  }

?>  