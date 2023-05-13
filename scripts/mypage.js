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
    console.log(response)
    console.log(response.profile_data)

    const profileImage = document.getElementById("image")
    const profileBio = document.getElementById("bio")

    profileImage.innerHTML = response.profile_data.bio
    profileBio.innerText = response.profile_data.bio
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