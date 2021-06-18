import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  get token():string{
    return localStorage.getItem('token');
  }

  set token(token: string){
    localStorage.setItem('token', token);
  }

  get expiration(): number{
    const expirationStr = localStorage.getItem('expiration')
    return Number(expirationStr);
  }

  set expiration(expiration: number){
    localStorage.setItem('expiration', String(expiration));
  }

  /**
   * Verify if token is valid by inspecting the expiration time.
   * @return True if valid, false otherwise.
   */
  isValid(){
    const token = this.token;
    // If token not exists.
    if(!token) return false;
    // Get time in seconds
    const timestamp = new Date().getTime() / 1000;

    return timestamp > this.expiration;
  }
  /**
   * Remove token and expiration
   */
  removeToken(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }
}
