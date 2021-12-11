var commentBtn = $('.comment-btn');
var commentText;

commentBtn.click(function(){
    commentText = $(this).siblings('textarea').val();
    console.log(commentText);
    blogId = $(this).parents('.blog').attr('blog-id');
    console.log(blogId);
    commentAppendSpot = $(this).parent();

    $.ajax({
        url: window.location.href + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "post_id": parseInt(blogId),
            "commentContent": commentText,
            "date_created": new Date()
    },
        

        success: function(){
            console.log('comment added successfully');
            console.log(commentAppendSpot)
            commentAppendSpot.append(`<article class="comment-block">
                <span>${req.session.user.name}</span>
                <span>${new Date()}</span>
                <p>${commentText}</p>
            </article>`);
        },

        error: function(){
         //   alert("There was an error sending your comment. Please try again later.");
        }
    });
})
