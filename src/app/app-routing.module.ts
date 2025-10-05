import { RepairerDayComponent } from './views/repairer-day/repairer-day.component';
import { CustomerDetailComponent } from './views/customer-detail/customer-detail.component';
import { InterventionDetailComponent } from './views/intervention-detail/intervention-detail.component';
import { RepairtypesComponent } from './views/repairtypes/repairtypes.component';
import { ContractsComponent } from './views/contracts/contracts.component';
import { CitiesComponent } from './views/cities/cities.component';
import { CustomersComponent } from './views/customers/customers.component';
import { InterventionsComponent } from './views/interventions/interventions.component';

import { StatesComponent } from './views/states/states.component';
import { RepairersComponent } from './views/repairers/repairers.component';
import { ProductsComponent } from './views/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'contracts',
        component: ContractsComponent
      },
      {
        path: 'interventions',
        component: InterventionsComponent
      },
      {
        path: 'intervention/:id',
        component: InterventionDetailComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customer/:id',
        component: CustomerDetailComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'repairers',
        component: RepairersComponent
      },
      {
        path: 'repairer-day/:id',
        component: RepairerDayComponent
      },
      {
        path: 'states',
        component: StatesComponent
      },
      {
        path: 'repairtypes',
        component: RepairtypesComponent
      },
      {
        path: 'cities',
        component: CitiesComponent
      },
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
