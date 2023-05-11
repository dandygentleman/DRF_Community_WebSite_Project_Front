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