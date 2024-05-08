import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './models/home/home.component';
import { PdfGeneratorComponent } from './components/pdf-generator/pdf-generator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'devis', component: PdfGeneratorComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
