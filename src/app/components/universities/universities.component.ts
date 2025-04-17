import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface University {
  id: number;
  name: string;
}

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './universities.component.html',
})
export class UniversitiesComponent implements OnInit {
  showModal = false;
  showDeleteModal = false;
  editingUniversity: University | null = null;
  deletingUniversity: University | null = null;

  universities: University[] = [];
  newUniversity = { name: '' };
  apiUrl = 'http://localhost:3000/universities'; 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUniversities();
  }

  fetchUniversities() {
    this.http.get<University[]>(this.apiUrl).subscribe(data => {
      this.universities = data;
    });
  }

  saveUniversity() {
    if (this.newUniversity.name) {
      this.http.post<University>(this.apiUrl, this.newUniversity).subscribe(() => {
        this.fetchUniversities();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newUniversity = { name: '' };
  }

  openDeleteModal(university: University) {
    this.deletingUniversity = university;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deletingUniversity = null;
  }

  confirmDelete() {
    if (this.deletingUniversity) {
      this.http.delete(`${this.apiUrl}/${this.deletingUniversity.id}`).subscribe(() => {
        this.fetchUniversities();
        this.closeDeleteModal();
      });
    }
  }

  openEditModal(university: University) {
    this.editingUniversity = { ...university };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingUniversity = null;
  }

  updateUniversity() {
    if (this.editingUniversity && this.editingUniversity.name) {
      this.http.put(`${this.apiUrl}/${this.editingUniversity.id}`, {
        name: this.editingUniversity.name
      }).subscribe(() => {
        this.fetchUniversities();
        this.closeModal();
      });
    }
  }

  pageSize = 5;
  currentPage = 1;
  paginatedUniversities: University[] = [];

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUniversities = this.universities.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  totalPages(): number[] {
    const total = Math.ceil(this.universities.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  getEndEntry(): number {
    return Math.min(this.currentPage * this.pageSize, this.universities.length);
  }
}
