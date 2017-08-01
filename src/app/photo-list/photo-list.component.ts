import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photoset } from '../model/photoset';
import { Photo } from '../model/photo';
import { FlickrApiService } from '../flickr-api.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  private photoset: Photoset;
  private photoPerPage: number = 18;
  private photos: Photo[];

  constructor(private activatedRoute : ActivatedRoute, private apiService: FlickrApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
       this.photosetId = params['id']; 
       this.loadPhotos();
    });
  }

  private loadPhotos() {
    let page: number = 1;
    if (this.photos.length > 0) {
      page = this.photos.length / this.photoPerPage + 1;
    }

    this.apiService.getPhotosByPhotosetId(localStorage.getItem("id"), this.photosetId, page, this.photoPerPage)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        console.log(this.photos);
      });
  }

  private isShowMoreButtonHidden(): boolean {
    let result: boolean = true;
    if (this.photoset && this.photos) {
      if (this.photos.length < this.photoset.photos) {
        result = false;
      }
    }

    return result;
  }

}
