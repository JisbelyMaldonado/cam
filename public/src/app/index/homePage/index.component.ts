import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Arbitraje } from "app/interfaces/arbitraje";
import { arbitro } from "app/interfaces/arbitro";
import { Cuantia } from "app/interfaces/cuantia";
import { Mediacion } from "app/interfaces/mediacion";
import { Servicio } from "app/interfaces/servicio";
import { Socio } from "app/interfaces/socio";
import { Users } from "app/interfaces/user";

import { CalculatorService } from "app/services/calculator.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  public username: string;
  public cuantiaValue: number = 0;
  public selectedValue: string = "";
  public selectedValueArb: string = "";
  public selectedCuantia: string = "";
  public selectedSocio: string = "";

  //Calculadora
  public total: number = 0;

  public user: Users;

  public arbitro: arbitro;
  public array: arbitro[];

  public servicio: Servicio[] = [
    { value: "0", viewValue: "Arbitraje" },
    { value: "1", viewValue: "Mediación" },
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

  constructor(public calcularService: CalculatorService) {}

  ngOnInit(): void {
    this.user = {};
  }

  async clickme() {
    if (this.selectedValue == "0") {
      console.log("entra a arbitraje");
      this.calcularService
        .calcularArbitraje(
          this.cuantiaValue,
          this.selectedValue,
          this.selectedValueArb,
          this.selectedCuantia,
          this.selectedSocio
        )
        .subscribe((arbitro: arbitro) => {
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
          this.selectedValue,
          this.selectedValueArb,
          this.selectedCuantia,
          this.selectedSocio
        )
        .subscribe((mediacion: Mediacion) => {
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
}
