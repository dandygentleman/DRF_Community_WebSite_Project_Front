const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


window.onload = () => {
    console.log("로딩되었음")
}

async function parse_payload(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return jsonPayload
}

async function refresh() {
    const refresh_token = localStorage.getItem("refresh")
    if (refresh_token == null) {
        return null
    }
    const response = await fetch(`${backend_base_url}/user/refresh/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            "refresh": refresh_token
        })
    })
    if (response.status == 401) {
        alert("로그아웃되었습니다 다시 로그인해주세요")
        localStorage.removeItem("payload")
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.location.href=`${frontend_base_url}`
        return null
    }
    const response_json = await response.json();
    const jsonPayload = await parse_payload(response_json.access);
    localStorage.setItem("payload", jsonPayload);
    localStorage.setItem("access", response_json.access);
    return localStorage.getItem("access")
}
async function get_access_token() {
    const token = localStorage.getItem('access')
    if (token == null) {

        return null
    }
    else {
        const response = await fetch(`${backend_base_url}/user/verify/`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ "token": token })
        })
        if (response.status == 200) {
            return token
        }
        else {
            return await refresh()
        }
    }
}

async function handleSignup() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const email = document.getElementById("email").value

    const response = await fetch(`${backend_base_url}/user/sign/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password,
            "password2": password2,
            "email": email
        })
    })

    return response
}


async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/user/token/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    if(response.status == 200){
        const response_json = await response.json()


        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
        const jsonPayload = await parse_payload(response_json.access);

        localStorage.setItem("payload", jsonPayload);
        alert("환영합니다.")
        window.location.replace(`${frontend_base_url}/`)
    }else{
        alert("회원정보가 일치하지 않습니다.")
    }


}



function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace(`${frontend_base_url}/`)
}


function checkLogin(){
    const payload = localStorage.getItem("payload");
    if(payload){
        window.location.replace(`${frontend_base_url}/`)
    }
}


async function handleSignout() {
    const password = document.getElementById("signout-password").value
    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/user/sign/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'PUT',
        body: JSON.stringify({
            "password": password
        })
    })

    return response
}


async function handlePasswordChange() {
    const currentPassword = document.getElementById("current-password").value
    const newpassword = document.getElementById("new-password").value
    const newpassword2 = document.getElementById("new-password2").value
    let token = await get_access_token()

    const response = await fetch(`${backend_base_url}/user/sign/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify({
            "current_password": currentPassword,
            "password": newpassword,
            "password2": newpassword2
        })
    })

    return response
}


async function getProfile(userId){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/user/${userId}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'GET'
})

    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else{
        alert("불러오는데 실패했습니다")
    }

}


async function changeProfile(userId){
    const image = document.getElementById("image").files[0]
    const bio = document.getElementById("bio").value

    const formdata = new FormData();

    if (image){
        formdata.append('image',image)
    }
    formdata.append('bio',bio)

    let token = await get_access_token()

    const response = await fetch(`${backend_base_url}/user/${userId}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'PUT',
        body: formdata
    })

    return response
}


async function getArticles(pageNum){
    const response = await fetch(`${backend_base_url}/article/?page=${pageNum}`)

    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else{
        alert("불러오는데 실패했습니다")
    }

}


async function postArticle(){
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value

    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/article/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
            "title": title,
            "content": content
        })
    })

    if(response.status == 201) {
        alert("글작성 완료!")
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}


async function getArticle(articleId){
    const response = await fetch(`${backend_base_url}/article/${articleId}/`)

    if(response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


async function updateArticle(){
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');

    const title = document.getElementById("title").value
    const content = document.getElementById("content").value

    let token = await get_access_token()
    
    const response = await fetch(`${backend_base_url}/article/${articleId}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'PUT',
        body: JSON.stringify({
            "title": title,
            "content": content
        })
    })

    if(response.status == 200) {
        alert("수정 완료!")
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}


async function deleteArticle(articleId){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/article/${articleId}/`, {
        method: 'DELETE',   
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(response.status == 204) {
        alert("삭제 완료!")
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}
 

async function likeArticle(articleId){
    let token = await get_access_token()

    const response = await fetch(`${backend_base_url}/article/${articleId}/like/`, {
        method: 'POST',   
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(response.status == 200) {
        response_json = await response.json()
        alert(response_json.message)
        location.reload();
    } else {
        alert(response.status)
    }
}


async function bookmarkArticle(articleId){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/article/${articleId}/bookmark/`, {
        method: 'POST',   
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(response.status == 200) {
        response_json = await response.json()
        alert(response_json.message)
        location.reload();
    } else {
        alert(response.status)
    }
}


async function getFeedArticles(){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/article/feed/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'GET'
    })

    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else{
        alert("불러오는데 실패했습니다")
    }
}


async function getBookmarkArticles(){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/article/bookmark_list/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'GET'
    })

    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else{
        alert("불러오는데 실패했습니다")
    }
}


async function getComments(articleId){
    const response = await fetch(`${backend_base_url}/article/${articleId}/comment/`)
    
    if(response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


async function getProfile(userId){
    const response = await fetch(`${backend_base_url}/user/${userId}/`)
    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else if(response.status==404){
        alert("탈퇴했거나 존재하지 않는 회원입니다")
        window.location.href=`${frontend_base_url}`
    }else{
        alert("불러오는데 실패했습니다")
        window.location.href=`${frontend_base_url}`
    }
}
async function getProfileArticle(userId,pageNum){
    const response = await fetch(`${backend_base_url}/user/${userId}/article/?page=${pageNum}`)
    if(response.status==200){
        const response_json = await response.json()
        return response_json
    }else{
        alert("불러오는데 실패했습니다")
    }
}

async function followToggle(userId){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/user/${userId}/follow/`, {
        method: 'POST',   
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if(response.status==200 || response.status==400){
        const response_json = await response.json()
        alert(response_json.message)
        location.reload()
    }else{
        alert("failed")
    }
}

async function postComment(articleId, newComment){
    let token = await get_access_token()
    const response = await fetch(`${backend_base_url}/article/${articleId}/comment/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    })

    if(response.status == 201) {
        response_json = await response.json()
        alert(response_json.message)
        return response_json
    } else {
        alert(response.status)

    }
}