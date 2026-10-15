import { Injectable } from '@angular/core';
import { PostModel } from '../../app/models/post-model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface PostsResponse {
  posts: PostModel[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private _posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([]);
  private readonly _baseUrl: string = 'https://dummyjson.com/posts';

  constructor(private _http: HttpClient) {}

  getPosts(): Observable<PostModel[]> {
    return this._http.get<PostsResponse>(this._baseUrl).pipe(
      map((response) => response.posts),
      tap((posts) => this._posts.next(posts)),
    );
  }
}
