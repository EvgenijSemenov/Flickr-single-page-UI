import { Data } from '@angular/router';
import { PrimaryPhotoExtras } from '../model/primary-photo-extras';
import { Content } from '../model/content';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FlickrApiService } from '../flickr-api.service';
import { Photoset } from '../model/photoset';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  constructor() { }
  private userId: string = "";
  private fullName: string = "";
  private photosetList: Photoset[] = [];
  private photosetsTotal: number = 0;
  private photosetPerPage: number = 10;

  ngOnInit() {
  }

}
