import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'app/interfaces/post';
import { BlogService } from 'app/services/blog/blog.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public hiddenButton = false;
  public array_blog: Array<Post>;
  public isMobile = false;
  public isHome = false;
  constructor(public blogService: BlogService,
    public router: Router) { }

  ngOnInit(): void {
    this.getPosts();
    this.isViewMobile()
    window.scrollTo(0, 0); 

  }

  public getPosts() {
    this.blogService.getBlogPosts().pipe(take(1)).subscribe((posts) =>{
      this.array_blog = posts;
      if (posts.length < 3) {
        this.hiddenButton = true;
      }
    })
  }

  public getTreeMore() {
    this.blogService.getMoreTree().pipe(take(1)).subscribe((posts) =>{
      if (posts.length < 3) {
        this.hiddenButton = true;
      }
      posts.forEach(post => {
        if (this.array_blog.includes(post)) {
          return;
        } else {
          this.array_blog.push(post);
        }
        
      });
    })
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth > 799) {
      this.isMobile = false;
    } else {
      this.isMobile = true;

    }
  }

  isViewMobile() {
    if ($(window).width() > 799) {
      this.isMobile = false;

    } else {
      this.isMobile = true;

    }
  }

  public viewMorePost(post_id: string) {
    this.router.navigate(["/post/" + post_id ])
    window.scrollTo(0, 0);
  }
}
