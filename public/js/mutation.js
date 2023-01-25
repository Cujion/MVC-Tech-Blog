const cardWrapper = document.querySelector('.card-wrapper');

const updatePost = async function () {
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
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

async function deletePost(e) {
    const postId = e.target.getAttribute('data-id');
    const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete blog post');
    }
};

cardWrapper.addEventListener('click', e=>{
    if(e.target.matches('#delete-post')){
        deletePost(e)
    }
    else if(e.target.matches('#update-post')){
        e.preventDefault();
        updatePost();
    }
})