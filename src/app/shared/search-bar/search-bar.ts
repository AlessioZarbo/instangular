import { Component } from '@angular/core';
import { PostService } from '../../services/post-service/post-service';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Component that represents a search bar.
 */
@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBar {

  /**
   * This property defines the list of tags associated with the posts. It is currently not used in the component but can be utilized for filtering or categorizing posts based on tags.
   */
  tags: string[] = [];

  /**
   * This property defines the list of tags that are currently being used to filter the posts. It is initialized as an empty array and can be updated based on user interactions with the search bar.
   */
  filterTags: string[] = [];

  /**
   * This property defines the form group for the search functionality. It contains a single form control for the search term, which is initialized to an empty string.
   */
  searchForm: FormGroup = new FormGroup({
    term: new FormControl('')
  });

  /**
   * This is the constructor for the SearchBar component. It initializes the search form and injects the PostService.
   * @param _postService The PostService is injected to allow the component to interact with the post data, such as filtering posts based on the search term.
   */
  constructor(private _postService: PostService) {}

  /**
   * This method is called when a tag is clicked.
   * @param tag The tag that was clicked.
   */
  selectTag(tag: string): void {
    if (!this.filterTags.includes(tag)) {
      this.filterTags.push(tag);
    } else {
      this.filterTags = this.filterTags.filter((t) => t !== tag);
    }
    this.filterPost();
  }

  /**
   * This lifecycle hook is called after the component has been initialized. It retrieves the list of tags from the PostService and assigns it to the `tags` property.
   */
  ngOnInit(): void {
    
    this.tags = this._postService.tags;
  }

  /**
   * This method is called when the user types in the search input field. It retrieves the current value of the search term from the form control and calls the `filterPost` method of the PostService to filter the posts based on the search term.
   */
  filterPost(): void {

    this._postService.filterPost(this.searchForm.get('term')?.value, this.filterTags);
  }
}
