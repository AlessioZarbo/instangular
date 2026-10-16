import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../../models/post-model';

/**
 * Represents the response from the posts API.
 */
interface PostsResponse {
  posts: PostModel[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Service for managing posts.
 */
@Injectable({
  providedIn: 'root',
})
export class PostService {

  /**
   * A BehaviorSubject that holds the current list of posts.
   */
  private _posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([]);

  /**
   * A list of tags associated with the posts. This property is currently not used in the service but can be utilized for filtering or categorizing posts based on tags.
   */
  private _tags: string[] = [];
  get tags(): string[] {
    return this._tags;
  }

  /**
   * Observable of the posts currently visible to the UI.
   */
  readonly posts$: Observable<PostModel[]> = this._posts.asObservable();

  /**
   * Unfiltered posts received from the API.
   */
  private _allPosts: PostModel[] = [];

  /**
   * The base URL for the posts API.
   */
  private readonly _baseUrl: string = 'https://dummyjson.com/posts';

  /**
   * Creates an instance of the PostService.
   * @param _http The HTTP client.
   */
  constructor(private _http: HttpClient) { }

  /**
   * Synchronizes the list of tags with a new tag.
   * @param post The post to extract tags from.
   */
  synchronizeTags(post: PostModel): void {

    post.tags.forEach((tag) => {

      if (!this._tags.includes(tag)) {

        this._tags.push(tag);
      }
    });
  }

  /**
   * Fetches the list of posts from the API.
   * @returns An observable that emits the list of posts.
   */
  getPosts(): Observable<PostModel[]> {
    return this._http.get<PostsResponse>(this._baseUrl).pipe(
      map((response) => response.posts),
      tap((posts) => {
        this._allPosts = posts;
        this._posts.next(posts);
        this._posts.forEach((posts) => {
          posts.forEach((post) => this.synchronizeTags(post));
        });
      }),
    );
  }

  /**
   * Filters the list of posts by a search term.
   * @param term The search term.
   * @param filterTags The list of tags to filter by.
   * @returns An observable that emits the filtered list of posts.
   */
  filterPost(term: string, filterTags: string[]): void {

    const normalizedTerm = term.trim().toLowerCase();

    this._posts.next(
      this._allPosts.filter(
        (post) =>
          post.title.toLowerCase().startsWith(normalizedTerm) && filterTags.every((tag) => post.tags.includes(tag))
      ),
    );
  }
}
