const postId = document.querySelector('input[name="post-id"]').value;
console.log('POSTID', postId)

const updatePost = async function (event) {
    event.preventDefault();

    const postTitleEl = document.querySelector('input[name="post-title"]').value;
    const postBodyEl = document.querySelector('input[name="post-content"]').value;
    console.log('POSTTITLE', postTitleEl)
    console.log('POSTCONTENT', postBodyEl)

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitleEl,
            postBodyEl
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update blog post');
    }
};

    const deletePost = async function () {
        await fetch(`/api/post/${postId}`, {
            method: 'DELETE'
        })
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post');
        }
};

document.querySelector('#update-a-post')
    .addEventListener('submit', updatePost);

document.querySelector('#delete-post')
    .addEventListener('submit', deletePost)