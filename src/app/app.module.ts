import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Renderer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FlickrLoginService } from './flickr-login.service';
import { FlickrOauthLoginCallbackComponent } from './flickr-oauth-login-callback/flickr-oauth-login-callback.component';
import { FlickrLoginComponent } from './flickr-login/flickr-login.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FlickrOauthLoginCallbackComponent,
    FlickrLoginComponent,
    AlbumsListComponent
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
        path: 'album-list',
        component: AlbumsListComponent
      }
    ])
  ],
  providers: [FlickrLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
