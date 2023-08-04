const form = document.querySelector(".signup form"),
continueBtn = form.querySelector(".button input");
errorTxt = form.querySelector(".error-txt");


form.onsubmit = (e) => {
    e.preventDefault(); // Preventing form from submitting
}


continueBtn.onclick = () => {
    //Start AJAX
    let xhr = new XMLHttpRequest(); // creating XMLHttpRequest object

    xhr.open("POST", "php/signup.php", true);
    xhr.onload = () => {
        if(xhr.readyState ===  4){
            if(xhr.status === 200){
                let data = xhr.response;
                if(data == "success"){
                    location.href = "user.php";
                }else{
                    errorTxt.textContent = data;
                    errorTxt.style.display = "block";
                    
                }
            }
        }
    }


    //Send form data through ajax to php

    let formData = new FormData(form); //creating new formData object
    xhr.send(formData); // Sending the form data  to php


}