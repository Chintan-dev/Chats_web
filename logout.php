<?php
session_start();
if (isset($_SESSION['unique_id'])) {

          $unique_id = $_SESSION['unique_id'];
          
          session_destroy();
          echo '<script type="text/javascript">        
                    document.location.href = href="login.php#login_section";      
          </script>';
}
else {
          echo '<script type="text/javascript"> 
          swal("invalid user!!", "sorry username & password Wrong", "error");
      </script>';
         //header('location: login.php');
          // echo '<script type="text/javascript">        
          //           document.location.href = href="login.php";      
          // </script>'; 
	
}

// require '..config/config.php';
// $query="update users SET activated='0' where username = '".$username."'";
                       
// $query_run = mysqli_query($conn,$query);
// if(($query_run)>0){
// 	session_destroy();
// 	// header("Location: login.php");
//           echo '<script type="text/javascript">        
//                     document.location.href = href="login.php";      
//           </script>';
//destroy session
//}


?>