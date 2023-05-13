async function loadProfile(userId){
    const response = await getProfile(userId);

    const username = document.getElementById("userinfo")
    let bio =response.bio||"소개문 없음"
    username.innerHTML = `
    <img class="img-fluid" src="${backend_base_url+decodeURI(response.image)}"></img>
    <h1 id="username">${response.username}</h1>
    <h3 id="email">${response.email}</h3>
    <h5>bio</h5>
    <pre id="bio">${bio}</pre>
    <p>
        팔로워 수: ${response.followers} 팔로잉 수: ${response.following}
    </p>`
    const userarticle=document.getElementById("userarticles")
    const article_response= await getProfileArticle(userId);
    console.log(article_response)
    article_response.results.forEach(e => {
        userarticle.innerHTML += `
        <div class="container">
        <a href="${frontend_base_url}/article_detail.html?article_id=${e.id}"><h4>${e.title}</h4></a>
        <h6>${e.created_at.slice(0,10)} ${e.created_at.slice(11,16)}</h6>
        
        </div>
        `
    });
    
}

async function followButton(userId){
    const buttonarea=document.getElementById('button_div')
    buttonarea.innerHTML=`<button onclick="followToggle(${userId})">팔로우/팔로우 취소</button>`
    
}
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('user_id');

    await loadProfile(userId);
    await followButton(userId);
}