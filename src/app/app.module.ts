import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './customer/customer.component';
import { FormComponent } from './customer/form.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CustomerService } from './customer/customer.service';

const routes: Routes = [
  { path: '', redirectTo: '/customers/0', pathMatch: 'full' },
  { path: 'customers/:page', component: CustomerComponent },
  { path: 'customers/create/form', component: FormComponent },
  { path: 'customers/form/:id', component: FormComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerComponent,
    NotFoundComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration(),
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
