import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { PreventTouchDirective } from './directives/prevent-touch.directive';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product-types', component: ProductTypeComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductTypeComponent,
    ButtonComponent,
    ModalComponent,
    PreventTouchDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }