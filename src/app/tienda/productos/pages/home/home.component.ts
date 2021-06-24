import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      padding: 15px;
    }  
  .spacerTitle {
    flex: .9 .9 auto;
  }
  .iconos {
    margin-left:0.8rem;
  }
  `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
