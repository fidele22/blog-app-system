let cachedUsers = null

function loadUsers(){
  if(!cachedUsers){
    const d = localStorage.getItem("users")
    cachedUsers = d ? JSON.parse(d) : []
  }
  return cachedUsers
}

function syncUsers(){
  localStorage.setItem("users",JSON.stringify(cachedUsers))
}

export function getUsersFromStorage(){
  return loadUsers()
}

export function saveUserToStorage(user){
  loadUsers()
  cachedUsers.push(user)
  syncUsers()
}

export function isUsernameTaken(name){
  return loadUsers().some(u=>u.username===name)
}

export function saveLoggedInUser(user){
  localStorage.setItem("loggedInUser",JSON.stringify(user))
}

export function getLoggedInUser(){
  return JSON.parse(localStorage.getItem("loggedInUser"))
}

export function logoutUser(){
  localStorage.removeItem("loggedInUser")
}
