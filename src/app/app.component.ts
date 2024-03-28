import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { uuid } from 'uuidv4';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'slocx-video-cha';

  constructor(private router: Router) {
    this.createRoom();
  }

  createRoom() {
    console.log('createroom');
    // this.router.navigate([`/${uuid()}`]);
  }
}
