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
  private getSizeForCurrentScreen(sizes: Size[]): Size {
    let size: Size = sizes[0];  
    for (let i = 1; i < sizes.length; i++) {
      if (sizes[i].width <= window.screen.width && sizes[i].height <= window.screen.height) {
        if (size.width < sizes[i].width && size.height < sizes[i].height) {
          size = sizes[i];
        }
      }
    }

    return size;
  }

  private getOriginalSize(sizes: Size[]): Size {
    let size: Size;  
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i].label == "Original") {
        size = sizes[i];
        break;
      }
    }

    return size;
  }

  private returnToAlbum() {
    this.activatedRoute.params.subscribe(params => {
      this.router.navigate(["album", params['photosetId']]);
    });
  }

}
