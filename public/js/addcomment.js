$('.comment-btn').click(() => {
    var commentText = $(this).siblings('textarea').val();
    console.log(commentText);
    $.ajax({
        url: window.location.href + 'api/comments',
        dataType: 'json',
        type: 'POST',
        data: commentText,
        

        success: () => {
            console.log("Comment sent successfully");
        }
    });
})