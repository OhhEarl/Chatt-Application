const form = document.querySelector(".typing-area"),
inputField = document.querySelector(".input-field"),
sendBtn = document.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e) => {
    e.preventDefault(); // Preventing form from submitting
}

sendBtn.onclick = () => {
    let xhr = new XMLHttpRequest(); // creating XMLHttpRequest object
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = () => {
        if(xhr.readyState ===  XMLHttpRequest.DONE){
            if(xhr.status === 200){
                inputField.value = "" ; // once message inserted into data then leave blank the input field
            }
        }
    }


    //Send form data through ajax to php

    let formData = new FormData(form); //creating new formData object
    xhr.send(formData); // Sending the form data  to php
   
}

chatBox.onmouseenter = () => {
    chatBox.classList.add("active");
}

chatBox.onmouseleave = () => {
    chatBox.classList.remove("active");
}



setInterval(() => {
    let xhr = new XMLHttpRequest(); // creating XMLHttpRequest object

    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = () => {
        if(xhr.readyState ===  4){
            if(xhr.status === 200){
                let data = xhr.response;
                chatBox.innerHTML = data;
                

                if(!chatBox.classList.contains("active")){
                    scrolltoBottom();
                }
            }
        }
    }

    let formData = new FormData(form); //creating new formData object
    xhr.send(formData); // Sending the form data  to php
}, 500) ; // this function will run frequently after 500ms



function scrolltoBottom(){
        chatBox.scrollTop = chatBox.scrollHeight;
}