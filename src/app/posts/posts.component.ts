import { Component} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  private url ='https://jsonplaceholder.typicode.com/posts';
  constructor(private http: Http) { 
    http.get(this.url)
    //three overloads
      .subscribe(response => {
        this.posts = response.json();
      });
  }

  createPost(input: HTMLInputElement){
    let post = {title: input.value};
    input.value= '';
    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post["id"] = response.json().id;
        this.posts.push(post);
        //or splice(0,0,post) when unshift
        console.log(response.json());
      });
  }

  updatePost(post) {
    //this.http.patch for only part of post
    //this.http.put to edit entirely
    // this.http.put(this.url, JSON.stringify(post))
    this.http.patch(this.url + '/' +post.id, JSON.stringify({isRead: true}))
    .subscribe(response=> {
      console.log(response.json())
    });
  }

  deletePost(post) {
    this.http.delete(this.url+'/'+post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
      // console.log(response);
    });
  }
}
