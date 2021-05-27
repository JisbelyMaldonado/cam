import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Arbitraje } from 'app/interfaces/arbitraje';
import { arbitro } from 'app/interfaces/arbitro';
import { Cuantia } from 'app/interfaces/cuantia';
import { Servicio } from 'app/interfaces/servicio';
import { Socio } from 'app/interfaces/socio';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from 'app/interfaces/user';
import { take } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { BlogService } from '../../services/blog/blog.service';
import { CalculatorService } from 'app/services/calculator.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mediacion } from "app/interfaces/mediacion";
import { Message } from 'app/interfaces/message';
import { NgForm } from '@angular/forms';
import { DateService } from 'app/services/date/date.service';
import { MessageService } from 'app/services/message/message.service';
declare var $: any;

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})

export class IndexComponent implements OnInit {
  public username: string;
  public cuantiaValue: number = null;
  public selectedValue: string = '';
  public selectedValueArb: string  = 'unico';
  public selectedCuantia: string  = '0';
  public selectedSocio: string  = '0';
  public total: number = 0;
  public user: Users;
  public arbitro: arbitro;
  public array: arbitro[];
  public message : Message;
  public show = false;
  public arrayPost: Array<Post>
  public servicio: Servicio[] = [
    {value: '0', viewValue: 'Arbitraje'},
    {value: '1', viewValue: 'Mediación'}
  ];
  arbitraje: Arbitraje[] = [
    { value: "unico", viewValue: "Árbitro Único" },
    { value: "tres", viewValue: "Tres Árbitros" },
  ];

  cuantia: Cuantia[] = [
    { value: "0", viewValue: "Cuantía determinada" },
    { value: "1", viewValue: "Cuantía indeterminada" },
  ];

  socio: Socio[] = [
    { value: "0", viewValue: "Soy socio" },
    { value: "1", viewValue: "No soy socio" },
  ];
  
