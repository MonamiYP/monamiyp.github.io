import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(private contentfulService: ContentfulService) {

  }

  blogPosts$ : Observable<any> | undefined;

  ngOnInit(): void {
    this.blogPosts$ = this.contentfulService.getProjectEntries();
  }
}
