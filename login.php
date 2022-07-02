<?php
 session_start();
 include_once "./config/config.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login</title>
          <link rel="stylesheet" href="./css/theme.css">
          <link rel="stylesheet" href="./css/login.css">
          <script src="./js/alerts-boxes/js/sweetalert.min.js"></script>
</head>

<body>
          <section class="container">
                    <div class="loginpage">
                              <div class="imgboxfrom1 signup" id="login">
                                        <img src="./img/6.jpg" id="login_img" class="login_img" alt="" srcset="">
                              </div>
                              <section class="form login" id="login_section">
                                        <header>login
                                                  <div class="Togglebtn">
                                                            <button class="btn" onclick="ToggleTheme()"></button>
                                                  </div>
                                        </header>

                                        <form action="" method="POST" enctype="multipart/form-data" autocomplete="off">
                                                  <div class="error-text"></div>
                                                  <div class="field input">
                                                            <label>Email Address or Username</label>
                                                            <input type="text" name="userinfo_login"
                                                                      placeholder="Enter email or Username" required>
                                                  </div>
                                                  <div class="field input">
                                                            <label>Password</label>
                                                            <input type="password" name="password_login"
                                                                      placeholder="Enter your password" required>
                                                            <i class="fas fa-eye"></i>
                                                  </div>
                                                  <div class="field button">
                                                            <input type="submit" name="submit_login" value="Login">
                                                  </div>
                                        </form>
                                        <div class="link">Not yet signed up? <a href="#" onclick="Signup()">Signup
                                                            now</a></div>
                              </section>
                              <section class="form signup" id="signup_section">
                                        <header>Signup
                                                  <div class="Togglebtn">
                                                            <button class="btn" onclick="ToggleTheme()"></button>
                                                  </div>
                                        </header>
                                        <form action="" method="post" enctype="multipart/form-data" autocomplete="off">
                                                  <div class="error-text"></div>
                                                  <div class="name-details">
                                                            <div class="field input">
                                                                      <label>First Name</label>
                                                                      <input type="text" name="fname" id="fname"
                                                                                placeholder="First name" required>
                                                            </div>
                                                            <div class="field input">
                                                                      <label>Last Name</label>
                                                                      <input type="text" name="lname" id="lname"
                                                                                placeholder="Last name" required>
                                                            </div>
                                                  </div>
                                                  <div class="field input">
                                                            <label>Email Address</label>
                                                            <input type="text" name="email" id="email"
                                                                      placeholder="Enter your email" required>
                                                  </div>
                                                  <div class="field input">
                                                            <label>Username</label>
                                                            <input type="text" name="username" id="username"
                                                                      placeholder="Enter your Username" required>
                                                  </div>
                                                  <div class="field input">
                                                            <label>Mobile number</label>
                                                            <input type="number" name="number" id="number"
                                                                      placeholder="Enter your Mobile no" required>
                                                  </div>
                                                  <div class="field input">
                                                            <label>Password</label>
                                                            <input type="password" name="password" id="password"
                                                                      placeholder="Enter new password" required>
                                                            <i class="fas fa-eye"></i>
                                                  </div>
                                                  <div class="field input">
                                                            <label>Password</label>
                                                            <input type="password" name="cpassword" id="cpassword"
                                                                      placeholder="Enter new password" required>
                                                            <i class="fas fa-eye"></i>
                                                  </div>
                                                  <div class="field gender">
                                                            <label for="">Select Gender</label>
                                                            <input class="one" type="radio" name="gender" value="male"
                                                                      checked>Male
                                                            <input class="two" type="radio" name="gender"
                                                                      value="female">Female
                                                            <input class="three" type="radio" name="gender"
                                                                      value="others">Others
                                                  </div>

                                                  <div class="field button">
                                                            <input type="submit" name="submit" value="Submit"
                                                                      onclick="Submit()">
                                                  </div>
                                        </form>
                                        <div class="link">Already signed up? <a href="#" onclick="login()">Login now</a>
                                        </div>
                              </section>

                              <div class="imgboxfrom2 signup" id="signup">
                                        <img src="./img/6.jpg" id="signup_img" alt="" srcset="">
                              </div>
                    </div>
                    <!-- <input type="button" value="hel" onclick="Submit()"> -->
          </section>
          <script src="./js/theme.js"></script>
          <script src="./js/login.js"></script>
