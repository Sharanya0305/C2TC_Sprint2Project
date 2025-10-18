import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mall, MallService } from './mall.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  malls: Mall[] = [];
  newMall: Mall = {
    mallName: '',
    location: '',
    totalShops: 0,
    areaSqFt: 0
  };
  isEditing: boolean = false;
  editingMallId: number | null = null;

  constructor(private mallService: MallService) {}

  ngOnInit(): void {
    this.loadMalls();
  }

  loadMalls(): void {
    this.mallService.getAll().subscribe({
      next: data => this.malls = data,
      error: err => console.error('Error loading malls:', err)
    });
  }

  addMall(): void {
    if (this.isEditing && this.editingMallId !== null) {
      this.mallService.update(this.editingMallId, this.newMall).subscribe({
        next: () => {
          alert('Mall updated successfully 📝');
          this.resetForm();
          this.loadMalls();
        },
        error: err => {
          console.error('Error updating mall:', err);
          alert('Failed to update mall ❌');
        }
      });
    } else {
      this.mallService.create(this.newMall).subscribe({
        next: () => {
          alert('Mall added successfully ✅');
          this.resetForm();
          this.loadMalls();
        },
        error: err => {
          console.error('Error adding mall:', err);
          alert('Failed to add mall ❌');
        }
      });
    }
  }

  editMall(mall: Mall): void {
    this.newMall = { ...mall };
    this.isEditing = true;
    this.editingMallId = mall.id!;
  }

  deleteMall(id: number): void {
    this.mallService.delete(id).subscribe({
      next: () => {
        alert('Mall deleted successfully 🗑️');
        this.loadMalls();
      },
      error: err => {
        console.error('Error deleting mall:', err);
        alert('Failed to delete mall ❌');
      }
    });
  }

  resetForm(): void {
    this.newMall = { mallName: '', location: '', totalShops: 0, areaSqFt: 0 };
    this.isEditing = false;
    this.editingMallId = null;
  }
}