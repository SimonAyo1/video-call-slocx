import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { uuid } from 'uuidv4';

// declare var isMuted: boolean;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'slocx-video-cha';
  localVideoActive: boolean = false;
  inCall: boolean = false;

  constructor(private router: Router) {
    this.createRoom();
    // console.log(isMuted, 'isMuted')
  }

  closeTab(): void {
    window.self.close();
  }

  createRoom() {
    console.log('createroom');
    // this.router.navigate([`/${uuid()}`]);
  }
}
