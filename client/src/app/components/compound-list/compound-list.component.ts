import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import type { Compound } from '../../models/compound';
import { CompoundService } from '../../services/compound.service';
import { fromNow } from '../../util';

@Component({
  selector: 'app-compound-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-list.component.html',
  styleUrls: ['./compound-list.component.scss']
})
export class CompoundListComponent implements OnInit {
  compounds: Compound[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  error: string | null = null;

  constructor(
    private compoundService: CompoundService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompounds();
  }

  loadCompounds(): void {
    this.error = null;
    this.compoundService.getCompounds(this.currentPage, this.pageSize)
      .subscribe({
        next: result => {
          this.compounds = result.compounds;
          this.totalItems = result.total;
        },
        error: err => {
          console.error('Error loading compounds:', err);
          this.error = 'Failed to load compounds. Please try again later.';
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCompounds();
  }

  viewCompound(id: number): void {
    this.router.navigate(['/compounds', id]);
  }

  fromNow(date: string | null): string {
  return date ? fromNow(date) ?? '' : '';
}
  editCompound(id: number): void {
  this.router.navigate(['/compounds', id, 'edit']);
}

deleteCompound(id: number): void {
  if (!confirm('Are you sure you want to delete this compound?')) return;

  this.compoundService.deleteCompound(id.toString()).subscribe({
    next: () => {
      this.loadCompounds(); // Refresh list after deletion
    },
    error: err => {
      console.error('Delete failed:', err);
      this.error = 'Failed to delete compound.';
    }
  });
}

// createCompound(): void {
//   this.router.navigate(['/compounds', 'create']);
// }
// getSafeImageSource(src: string | null | undefined): string {
//   return src && src.trim() !== '' ? src : 'assets/placeholder.png';
// }

// onImageError(event: Event) {
//   const img = event.target as HTMLImageElement;
//   if (img.src !== 'assets/placeholder.png') {
//     img.src = 'assets/placeholder.png';
//   }
// }

onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'https://static.vecteezy.com/system/resources/previews/062/255/246/non_2x/a-colorful-3d-molecular-structure-of-a-chemical-compound-free-vector.jpg';
}

}
