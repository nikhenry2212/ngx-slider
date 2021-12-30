import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor() {
  
}
  objeto = [
    {AplicacaoInicial: '100000'},
    {AplicacaoInicial: '1'},
    {AplicacaoInicial: '200000000'},
    {AplicacaoInicial: '3000000000'},
    {AplicacaoInicial: '555555555'},
  ]
  title = 'ngx-slider';
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  ngOnInit(){

  }
}
