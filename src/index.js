//1. generate the elements and apply classes 
/* <article class="image-card">
<h2 class="title">Title of image goes here</h2>
<img src="./assets/image-placeholder.jpg" class="image" />
<div class="likes-section">
    <span class="likes">0 likes</span>
    <button class="like-button">♥</button>
</div>
<ul class="comments">
    <li>Get rid of these comments</li>
    <li>And replace them with the real ones</li>
    <li>From the server</li>
</ul>
<form class="comment-form">
    <input
        class="comment-input"
        type="text"
        name="comment"
        placeholder="Add a comment..."
    />
    <button class="comment-button" type="submit">Post</button>
</form>
</article> */
function createCard (data) {

    for (section of data) {
        let articleEl = document.createElement("article")
        articleEl.setAttribute("class", "image-card")

        let titleEl = document.createElement("h2")
        titleEl.setAttribute("class", "title")
        titleEl.innerText = section.title
        console.log(section.title)

        let imageEl = document.createElement("h2")
        imageEl.setAttribute("src", section["image"])
        console.log(section["image"])

        let likesDivEl = document.createElement("div")
        likesDivEl.setAttribute("class", "likes-section")

        let spanEl = document.createElement("span")
        spanEl.setAttribute("class", "likes")
        spanEl.innerText = section["likes"]
        
        let likeButtonEl = document.createElement("button")
        likeButtonEl.setAttribute("class", "like-button")
        likeButtonEl.innerText = "❤"
        
        let commentsListEl = document.createElement("ul")
        commentsListEl.setAttribute("class", "comments")

        for (comment of section.comments) {
            let commentEl = document.createElement("li")
            commentEl.innerText = comment
            commentsListEl.append(commentEl)
        }

        let commentFormEl = document.createElement("form")
        commentFormEl.setAttribute("class", "comment-form")

        let commentFormInputEl = document.createElement("input")
        commentFormInputEl.setAttribute("class", "comment-input")
        commentFormInputEl.setAttribute("type", "text")
        commentFormInputEl.setAttribute("placeholder", "Add a comment...")

        let commentFormButtonEl = document.createElement("button")
        commentFormButtonEl.setAttribute("class", "comment-button")
        commentFormButtonEl.setAttribute("type", "submit")
        commentFormButtonEl.innerText = "Post"

        likesDivEl.append(spanEl, likeButtonEl)
        commentFormEl.append(commentFormInputEl, commentFormButtonEl)

        let imageContainerEl = document.querySelector(".image-container")
        imageContainerEl.append(articleEl, titleEl, likesDivEl, commentsListEl, commentFormEl)

        }
    }

fetch("http://localhost:3000/images/")
        .then(function (promise) {
            
            let data = promise.json()
            return data
        }
        )
        .then(function (data) {
            console.log(data)
            createCard(data)
        })
        



    
