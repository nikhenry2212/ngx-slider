import { Component, Input, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectModel } from './objeto.model';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbActiveModal]
})
export class AppComponent implements OnInit {

  @Input() name:any;
  product: any = { id: '' };


  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private modalService: NgbModal
    ) { }

  cadastro: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    AplicacaoInicial: new FormControl([Validators.required]),
    img: new FormControl('', [Validators.required])
  })

  objetoNovo: any = []
  alertSuccess = false;
  alertErro = false;
  msgErro = ''
  openModal = false;

  objeto: ObjectModel[] = []
  listNull = {
    title: "",
    AplicacaoInicial: "",
    img: "",
  }
  produto!: any;

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
  open() {
    this.openModal=true;
    const modalRef = this.modalService.open(this.openModal);
    modalRef.componentInstance.name = 'World';
  }
  modalEdit(){
    this.openModal=true;
    console.log('aqui');
    
  }

  cadastrar() {
    this.productService.create(this.cadastro.value).subscribe((res) => {
      console.log(res);

      this.alertSuccess = true;
      setTimeout(() => {
        this.alertSuccess = false;
      }, 3000)
      this.cadastro.setValue(this.listNull)
      this.cadastro.reset(this.listNull);
      location.reload();
      // this.router.navigate(['/products'])

    }, _erro => {
      this.alertErro = true
      setTimeout(() => {
        this.alertErro = false;
      }, 3000)
      this.cadastro.setValue(this.listNull)
      this.cadastro.reset(this.listNull);
      // this.router.navigate(['/products'])

    });

  }

  excluir() {
      debugger
    const id:any = this.pegandoId(this.objetoNovo.id)
    this.productService.delete(id).subscribe(data => {
      
    }, error => {
      debugger
      this.msgErro = error
      this.alertErro = true;
      setTimeout(() => {
        this.alertErro = false;

      }, 3000)
    })
  }

  pegandoId(id:any){
    this.route.snapshot.paramMap.get(id);
    console.log(id);

    this.productService.readById(id).subscribe(product => {
    this.produto = product.id;
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
    this.getlist(); 
    // const id:any = this.route.snapshot.paramMap.get('id')
    // this.productService.readById(id).subscribe(product => {
    // this.product = product;
    // })
    // console.log(this.pegandoId());
    console.log(this.objetoNovo);

    this.objetoNovo = this.objeto;

  }
}
