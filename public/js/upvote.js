var likeBtn = $('.like-btn');
var dislikeBtn = $('.dislike-btn');

//Adds or removes a like when clicked
likeBtn.click(function(){
    VariableDeclare($(this));
    var upvotes = true;
    var downvotes = false;
    console.log(likeSpot)
    console.log(blogId)

    $.get(window.location.href + 'api/upvotes', function(data){
        console.log(data);
        data.forEach(upvote => {
            if (upvote.user_id === parseInt($('nav label').attr('user-id')) && upvote.post_id === parseInt(blogId)) {
                upvoteId = upvote.id;
                statementExecuted = true;
                if (!upvote.upvotes && !upvote.downvotes) {
                    console.log('1')
                    downvotes = false;
                    upvotes = true;
                    likeCount++;
                }
                else if (upvote.upvotes && !upvote.downvotes) {
                    console.log('2')
                    downvotes = false; 
                    upvotes = false;
                    likeCount--;
                }
                else if (!upvote.upvotes && upvote.downvotes) {
                    console.log('3')
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

//Adds or removes a dislike when clicked
dislikeBtn.click(function(){
    VariableDeclare($(this));
    var upvotes = false;
    var downvotes = true;
    console.log(statementExecuted);

    $.get(window.location.href + 'api/upvotes', function(data){
        console.log(data);
        data.forEach(upvote => {
            if (upvote.user_id === parseInt($('nav label').attr('user-id')) && upvote.post_id === parseInt(blogId)) {
                upvoteId = upvote.id;
                statementExecuted = true;
                if (!upvote.upvotes && !upvote.downvotes) {
                    console.log('1')
                    upvotes = false;
                    downvotes = true;
                    dislikeCount++;
                }
                else if (upvote.upvotes && !upvote.downvotes) {
                    console.log('2')
                    upvotes = false;
                    downvotes = true;
                    likeCount--;
                    dislikeCount++;
                }
                else if (!upvote.upvotes && upvote.downvotes) {
                    console.log('3')
                    downvotes = false;
                    upvotes = false;
                    dislikeCount--;
                }
                else {
                    console.log('There was an error');
                }
            }
        });
        console.log(statementExecuted)
        existChecker(statementExecuted, upvotes, downvotes, blogId);
    })
});

//Function that checks for the existance of already existing user upvote data then makes the appropriate request
function existChecker(statementExecuted, upvotes, downvotes, blogId) {
    if(!statementExecuted){
        upvotes ? likeCount++ : dislikeCount++;
        console.log('post running');
        console.log(`downvotes: ${downvotes} upvotes: ${upvotes}`)
        $.post(window.location.href + 'api/upvotes', 
        {
            "upvotes": upvotes,
            "downvotes": downvotes,
            "user_id": parseInt($('nav label').attr('user-id')),
            "post_id": blogId
        }, 
        function(){
            console.log("vote added");
            dislikeSpot.text(dislikeCount);
            likeSpot.text(likeCount);
        });
    }
    else {
        console.log('put running');
        console.log(`downvotes: ${downvotes} upvotes: ${upvotes}`)
        $.ajax({
            url: window.location.href + 'api/upvotes/' + upvoteId,
            type: 'PUT',
            dataType: 'json',
            data: {
                "upvotes": upvotes,
                "downvotes": downvotes,
            },
            success: function(){
                dislikeSpot.text(dislikeCount);
                likeSpot.text(likeCount);
                console.log("upvoteId: ", upvoteId);
            }
        })
    }
}

//Function for declaring variables that are used in both
function VariableDeclare(currentEl) {
    likeSpot = currentEl.siblings('.likecount');
    likeCount = parseInt(likeSpot.text());
    dislikeSpot = currentEl.siblings('.dislikecount');
    dislikeCount = parseInt(dislikeSpot.text());
    blogId = currentEl.parents('.blog').attr('blog-id');
    statementExecuted = false;
}