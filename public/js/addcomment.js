var commentBtn = $('.comment-btn');
var commentText;

commentBtn.click(function(){
    commentText = $(this).siblings('textarea').val();
    console.log(commentText);
    blogId = $(this).parents('.blog').attr('blog-id');

    $.ajax({
        url: window.location.href + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "post_id": parseInt(blogId),
            "commentContent": commentText,
            "date_created": new Date()
    },
        

        success: () => {
            console.log("Comment sent successfully");
        }
    });
})