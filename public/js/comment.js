const addComment = async function (event) {
    event.preventDefault();

    const postContentEl = document.querySelector('#post-content');
    const postId = document.querySelector('input[name="post-id"]').value;

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment_content: postContentEl.value,
            post_id: postId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to add a new comment');
    }
};

document.querySelector('#post-comment')
    .addEventListener('submit', addComment);