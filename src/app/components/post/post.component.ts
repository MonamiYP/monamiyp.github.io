import { Component, OnInit, ComponentRef, ViewChild, ViewContainerRef, ElementRef, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/services/contentful.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';

import { PlotSineComponent } from 'src/app/interactive_plots/plot-sine/plot-sine.component';
const componentMap: { [key: string]: Type<any> } = {
  PlotSineComponent,
};

declare var MathJax: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('postContentContainer', { static: false }) postContentRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private contentfulService:ContentfulService,
    private vcr: ViewContainerRef) { }

  private rendered = false;
  blogPost$ : Observable<any> | undefined;

  ngAfterViewChecked(): void {
    if (this.postContentRef && !this.rendered) {
      this.rendered = true;
      setTimeout(() => this.drawGraphs(), 0);
      this.displayLatexMaths();
    }
  }

  displayLatexMaths() {
    if (typeof MathJax !== 'undefined' && this.postContentRef) {
      MathJax.typesetPromise([this.postContentRef.nativeElement])
      .catch((err: any) => console.error('MathJax typeset failed: ', err));
    }
  }

  toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  }

  drawGraphs() {
    const container = this.postContentRef.nativeElement as HTMLElement;
    const placeholders = container.querySelectorAll('.graph-placeholder');

    placeholders.forEach((element: Element) => {
      const graphTitle = Array.from(element.classList).find(cls => cls.startsWith('plot-'));
      if (!graphTitle) return;
      const baseName = graphTitle.replace('plot-', '');
      const componentName = `Plot${this.toPascalCase(baseName)}Component`;

      const component = componentMap[componentName];
      if (component) {
        const componentRef: ComponentRef<any> = this.vcr.createComponent(component);
        element.replaceWith(componentRef.location.nativeElement);
      } else {
        console.warn(`Component not found for: ${componentName}`);
      }
    });
  }

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

        [BLOCKS.QUOTE]: (node:any) => { // Quotes are for drawing figures, title is figure name
          const graphTitle = node.content?.[0]?.content?.[0]?.value?.trim() || '';
          return `<div class="graph-placeholder ${graphTitle}"></div>`;
        },

        [BLOCKS.PARAGRAPH]: (node:any, next:any) => {
          const rawHtml = next(node.content);
          return `<div class="mb-8 mt-1">${rawHtml}</div>`;
        },

        [INLINES.HYPERLINK]: (node:any) => {
          return `<a href="/${node.data.uri}" class="link">${node.content[0].value}</a>`;
        }
      },
    };

    return documentToHtmlString(richText, options);
  }
}
