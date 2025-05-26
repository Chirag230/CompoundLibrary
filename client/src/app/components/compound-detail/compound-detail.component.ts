import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import type { Compound } from '../../models/compound';
import { CompoundService } from '../../services/compound.service';

@Component({
  selector: 'app-compound-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compound-detail.component.html',
  styleUrls: ['./compound-detail.component.scss']
})
export class CompoundDetailComponent implements OnInit {
  compound?: Compound;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadCompound(idParam);
    } else {
      this.router.navigate(['/compounds']);
    }
  }

  private loadCompound(id: string): void {
    this.error = null;
    this.compoundService.getCompound(id)
      .subscribe({
        next: compound => {
          if (compound) {
            this.compound = compound;
          } else {
            this.error = 'Compound not found';
            setTimeout(() => this.router.navigate(['/compounds']), 2000);
          }
        },
        error: err => {
          console.error('Error loading compound:', err);
          this.error = 'Failed to load compound. Redirecting to list...';
          setTimeout(() => this.router.navigate(['/compounds']), 2000);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/compounds']);
  }
}
