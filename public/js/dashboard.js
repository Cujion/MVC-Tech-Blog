// FUNCTION TO HANDLE CREATING A POST REQUEST
const createPost = async function (event) {
    event.preventDefault();

    const postTitleEl = document.querySelector('#post-title');
    const postBodyEl = document.querySelector('#post-content');

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitleEl.value,
            content: postBodyEl.value
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to post new blog');
    }
};
// EVENT LISTENER ON A SUBMIT BUTTON ON A FORM
document.querySelector('#create-a-post')
    .addEventListener('submit', createPost);