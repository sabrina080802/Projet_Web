import { Component, Input, forwardRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  imports: [FormsModule, TitleCasePipe, CommonModule, FormsModule],
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormGroupComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class FormGroupComponent implements ControlValueAccessor {
  @Input() label:string = '';
  @Input() dataType:string = 'text';
  @Input() value:string = '';
  @Input() errorMessage:string = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value:any):void{
    this.value = value;
  }
  registerOnChange(fn: any):void{
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onInputChange(event:Event):void{
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}
