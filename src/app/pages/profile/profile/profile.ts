import { Component, signal } from '@angular/core';
import { PostService } from '../../../services/post-service/post-service';
import { PostModel } from '../../../models/post-model';
import { UserModel } from '../../../models/user-model';
import { UserService } from '../../../services/user-service/user-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  /**
   * The list of posts associated with the user.
   */
  userPosts: PostModel[] = [];

  /**
   * The details of the user profile. This property is currently not used in the component but can be utilized for displaying user information or for other profile-related functionalities.
   */
  userDetails: UserModel | undefined = undefined;

  /**
   * The profile service.
   * @param _postService The post service used to fetch posts associated with the user.
   * @param _userService The profile service used to manage user profile data and posts.
   */
  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) { }

  /**
   * Initializes the component by fetching the user's posts from the PostService and subscribing to the observable to update the userPosts property.
   */
  ngOnInit(): void {

    // Fetch the user's posts from the PostService and subscribe to the observable to update the userPosts property.
    this._postService.searchByUserId(1).subscribe((posts) => {
      this.userPosts = posts;
    });

    // Fetch the user details from the UserService and assign it to the userDetails property.
    this.userDetails = this._userService.getMokkedUserDetails();
  }
}
