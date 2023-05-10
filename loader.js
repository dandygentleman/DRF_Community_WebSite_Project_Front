async function injectNavbar(){
    fetch("./navbar.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
    
    let navbarHtml = await fetch("./navbar.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;


    const payload = localStorage.getItem("payload");
    if(payload){
        const payload_parse = JSON.parse(payload)

        const intro = document.getElementById("intro")
        intro.innerText = `${payload_parse.username}님 안녕하세요`

        let navbarRight = document.getElementById("navbar-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class","nav-item")

        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class","nav-link btn")
        logoutBtn.innerText = "로그아웃"
        logoutBtn.setAttribute("onclick", "handleLogout()")
        
        newLi.appendChild(logoutBtn)

        navbarRight.append(newLi)

        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none";
    }
}


injectNavbar();