const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

const updatePost = async function (event) {
    event.preventDefault();
    
    const postTitleEl = document.querySelector('#post-title');
    const postBodyEl = document.querySelector('#post-content');

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
    event.stopPropagation();
    const postId = document.querySelector('input[name="post-id"]').value;
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete blog post');
    }
}

document.querySelector('#mutate-a-post')
    .addEventListener('submit', updatePost);

document.querySelector('#delete-post')
    .addEventListener('click', deletePost)