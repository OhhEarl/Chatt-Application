const searchBar = document.querySelector('.users .search input');

const searcBtn = document.querySelector(".users .search button");

const userList = document.querySelector('.users .users-list');


searcBtn.onclick = () => {
searchBar.classList.toggle('active');
searchBar.focus();
searcBtn.classList.toggle('active');
searcBtn.value = "";
}


searchBar.onkeyup = () => {
     let searchTerm = searchBar.value;
    if(searchTerm != ""){
        searchBar.classList.add("active");
    }else{
        searchBar.classList.remove("active");
    }
     let xhr = new XMLHttpRequest();
     xhr.open("POST", "php/search.php", true);
     xhr.onload = () => {
         if(xhr.readyState ===  4){
             if(xhr.status === 200){
                 let data = xhr.response;
                 userList.innerHTML = data;
             }
         }
     }
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
     xhr.send("searchTerm=" + searchTerm);
}

setInterval(() => {
    let xhr = new XMLHttpRequest(); // creating XMLHttpRequest object

    xhr.open("GET", "php/users.php", true);
    xhr.onload = () => {
        if(xhr.readyState ===  4){
            if(xhr.status === 200){
                let data = xhr.response;
                if(!searchBar.classList.contains("active")){ //if active not contains in search bar then add the data
                    userList.innerHTML = data; 
                }
          
            }
        }
    }

    xhr.send()
}, 500) ; // this function will run frequently after 500ms