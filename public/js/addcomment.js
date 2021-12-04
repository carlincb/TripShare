$('.comment-btn').click(() => {
    var commentText = $(this).siblings('textarea').text();

    $.ajax({
        url: window.location.href + '/comments',
        dataType: 'json',
        type: 'POST',
        data: commentText,
        

        success: () => {
            console.log("Comment sent successfully");
        }
    });
})