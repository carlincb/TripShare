let likebtn = document.getElementsByClassName('likebtn');
let dislikebtn = document.getElementsByClassName('dislikebtn');
let likecontainer = document.getElementById('likecontainer')


likecontainer.addEventListener('click',  function (event) {
  event.preventDefault();
  if (event.target.className === "like-or-dislike-btn" || event.target.matches("i")){
    const El = event.target.matches("button") ? event.target.nextSibling.nextSibling: event.target.parentElement.nextSibling.nextSibling
    console.log("likeEventListner",El);

    let likecount = parseInt(El.textContent);

    // maybe use data attributes to pass in blog id
    // do a POST fetch('/api/blog/<blog_id>/upvote') 
    // this would create a data row for upvotes table associted with the blog post

    likecount++;
    El.textContent = likecount

  }
});


