<?php
include_once "header.php";
?>

<body>
    <div class="wrapper">
        <section class="form login">
            <header>Real Time Chat App</header>
            <form action="#">
                <div class="error-txt"></div>
                <div class="field input">
                    <label>Email Address</label>
                    <input type="text" placeholder="Enter your email" name="email">
                </div>
                <div class="field input">
                    <label>Password</label>
                    <input type="password" placeholder="Enter new password" name="password">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="field button">
                    <input type="submit" value="Continue to Chat">
                </div>
            </form>
            <div class="link">Not yet signed up?<a href="index.html"> Signup now</a></div>
        </section>
    </div>
    <script src="javascript/pass-show-hide.js"></script>
    <script src="javascript/login.js"></script>
</body>

</html>