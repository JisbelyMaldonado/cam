import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Arbitraje, Cuantia, Servicio, Socio, Users } from 'app/interfaces/user';
import { CalculatorService } from 'app/services/calculator.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit {
  public username: string = '';
  public cuantiaValue: number = 0;
  public selectedValue: string = '';
  public selectedValueArb: string  = '';
  public selectedCuantia: string  = '';
  public selectedSocio: string  = '';


  public user: Users;


  servicio: Servicio[] = [
    {value: '0', viewValue: 'Arbitraje'},
    {value: '1', viewValue: 'Mediación'}
  ];
  arbitraje: Arbitraje[] = [
    {value: 'tres', viewValue: 'Árbitro Único'},
    {value: 'unico', viewValue: 'Tres Árbitros'}
  ];

  cuantia: Cuantia[] = [
    {value: '0', viewValue: 'Cuantía determinada'},
    {value: '1', viewValue: 'Cuantía indeterminada'}
  ];

  socio: Socio[] = [
    {value: '0', viewValue: 'Soy socio'},
    {value: '1', viewValue: 'No soy socio'}
  ];
  


  constructor(    public calcularService: CalculatorService
    ){
  }



  // constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.user = {};
  }




  clickme() {
    this.calcularService.calcular(  this.cuantiaValue,
      this.selectedValue,
      this.selectedValueArb,
      this.selectedCuantia,
      this.selectedSocio,
    );
    console.log('it does nothing',this.username);
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
