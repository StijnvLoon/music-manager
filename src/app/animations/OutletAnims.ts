import { transition, style, animate, trigger, query } from "@angular/animations";

export const cleanDropAnim = trigger('OutletTransitionAnim', [
    transition('* => *', [
        query(':enter',
            [
                style({
                    opacity: 0,
                    top: 20
                })
            ],
            { optional: true }
        ),

        query(':leave',
            [
                style({ opacity: 1, top: 0 }),
                animate('0.4s ease-out', style({ opacity: 0, top: 20 }))
            ],
            { optional: true }
        ),

        query(':enter',
            [
                style({ opacity: 0, top: 20 }),
                animate('0.6s ease-out', style({ opacity: 1, top: 0 }))
            ],
            { optional: true }
        )
    ])
]);