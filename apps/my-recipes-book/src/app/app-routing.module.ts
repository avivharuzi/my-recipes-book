import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const roots: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(roots)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
