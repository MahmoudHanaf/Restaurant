<?php
   
   include("db_con.php");

   $sql = mysqli_query($con,"SELECT * FROM `categoris` WHERE 1");
     $Data =array();

   if(mysqli_num_rows($sql) >0){
       
    while($row =mysqli_fetch_object($sql)){

       $Data[] =$row;
    }
   
    echo json_encode($Data);



   }else{
       echo "Eroor";
   }




?>