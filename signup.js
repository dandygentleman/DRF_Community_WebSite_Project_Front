async function handleSignupButton(){
    const response = await handleSignup();

    if(response.status==201){
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/login.html`)
    }
}


checkLogin()