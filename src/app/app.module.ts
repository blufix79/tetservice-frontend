import { CustomersComponent } from './views/customers/customers.component';
import { InterventionsComponent } from './views/interventions/interventions.component';
import { StatesComponent } from './views/states/states.component';
import { RepairersComponent } from './views/repairers/repairers.component';
import { ProductsComponent } from './views/products/products.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { AppMenuLinkComponent } from './components/app-menu-link/app-menu-link.component';
import { AppContentPageComponent } from './components/app-content-page/app-content-page.component';
import { AppHeaderPageComponent } from './components/app-header-page/app-header-page.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from './views/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './components/app-button/app-button.component';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { TranslationsFilterPipe } from './views/translations/translations-filter.pipe';
import { GroupsFilterPipe } from './views/translations/groups-filter.pipe';


registerLocaleData(localeEn, 'en-EN');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    InterventionsComponent,
    CustomersComponent,
    ProductsComponent,
    RepairersComponent,
    StatesComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    AppButtonComponent,
    AppHeaderPageComponent,
    AppContentPageComponent,
    AppMenuLinkComponent,
    UserDropdownMenuComponent,
    TranslationsFilterPipe,
    GroupsFilterPipe,
    CamelCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders,
    CamelCasePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
