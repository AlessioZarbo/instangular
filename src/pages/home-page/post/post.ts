import { Component, Input } from '@angular/core';
import { PostModel } from '../../../app/models/post-model';

@Component({
  selector: 'app-post',
  standalone: false,
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {

  @Input()
  post: PostModel | undefined;
}
