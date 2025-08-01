import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private contentfulService: ContentfulService) {

  }

  blogPosts$ : Observable<any> | undefined;

  ngOnInit(): void {
    this.blogPosts$ = this.contentfulService.getProjectEntries().pipe(
    map((response) => {
      const items = response.items || [];

      // Optional: sort newest to oldest by createdAt
      const sorted = items.sort((a: any, b: any) => {
        return new Date(b.sys.createdAt).getTime() - new Date(a.sys.createdAt).getTime();
      });

      // Take the first 3 only
      return { ...response, items: sorted.slice(0, 3) };
    })
  );
  }
}
