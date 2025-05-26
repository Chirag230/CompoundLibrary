import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../models/compound';

@Component({
  selector: 'app-compound-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compound-form.component.html',
  styleUrls: ['./compound-form.component.scss']
})
export class CompoundFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  compoundId: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private compoundService: CompoundService,
    private route: ActivatedRoute,
    public router: Router 
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      strImageSource: [''],
      dateModified: ['']
    });
  }

  ngOnInit(): void {
    this.compoundId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.compoundId;

    if (this.isEditMode && this.compoundId) {
      this.compoundService.getCompound(this.compoundId).subscribe({
        next: (compound: Compound) => {
          this.form.patchValue(compound);
        },
        error: err => {
          console.error('Error loading compound:', err);
          this.error = 'Failed to load compound for editing.';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const compoundData = this.form.value;

    if (this.isEditMode && this.compoundId) {
      this.compoundService.updateCompound(this.compoundId, compoundData).subscribe({
        next: () => this.router.navigate(['/compounds']),
        error: err => {
          console.error('Update failed:', err);
          this.error = 'Failed to update compound.';
        }
      });
    } else {
      this.compoundService.createCompound(compoundData).subscribe({
        next: () => this.router.navigate(['/compounds']),
        error: err => {
          console.error('Create failed:', err);
          this.error = 'Failed to create compound.';
        }
      });
    }
  }
}
