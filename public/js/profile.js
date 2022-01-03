let tempURL = "";
let submitBlog = document.querySelector("#submit-new-blog");

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const content = document.querySelector('#blog-desc').value.trim();

  // console.log(tempURL)
  // console.log(title)
  // console.log(content)

  // if(!tempURL) {
  //   alert("You have not uploaded a picture")
  // }

  if (title && content) {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({ title, content, image: tempURL }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);

  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'carlincb', 
    uploadPreset: 'jvuzkf2n'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        tempURL = result.info.secure_url;
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(event){
    event.preventDefault();
      myWidget.open();
    }, false);

submitBlog.addEventListener("click", newFormHandler)