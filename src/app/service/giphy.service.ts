import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class GiphyService {
  private giphy_api_key = environment.giphy_api_key;
  private giphy_api_url = environment.giphy_api_url;
  constructor(private http: HttpClient) {}

  public getGiphyGif (searchterm) {
    return this.http.get(`${this.giphy_api_url}?api_key=${this.giphy_api_key}&s=${searchterm}`);
  }

}
