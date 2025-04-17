import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <div class="min-h-screen flex">
    
      <aside class="w-64 bg-[#2C3E50] min-h-screen fixed left-0 top-0">
       
        <div class="flex items-center px-4 py-3 border-b border-[#3d566e]">
          <span class="material-icons text-orange-400 mr-2">school</span>
          <div class="text-white font-semibold text-lg">UMS</div>
        </div>

        <nav class="mt-5 px-2">
          <a routerLink="/dashboard" 
             routerLinkActive="bg-[#396EA3] text-white"
             class="group flex items-center px-4 py-3 text-gray-300 hover:bg-[#396EA3] hover:text-white rounded-md transition-colors">
            <span class="material-icons mr-3">dashboard</span>
            Dashboard
          </a>
          
          <a routerLink="/universities" 
             routerLinkActive="bg-[#396EA3] text-white"
             class="group flex items-center px-4 py-3 text-gray-300 hover:bg-[#396EA3] hover:text-white rounded-md transition-colors">
            <span class="material-icons mr-3">school</span>
            Universities
          </a>
          
          <a routerLink="/courses" 
             routerLinkActive="bg-[#396EA3] text-white"
             class="group flex items-center px-4 py-3 text-gray-300 hover:bg-[#396EA3] hover:text-white rounded-md transition-colors">
            <span class="material-icons mr-3">book</span>
            Courses
          </a>
          
          <a routerLink="/students" 
             routerLinkActive="bg-[#396EA3] text-white"
             class="group flex items-center px-4 py-3 text-gray-300 hover:bg-[#396EA3] hover:text-white rounded-md transition-colors">
            <span class="material-icons mr-3">people</span>
            Students
          </a>

          <button class="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#396EA3] hover:text-white rounded-md transition-colors mt-4">
            <span class="material-icons mr-3">logout</span>
            Logout
          </button>
        </nav>
      </aside>

      <div class="flex-1 ml-64">
        <app-header></app-header>
                <main class="p-4">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {}
