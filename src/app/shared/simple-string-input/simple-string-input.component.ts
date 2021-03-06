import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-simple-string-input',
  templateUrl: './simple-string-input.component.html',
  styleUrls: ['./simple-string-input.component.scss'],
})
export class SimpleStringInputComponent {
  @Input() placeholder!: string;
  @Input() formCName!: string;
  @Input() groupRef!: FormGroup;
  @Input() valido!: ValidationService;
  @Input() extraMessage!: string;
}
