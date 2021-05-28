import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'app/interfaces/post';
import { BlogService } from 'app/services/blog/blog.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent implements OnInit {
  public post_id = this.activatedRoute.snapshot.params.post_id;
  public post : Post;
  public isHome = false;
  constructor(private blogService : BlogService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getPostId();
    window.scrollTo(0, 0); 

  }

  public getPostId() {
    this.blogService.getPostId(this.post_id).pipe(take(1)).subscribe(post => {
      this.post = post
    })
  }
}
