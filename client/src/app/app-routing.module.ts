import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component:MemberListComponent,canActivate:[AuthGuard]},
      {path:'members/:id',component:MemberListComponent,canActivate:[AuthGuard]},
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent,canActivate:[AuthGuard]},
    ]
  },

  {path:'errors',component:TestErrorsComponent},

  {path:'not-found',component:NotFoundComponent},

  {path:'server-error',component:ServerErrorComponent},

  {path:'**',component:HomeComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
