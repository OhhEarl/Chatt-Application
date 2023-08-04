<?php

session_start();
include_once('config.php');

$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$lname = mysqli_real_escape_string($conn, $_POST['lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

if (!empty($fname) && !empty($lname) && !empty($email) && !empty($password)) {
    //lets check user email is valid or not

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // if email is valid

        //Check if that email is already exist in the database or not;

        $sql = mysqli_query($conn, "SELECT email FROM users where email = '$email'");

        if (mysqli_num_rows($sql) > 0) {
            echo "$email - email already exists";
        } else {  // lets check user upload file or not
            if (isset($_FILES['image'])) {
                // If file is uploaded
                $img_name = $_FILES['image']['name']; // getting user uploaded img name

                $img_type = $_FILES['image']['type']; // getting user uploaded img type

                $tmp_name = $_FILES['image']['tmp_name']; // this temporary name is used to save/move file in our folder

                //lets explode image and get the extension like jpg or png.

                $img_explode = explode(".", $img_name);
                $img_ext = end($img_explode);

                $extensions = ['png', 'jpg', 'jpeg']; // Thesea re some valid img extension and we've store them in array

                if (in_array($img_ext, $extensions) === true) {
                    // if user uploaded img ext is match with any array extension

                    $time = time(); //This will return us current time
                    // we need this time because when you upload user img to in our folder we rename user file current time
                    // so all the img file have a unique name


                    // lets move the user uplaoded img to our particular folder

                    $new_img_name = $time . $img_name;

                    move_uploaded_file($tmp_name, "images/" . $new_img_name); //if user upload img to our folder successfully
                    $status = "Active Now"; //once user signed up his status will be active noew
                    $random_id = rand(time(), 100000000); //Creating random id for user

                    //lets insert all user data in the database

                    $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status)
                         VALUES('$random_id', '$fname', '$lname' , '$email' , '$password' , '$new_img_name' , '$status')");

                    if ($sql2) {
                        // if the data is inserted
                        $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
                        if (mysqli_num_rows($sql3) > 0) {
                            $row = mysqli_fetch_assoc($sql3);
                            $_SESSION['unique_id'] = $row['unique_id']; // using this sesssion we need user unique id in other php file
                            echo "success";
                        }
                    } else {
                        echo "Something went wrong";
                    }
                } else {
                    echo "Please Select an Image file - jpeg, jpg, or png!";
                }
            } else {
                echo "Please select an Image file";
            }
        }
    } else {
        echo "$email - This is not valid email";
    }
} else {
    echo "All input field are required";
}
