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


/* DAY 2:
- ✔ Have the like button adding 1 like to the respective counter each time you click it, and display the changes
1. recognise someone cliccked the like button, update the number of likes in the data base, update the like section on the page

- Have the comments form to add another comment to the respective post, and display the changes
1. addEventListener for submit button

- The data must be persisted in the server so that when you refresh the page it doesn't go away

Tips
- Make some requests to your server and inspect the response, so you can check the data structure before start coding
- Focus first on render the data onto your page
- Try to think which kind of HTTP method you should use on each occasion
- Try to use function scopes to your advantage
*/

function createEl(tag) {
    return document.createElement(tag)
}
function createCard (section) {

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
            commentsListEl.innerHTML = ""
            for (comment of section.comments) {

                const commentEl = createEl("li")
                commentEl.innerText = comment.content
                commentsListEl.append(commentEl)
            }
        }
        addComments()

        let commentFormEl = createEl("form")
        commentFormEl.setAttribute("class", "comment-form")

        let commentFormInputEl = createEl("input")
        commentFormInputEl.setAttribute("class", "comment-input")
        commentFormInputEl.setAttribute("id", `comment-input-${section.id}`)
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


        //like button event listener 
        likeButtonEl.addEventListener("click", function(){
            
            fetch(`http://localhost:3000/images/${section.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"likes": ++section.likes})
            })
            .then(function (response) {
               
                if (response.ok) {
                    return response.json()
                }
                else {
                    alert(`There was an error ${response.status}`)
                }  
            })
            .then(function (response) {
                    spanEl.innerText = response.likes
            })
        })

        //add comment 
        commentFormEl.addEventListener("submit", function (e){
            
            e.preventDefault() 
            let commentToAdd =  {
                "content": commentFormInputEl.value,
                "imageId": section.id
                }
            
            fetch(`http://localhost:3000/comments/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentToAdd)
            })
            .then(function(response) {
                if (response.ok) {
                    console.log("Success!")
    
                    newCommentEl = createEl("li")
                    newCommentEl.innerText = commentFormInputEl.value
                    commentsListEl.append(newCommentEl)
                    commentFormEl.reset()

                }
                else {
                    alert(`There was an error ${response.status}`)
                }
            })
        })

    }
function createCards(data) {

    for (section of data) {
        createCard(section)
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
        



    
