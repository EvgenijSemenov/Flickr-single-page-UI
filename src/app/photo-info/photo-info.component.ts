import { Size } from '../model/size';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../model/photo';

import { FlickrApiService } from '../flickr-api.service';

@Component({
  selector: 'app-photo-info',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.css']
})
export class PhotoInfoComponent implements OnInit {

  private photo: Photo;
  private photoSize: Size;
  private photoOriginalSize: Size;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private apiService: FlickrApiService
  ) { }
  ngOnInit() {
  private returnToAlbum() {
    this.activatedRoute.params.subscribe(params => {
      this.router.navigate(["album", params['photosetId']]);
    });
  }

}
