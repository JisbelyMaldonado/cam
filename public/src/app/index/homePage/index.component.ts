import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Users } from 'app/interfaces/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  
  public user: Users;
  
  // constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.user = {};
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

  soapCall() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://apl.vazseguros.com:8080/ServicioWeb/wsmovil?wsdl', true);
    const id_number = '0190088669001';



    // The following variable contains the xml SOAP request.
    const sr =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:miws="http://miws/">
      <soapenv:Header/>
      <soapenv:Body>
         <miws:produccion>
            <!--Optional:-->
            <identificacion>` +
    id_number +
    `</identificacion>
         </miws:produccion>
      </soapenv:Body>
   </soapenv:Envelope>`;


    xmlhttp.onreadystatechange =  () => {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                const xml = xmlhttp.responseXML;
                // Here I'm getting the value contained by the <return> node.
                const response_number = xml.getElementsByTagName('return')[0].childNodes[0].nodeValue;
                // Print result square number.

                var array = JSON.parse(response_number)
                array.forEach(element => {
                  console.log(element.ramo)
                });
                console.log(response_number);
            }
        }
    }
    // Send the POST request.
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    console.log
    return xmlhttp.send(sr);
  }
}
