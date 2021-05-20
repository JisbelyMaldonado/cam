import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public sections = ['#home', '#products', '#about', '#contact'];

  constructor() { }

  ngOnInit(): void {

    $(window).on('scroll', function() {
      var sections = ['#home', '#products', '#about', '#contact'];
      sections.forEach(function(section) {
        // console.log(section);
        
         var sectionObj = $(section);
         if (!sectionObj.length) {
          //  console.log('*** No se encontro un elemento con ese id ***');
           return;
         }
         if ($(window).scrollTop() + 100 >= sectionObj.position().top) {
          //  if (!$('.navbar-nav li a[data-target="'+ section +'"]').hasClass('active')) {
             console.log('*** Entra ***' + section);
             
             $('.navbar a').removeClass('active'); // eliminamos la clase active del que la tenga
             $('.navbar .nav a[data-target="'+ section +'"]').addClass('active');
          //  }
         }
       });
   });

    $(window).scroll(function(event) {
      var element = document.getElementById("navbarIndex");

      var scrollTop = $(window).scrollTop();
      if (scrollTop > 160) {
        // console.log("Vertical cambiar.. "+scrollTop);
        element.classList.add("bg-color-solid");
      } else {
        element.classList.remove("bg-color-solid");
      }

    


      


    });
       // elementos de la lista
       var menues = $("ul li"); 

       // manejador de click sobre todos los elementos
       menues.click(function() {
         console.log('*** se hace clic ***');
         
         // eliminamos active de todos los elementos
         menues.removeClass("active");
         // activamos el elemento clicado.
         $(this).addClass("active");
       });
  }
  

}
