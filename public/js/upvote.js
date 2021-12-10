let likebtn = document.getElementsByClassName('likebtn');
let dislikebtn = document.getElementsByClassName('dislikebtn');
let likecontainer = document.getElementById('likecontainer')


likecontainer.addEventListener('click',  function (event) {
  event.preventDefault();
  if (event.target.className === "like-btn" || event.target.matches("i")){
    const El = event.target.matches("button") ? event.target.nextSibling.nextSibling: event.target.parentElement.nextSibling.nextSibling
    console.log(El);
    let likecount = parseInt(El.textContent);
    likecount++;
    El.textContent = likecount;

    $.ajax({
      url: window.location.href + 'api/upvotes',
      type: 'PUT',
      dataType: 'json',
      data: {
        "upvotes": likecount
      }
    });
  }


});


