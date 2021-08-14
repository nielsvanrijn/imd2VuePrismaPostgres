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

export const slidingDoorAnimation = trigger('slidingDoorAnimation', 
	[
		state('in', 
			style({ width: '{{ inWidth }}', overflow:'hidden'}),
			{ params: { inWidth: '250px'}}
		),
		state('out', 
			style({ width: '{{ outWidth }}'}),
			{ params: { outWidth: '*'}}
		),
		transition('* <=> *',animate('{{ time }}'))
	]
);

export const fadeInAnimation = trigger('fadeInAnimation', 
	[
		transition(
			':enter', 
			[
				style({ opacity: 0 }),
				animate('{{ d }}', style({ opacity: 1 }))
			]
		)
	]
);

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