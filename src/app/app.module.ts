import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingBoardComponent } from './Components/LandingBoard/landing-board/landing-board.component';
import { NavigationComponent } from './Components/LandingBoard/navigation/navigation.component';
import { FooterComponent } from './Components/LandingBoard/footer/footer.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import {MatInputModule} from '@angular/material/input';
import { ContactBoardComponent } from './Components/contact-board/contact-board.component';
import { BlogBoardComponent } from './Components/blog-board/blog-board.component';
import { ProductsBoardComponent } from './Components/products-board/products-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingBoardComponent,
    NavigationComponent,
    FooterComponent,
    ContactBoardComponent,
    BlogBoardComponent,
    ProductsBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    AnimateOnScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
