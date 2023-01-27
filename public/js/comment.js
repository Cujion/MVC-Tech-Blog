const cardWrapper = document.querySelector('.card-wrapper');
// FUNCTION TO HANDLE ADDING COMMENTS
const addComment = async function (event) {
    event.preventDefault();
    
    const notify = document.querySelector('#notify');
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const postContentEl = document.querySelector('#post-content');

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment_content: postContentEl.value,
            post_id: postId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        notify.classList.remove('hidden')
    }
};
// EVENT LISTENER FOR CLICK THAT MATCHES POST-COMMENT BUTTON
cardWrapper.addEventListener('click', e => {
    if(e.target.matches('#post-comment')){
        addComment(e);
    }
});