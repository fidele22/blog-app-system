// Get users from localStorage safely
function getUsers() {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}


function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function generateId(){
    return Date.now().toString();
}
// Register a new user
function registerUser() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('user-role').value;

  const users = getUsers();

  // Check if the username already exists
  const checkUser = users.find(user => user.username === username);
  if (checkUser) {
    alert('Username already exists! Choose another one.');
    return;
  }

  
  const newUser = {
    id:generateId(),
    username,
    password,
    role
  };

  users.push(newUser);
  saveUsers(users);
  alert('Registration successful!');

  username.value ='';
  password.value='';

  window.location.href="login.html"
  
 
}

// // Handle user login

function loginUser(){

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const users = getUsers();

    const checkUser = users.find(user => user.username === username && user.password===password);
    

    if(!checkUser){
        alert('incorrect username or password')
        return;
    }

    localStorage.setItem('userLoggedIn',JSON.stringify(checkUser));

    if(checkUser.role==='admin'){
     window.location.href = './adminUser/adminDashboard.html';
    }
    else if(checkUser.role==='author'){
     window.location.href = './authontication/auth.html';
    }

   

}

// fetching the data and render it to admin dashboard

const userData = getUsers();
const usernames = userData.map(user => `Username: ${user.username} - Role: ${user.role}`).join("<br>");
document.getElementById("data").innerHTML = usernames;

//logout 