</body>

</html>


<?php
          // session_start();
          include_once "./config/config.php";
          if(isset($_POST['submit'])){
            $fname =  $_REQUEST['fname'];
            $lname =  $_REQUEST['lname'];
            $email = $_REQUEST['email'];
            $username =$_REQUEST['username'];
            $password = $_REQUEST['password'];
            $cpassword = $_REQUEST['cpassword'];
            $mobile = $_REQUEST['number'];
            $gender = $_REQUEST['gender'];
    
            if(!empty($fname) && !empty($lname) && !empty($email) && !empty($username)&& !empty($mobile) && !empty($password) && !empty($gender) ){
                if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                    if($password == $cpassword){
                        $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}' && username ='{$username}' && mobile='{$mobile}' ");
                        if(mysqli_num_rows($sql) > 0){
                            echo '<script type="text/javascript"> 
                                         swal("Information!", "user already exist try another username! or email or mobile,", "info");
                                </script>'; 
                        }else{
                            
                            $ran_id = rand(time(), 100000000);
                            $unique = rand($ran_id,$mobile);
                            $image = rand(1, 8);
                            $encrypt_pass = md5($password);
                            $insert_query = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email,username,mobile, encrypt_password,gender,img)
                            VALUES ({$unique}, '{$fname}','{$lname}', '{$email}', '{$username}', '{$mobile}', '{$encrypt_pass}','{$gender}','{$image}')");
                            if($insert_query){
                                $select_sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                if(mysqli_num_rows($select_sql2) > 0){
                                    $result = mysqli_fetch_assoc($select_sql2);
                                    $_SESSION['unique_id'] = $result['unique_id'];
                                    // echo "success";
                                    echo '<script type="text/javascript"> 
                                            swal({
                                                title: "user registered",
                                                text: "",
                                                icon: "success",})
                                                .then((willDelete) => {
                                                if (willDelete) {
                                                    login();
                                                    
                                                }}); 
                                        </script>';
                                }else{
                                    echo "This email address not Exist!";
                                }
                            }else{
                                echo '<script type="text/javascript">
                                swal("Warning!", " Something went wrong. Please try again!,", "error"); 
                              </script>';
                            }
                        }   
                    }else{
                        echo '<script type="text/javascript">       
                                swal("Warning!", "password and Comform password does not mactch!!!,", "info");
                            </script>';
                    }
                }else{
                    echo '<script type="text/javascript"> 
                                swal("invalid", "Email is not a valid email!", "error");
                        </script>';
                }
            }else{
                echo '<script type="text/javascript"> 
                        swal("invalid", "All input fields are required!", "error");
                    </script>';
            }
          }    
?>
<!-- document.location.href = href="login.php"; -->


<!-- login -->


<?php
    if(isset($_REQUEST['submit_login'])){
       echo $username = $_REQUEST['userinfo_login'];
       echo $password_login = $_REQUEST['password_login'];
       $password = md5($password_login);

       $query=("SELECT * FROM users WHERE username='$username' AND encrypt_password='$password' AND block='0'");
        $query_run =mysqli_query($conn,$query);
        if(mysqli_num_rows($query_run)>0){   
            //valid in Session
            $row=mysqli_fetch_assoc($query_run);
            $_SESSION['unique_id']=$row['unique_id'];  
            //header('Location:home.php');
           echo '<script type="text/javascript">        
                     document.location.href = href="home.php";      
                </script>';
        }
        else{   
            $query_1=("SELECT * FROM users WHERE username='$username' AND encrypt_password='$password' AND block='1'");
            $query_run_1 =mysqli_query($conn,$query_1);
            if(mysqli_num_rows($query_run_1)>0){
            echo '<script type="text/javascript">        
                swal("Warning!", "This account is block,", "warning");      
            </script>';
            }
            else{ 
                echo '<script type="text/javascript"> 
                    swal("invalid user!!", "sorry username & password Wrong", "error");
                </script>';
            }
        }
    }
?>