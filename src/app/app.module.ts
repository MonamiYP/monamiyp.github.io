import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-basic-dist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { MarkdownModule } from 'ngx-markdown';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorkComponent } from './components/work/work.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

import { PlotSineComponent } from './interactive_plots/plot-sine/plot-sine.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    NavbarComponent,
    AboutComponent,
    ProjectsComponent,
    WorkComponent,
    FooterComponent,
    LoadingScreenComponent,
    PlotSineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PlotlyModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
