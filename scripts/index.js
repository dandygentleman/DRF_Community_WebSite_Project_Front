function articleDetail(article_id){
    window.location.href = `${frontend_base_url}/article_detail.html?article_id=${article_id}`
}


async function loadArticles(pageNum){
    articles = await getArticles(pageNum)
    console.log(articles)

    const article_list = document.getElementById("article-list")
    article_list.innerHTML = ""

    articles.results.forEach(article => {
        const newBtn = document.createElement("button")
        newBtn.setAttribute("type", "button")
        newBtn.setAttribute("class", "list-group-item list-group-item-action")
        newBtn.setAttribute("id", article.id)
        newBtn.setAttribute("onclick", `articleDetail(${article.id})`)

        const newDiv = document.createElement("div")
        newDiv.setAttribute("class", "d-flex w-100 justify-content-between")
        newBtn.appendChild(newDiv)

        const newTitle = document.createElement("h5")
        const newDate = document.createElement("small")
        newTitle.setAttribute("class", "mb-1")
        newTitle.innerText = article.title
        newDate.innerText = article.created_at
        newDiv.appendChild(newTitle)
        newDiv.appendChild(newDate)

        const newContent = document.createElement("p")
        newContent.setAttribute("class", "mb-1")
        newContent.innerText = article.content
        newBtn.appendChild(newContent)

        const newAuthor = document.createElement("small")
        newAuthor.innerText = article.author
        newBtn.appendChild(newAuthor)

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
        newPageLink.setAttribute("onclick", `loadArticles(${i})`)
        newPageLink.innerText = i
        newPageBtn.appendChild(newPageLink)
        pagination.append(newPageBtn)
    }
}


window.onload = async function(){
    await loadArticles(1);
}