import { Component } from '@angular/core';
import { PostModel } from '../../../models/post-model';
import { PostService } from '../../../services/post-service/post-service';

/**
 * Component that displays an overview of posts.
 */
@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {

  /**
   * The list of posts to display in the overview.
   */
  posts: PostModel[] = [];

  /**
   * Creates an instance of the Overview component.
   * @param _postService The post service.
   */
  constructor(private _postService: PostService) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {

    this._postService.posts$.subscribe((posts) => {
      this.posts = posts;
      console.log('Posts updated:', this.posts);
    });

    this._postService.getPosts().subscribe();
  }
}
