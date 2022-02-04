<?php
     include("db_con.php");

     $json =file_get_contents('php://input');
    $obj = json_decode($json ,true);
    $user_email= $obj['user_email'];
    $user_password= $obj['user_password'];
   
    
    //  $user_email="Mahmoud@gmail.com";
    //  $user_password="789123";
   
     if($user_email && $user_password){

         
        $sql =mysqli_query($con,"SELECT * FROM `user` WHERE user_email='$user_email' AND user_password ='$user_password'");
          

        if(mysqli_num_rows($sql) >0){
          
          
            $Data= mysqli_fetch_object($sql);
            echo json_encode($Data);
      
        }else{
            echo "Eroor";
        }
        

     }else{
         echo "Eroor";
     }
  
    
      

    
?>

