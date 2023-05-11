window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article_id');
    console.log(articleId)

    const response = await getArticle(articleId);
    console.log(response)

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    const newImage = document.createElement("img")
    newImage.setAttribute("src",`${backend_base_url}${response.image}`)
    articleImage.append(newImage)
}