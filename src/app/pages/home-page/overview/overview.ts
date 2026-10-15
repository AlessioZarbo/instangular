import { Component } from '@angular/core';
import { PostModel } from '../../../models/post-model';
import { PostService } from '../../../services/post-service/post-service';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {

  posts: PostModel[] = [];
  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this._postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }
}
