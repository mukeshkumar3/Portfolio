import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CustomEventService {

  constructor() { }

  dispatchEvent(name: string, body: any) {
    document.dispatchEvent(new CustomEvent(name, { detail: body }));
  }

  subscribeEvent(name: string, handler: any) {
    document.addEventListener(name, handler);
  }

  unsubscribeEvent(name: string, handlerReference: any) {
    document.removeEventListener(name, handlerReference);
  }
}
