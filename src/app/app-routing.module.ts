import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingBoardComponent } from './Components/LandingBoard/landing-board/landing-board.component';
import { ContactBoardComponent } from './Components/contact-board/contact-board.component';
import { BlogBoardComponent } from './Components/blog-board/blog-board.component';
import { ProductsBoardComponent } from './Components/products-board/products-board.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Services/AuthGuardService';
import { ContentComponent } from './Components/content/content.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingBoardComponent },
  { path: 'contact', component: ContactBoardComponent },
  { path: 'blog', component: BlogBoardComponent },
  { path: 'products', component: ProductsBoardComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'content', component: ContentComponent , canActivate: [AuthGuard] },
  //{ path: '**', component: LandingBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
