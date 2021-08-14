import {animate, state, style, transition, trigger} from '@angular/animations';

export const verticalCollapseAnimation = trigger('verticalCollapse', [
	state('*', style({
		height: '*',
	})),
	state('void', style({
		height: '0',
	})),
	transition('* => void', animate('.3s .3s ease')),
]);

export function fadeIn(duration = '100ms', timingFunction = 'ease-in') {
	return trigger(
		'fadeInAnimation', 
		[
			transition(
				':enter', 
				[
					style({ opacity: 0 }),
					animate(`${duration} ${timingFunction}`, style({ opacity: 1 }))
				]
			)
		]
	);
}

export function fadeOut(duration = '100ms', timingFunction = 'ease-in') {
	return trigger(
		'fadeOutAnimation', 
		[
			transition(
				':leave', 
				[
					style({ opacity: 1 }),
					animate(`${duration} ${timingFunction}`, style({ opacity: 0 }))
				]
			)
		]
	);
}