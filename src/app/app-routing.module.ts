import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  { path: 'cards', component: CardsComponent },
  { path: 'world', component: DataTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
