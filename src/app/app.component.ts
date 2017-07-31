import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private location: Location) {
  }

  public isHidden() {
    let list = ["/flickr-oauth-callback", ""];
    let route = this.location.path();
    
    for(let i = 0; i < list.length; i++) {
      if (route === list[i]) {

        return true;
      }
    }

    console.log(this.location.path());

    return false;
  }

}
