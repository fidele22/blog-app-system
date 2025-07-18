import { isUsernameTaken } from './storage.js'

export class User {
  constructor(name,password,role){
    this.username = name
    this.password = password
    this.role = role
    this.id = null
  }

  validate(){
    if(!this.username || this.username.length<3) throw Error("Nom invalide")
    if(!this.password || this.password.length<6) throw Error("Mot de passe trop court")
    if(!["admin","author"].includes(this.role)) throw Error("Rôle inconnu")
    if(isUsernameTaken(this.username)) throw Error("Nom déjà pris")
    return this
  }

  generateId(){
    this.id = Date.now()+Math.floor(Math.random()*999)
    return this
  }

  toObject(){
    return {
      id:this.id,
      username:this.username,
      password:this.password,
      role:this.role
    }
  }
}
