var likeBtn = $('.like-btn');
var dislikeBtn = $('.dislike-btn');

likeBtn.click(function(){
    VariableDeclare($(this));
    var upvotes = true;
    var downvotes = false;
    console.log(likeSpot)
    console.log(blogId)

    $.get(window.location.href + 'api/upvotes', function(data){
        console.log(data);
        data.forEach(upvote => {
            if (upvote.user_id == $('nav label').attr('user-id') && upvote.blog_id == blogId) {
                statementExecuted = true;
                if (!upvote.upvotes && !upvote.downvotes) {
                    upvotes = true;
                    likeCount++;
                }
                else if (upvote.upvotes && !upvote.downvotes) {
                    upvotes = false;
                    likeCount--;
                }
                else if (!upvote.upvotes && upvote.downvotes) {
                    upvotes = true;
                    downvotes = false;
                    likeCount++;
                    dislikeCount--;
                }
                else {
                    console.log('There was an error');
                }
            }
        });

        existChecker(statementExecuted, upvotes, downvotes, blogId);
    });
});

dislikeBtn.click(function(){
    VariableDeclare($(this));
    var upvotes = false;
    var downvotes = true;

    $.get(window.location.href + 'api/upvotes', function(data){
        console.log(data);
        data.forEach(upvote => {
            if (upvote.user_id == $('nav label').attr('user-id') && upvote.blog_id == blogId) {
                statementExecuted = true;
                if (!upvote.upvotes && !upvote.downvotes) {
                    downvotes = true;
                    dislikeCount++;
                }
                else if (upvote.upvotes && !upvote.downvotes) {
                    upvotes = false;
                    downvotes = true;
                    likeCount--;
                    dislikeCount++;
                }
                else if (!upvote.upvotes && upvote.downvotes) {
                    var downvotes = false;
                    dislikeCount--;
                }
                else {
                    console.log('There was an error');
                }
            }
        });

        existChecker(statementExecuted, upvotes, downvotes, blogId);
    })
});

function existChecker(statementExecuted, upvotes, downvotes, blogId) {
    if(!statementExecuted){
        $.post(window.location.href + 'api/upvotes', 
        {
            "upvotes": upvotes,
            "downvotes": downvotes,
            "user_id": parseInt($('nav label').attr('user-id')),
            "post_id": blogId
        }, 
        function(){
            console.log("vote added");
        });
    }
    else {
        $.put()
    }
}

function VariableDeclare(currentEl) {
    likeSpot = currentEl.siblings('.likecount').text()
    likeCount = parseInt(likeSpot);
    dislikeSpot = currentEl.siblings('.dislikecount').text();
    dislikeCount = parseInt(dislikeSpot);
    blogId = currentEl.parents('.blog').attr('blog-id');
    statementExecuted = false;
}