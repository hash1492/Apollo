import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VideoService {

  constructor(private http: HttpClient) { }

  getVideos(pageToken) {
    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbn1OgGei-DV7aSRo_HaAiw&key=AIzaSyA8OHCyYSR7aFsJXsna7TumltQ0v56rUWU&maxResults=10&order=date';
    if(pageToken) {
      url += '&pageToken=' + pageToken;
    }
    return this.http.get(url)
  }
}
