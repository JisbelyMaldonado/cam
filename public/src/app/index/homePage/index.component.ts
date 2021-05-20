import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Arbitraje } from 'app/interfaces/arbitraje';
import { arbitro } from 'app/interfaces/arbitro';
import { Cuantia } from 'app/interfaces/cuantia';
import { Servicio } from 'app/interfaces/servicio';
import { Socio } from 'app/interfaces/socio';
import { Users } from 'app/interfaces/user';


import { CalculatorService } from 'app/services/calculator.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit {
  public username: string;
  public cuantiaValue: number = 0;
  public selectedValue: string = '';
  public selectedValueArb: string  = '';
  public selectedCuantia: string  = '';
  public selectedSocio: string  = '';


  public user: Users;
  public arbitro: arbitro;


  servicio: Servicio[] = [
    {value: '0', viewValue: 'Arbitraje'},
    {value: '1', viewValue: 'Mediación'}
  ];
  arbitraje: Arbitraje[] = [
    {value: 'unico', viewValue: 'Árbitro Único'},
    {value: 'tres', viewValue: 'Tres Árbitros'}
  ];

  cuantia: Cuantia[] = [
    {value: '0', viewValue: 'Cuantía determinada'},
    {value: '1', viewValue: 'Cuantía indeterminada'}
  ];

  socio: Socio[] = [
    {value: '0', viewValue: 'Soy socio'},
    {value: '1', viewValue: 'No soy socio'}
  ];
  


  constructor(public calcularService: CalculatorService)
  {
  }


  ngOnInit(): void {
    this.user = {};
  }




  async clickme() {
  this.calcularService.calcular( this.cuantiaValue,
      this.selectedValue,
      this.selectedValueArb,
      this.selectedCuantia,
      this.selectedSocio,
    ).subscribe((value)=>{
      console.log(value)

    })
    
 
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
