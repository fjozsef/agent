import {
    Component,
    OnInit,
    Input,
    ElementRef,
    ViewChild,
    Renderer,
    AfterViewInit
} from '@angular/core';
import { EditableMacroAction } from '../../../../../config-serializer/config-items/EditableMacroAction';

@Component({
    selector: 'macro-text-tab',
    template: require('./macro-text.component.html'),
    styles: [require('./macro-text.component.scss')],
    host: { 'class': 'macro__text' }
})
export class MacroTextTabComponent implements OnInit, AfterViewInit {
    @Input() macroAction: EditableMacroAction;
    @ViewChild('macroTextInput') input: ElementRef;

    constructor(private renderer: Renderer) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    }

}
