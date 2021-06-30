import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  span {
    cursor: pointer;
  }
  `
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
