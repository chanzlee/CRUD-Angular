import { Component} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  constructor(http: Http) { 
    http.get('https://jsonplaceholder.typicode.com/posts')
    //three overloads
      .subscribe(response => {
        this.posts = response.json();
      });
  }
}
