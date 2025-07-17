const titleInput = document.getElementById('title');
const contentInput = document.getElementById('my-text');
const imageInput = document.getElementById('image'); 
const authorInput = document.getElementById('author');
const btnSave = document.getElementById("btnSave");
const authPost = document.getElementById("auth-list");

let posts = [];

// Load posts on page load
window.addEventListener('load', () => {
  posts = JSON.parse(localStorage.getItem("posts")) || [];
  showNotes();
});

// Save post
btnSave.addEventListener('click', (e) => {
  e.preventDefault();

  const note = {
    id: Date.now(),
    title: titleInput.value || 'Untitled',
    image: imageInput.value,
    content: contentInput.value,
    author: authorInput.value || 'Anonymous',
    createdAt: new Date().toISOString()
  };

  posts.push(note);
  localStorage.setItem("posts", JSON.stringify(posts));

  // Clear inputs
  titleInput.value = '';
  contentInput.value = '';
  imageInput.value = '';
  // authorInput.value = '';

  showNotes();
});

// Show posts
function showNotes() {
  authPost.innerHTML = "";
 const user = getLoggedInUser(); 

  posts.forEach(note => {
    const noteContainer = document.createElement('div');
    const title = document.createElement('h3');
    const content = document.createElement('p');
    const author = document.createElement('p');
    const img = document.createElement('img');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const actions = document.createElement('div');

    title.innerText = note.title;
    content.innerText = note.content;
    author.innerText = `By: ${note.author}`;

    if (note.image) {
      img.src = note.image;
      img.alt = "Post Image";
      img.width = 200;
    }

    deleteBtn.innerText = 'Delete';
    editBtn.innerText = 'Edit';


    if (!user || user.username !== note.author) {
      deleteBtn.hidden = true;
      editBtn.hidden=true;
    }

    noteContainer.classList.add('note-container');
    actions.classList.add('actions');

    actions.appendChild(deleteBtn);
    actions.appendChild(editBtn);

    noteContainer.appendChild(title);
    noteContainer.appendChild(content);
    if (note.image) noteContainer.appendChild(img); 
    noteContainer.appendChild(author);
    noteContainer.appendChild(actions);

    authPost.appendChild(noteContainer);

    deleteBtn.addEventListener('click', () => {
      posts = posts.filter(post=> post.id !== note.id);
      localStorage.setItem('posts', JSON.stringify(posts));
      showNotes();
    });

    editBtn.addEventListener('click', () => {
      titleInput.value = note.title;
      contentInput.value = note.content;
      imageInput.value = note.image; 
      authorInput.value = note.author;

      posts = posts.filter(post=> post.id !== note.id);
      localStorage.setItem('posts', JSON.stringify(posts));
      showNotes();
    });
  });
}


// get user logged in

  function getLoggedInUser() {
    const userdata = localStorage.getItem('userLoggedIn');
    return userdata ? JSON.parse(userdata) : null; // Return single object, not array
  }

  // Set the author input value when the page loads
  window.onload = function () {
    const user = getLoggedInUser();
    if (user && user.username) {
      document.getElementById("author").value = user.username;
    }
  };

  
