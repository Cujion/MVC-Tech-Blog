// FUNCTION TO HANDLE CREATING A POST REQUEST
const createPost = async function (event) {
    event.preventDefault();
    
    const notify = document.querySelector('#notify');
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
        notify.classList.remove('hidden')
    }
};
// EVENT LISTENER ON A SUBMIT BUTTON ON A FORM
document.querySelector('#create-a-post')
    .addEventListener('submit', createPost);