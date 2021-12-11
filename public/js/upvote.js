var likeBtn = $('.like-btn');
var dislikeBtn = $('.dislike-btn');

likeBtn.click(function(){
    VariableDeclare($(this))
    console.log(likeSpot)
    console.log(blogId)

    $.get(window.location.href + 'api/upvotes', function(data){
        console.log(data);
        data.forEach(upvote => {
            if (upvote.user_id == $('nav label').attr('user-id') && upvote.blog_id == blogId) {
                statementExecuted = true;
                if (!upvote.upvotes && !upvote.downvotes) {
                    upvote.upvotes = true;
                    likeCount++;
                }
                else if (upvote.upvotes && !upvote.downvotes) {
                    upvote.upvotes = false;
                    likeCount--;
                }
                else if (!upvote.upvotes && upvote.downvotes) {
                    upvote.upvotes = true;
                    upvote.downvotes = false;
                    likeCount++;
                    dislikeCount--;
                }
                else {
                    console.log('There was an error');
                }
            }
        });

        existChecker(statementExecuted);
    });
});

dislikeBtn.click(function(){
    VariableDeclare($(this));

    $.get(window.location.href + 'api/upvotes', function(data){
        console.log(data);
        data.forEach(upvote => {
            if (upvote.user_id == $('nav label').attr('user-id') && upvote.blog_id == blogId) {
                statementExecuted = true;
                if (!upvote.upvotes && !upvote.downvotes) {
                    upvote.downvotes = true;
                    dislikeCount++;
                }
                else if (upvote.upvotes && !upvote.downvotes) {
                    upvote.upvotes = false;
                    upvote.downvotes = true;
                    likeCount--;
                    dislikeCount++;
                }
                else if (!upvote.upvotes && upvote.downvotes) {
                    upvote.downvotes = false;
                    dislikeCount--;
                }
                else {
                    console.log('There was an error');
                }
            }
        });

        existChecker(statementExecuted);
    })
});

function existChecker(statementExecuted) {
    if(!statementExecuted){
        $.post(window.location.href + 'api/upvotes', function(){
            
        });
    }
    else {

    }
}

function VariableDeclare(currentEl) {
    likeSpot = currentEl.siblings('.likecount').text()
    likeCount = parseInt(likeSpot);
    dislikeSpot = currentEl.siblings('.dislikecount').text();
    dislikeCount = parseInt(dislikeSpot);
    blogId = currentEl.parents('.blog').attr('blog-id');
}