import { NgxPaginationModule } from 'ngx-pagination';
import { FilterDataCityPipe } from './pipes/filter-data-city.pipe';
import { HiglightDirective } from './directives/higlight.directive';
import { FilterCityPipe } from './pipes/filter-city.pipe';
import { AppDialogConfirmComponent } from './components/app-dialog-confirm/app-dialog-confirm.component';
import { CitiesComponent } from './views/cities/cities.component';
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
import { LOCALE_ID, NgModule } from '@angular/core';

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
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from './components/app-button/app-button.component';

import {
  registerLocaleData,
  DatePipe,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
//import localeEn from '@angular/common/locales/en';
import localeIt from '@angular/common/locales/it';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AppSelectComponent } from './components/app-select/app-select.component';
import { FilterGenericPipe } from './pipes/filter-generic.pipe';
import { ContractsComponent } from './views/contracts/contracts.component';
import { RepairtypesComponent } from './views/repairtypes/repairtypes.component';
import { InterventionDetailComponent } from './views/intervention-detail/intervention-detail.component';
import { CustomerDetailComponent } from './views/customer-detail/customer-detail.component';
import { AppSearchComponent } from './components/app-search/app-search.component';
import { TdHComponent } from './components/td-h/td-h.component';
import { RepairerDayComponent } from './views/repairer-day/repairer-day.component';
import { AppSelectHttpComponent } from './components/app-select-http/app-select-http.component';
import { ConfigurationsComponent } from './views/configurations/configurations.component';
import { TimeslotsComponent } from './views/timeslots/timeslots.component';
import { FilterCustomersPipe } from './pipes/filter-customers.pipe';
import { CustomerFormModalComponent } from './components/customer-form-modal/customer-form-modal.component';
import { ProductFormModalComponent } from './components/product-form-modal/product-form-modal.component';

//registerLocaleData(localeEn, 'en-EN');
registerLocaleData(localeIt);

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
    CitiesComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    AppButtonComponent,
    AppHeaderPageComponent,
    AppContentPageComponent,
    AppMenuLinkComponent,
    AppDialogConfirmComponent,
    AppSelectComponent,
    AppSelectHttpComponent,
    UserDropdownMenuComponent,
    CamelCasePipe,
    FilterCityPipe,
    FilterGenericPipe,
    FilterDataCityPipe,
    ContractsComponent,
    RepairtypesComponent,
    InterventionDetailComponent,
    CustomerDetailComponent,
    AppSearchComponent,
    HiglightDirective,
    TdHComponent,
    RepairerDayComponent,
    AppSelectHttpComponent,
    ConfigurationsComponent,
    TimeslotsComponent,
    FilterCustomersPipe,
    CustomerFormModalComponent,
    ProductFormModalComponent
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
      preventDuplicates: true
    }),
    NgbModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    httpInterceptorProviders,
    CamelCasePipe,
    DatePipe,
    NgbActiveModal,
    FilterGenericPipe,
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
