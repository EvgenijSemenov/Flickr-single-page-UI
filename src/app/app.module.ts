import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
 
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { FlickrLoginService } from './flickr-login.service';
import { FlickrApiService } from './flickr-api.service';
import { FlickrOauthLoginCallbackComponent } from './flickr-oauth-login-callback/flickr-oauth-login-callback.component';
import { FlickrLoginComponent } from './flickr-login/flickr-login.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoInfoComponent } from './photo-info/photo-info.component';

@NgModule({
  declarations: [
    AppComponent,
    FlickrOauthLoginCallbackComponent,
    FlickrLoginComponent,
    AlbumsListComponent,
    NavigationTabsComponent,
    PhotoListComponent,
    PhotoInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: FlickrLoginComponent
      },
      {
        path: 'flickr-oauth-callback',
        component: FlickrOauthLoginCallbackComponent
      },
      {
        path: 'albums',
        component: AlbumsListComponent
      },
      {
        path: 'album/:id',
        component: PhotoListComponent
      },
      {
        path: 'album/:photosetId/photo/:photoId',
        component: PhotoInfoComponent
      }
    ]),
    MomentModule,
    TooltipModule.forRoot()
  ],
  providers: [
    FlickrLoginService,
    FlickrApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
