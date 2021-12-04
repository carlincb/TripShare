$('.comment-btn').click(() => {
    var commentText = $(this).siblings('textarea').text();

    $.ajax({
        url: window.location.href,
        dataType: 'json',
        method: 'post',
        data: {
            "commentContent": commentText,
            "date_created": new Date(),
            "user_id": 
        },

        success: () => {
            
        }
    })
})