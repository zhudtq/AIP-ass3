import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostUrlService {

  constructor() { }
  hostURL = 'http://localhost:3000';
}
