function articleDetail(article_id){
    window.location.href = `${frontend_base_url}/article_detail.html?article_id=${article_id}`
}


async function loadFeedArticles(pageNum){
    articles = await getFeedArticles(pageNum)

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
        newPageLink.setAttribute("onclick", `loadFeedArticles(${i})`)
        newPageLink.innerText = i
        newPageBtn.appendChild(newPageLink)
        pagination.append(newPageBtn)
    }
}


window.onload = async function(){
    await loadFeedArticles(1);
}