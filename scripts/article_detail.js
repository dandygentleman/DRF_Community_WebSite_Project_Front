let articleId


// async function loadComments(articleId){
//     const response = await getComments(articleId);
//     console.log(response)

//     const commentList = document.getElementById("comment-list")
//     commentList.innerHTML = ""

//     response.forEach(comment => {
//         commentList.innerHTML += `
//             <div class="d-flex">
//                 <div class="flex-shrink-0">
//                     <img src="https://as1.ftcdn.net/v2/jpg/00/64/67/80/1000_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg" alt="..." />
//                 </div>
//                 <h5>댓글작성자</h5>
//                 <div class="flex-grow-1 ms-3">댓글내용</div>
//             </div>
//             `
//     });
// }


async function loadArticle(articleId){
    const response = await getArticle(articleId);

    const articleTitle = document.getElementById("article-title")
    // const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    const newImage = document.createElement("img")
    newImage.setAttribute("src",`${backend_base_url}${response.image}`)
    // articleImage.append(newImage)
}


// async function submitComment(){
//     const commentElement = document.getElementById("new-comment")
//     const newComment = commentElement.value
//     const response = await postComment(articleId, newComment)
//     console.log(response)
//     commentElement.value = ""

//     loadComments(articleId)
// }


async function injectUpdateDeleteButton(articleId){
    let buttonArea = document.getElementById("button-area")
    let updateBtn = document.createElement("a")
    updateBtn.setAttribute("class","btn btn-outline-secondary")
    updateBtn.setAttribute("href",`/article_update.html?article_id=${articleId}`)
    updateBtn.innerText = "수정"

    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("type","button")
    deleteBtn.setAttribute("class","btn btn-outline-danger")
    deleteBtn.setAttribute("onclick",`deleteArticle(${articleId})`)
    deleteBtn.innerText = "삭제"

    buttonArea.append(updateBtn)
    buttonArea.append(deleteBtn)
}


window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');

    await loadArticle(articleId);
    await injectUpdateDeleteButton(articleId);
    // await loadComments(articleId);
}