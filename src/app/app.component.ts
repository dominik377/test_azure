import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface SimpleObject {
  a: number;
  b: number;
  c: number;
  _id?: string; // MongoDB unique ID
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  simpleObject: SimpleObject = { a: 1, b: 1, c: 1 };
  objectsList: SimpleObject[] = [];
  selectedObjectId: string = '';
  serverUrl = 'http://localhost:3001';
  backendPingReceived = false;

  constructor(private http: HttpClient) {
    this.getObjects();
  }

  ngOnInit(): void {
    this.pingBackend();
  }

  createObject(): void {
    this.http.post(this.serverUrl + '/api/objects', this.simpleObject).subscribe(() => {
      this.getObjects();
    });
  }

  getObjects(): void {
    this.http.get<SimpleObject[]>(this.serverUrl + '/api/objects').subscribe(data => {
      this.objectsList = data;
    });
  }

  updateObject(): void {
    this.http.put(this.serverUrl + `/api/objects/${this.selectedObjectId}`, this.simpleObject).subscribe(() => {
      this.getObjects();
    });
  }

  deleteObject(id: string | undefined): void {
    if (!id) return;
    this.http.delete(this.serverUrl + `/api/objects/${id}`).subscribe(() => {
      this.getObjects();
    });
  }

  loadObject(id: string): void {
    this.http.get<SimpleObject>(this.serverUrl + `/api/objects/${id}`).subscribe(data => {
      this.simpleObject = data;
    });
  }

  pingBackend(): void {
    this.http.get(this.serverUrl + '/api/ping').subscribe(data => {
      this.backendPingReceived = true;
      console.log("Backend ping received!");
    });
  }
}
