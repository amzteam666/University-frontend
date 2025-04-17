import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border-b">
      <div class="container mx-auto px-4">
        <div class="flex justify-center items-center py-2">
          <div class="flex items-center">
            <span class="material-icons text-[#E67E22] text-3xl">school</span>
            <h1 class="text-xl font-semibold ml-2" style="color: #E67E22;">University Management System</h1>
          </div>
          <div class="absolute right-4 flex items-center">
            <div class="flex items-center space-x-2">
              <span class="material-icons text-gray-600">notifications</span>
              <div class="flex items-center ml-4">
                <div class="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  <span class="text-sm">JD</span>
                </div>
                <div>
                  <div class="text-sm">John Doe</div>
                  <div class="text-xs text-gray-500">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }
  `]
})
export class HeaderComponent {} 