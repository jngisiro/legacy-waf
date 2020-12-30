import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mymap',
  templateUrl: './mymap.component.html',
  styleUrls: ['./mymap.component.css']
})
export class MymapComponent implements OnInit {

  lat = 28.704060;
  long = 77.102493;
  googleMapType = 'satellite';

  
  constructor() { }

  ngOnInit(): void {
  }

}
