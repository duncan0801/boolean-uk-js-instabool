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
function createEl(tag) {
    return document.createElement(tag)
}
function createCards (data) {

    for (section of data) {
        let articleEl = createEl("article")
        articleEl.setAttribute("class", "image-card")

        let titleEl = createEl("h2")
        titleEl.setAttribute("class", "title")
        titleEl.innerText = section.title
        console.log(section.title)

        let imageEl = createEl("img")
        imageEl.setAttribute("src", section["image"])
        imageEl.setAttribute("alt", "")
        imageEl.setAttribute("class", "image")
        console.log(section["image"])
        console.log(imageEl)

        let likesDivEl = createEl("div")
        likesDivEl.setAttribute("class", "likes-section")

        let spanEl = createEl("span")
        spanEl.setAttribute("class", "likes")
        spanEl.innerText = section["likes"]
        
        let likeButtonEl = createEl("button")
        likeButtonEl.setAttribute("class", "like-button")
        likeButtonEl.innerText = "❤"
        
        let commentsListEl = createEl("ul")
        commentsListEl.setAttribute("class", "comments")

        function addComments() {
            for (comment of section.comments) {
                let commentEl = createEl("li")
                commentEl.innerText = comment.content
                commentsListEl.append(commentEl)
            }
        }
        addComments()

        let commentFormEl = createEl("form")
        commentFormEl.setAttribute("class", "comment-form")

        let commentFormInputEl = createEl("input")
        commentFormInputEl.setAttribute("class", "comment-input")
        commentFormInputEl.setAttribute("type", "text")
        commentFormInputEl.setAttribute("placeholder", "Add a comment...")

        let commentFormButtonEl = createEl("button")
        commentFormButtonEl.setAttribute("class", "comment-button")
        commentFormButtonEl.setAttribute("type", "submit")
        commentFormButtonEl.innerText = "Post"

        articleEl.append(titleEl, imageEl, likesDivEl, commentsListEl, commentFormEl)

        likesDivEl.append(spanEl, likeButtonEl)
        commentFormEl.append(commentFormInputEl, commentFormButtonEl)

        let imageContainerEl = document.querySelector(".image-container")
        imageContainerEl.append(articleEl)

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
            createCards(data)
        })
        



    
