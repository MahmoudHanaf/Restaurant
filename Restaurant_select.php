
<?php
    include("db_con.php");
     $Data= array();

    $sql = mysqli_query($con,"SELECT * FROM `user` WHERE 1");
    

    if(mysqli_num_rows($sql) > 0){

       while($row =mysqli_fetch_object($sql)){
         
          $Data []= $row ;
       }

       echo json_encode($Data);

    }else{
        echo json_encode("No Data");
    }
    

?>