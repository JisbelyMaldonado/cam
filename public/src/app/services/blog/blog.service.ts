import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from 'app/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private db: AngularFirestore) { }

  public savePost(post: Post) {
   return this.db.collection('blog').doc(`${post.post_id}`).set(post);
  }

  public editPost(post: Post) {
    return this.db.collection('blog').doc(`${post.post_id}`).update(post);
  }

  public deletePost(post_id: string) {
    return this.db.collection('blog').doc(`${post_id}`).delete();
  }

  public getPosts() {
    return this.db.collection('blog').valueChanges();
  }

}
