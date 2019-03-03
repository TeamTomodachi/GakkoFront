import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {}

/*
* (03/03/2019)
* To clean up and fix. It works, but not 100% of the time. Also doesn't 
* take into account rotation (which might be fine). - Windjy
*/
window.onload = () => {
  let traiSect = document.getElementById("trainerSection");
  let achiSect = document.getElementById("achievementSection");
  let traiNav = document.getElementById("trainerNav");

  let bothParts = achiSect.offsetHeight + traiNav.offsetHeight;
  // The height of the usable space.
  let ionGridClientHeight = document.getElementsByTagName("ion-grid")[0].clientHeight;
  // Space remaining
  let leftOverSpace = 1 - (bothParts / ionGridClientHeight);
  // Set the trainer section to the leftOverSpace.
  let pct = ((1 - (bothParts / ionGridClientHeight))*100).toFixed(2) + "%";
  traiSect.style.height = pct;
}