async function handleSignoutButton(){
    const response = await handleSignout();

    if(response.status==200){
        alert("회원탈퇴 되었습니다.")
        handleLogout()
    } else {
        alert(response.status)
    }
}


async function handlePasswordChangeButton(){
    const response = await handlePasswordChange();

    if(response.status==200){
        alert("비밀번호가 변경되었습니다.")
        location.reload()
    } else {
        alert(response.status)
    }
}


async function loadProfile(userId){
    const response = await getProfile(userId);

    const profileImage = document.getElementById("profile_image")
    const profileBio = document.getElementById("bio")
    profileBio.innerText = response.bio
    profileImage.innerHTML=`<img class="img-fluid" src="${backend_base_url}${response.image}">`
}


async function changeProfileButton(){
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('user_id');

    const response = await changeProfile(userId);

    if(response.status==200){
        const response_json = await response.json()
        alert(response_json.message)
        location.reload();
    } else {
        alert(response.status)
    }
}


window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('user_id');

    await loadProfile(userId);
}