import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkComponent } from './components/work/work.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'post/:id', component:PostComponent},
  {path:'about', component:AboutComponent},
  {path:'projects', component:ProjectsComponent},
  {path:'work', component:WorkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
