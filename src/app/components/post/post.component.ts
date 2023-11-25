import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contentfulService:ContentfulService) { }

  blogPost$ : Observable<any> | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = params['id'];

        this.blogPost$ = this.contentfulService.getEntryById(id);
      }
    );
  }

  renderRichText(richText: Document | null | undefined) {
    if (richText === undefined || richText === null || richText.nodeType !== 'document') {
      return '<p>Error</p>';
    }
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node:any) => {
          if (node.data.target.fields.file.contentType == 'video/mp4' || node.data.target.fields.file.contentType == 'video/quicktime') {
            return `<div class="flex justify-center"><video playsinline autoplay muted loop class="w-96"><source src="${node.data.target.fields.file.url}" type="video/mp4"></video></div>`;
          }
          return `<div class="flex justify-center"><img class="w-96" src="${node.data.target.fields.file.url}"/></div>`;
        },
        [BLOCKS.PARAGRAPH]: (node:any, next:any) =>
        `<div class="mb-8 mt-1">${next(node.content)}</div>`,
        [INLINES.HYPERLINK]: (node:any) => {
          return `<a href="/${node.data.uri}" class="link">${node.content[0].value}</a>`;
        }
      },
    };

    return documentToHtmlString(richText, options);
  }
}
