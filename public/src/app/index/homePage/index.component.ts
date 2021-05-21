import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from 'app/interfaces/user';
import { take } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  
  public user: Users;
  public arrayPost: Post[];
  public arrayPostAux: Post[];
  public post: any;
  public show: boolean;
  next: any;
  //constructor(private authService: AuthServiceService) {}
  constructor( private BlogService: BlogService, private db: AngularFirestore)
  {

  }
  ngOnInit(): void {
    this.user = {};
    // this.getPosts();
    this.getPosts();
    this.show=false;
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
  

  /* METODO PARA OBTENER LOS BLOGS  DE LA BASE DATOS */
  // public getPosts() {
  //   this.BlogService.getPosts().pipe(take(3)).subscribe(posts => {
  //     this.arrayPost = posts;
  //     console.log(this.arrayPost);
  //   })
  // }

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

}
