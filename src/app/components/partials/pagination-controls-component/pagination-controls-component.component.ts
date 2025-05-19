import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-controls-component',
  standalone: true, // ✅ indispensable ici
  imports: [FormsModule, CommonModule], // ✅ FormsModule pour ngModel
  templateUrl: './pagination-controls-component.component.html',
  styleUrls: ['./pagination-controls-component.component.scss'], // corrigé aussi ici
})
export class PaginationControlsComponentComponent {
  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() limit!: number;
  @Input() search: string = '';

  @Output() changePage = new EventEmitter<{
    search: string;
    page: number;
    limit: number;
  }>();

  previousPage(): void {
    if (this.page > 1) {
      this.changePage.emit({
        search: this.search,
        page: this.page - 1,
        limit: this.limit,
      });
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.changePage.emit({
        search: this.search,
        page: this.page + 1,
        limit: this.limit,
      });
    }
  }

  onSearchChange(): void {
    this.page = 1;
    this.changePage.emit({
      search: this.search,
      page: this.page,
      limit: this.limit,
    });
  }

  onLimitChange(): void {
    this.page = 1;
    this.changePage.emit({
      search: this.search,
      page: this.page,
      limit: this.limit,
    });
  }
}
