import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
 
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { FlickrLoginService } from './service/flickr-login.service';
import { FlickrApiService } from './service/flickr-api.service';
import { FlickrOauthLoginCallbackComponent } from './component/flickr-oauth-login-callback/flickr-oauth-login-callback.component';
import { FlickrLoginComponent } from './component/flickr-login/flickr-login.component';
import { AlbumsListComponent } from './component/albums-list/albums-list.component';
import { NavigationTabsComponent } from './component/navigation-tabs/navigation-tabs.component';
import { PhotoListComponent } from './component/photo-list/photo-list.component';
import { PhotoInfoComponent } from './component/photo-info/photo-info.component';
import { HeaderComponent } from './component/header/header.component';
import { LogoutComponent } from './component/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    FlickrOauthLoginCallbackComponent,
    FlickrLoginComponent,
    AlbumsListComponent,
    NavigationTabsComponent,
    PhotoListComponent,
    PhotoInfoComponent,
    HeaderComponent,
    LogoutComponent
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
