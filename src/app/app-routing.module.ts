import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { LibraryComponent } from './library/library.component';
import { SokoComponent } from './soko/soko.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component'
import { AuthguardGuard } from './authguard.guard';


const routes:Routes = [
  { path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent },
  {path: 'product', component: ProductsComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'soko' , component: SokoComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cart', component: CartComponent },
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]

// , canActivate: [AuthguardGuard] 

@NgModule({

  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
