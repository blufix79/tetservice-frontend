import { Backend } from './../models/backend.model';
import { BackendConfig } from '../models/backendConfig.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  _backendConfig: BackendConfig;
  _backend: Backend;

  constructor() {
    this._backendConfig = new BackendConfig();
    this._backend.url = this._backendConfig.prodUrl;
    this._backend.productionMode = true;
  }

  getUrl(): string {
    return this._backend.url;
  }
  setUrl() {
    this._backend.url;
  }
}
