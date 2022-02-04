
<?php
   
   include("db_con.php");

   $json =file_get_contents('php://input');
   $obj = json_decode($json ,true);
   $categoris_id= $obj['categoris_id'];
   // $categoris_id =1;

   $sql = mysqli_query($con,"SELECT * FROM `kinds` WHERE categoris_kind_id ='$categoris_id'");
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