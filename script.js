// Get users from localStorage safely
function getUsers() {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}


function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
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
  
    username,
    password,
    role
  };

  users.push(newUser);
  saveUsers(users);

  alert('Registration successful!');
}

// // Handle user login
// function loginUser() {

//   const username = document.getElementById('login-username').value.trim();
//   const password = document.getElementById('login-password').value;


//   const users = getUsers();

//   const user = users.find(u => u.username === username && u.password === password);


//   if (!user) {
//     alert('Incorrect username or password!');
//     return;
//   }

//   // Save logged in user in localStorage
//   localStorage.setItem('loggedInUser', JSON.stringify(user));

//   // Redirect to dashboard
//   window.location.href = 'dashboard.html';
// }

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
     window.location.href = 'adminDashboard.html';
    }
    else if(checkUser.role==='author'){
     window.location.href = 'authorDashboard.html';
    }

   

}
