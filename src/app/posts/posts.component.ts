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
}
