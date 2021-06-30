import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html',
  styles: [`
  mat-card{
    margin-top: 20px;
  }
  .derecha{
    text-align: end;
  }
  .center{
    text-align: center;
  }
  `
  ]
})
export class ProductoTarjetaComponent implements OnInit {

  @Input() producto:any;
  constructor() { }

  ngOnInit(): void {
  }

}
