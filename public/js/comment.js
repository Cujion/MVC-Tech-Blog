const commentFormHandler = async function (event) {
    event.preventDefault();

    const postContentEl = document.querySelector('#post-content');

    const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
            comment_content: postContentEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/homepage');
    } else {
        alert('Failed to add a new comment');
    }
};

document.querySelector('#add-comment')
    .addEventListener('submit', commentFormHandler);