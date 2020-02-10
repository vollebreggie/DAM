import { Component, HostListener, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing-board',
  templateUrl: './landing-board.component.html',
  styleUrls: ['./landing-board.component.css']
})
export class LandingBoardComponent implements OnInit {

  constructor(public el: ElementRef) {

  }

  landing: boolean = false;
  products: boolean = false;
  materials: boolean = false;
  contact: boolean = false;
  reference: boolean = false;
  private page: number = -1;

  ngOnInit() {
    const scrollPosition = window.pageYOffset;
    const newPage = Math.floor(scrollPosition / 829);

    if (this.page == newPage) {
      return;
    }

    this.page = newPage;
    switch (this.page) {
      case 0: {
        this.landing = true;
        this.products = false;
        break;
      }
      case 1: {
        this.landing = false
        this.products = true;
        this.materials = false;
        break;
      }
      case 2: {
        this.landing = false
        this.products = false;
        this.materials = true;
        this.reference = false;
        break;
      }
      case 3: {
        this.landing = false
        this.materials = false;
        this.reference = true;
        this.contact = false;
        break;
      }
      case 4: {
        this.landing = false
        this.reference = false;
        this.contact = true;
        break;
      }
    }
  }

  scroll(id) {
    let el = document.getElementById(id);
    const yOffset = -50; 
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    const scrollPosition = window.pageYOffset;
    const newPage = Math.floor((scrollPosition) / 839);

    if (this.page == newPage) {
      return;
    }

    this.page = newPage;
    switch (this.page) {
      case 0: {
        this.landing = true;
        this.products = false;
        break;
      }
      case 1: {
        this.landing = false
        this.products = true;
        this.materials = false;
        break;
      }
      case 2: {
        this.landing = false
        this.products = false;
        this.materials = true;
        this.reference = false;
        break;
      }
      case 3: {
        this.landing = false
        this.materials = false;
        this.reference = true;
        this.contact = false;
        break;
      }
      case 4: {
        this.landing = false
        this.reference = false;
        this.contact = true;
        break;
      }
    }

  }
}
