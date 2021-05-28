import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from 'app/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private last: any;
  private next: any;
  private nextToTalPost: any;

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
    return this.db.collection('blog', ref => ref.orderBy("post_id", "desc")).valueChanges();
  }

  public getPostTree() {
    return this.db.collection<Post>('blog', (ref) => ref.orderBy("post_id", "desc").limit(3)).valueChanges();
  }
  public getBlogPosts() {
    let first = this.db.collection<Post>('blog', (ref) => ref.orderBy("post_id", "desc").limit(3));
    first.get().subscribe(documentSnapshots => {
      // Get the last visible document
      if (documentSnapshots.docs.length > 0) {
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        // Construct a new query starting at this document,
        // get the next 25 cities.
        this.next = this.db.collection("blog", ref => ref.orderBy("post_id", "desc")
          .startAfter(lastVisible)
          .limit(3));
        this.next = this.db.collection("blog", (ref) => ref
          .orderBy("post_id", "desc")
          .startAfter(lastVisible)
          .limit(3))
      }

    });
    return first.valueChanges()

  }

  public getMoreTree() {
    this.next.get().subscribe(documentSnapshots => {
      if (documentSnapshots.docs.length > 0) {
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        this.next = this.db.collection("blog", ref => ref.orderBy("post_id", "desc")
          .startAfter(lastVisible)
          .limit(3));
      }
    })
    return this.next.valueChanges()
  }

  public getPostId(post_id: string) {
    return this.db.collection('blog').doc(`${post_id}`).valueChanges();
  }
}
