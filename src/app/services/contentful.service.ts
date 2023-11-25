import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }

  private client = createClient({
    space: environment.spaceId,
    accessToken: environment.accessToken
  });

  getAllEntries() {
    const promise = this.client.getEntries();
    return from(promise);
  }

  getProjectEntries() {
    const promise = this.client.getEntries({content_type:environment.contentTypeIds.projects});
    return from(promise);
  }

  getWorkEntries() {
    const promise = this.client.getEntries({content_type:environment.contentTypeIds.workExperience});
    return from(promise);
  }

  getEntryById(id: string) {
    const promise = this.client.getEntry(id);
    return from(promise);
  }
}
