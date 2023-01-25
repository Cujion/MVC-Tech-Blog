const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

const updatePost = async function (event) {
    event.preventDefault();

    const postTitleEl = document.querySelector('input[name="post-title"]');
    const postBodyEl = document.querySelector('input[name="post-content"]');

    const response = await fetch(`/api/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: postTitleEl.value,
            content: postBodyEl.value
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update blog post');
    }
};

async function deletePost(event) {
    event.preventDefault();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to delete');
    }
}

document.querySelector('#update-post')
    .addEventListener('submit', updatePost);

document.querySelector('#delete-post')
    .addEventListener('submit', deletePost)