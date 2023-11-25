import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  constructor(private contentfulService: ContentfulService) {

  }

  blogPosts$ : Observable<any> | undefined;

  ngOnInit(): void {
    this.blogPosts$ = this.contentfulService.getWorkEntries();
  }
}
