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
    
}
async function loadProfileArticles(userId,pageNum){
    const articles = await getProfileArticle(userId,pageNum)
    const article_list = document.getElementById("article-list")
    article_list.innerHTML = ""

    articles.results.forEach(article => {
        const newBtn = document.createElement("button")
        newBtn.setAttribute("type", "button")
        newBtn.setAttribute("class", "list-group-item list-group-item-action")
        newBtn.setAttribute("id", article.id)
        newBtn.setAttribute("onclick", `articleDetail(${article.id})`)

        const newTitle = document.createElement("h5")
        newTitle.setAttribute("class", "mb-1")
        newTitle.innerText = article.title
        newBtn.appendChild(newTitle)

        const newDiv = document.createElement("div")
        const newDivChild = document.createElement("div")
        newDiv.setAttribute("class", "d-flex w-100 justify-content-between")
        newBtn.appendChild(newDiv)

        const newDate = document.createElement("small")
        const newAuthor = document.createElement("small")
        const newLikeCount = document.createElement("small")
        const newCommentCount = document.createElement("small")
        newDate.innerText = article.created_at
        newAuthor.innerText = article.author
        newLikeCount.innerText = `좋아요 수 : ${article.likes_count} `
        newCommentCount.innerText = `댓글 수 : ${article.comment_count} `
        newDiv.appendChild(newAuthor)
        newDivChild.appendChild(newLikeCount)
        newDivChild.appendChild(newCommentCount)
        newDivChild.appendChild(newDate)
        newDiv.appendChild(newDivChild)

        article_list.append(newBtn)
    });
    const pagination = document.getElementById("pagination") 
    pagination.innerHTML = ""

    const pagecount = articles.count/10+1

    for (i=1; i < pagecount; i++){
        const newPageBtn = document.createElement("li")
        newPageBtn.setAttribute("class", "page-item")
        const newPageLink = document.createElement("a")
        newPageLink.setAttribute("class", "page-link")
        newPageLink.setAttribute("onclick", `loadProfileArticles(${userId},${i})`)
        newPageLink.innerText = i
        newPageBtn.appendChild(newPageLink)
        pagination.append(newPageBtn)
    }

}
async function followButton(userId){
    const buttonarea=document.getElementById('button_div')
    buttonarea.innerHTML=`<button onclick="followToggle(${userId})">팔로우/팔로우 취소</button>`
    
}
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('user_id');
    await loadProfile(userId);
    await loadProfileArticles(userId,1);
    await followButton(userId);
}