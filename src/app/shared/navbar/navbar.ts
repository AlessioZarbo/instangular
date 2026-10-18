import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * The Navbar component is a shared component that provides navigation functionality for the application. It includes buttons for navigating to the home page and the profile page. The component uses Angular's Router service to handle navigation when the buttons are clicked.
 */
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  /**
   * Creates an instance of the Navbar component.
   * @param _router The Angular Router service.
   */
  constructor(private _router: Router) {}

  /**
   * Navigates to the home page when the "Home" button is clicked. This method uses the Angular Router service to programmatically navigate to the '/homepage' route.
   */
  goToHome(): void {
    this._router.navigate(['/homepage']);
  }

  /**
   * Navigates to the profile page when the "Profile" button is clicked. This method uses the Angular Router service to programmatically navigate to the '/profile' route.
   */
  goToProfile(): void {
    this._router.navigate(['/profile']);
  }
}
