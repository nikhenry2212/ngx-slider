import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectModel } from './objeto.model';
import { ProductService } from './product.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });

  cadastro: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    AplicacaoInicial: new FormControl([Validators.required]),
    img: new FormControl('', [Validators.required])
  })
  objetoNovo: any = []

  constructor(private productService: ProductService) { }

  objeto: ObjectModel[] = []
  listNull = {
    title: "",
    AplicacaoInicial: "",
    img: "",
  }

  title = 'ngx-slider';
  stepValue: number[] = [1, 10, 100, 1000];
  value: number = 0;
  maxValue: number = 1000000000;
  options: Options = {
    floor: Math.sqrt(0.01),
    // floor: 0,
    ceil: this.maxValue,
    logScale: true,

    translate: (value: number,): string => {
      return '' + Math.round(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

  };

  cadastrar() {
    this.productService.create(this.cadastro.value).subscribe(() => {
      this.cadastro.setValue(this.listNull)
      this.cadastro.reset(this.listNull)
    })
  }


  getlist() {
    this.productService.read().subscribe(data => {
      this.objeto = data

    })
  }


  filter(event: any) {
    setTimeout(() => {
      let novoArray: ObjectModel[] = [];
      this.objetoNovo = this.objeto.map((x: ObjectModel) => {
        // console.log('log x',x);
        let progress;
        if (this.value < 1) {
          progress = 0
        } else {
          progress = this.value
        }
        if (x.AplicacaoInicial >= progress && x.AplicacaoInicial <= this.maxValue) {
          novoArray.push(x)
        }

      });
      this.objetoNovo = novoArray;
    }, 500)
    // console.log(this.objetoNovo);
    // console.log(this.objeto);
  }
  reset() {
    this.value = 0
    this.maxValue = 1000000000;
  }
  ngOnInit() {
    this.getlist()
    this.objetoNovo = this.objeto;

    // console.log('opções slider',this.options.scale)
    // console.log('opções slider',this.options.)
    // console.log(this.ticks)

  }
}
