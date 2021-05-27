import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer-landing-page',
  templateUrl: './footer-landing-page.component.html',
  styleUrls: ['./footer-landing-page.component.css']
})
export class FooterLandingPageComponent implements OnInit {

  public section : any = ''
  constructor(private router : Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.url[0]) {
      this.section = this.activatedRoute.snapshot.url[0].path;
    }
  }


  public viewSection(opcActive: string) {
    this.router.navigate(["/"]);
    setTimeout(function () {
      $("html, body").animate(
        {
          scrollTop: $(opcActive).position().top,
        },
        800,
        function () { }
      );
    }, 1000);
  }

  public viewLanding() {
    this.router.navigate(["/"]);
  }

  public viewBlog() {
    this.router.navigate(["/blog"]);
  }
}
