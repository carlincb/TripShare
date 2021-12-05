var commentBtn = $('.comment-btn');
var commentText;

commentBtn.click(function(){
    commentText = $(this).siblings('textarea').val();
    console.log(commentText);
    $.ajax({
        url: window.location.href + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "commentContent": commentText,
            "date_created": new Date()
    },
        

        success: () => {
            console.log("Comment sent successfully");
        }
    });
})