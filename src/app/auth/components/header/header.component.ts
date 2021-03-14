import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuActive = false;
  constructor() { }

  ngOnInit(): void {

  }
  onClickMenu(){
    this.menuActive = !this.menuActive;
    let navbarMenu = document.querySelector('.navbar-menu');
    if(this.menuActive){
      navbarMenu.classList.add('show');
      navbarMenu.classList.remove('hidden');
    }else{      
      navbarMenu.classList.add('hidden');
      navbarMenu.classList.remove('show');
    }
  }

  closeMenu(){
    let navbarMenu = document.querySelector('.navbar-menu');
    navbarMenu.classList.add('hidden');
    navbarMenu.classList.remove('show');
    this.menuActive = false;
  }
}
