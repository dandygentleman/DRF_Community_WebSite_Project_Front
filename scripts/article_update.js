let articleId


async function loadArticle(articleId){
    const response = await getArticle(articleId);


    const articleTitle = document.getElementById("title")
    // const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("content")

    articleTitle.setAttribute("value",response.title)
    articleContent.innerText = response.content
}


window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');

    await loadArticle(articleId);
}