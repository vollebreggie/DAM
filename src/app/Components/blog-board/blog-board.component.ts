import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Models/Blog';
import { environment } from 'src/environments/environment';
import { Landing } from 'src/app/Models/Landing';
import { DAMService } from 'src/app/Services/DAMService';

@Component({
  selector: 'blog-board',
  templateUrl: './blog-board.component.html',
  styleUrls: ['./blog-board.component.css']
})
export class BlogBoardComponent implements OnInit {

  blogs: Blog[];
  imageUrl: string = environment.apiUrl + "images/";
  landing: Landing;
  
  constructor(private damService: DAMService) {
    this.damService.getBlogs().subscribe(response => this.blogs = response.data);
    this.damService.getLanding().subscribe(response => this.landing = response.data);
  }
  ngOnInit(): void {
  }


}
