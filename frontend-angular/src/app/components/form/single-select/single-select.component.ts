import { Component, Input } from '@angular/core';
import { singleSelectHideShowAnimation } from 'src/app/animations/fade.animation';

@Component({
	selector: 'app-single-select',
	templateUrl: './single-select.component.html',
	styleUrls: ['./single-select.component.scss'],
	animations: [
		singleSelectHideShowAnimation,
	]
})
export class SingleSelectComponent {
	@Input() label: string = 'select';
	@Input() options: any[] = [];
	@Input() labelKey!: string;
	@Input() toggleKey!: string;
	public open = false;

	constructor() {}

	toggle(option: any) {
		if (option[this.toggleKey]) {
			option[this.toggleKey] = !option[this.toggleKey];
		} else {
			this.options = this.options.map((obj: any) => {obj.active = false; return obj;});
			option[this.toggleKey] = !option[this.toggleKey];
		}
	}

}
