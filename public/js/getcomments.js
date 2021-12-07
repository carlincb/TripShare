$.ajax({
    url: window.location.href + 'api/comments',
    dataType: 'json',
    type: 'GET',

    success: function(result){
        console.log(result);
        result.forEach(comment => {
            $('.blog-block').each(function(){
                console.log($(this).parent().attr('blog-id'));
                if($(this).parent().attr('blog-id') == comment.postId){
                    $(this).append(comment.commentContent);
                }
            })
        });
    },

    error: function(){
        alert("Failed to load comments.");
    }
})