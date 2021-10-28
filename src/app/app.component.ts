import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TvMaze';

  apiUrl: string = "http://api.tvmaze.com/shows/";

  isLoad: boolean = true;
  showName: string = "";
  showImg: string = "";
  listCast: any = [];
  showId?: number;

  constructor(private http: HttpClient) {};

  async loadShow(): Promise<void> {
    this.isLoad = true;

    if (this.showId) {
      await this.http.get<any>(`${this.apiUrl}${this.showId}`)
        .subscribe((data: any) => {
          this.showName = data.name;
          this.showId = data.id;
          this.showImg = data.image.medium;
        });

      await this.http.get<any[]>(`${this.apiUrl}${this.showId}/cast`)
        .subscribe((data: any) => {
          this.listCast = data;
        })
    }

    this.isLoad = false;
  }
}
