import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });

  constructor() { }
  objeto = [
    { AplicacaoInicial: '100000', img: 'https://image.freepik.com/fotos-gratis/pessoas-torcendo-na-festa-de-ano-novo_23-2148724240.jpg' },
    { AplicacaoInicial: '1', img: "https://image.freepik.com/fotos-gratis/especialista-em-ti-verificando-o-codigo-no-computador-no-escritorio-escuro-a-noite_1098-18699.jpg" },
    { AplicacaoInicial: '200000000', img: "https://image.freepik.com/fotos-gratis/codificadores-de-ti-trabalhando-no-laptop-no-escritorio-em-pe-a-mesa_158595-5240.jpg" },
    { AplicacaoInicial: '3000000000', img: "https://image.freepik.com/fotos-gratis/conceito-de-graficos-de-conexao-de-tecnologia-da-informacao_53876-121040.jpg" },
    { AplicacaoInicial: '555555555', img: "https://image.freepik.com/fotos-gratis/tela-de-digitalizacao-de-programador-em-seu-smartwatch-com-camera-do-smartphone_1098-18710.jpg" },
  ]

  title = 'ngx-slider';
  minValue: number = 0;
  maxValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min :</b> $' + value;
        case LabelType.High:
          return '<b>Max :</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  filter(event: any) {
    this.objeto.map(event => console.log(event)
    )
  }

  ngOnInit() {
   
  }
}
