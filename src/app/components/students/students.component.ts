import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface University {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  universityId: string;
  courseIds: number[];
  university?: University;
  courses?: Course[];
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {
  universities: University[] = [];
  courses: Course[] = [];
  students: Student[] = [];

  newStudent: Partial<Student> = {
    name: '',
    universityId: '',
    courseIds: []
  };

  editingStudent: Partial<Student> = {
    name: '',
    universityId: '',
    courseIds: []
  };

  showCourseDropdown = false;
  showModal = false;
  showDeleteModal = false;
  deletingStudent: Student | null = null;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUniversities();
    this.fetchCourses();
    this.fetchStudents();
  }

  fetchUniversities() {
    this.http.get<University[]>(`${this.apiUrl}/universities`).subscribe(data => {
      this.universities = data;
    });
  }

  fetchCourses() {
    this.http.get<Course[]>(`${this.apiUrl}/courses`).subscribe(data => {
      this.courses = data;
    });
  }

  fetchStudents() {
    this.http.get<Student[]>(`${this.apiUrl}/students`).subscribe(data => {
      this.students = data;
    });
  }

  toggleCourse(courseId: number) {
    const index = this.newStudent.courseIds!.indexOf(courseId);
    if (index > -1) {
      this.newStudent.courseIds!.splice(index, 1);
    } else {
      this.newStudent.courseIds!.push(courseId);
    }
  }

  toggleEditCourse(courseId: number) {
    const index = this.editingStudent.courseIds!.indexOf(courseId);
    if (index > -1) {
      this.editingStudent.courseIds!.splice(index, 1);
    } else {
      this.editingStudent.courseIds!.push(courseId);
    }
  }

  saveStudent() {
    if (this.newStudent.name && this.newStudent.universityId && this.newStudent.courseIds?.length) {
      this.http.post(`${this.apiUrl}/students`, this.newStudent).subscribe(() => {
        this.fetchStudents();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newStudent = {
      name: '',
      universityId:'',
      courseIds: []
    };
    this.showCourseDropdown = false;
  }

  openEditModal(student: any) {
    this.editingStudent = {
      id: student.id,
      name: student.name,
      universityId: student.university?.id,
      courseIds: student.courses.map((c: any) => c.id)
    };
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.editingStudent = {
      id: 0,
      name: '',
      universityId: '',
      courseIds: []
    };
  }
  
  updateStudent() {
    const { id, name, universityId, courseIds } = this.editingStudent;
    if (!name || !universityId || courseIds?.length === 0) return;
  
    this.http.put(`${this.apiUrl}/students/${id}`, {
      name,
      universityId,
      courseIds
    }).subscribe(() => {
      this.fetchStudents();  
      this.closeModal();     
    });
  }
  
  openDeleteModal(student: Student) {
    this.deletingStudent = student;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.deletingStudent = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.deletingStudent?.id) {
      this.http.delete(`${this.apiUrl}/students/${this.deletingStudent.id}`).subscribe(() => {
        this.fetchStudents();
        this.closeDeleteModal();
      });
    }
  }
  
  pageSize = 5;
  currentPage = 1;
  paginatedStudents: Student[] = [];

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedStudents = this.students.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  totalPages(): number[] {
    const total = Math.ceil(this.students.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  getEndEntry(): number {
    return Math.min(this.currentPage * this.pageSize, this.students.length);
  }
  
}
