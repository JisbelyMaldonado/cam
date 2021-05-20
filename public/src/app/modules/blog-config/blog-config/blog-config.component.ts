import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'app/interfaces/post';
import { BlogService } from 'app/services/blog/blog.service';
import { DateService } from 'app/services/date/date.service';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-blog-config',
  templateUrl: './blog-config.component.html',
  styleUrls: ['./blog-config.component.css']
})
export class BlogConfigComponent implements OnInit {

  
  public dataSource: MatTableDataSource<Post>;
  public displayedColumns: string[] = [
    "N",
    "post_title",
    "post_state",
    "post_time",
    "post_date",
    "edit",
    "delete"
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("tableBlog") paginator: MatPaginator;
  public post : Post;
  public array_posts : Array<Post> = []
  public isEdit : boolean;
  constructor(public blogService: BlogService,
    public dateService : DateService) { }

  ngOnInit(): void {
    this.post = {}
    this.getPosts()
  }

  public newPost() {
    $('#multiCollapsePost').collapse('show');
    this.post.post_id = new Date().getTime().toString();
    this.post.post_state = true;
  }

  public getPosts() {
    this.blogService.getPosts().pipe(take(3)).subscribe(posts => {
      this.array_posts = posts;
      if (posts) {
        this.dataSource = new MatTableDataSource<Post>(posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    
    })
  }
  /**
  * *** Function para filtar en data table ***
  * @param event
  */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public savePost(post: Post, isValid: boolean , formPost: NgForm) {
    // console.log(this.post);
    if (isValid) {
       if (this.isEdit) {
         this.blogService.editPost(this.post).then(() => {
           $('#multiCollapsePost').collapse('hide');
           this.showNotification('bottom', 'right' , 'Se edito el post correctamente!', 'success');
           formPost.resetForm();
           this.getPosts()

         });
       } else {
        this.post.post_date = this.dateService.getDateCurrent();
        this.post.post_time = this.dateService.getTimeCurrent();
        this.post.post_state = true;
        this.blogService.savePost(this.post).then(() => {
          $('#multiCollapsePost').collapse('hide');
          this.showNotification('bottom', 'right' , 'Se creo el post correctamente!', 'success');
          formPost.resetForm()
          this.getPosts()
        });
       }
    }
    
  }

  public showNotification(from, align, msg , type) {
    $.notify({
      message: "<b>" + msg + "</b> "

    }, {
      type: type,
      color: 'rgb(204, 51, 51)',
      class: 'notify',
      timer: 6000,
      placement: {
        from: from,
        align: align
      }
    });
  }

  public closeNewAdmin() {
    this.post = {};
    $('#multiCollapsePost').collapse('hide');
  }

  public editPost(post: Post) {
    $('#multiCollapsePost').collapse('show');
    this.post = post;
    this.isEdit = true;
  }

  public deletePost(post: Post) {
    Swal.fire({
      title: '¿Confirma que desea eliminar el post?',
      showDenyButton: true,
      confirmButtonText: `Si, eliminar.`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.blogService.deletePost(post.post_id).then(() => {
          this.showNotification('bottom', 'right' , 'Se elimino el post correctamente!', 'success');
          this.getPosts()
        })
      } 
    })
  }
}
