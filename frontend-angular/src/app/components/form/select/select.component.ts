import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { selectHideShowAnimation } from 'src/app/animations/fade.animation';
import { get } from 'lodash';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: '[app-select]',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	animations: [
		selectHideShowAnimation
	]
})
export class SelectComponent implements OnInit {
	@Input() label?: string;
	@Input() name!: string;
	@Input() options: Array<any> = [];
	@Input() labelKey = 'name';
	@Input() compareKey = 'id';
	@Input() sort: 'labelKey' | 'dataKey' | 'compareKey' | null = null;
	@Input() placeholder? = 'Please select an option';
	@Input() errors?: Array<{location: string; msg: string; param: string}>;
	@Input() single? = false;
	@Input() size?: 'md' | 'sm' = 'md';

	@Input() inputModel!: any;
	@Output() inputModelChange = new EventEmitter<any>();
	public open = false;
	public highlightedOptionIndex: number = -1;
	public selectedOption: any;
	public selectedOptions: Array<any> = [];

	@ViewChild('buttonEl', { read: ElementRef, static: true }) 
	private buttonEl : ElementRef;
	@ViewChild('optionsEl') 
	private optionsEl : ElementRef;

	_get = get;

	constructor() {}
	
	ngOnInit(): void {
		if (this.single) this.selectedOption = this.inputModel ? this.inputModel : undefined;
		else this.selectedOptions = this.inputModel ? this.inputModel : [];
	}

	selectedOptionsLabels(): string {
		if (this.single) return this.options.find((option) => this._get(option, this.compareKey) === this._get(this.selectedOption, this.compareKey)) ? this._get(this.options.find((option) => this._get(option, this.compareKey) === this._get(this.selectedOption, this.compareKey)), this.labelKey) : ''
		else return this.options.filter((option) => this.isSelected(option)).map((option) => this._get(option, this.labelKey)).join(', ')
	}

	toggleOption(option: any) {
		if (this.single) {
			this.selectedOption = option;
			this.inputModelChange.emit(this.selectedOption);
			this.open = false;
		} else {
			if (this.isSelected(option)) this.selectedOptions = this.selectedOptions.filter((selectedOption) => this._get(selectedOption, this.compareKey) !== this._get(option, this.compareKey))
			else this.selectedOptions.push(option);
			this.inputModelChange.emit(this.selectedOptions);
		}
	}

	onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				this.open = false;
				this.buttonEl.nativeElement.focus();
				break;
			case 'Tab':
				if (this.open) this.open = false;
				break;
			case ' ':
				event.preventDefault();
				if (this.open) this.optionsEl.nativeElement.children[this.highlightedOptionIndex].click();
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
			case 'Enter':
				event.preventDefault();
				if (this.open) this.optionsEl.nativeElement.children[this.highlightedOptionIndex].click() // shift focus up
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (this.open) {
					const nextSibling = this.optionsEl.nativeElement.children[this.highlightedOptionIndex].nextSibling;
					const nextSiblingExsistsOrIsLi = nextSibling && nextSibling.tagName === 'LI';
					this.highlightedOptionIndex = nextSiblingExsistsOrIsLi ? +nextSibling.dataset.index : 0;
					this.optionsEl.nativeElement.scrollTop = nextSibling.offsetTop - (this.optionsEl.nativeElement.offsetHeight / 2);
				}
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (this.open) {
					const prevSibling = this.optionsEl.nativeElement.children[this.highlightedOptionIndex].previousSibling;
					const prevSiblingExsistsOrIsLi = prevSibling && prevSibling.tagName === 'LI';
					this.highlightedOptionIndex = prevSiblingExsistsOrIsLi ? +prevSibling.dataset.index : (this.optionsEl.nativeElement.children.length - 1);
					if (prevSibling) this.optionsEl.nativeElement.scrollTop = prevSibling.offsetTop - (this.optionsEl.nativeElement.offsetHeight / 2);
					else this.optionsEl.nativeElement.scrollTop = this.optionsEl.nativeElement.scrollHeight;
				}
				else {
					this.open = true;
					setTimeout(() => this.setFocus(), 1);
				}
				break;
		}
	}

	setFocus(): void {
		if (this.optionsEl && this.optionsEl.nativeElement.children.length > 0) {
			if (this.selectedOptions.length > 0) {
				this.highlightedOptionIndex = +this.optionsEl.nativeElement.children.namedItem(this._get(this.selectedOptions[0], this.compareKey).toString()).dataset.index;
			} else {
				this.highlightedOptionIndex = 0;
			}
		}
	}

	get sortedOptions(): Array<any> {
		if (this.sort !== null) return this.options.sort((a, b) => this._get(a, this.sort!) - this._get(b, this.sort!))
		else return this.options
	}

	get error(): boolean {
		return this.filterdErrors.length > 0;
	}

	get filterdErrors(): string[] {
		return this.errors ? this.errors.filter((e) => e.param === this.name).map((e) => e.msg) : [];
	}

	isSelected(option: any) {
		if (this.single) return this._get(option, this.compareKey) === this._get(this.selectedOption, this.compareKey);
		else return this.selectedOptions.some((selectedOption) => this._get(selectedOption, this.compareKey) === this._get(option, this.compareKey));
	}
}
