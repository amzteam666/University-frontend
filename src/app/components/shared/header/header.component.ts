import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  user = {
    name: 'John Doe',
    role: 'Administrator',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  };
}
