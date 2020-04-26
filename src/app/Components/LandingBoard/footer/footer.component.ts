import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/Services/FooterService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  date: Date = new Date();
  show: boolean = true;

  constructor(private footerService: FooterService) {
    footerService.showFooter.subscribe(s => {
      this.show = s;
    })
  }

  ngOnInit() {
  }

}
