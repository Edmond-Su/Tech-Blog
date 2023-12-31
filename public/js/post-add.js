const addButton = document.getElementById('add-post-button');
const formContainer = document.getElementById('post-form');


addButton.addEventListener('click', function() {
            addButton.style.display = 'none';
            formContainer.style.display = 'block';
        });

document.getElementById('post-form').addEventListener('submit', handleAddPosts);

//function is responsible for sending a fetch request to the back end about adding a post
async function handleAddPosts(event) {
    event.preventDefault();
    try {
        // Retrieve the values from the title and description inputs and store them in variables
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        // Check if title and description are not empty
        if (title !== '' && description !== '') {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            });
            // if response is ok reload page to display new post 
            if (response.ok) {
                window.location.reload();
                console.log('Status 200: Fetch was successful to the API');
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        } else {
            throw new Error('Title and description must not be empty');
        }
    } catch (error) {
        console.error(error);
    }
}