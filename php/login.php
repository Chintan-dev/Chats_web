<?php
          // session_start();
          include_once "./config/config.php";

         $fname =  $_REQUEST['fname'];
         $lname =  $_REQUEST['lname'];
         $email = $_REQUEST['email'];
         $username =$_REQUEST['username'];
         $password = $_REQUEST['password'];
         $mobile = $_REQUEST['number'];
         $gender = $_REQUEST['gender'];
        // echo "success"; && !empty($image)

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($username)&& !empty($mobile) && !empty($password) && !empty($gender) ){
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
          
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}' && username ='{$username}' && mobile='{$mobile}' ");
            if(mysqli_num_rows($sql) > 0){
                echo "$email - This email already exist!";
            }else{
              
                $ran_id = rand(time(), 100000000);
                $unique = rand($ran_id,$mobile);
                $image = rand(1, 5);
                $encrypt_pass = md5($password);
                $insert_query = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email,username,mobile, encrypt_password,gender,img)
                VALUES ({$unique}, '{$fname}','{$lname}', '{$email}', '{$username}', '{$mobile}', '{$encrypt_pass}','{$gender}','{$image}')");
                if($insert_query){
                    $select_sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                    if(mysqli_num_rows($select_sql2) > 0){
                        $result = mysqli_fetch_assoc($select_sql2);
                        $_SESSION['unique_id'] = $result['unique_id'];
                        echo "success";
                        echo '<script type="text/javascript"> 
                                swal({
                                    title: "user registered",
                                    text: "",
                                    icon: "success",
                                    })
                                    .then((willDelete) => {
                                    if (willDelete) {
                                        document.location.href = href="login.php";
                                    }
                                    }); 
                            </script>';
                    }else{
                        echo "This email address not Exist!";
                    }
                }else{
                    echo "Something went wrong. Please try again!";
                }
            }
        }else{
            echo "$email is not a valid email!";
        }
    }else{
        echo "All input fields are required!";
    }
?>