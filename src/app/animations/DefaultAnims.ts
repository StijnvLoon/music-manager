import { trigger, transition, style, animate, query, animateChild, stagger } from "@angular/animations";

export const fadeAnim = trigger('FadeAnim', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms ease-in', style({ opacity: 0 }))
    ])
])

export const listContainerAnim = trigger('ListAnimContainer', [
    transition(':enter', [
        query('@ListAnimItems', stagger(150, animateChild()), { optional: true })
    ]),
])
export const listItemsAnim = trigger('ListAnimItems', [
    transition(':enter', [
        style({
            transform: 'scale(0.5)', opacity: 0,
            height: '0px', margin: '0px'
        }),  // initial
        animate('0.3s ease-out',
            style({ transform: 'scale(1)', opacity: 1, height: '*' }))  // final
    ]),
    transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('0.3s ease-out',
            style({
                transform: 'scale(0.5)', opacity: 0,
                height: '0px', margin: '0px'
            }))
    ])
])