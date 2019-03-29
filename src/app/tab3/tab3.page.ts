import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  middle = 'Map center';
  constructor() {
    this.setstuff = this.setstuff.bind(this);
  }
  setstuff(a) {
    this.middle=a;
  }
}
