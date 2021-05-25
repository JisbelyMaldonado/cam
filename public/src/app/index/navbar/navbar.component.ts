import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMobile = false;
  private toggleButton;

  constructor(private element: ElementRef,) { }

  ngOnInit(): void {
    this.isViewMobile()
    // this.scroll()

  }

  public scroll() {
    $(window).on('scroll', function () {
    });
    $(window).scroll(function (event) {
      var element = document.getElementById("navbarIndex");
      var sections = ['#home', '#products', '#about', '#quote', '#directory', '#blog', '#contact'];

      /// *** Se determina la posicion del scroll para cambiar el color de la barra ***
      var scrollTop = $(window).scrollTop();
      if (scrollTop > 220) {
        element.classList.add("bg-color-solid");
      } else {
        element.classList.remove("bg-color-solid");
      }
      /// *** Se recorren las secciones para determinar cual esta visible ***
      sections.forEach(function (section) {
        var sectionObj = $(section);
        if (!sectionObj.length) {
          return;
        }
        if ($(window).scrollTop() + 100 >= sectionObj.position().top) {
          if (!$('.navbar-nav li[data-target="' + section + '"]').hasClass('active')) {
            $('.navbar-nav li').removeClass('active'); /// *** eliminamos la clase active del li que la tenga ***
            $('.navbar-nav li[data-target="' + section + '"]').addClass('active');
          }
        }
      });
    });
    // elementos de la lista
    var menues = $("ul li");

    // manejador de click sobre todos los elementos
    menues.click(function () {
      console.log('*** se hace clic ***');

      // eliminamos active de todos los elementos
      menues.removeClass("active");
      // activamos el elemento clicado.
      $(this).addClass("active");
    });
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth > 992) {
      this.isMobile = false;
    } else {
      this.isMobile = true;

    }
  }

  isViewMobile() {
    if ($(window).width() > 992) {
      this.isMobile = false;

    } else {
      this.isMobile = true;

    }
  }

}
