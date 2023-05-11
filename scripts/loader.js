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

        let navbarLeft = document.getElementById("navbar-left")
        let articleCreateLi = document.createElement("li")
        articleCreateLi.setAttribute("class","nav-item")

        let articleCreateLink = document.createElement("a")
        articleCreateLink.setAttribute("class","nav-link")
        articleCreateLink.setAttribute("href","/ariticle_create.html")
        articleCreateLink.innerHTML = "글 작성"

        articleCreateLi.appendChild(articleCreateLink)
        navbarLeft.append(articleCreateLi)

        let navbarRight = document.getElementById("navbar-right")
        let logoutLi = document.createElement("li")
        logoutLi.setAttribute("class","nav-item")

        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class","nav-link btn")
        logoutBtn.innerText = "로그아웃"
        logoutBtn.setAttribute("onclick", "handleLogout()")
        logoutLi.appendChild(logoutBtn)
        
        let mypageLi = document.createElement("li")
        mypageLi.setAttribute("class","nav-item")

        let mypageLink = document.createElement("a")
        mypageLink.setAttribute("class","nav-link")
        mypageLink.setAttribute("href","/mypage.html")
        mypageLink.innerHTML = "마이페이지"
        mypageLi.appendChild(mypageLink)

        navbarRight.append(mypageLi)
        navbarRight.append(logoutLi)

        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none";
    }
}


injectNavbar();