import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex space-x-8">
              <a 
                routerLink="/dashboard" 
                routerLinkActive="border-blue-500 text-gray-900"
                [routerLinkActiveOptions]="{exact: true}"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                [class.border-transparent]="router.url !== '/dashboard'"
                [class.text-gray-500]="router.url !== '/dashboard'"
                [class.hover:border-gray-300]="router.url !== '/dashboard'"
                [class.hover:text-gray-700]="router.url !== '/dashboard'">
                <span class="material-icons mr-2">dashboard</span>
                Dashboard
              </a>
              
              <a 
                routerLink="/universities" 
                routerLinkActive="border-blue-500 text-gray-900"
                [routerLinkActiveOptions]="{exact: true}"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                [class.border-transparent]="router.url !== '/universities'"
                [class.text-gray-500]="router.url !== '/universities'"
                [class.hover:border-gray-300]="router.url !== '/universities'"
                [class.hover:text-gray-700]="router.url !== '/universities'">
                <span class="material-icons mr-2">school</span>
                Universities
              </a>
              
              <a 
                routerLink="/courses" 
                routerLinkActive="border-blue-500 text-gray-900"
                [routerLinkActiveOptions]="{exact: true}"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                [class.border-transparent]="router.url !== '/courses'"
                [class.text-gray-500]="router.url !== '/courses'"
                [class.hover:border-gray-300]="router.url !== '/courses'"
                [class.hover:text-gray-700]="router.url !== '/courses'">
                <span class="material-icons mr-2">book</span>
                Courses
              </a>
              
              <a 
                routerLink="/students" 
                routerLinkActive="border-blue-500 text-gray-900"
                [routerLinkActiveOptions]="{exact: true}"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                [class.border-transparent]="router.url !== '/students'"
                [class.text-gray-500]="router.url !== '/students'"
                [class.hover:border-gray-300]="router.url !== '/students'"
                [class.hover:text-gray-700]="router.url !== '/students'">
                <span class="material-icons mr-2">people</span>
                Students
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavigationComponent {
  constructor(public router: Router) {}
} 