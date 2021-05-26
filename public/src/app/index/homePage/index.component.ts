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
  public show = false;
  public arrayPost: Array<Post>
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
  
  /***** test Jean Carlos */
  public isHome = true;
  public url = 'https://vazseguros-c7bbe.firebaseapp.com/api/v1/notification';
  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer d&q5PKGl8qlX4Z#@",
    }),
  };
  constructor( private BlogService: BlogService, private db: AngularFirestore,
    private calcularService: CalculatorService,
    private route: Router,
    private http : HttpClient)
  {}

  ngOnInit(): void {
    this.user = {};
    // this.getPosts();
    this.getPosts();
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

  public getPosts() {
    this.BlogService.getPostByCategory().subscribe(posts => {
      this.arrayPost= posts;
      console.log(posts);
    })
  }
 
  public post3()
  {
    this.BlogService.getMoreTree().subscribe(posts =>{
        posts.forEach(post => {
          this.arrayPost.push(post);
        });
      console.log(this.arrayPost);
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
      "vin": 123456,
    }
     this.http.post<any>(this.url, data, this.httpOptions).subscribe(test => {
       console.log(test);
       
     });
  }

  public get1() {
    
  }

  public get2() {
    
  }

  public put() {
    
  }
}
