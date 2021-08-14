import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-input]',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent {
	@Input() label?: string;
	@Input() type: string = 'text';
	@Input() name: string = this.type;
	@Input() placeholder?: string = '';
	@Input() errors?: string[];
	@Input() required: boolean = false;

	@Input() inputModel!: string;
	@Output() inputModelChange = new EventEmitter<string>();

	constructor() { }

	get error(): boolean {
		return this.errors ? this.errors.length > 0 : false;
	}

}
