import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Course {
  id: number;
  name: string;
  universityId: number;
  university: { id: number; name: string };
}

interface University {
  id: number;
  name: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css']
})
export class CoursesComponent implements OnInit {
  universities: University[] = [];
  courses: Course[] = [];

  
  pageSize = 5;
  currentPage = 1;
  paginatedCourses: Course[] = [];

  newCourse = {
    name: '',
    universityId: ''
  };

  showModal = false;
  showDeleteModal = false;
  editingCourse: Course | null = null;
  deletingCourse: Course | null = null;

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUniversities();
    this.fetchCourses();
  }

  fetchUniversities() {
    this.http.get<University[]>(`${this.apiUrl}/universities`).subscribe(data => {
      this.universities = data;
    });
  }

  fetchCourses() {
    this.http.get<Course[]>(`${this.apiUrl}/courses`).subscribe(data => {
      this.courses = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCourses = this.courses.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  totalPages(): number[] {
    const total = Math.ceil(this.courses.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  saveCourse() {
    if (this.newCourse.name && this.newCourse.universityId) {
      this.http.post(`${this.apiUrl}/courses`, this.newCourse).subscribe(() => {
        this.fetchCourses();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newCourse = { name: '', universityId: '' };
  }

  openEditModal(course: Course) {
    this.editingCourse = { ...course };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingCourse = null;
  }

  updateCourse() {
    if (this.editingCourse) {
      this.http.put(`${this.apiUrl}/courses/${this.editingCourse.id}`, {
        name: this.editingCourse.name,
        universityId: this.editingCourse.universityId
      }).subscribe(() => {
        this.fetchCourses();
        this.closeModal();
      });
    }
  }

  openDeleteModal(course: Course) {
    this.deletingCourse = course;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deletingCourse = null;
  }

  confirmDelete() {
    if (this.deletingCourse) {
      this.http.delete(`${this.apiUrl}/courses/${this.deletingCourse.id}`).subscribe(() => {
        this.fetchCourses();
        this.closeDeleteModal();
      });
    }
  }
  getEndEntry(): number {
    return Math.min(this.currentPage * this.pageSize, this.courses.length);
  }
}
