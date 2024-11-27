import { Component, OnInit } from '@angular/core';
import { Post } from '../types/post';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {
  posts: Post[] = [];
  isLoading = true;
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts(5).subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
      this.isLoading = false;
      console.log(this.isLoading);
    })
  }
}
