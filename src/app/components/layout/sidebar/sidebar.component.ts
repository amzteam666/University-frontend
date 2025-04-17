import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  isCollapsed = false;
  
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Students', icon: 'people', route: '/students' },
    { label: 'Courses', icon: 'school', route: '/courses' },
    { label: 'Universities', icon: 'account_balance', route: '/universities' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }
}
