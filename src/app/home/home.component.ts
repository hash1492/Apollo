import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video/video.service';
import { log } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  videos: any = [];
  nextPageToken = '';
  previousPageToken = '';
  totalResults;
  resultsPerPage;

  handleResponse(data) {
    this.videos = data.items;
    this.nextPageToken = data.nextPageToken;
    this.previousPageToken = data.prevPageToken;
    this.totalResults = data.pageInfo.totalResults;
    this.resultsPerPage = data.pageInfo.resultsPerPage;
  }

  ngOnInit() {
    this.videoService.getVideos('')
    .subscribe(data => {
      console.log(data);
      this.handleResponse(data);
    }, err => {
      console.log(err);
    });
  }

  getMoreVideos(pageToken) {
    this.videoService.getVideos(pageToken)
    .subscribe(data => {
      console.log(data);
      this.handleResponse(data);
    }, err => {
      console.log(err);
    });
  }
}