  /***** test Jean Carlos */
  public isHome = true;
  public url = 'https://vazseguros-c7bbe.firebaseapp.com/api/v1/notification';
  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer d&q5PKGl8qlX4Z#@",
    }),
  };

  public selectServiceValue : string  = '0';
  constructor( private BlogService: BlogService, private db: AngularFirestore,
    private calcularService: CalculatorService,
    private route: Router,
    private http : HttpClient,
    private dateService: DateService,
    private messageService: MessageService)
  {}

  ngOnInit(): void {
    this.user = {};
    this.message = {}
    this.getPosts();
  }

   public async calculate() {
      if (this.selectServiceValue === '0' && this.selectedCuantia === '1') {
        this.getResultIndeterminate()
      } else {
        if (this.selectServiceValue == "0") {
          console.log("entra a arbitraje");
          this.calcularService
            .calcularArbitraje(
              this.cuantiaValue,
              this.selectServiceValue,
              this.selectedValueArb,
              this.selectedCuantia,
              this.selectedSocio
            ).pipe(take(1)).subscribe((arbitro: arbitro) => {
              var excedente: number;
              var fbasica: number;
              var rango_inicial: number;
              var calculo1: number;
              var calculo_valor_arb: number;
              var iva: number;
              var descuento: number;
              var subtotal: number;
  
              excedente = arbitro.arb_unico_exc;
              fbasica = arbitro.arb_unico_fbasica;
              rango_inicial = arbitro.arb_unico_rango;
  
              if (this.selectedValueArb == "unico") {
                if (this.selectedSocio == "1") {
                  calculo1 = (this.cuantiaValue - rango_inicial) * excedente;
                  calculo_valor_arb = calculo1 + fbasica;
                  iva = calculo_valor_arb * 0.12;
                  this.total = iva + calculo_valor_arb;
                } else {
                  calculo1 = (this.cuantiaValue - rango_inicial) * excedente;
                  calculo_valor_arb = calculo1 + fbasica;
                  descuento = calculo_valor_arb * 0.1;
                  subtotal = calculo_valor_arb - descuento;
                  iva = subtotal * 0.12;
                  this.total = iva + subtotal;
                }
              } else {
                if (this.selectedSocio == "1") {
                  calculo1 = (this.cuantiaValue - rango_inicial) * excedente;
                  calculo_valor_arb = (calculo1 + fbasica) * 1.05;
                  iva = calculo_valor_arb * 0.12;
                  this.total = iva + calculo_valor_arb;
                } else {
                  calculo1 = (this.cuantiaValue - rango_inicial) * excedente;
                  calculo_valor_arb = (calculo1 + fbasica) * 1.05;
                  descuento = calculo_valor_arb * 0.1;
                  subtotal = calculo_valor_arb - descuento;
                  iva = subtotal * 0.12;
                  this.total = iva + subtotal;
                }
              }
              console.log(this.total);
            });
        } else {
          console.log("Entra a mediacion");
  
          this.calcularService
            .calcularMediacion(
              this.cuantiaValue,
              this.selectServiceValue,

            ).pipe(take(1)).subscribe((mediacion: Mediacion) => {
              console.log(mediacion);
              
              if (this.selectedSocio == "1") {
  
                console.log("NO SOY SOCIO");
                var excedente: number;
                var fbasica: number;
                var rango_inicial: number;
                var calculo1: number;
                var calculo_valor_med: number;
  
                var iva: number;
                var descuento: number;
                var subtotal: number;
                var valor_hora: number = 50;
  
                excedente = mediacion.med_exc;
                fbasica = mediacion.med_fbasica;
                rango_inicial = mediacion.med_rango;
                console.log('excedente',excedente , 'fbasica', fbasica , 'rango_inicial', rango_inicial);

                calculo1 = ((this.cuantiaValue - rango_inicial) / valor_hora) * excedente;
                
                calculo_valor_med = (calculo1 + fbasica) * valor_hora;
                iva = calculo_valor_med * 0.12;
                this.total = calculo_valor_med + iva;
              } else if(this.selectedSocio == "0"){
  
                console.log("NO SOY SOCIO");
                var excedente: number;
                var fbasica: number;
                var rango_inicial: number;
                var calculo1: number;
                var calculo_valor_med: number;
  
                var iva: number;
                var descuento: number;
                var subtotal: number;
                var valor_hora: number = 50;
  
                excedente = mediacion.med_exc;
                fbasica = mediacion.med_fbasica;
                rango_inicial = mediacion.med_rango;
                console.log("SOY SOCIO");
              
                calculo1 = ((this.cuantiaValue - rango_inicial) / valor_hora) * excedente;
                calculo_valor_med = (calculo1 + fbasica) * valor_hora;
                descuento = calculo_valor_med*0.1
                subtotal = calculo_valor_med - descuento;
                iva = subtotal * 0.12;
                this.total = iva + subtotal;
                console.log(this.total);
              
              }
            });
        }
      }     
   }

   public getResultIndeterminate() {
    console.log(this.cuantiaValue,
      this.selectServiceValue,
      this.selectedValueArb,
      this.selectedCuantia,
      this.selectedSocio);
      if (this.selectedValueArb === 'unico') {
        if (this.selectedSocio === '0') {
          this.total = 1120
        } else {
          this.total = 1008
        }
      } else {
        if (this.selectedSocio === '0') {
          this.total = 1176
        } else {
          this.total = 1058.40
        }
      }

    
   }

   public selectService(e) {
    console.log(e.target.value);
    this.selectServiceValue = e.target.value;
    if (e.target.value == '1') {
       this.selectedCuantia = '0';
    }
    
   }

   public selectArbitration(e) {
    this.selectedValueArb = e.target.value;
   }
  /**
   * *** Funcion para validar e iniciar sesion ***
   * @param user
   * @param valid
   */
  public onLogin(user: Users, valid: boolean) {
    if (valid) {
      // this.authService.login(this.user.user_email, this.user.user_password);
      // var soap = require('soap');
      // var url = 'http://apl.vazseguros.com:8080/ServicioWeb/wsmovil?wsdl';
      // var args = {name: 'value'};
      // soap.createClientAsync(url).then((client) => {
      //   return client.MyFunctionAsync(args);
      // }).then((result) => {
      //   console.log(result);
      // });
    }
  }

  public getPosts() {
    this.BlogService.getPostByCategory().subscribe(posts => {
      this.arrayPost= posts;
      console.log(posts);
    })
  }
 
  public viewPost(post: Post) {
    this.route.navigate(['post/'+post.post_id])
  }

  public navigateSectionBlog(section: string) {
    setTimeout(function () {
      $("html, body").animate(
        {
          scrollTop: $(section).position().top,
        },
        500,
        function () { }
      );
    }, 1000);
  }
  public post() {
    console.log('Llama a metodo');
    
    let data = {
      "vin": 'JHSFDGRTEBSJSKAL',
    }
     this.http.post<any>(this.url, data, this.httpOptions).subscribe(test => {
       console.log(test);
       
     });
  }

  public sendMessage(message: Message, validate: boolean, form: NgForm) {
    if (validate) {
      message.message_date = this.dateService.getDateCurrent();
      message.message_id = new Date().getTime().toString();
      message.message_time = this.dateService.getTimeCurrent();
      this.messageService.saveMessage(message).then(() => {
        this.showNotification('bottom', 'center', 'Su mensaje ha sido enviado correctamente!', 'primary');
        form.resetForm()

      })
    }
  }

  public showNotification(from, align, msg, type) {
    $.notify({
      message: "<b>" + msg + "</b> "
    }, {
      type: type,
      class: 'notify',
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
