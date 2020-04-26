import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingBoardComponent } from './Components/LandingBoard/landing-board/landing-board.component';
import { NavigationComponent } from './Components/LandingBoard/navigation/navigation.component';
import { FooterComponent } from './Components/LandingBoard/footer/footer.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { MatInputModule } from '@angular/material/input';
import { ContactBoardComponent } from './Components/contact-board/contact-board.component';
import { BlogBoardComponent } from './Components/blog-board/blog-board.component';
import { ProductsBoardComponent } from './Components/products-board/products-board.component';
import { LoginComponent } from './Components/login/login.component';
import { ContentComponent } from './Components/content/content.component';
import { AlertComponent } from './Components/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContentListComponent } from './Components/content-list/content-list.component';
import { ContentDetailsComponent } from './Components/content-details/content-details.component';
import { ContentDetailProductComponent } from './Components/content-detail-product/content-detail-product.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material';
import { ContentDetailLandingComponent } from './Components/content-detail-landing/content-detail-landing.component';
import { ModalComponent } from './Components/modal/modal.component';
import { ContentDetailMaterialComponent } from './Components/content-detail-material/content-detail-material.component';
import { ContentDetailBlogComponent } from './Components/content-detail-blog/content-detail-blog.component';
import { ContentDetailReferenceComponent } from './Components/content-detail-reference/content-detail-reference.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingBoardComponent,
    NavigationComponent,
    FooterComponent,
    ContactBoardComponent,
    BlogBoardComponent,
    ProductsBoardComponent,
    LoginComponent,
    ContentComponent,
    AlertComponent,
    ContentListComponent,
    ContentDetailsComponent,
    ContentDetailProductComponent,
    ContentDetailLandingComponent,
    ModalComponent,
    ContentDetailMaterialComponent,
    ContentDetailBlogComponent,
    ContentDetailReferenceComponent,
    TimeAgoPipe,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    AnimateOnScrollModule.forRoot()
  ],
  exports: [
    TimeAgoPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
