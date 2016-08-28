import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import {MacroAction} from '../../../../../config-serializer/config-items/MacroAction';

import {DelayMacroAction} from '../../../../../config-serializer/config-items/DelayMacroAction';
import {TextMacroAction} from '../../../../../config-serializer/config-items/TextMacroAction';

import {PressMouseButtonsMacroAction} from '../../../../../config-serializer/config-items/PressMouseButtonsMacroAction';
import {HoldMouseButtonsMacroAction} from '../../../../../config-serializer/config-items/HoldMouseButtonsMacroAction';
import {ReleaseMouseButtonsMacroAction} from '../../../../../config-serializer/config-items/ReleaseMouseButtonsMacroAction';

import {MoveMouseMacroAction} from '../../../../../config-serializer/config-items/MoveMouseMacroAction';
import {ScrollMouseMacroAction} from '../../../../../config-serializer/config-items/ScrollMouseMacroAction';

import {PressKeyMacroAction} from '../../../../../config-serializer/config-items/PressKeyMacroAction';
import {HoldKeyMacroAction} from '../../../../../config-serializer/config-items/HoldKeyMacroAction';
import {ReleaseKeyMacroAction} from '../../../../../config-serializer/config-items/ReleaseKeyMacroAction';

import {PressModifiersMacroAction} from '../../../../../config-serializer/config-items/PressModifiersMacroAction';
import {HoldModifiersMacroAction} from '../../../../../config-serializer/config-items/HoldModifiersMacroAction';
import {ReleaseModifiersMacroAction} from '../../../../../config-serializer/config-items/ReleaseModifiersMacroAction';

import {IconComponent} from '../../widgets/icon';

import {KeyModifiers}  from '../../../../../config-serializer/config-items/KeyModifiers';

@Component({
    moduleId: module.id,
    selector: 'macro-item',
    template: require('./macro-item.component.html'),
    styles: [require('./macro-item.component.scss')],
    directives: [IconComponent]
})
export class MacroItemComponent implements OnInit, OnChanges {

    @Input() macroAction: MacroAction;
    @Input() editable: boolean;
    @Input() deletable: boolean;
    @Input() moveable: boolean;

    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    private iconName: string;
    private title: string;

    constructor() { }

    ngOnInit() {
        this.updateView();
    }

    ngOnChanges() {
        // TODO: check if macroAction changed
        this.updateView();
    }

    private updateView(): void {

        this.title = this.macroAction.constructor.name;
        if (this.macroAction instanceof MoveMouseMacroAction) {
            // Mouse moved
            this.iconName = 'mouse-pointer';
            this.title = 'Move pointer';

            let action: MoveMouseMacroAction = this.macroAction as MoveMouseMacroAction;
            let needAnd: boolean;
            if (Math.abs(action.x) > 0) {
                this.title += ` by ${Math.abs(action.x)}px ${action.x > 0 ? 'left' : 'right'}ward`;
                needAnd = true;
            }
            if (Math.abs(action.y) > 0) {
                this.title += ` ${needAnd ? 'and' : 'by'} ${Math.abs(action.y)}px ${action.y > 0 ? 'down' : 'up'}ward`;
            }
        } else if (this.macroAction instanceof ScrollMouseMacroAction) {
            // Scroll mouse
            this.iconName = 'mouse-pointer';
            this.title = 'Scroll';
            let action: ScrollMouseMacroAction = this.macroAction as ScrollMouseMacroAction;
            let needAnd: boolean;
            if (Math.abs(action.x) > 0) {
                this.title += ` by ${Math.abs(action.x)}px ${action.x > 0 ? 'left' : 'right'}ward`;
                needAnd = true;
            }
            if (Math.abs(action.y) > 0) {
                this.title += ` ${needAnd ? 'and' : 'by'} ${Math.abs(action.y)}px ${action.y > 0 ? 'down' : 'up'}ward`;
            }
        } else if (this.macroAction instanceof PressMouseButtonsMacroAction) {
            // Press mouse buttons
            let action: PressMouseButtonsMacroAction = this.macroAction as PressMouseButtonsMacroAction;
            this.iconName = 'mouse-pointer';
            this.title = 'Press: <some mouse button>';
            // @todo COMPLETE THIS
        } else if (this.macroAction instanceof HoldMouseButtonsMacroAction) {
            // Hold mouse buttons
            let action: HoldMouseButtonsMacroAction = this.macroAction as HoldMouseButtonsMacroAction;
            this.iconName = 'hand-rock';
            this.title = 'Hold: <some mouse button>';
            // @todo COMPLETE THIS
        } else if (this.macroAction instanceof ReleaseMouseButtonsMacroAction) {
            // Release mouse buttons
            let action: ReleaseMouseButtonsMacroAction = this.macroAction as ReleaseMouseButtonsMacroAction;
            this.iconName = 'hand-paper';
            this.title = 'Release: <some mouse button>';
            // @todo COMPLETE THIS
        } else if (this.macroAction instanceof DelayMacroAction) {
            // Delay
            this.iconName = 'clock';
            let action: DelayMacroAction = this.macroAction as DelayMacroAction;
            this.title = `Delay of ${action.delay}ms`;
        } else if (this.macroAction instanceof TextMacroAction) {
            // Write text
            let action: TextMacroAction = this.macroAction as TextMacroAction;
            this.iconName = 'font';
            this.title = `Write text: ${action.text}`;
        } else if (this.macroAction instanceof PressKeyMacroAction) {
            // Press key
            let action: PressKeyMacroAction = this.macroAction as PressKeyMacroAction;
            this.iconName = 'hand-pointer';
            this.title = 'Press: ' + action.scancode;
            // @todo COMPLETE THIS
        } else if (this.macroAction instanceof HoldKeyMacroAction) {
            // Press key
            let action: HoldKeyMacroAction = this.macroAction as HoldKeyMacroAction;
            this.iconName = 'hand-rock';
            this.title = 'Hold: ' + action.scancode;
            // @todo COMPLETE THIS
        } else if (this.macroAction instanceof ReleaseKeyMacroAction) {
            // Release key
            let action: ReleaseKeyMacroAction = this.macroAction as ReleaseKeyMacroAction;
            this.iconName = 'hand-paper';
            this.title = 'Release: ' + action.scancode;
            // @todo COMPLETE THIS
        } else if (this.macroAction instanceof PressModifiersMacroAction) {
            // Press modifiers
            this.iconName = 'hand-pointer';
            let action: PressModifiersMacroAction = this.macroAction as PressModifiersMacroAction;
            if (action.modifierMask === 0) {
                this.title = 'Invalid PressModifiersMacroAction!';
                return;
            }
            this.title = 'Press: ';
            for (let i = KeyModifiers.leftCtrl; i !== KeyModifiers.rightCtrl; i <<= 1) {
                if (action.isModifierActive(i)) {
                    this.title += ' ' + KeyModifiers[i];
                }
            }
        } else if (this.macroAction instanceof HoldModifiersMacroAction) {
            // Hold modifiers
            this.iconName = 'hand-rock';
            let action: HoldModifiersMacroAction = this.macroAction as HoldModifiersMacroAction;
            if (action.modifierMask === 0) {
                this.title = 'Invalid HoldModifiersMacroAction!';
                return;
            }
            this.title = 'Hold: ';
            for (let i = KeyModifiers.leftCtrl; i !== KeyModifiers.rightCtrl; i <<= 1) {
                if (action.isModifierActive(i)) {
                    this.title += ' ' + KeyModifiers[i];
                }
            }
        } else if (this.macroAction instanceof ReleaseModifiersMacroAction) {
            // Release modifiers
            this.iconName = 'hand-paper';
            let action: ReleaseModifiersMacroAction = this.macroAction as ReleaseModifiersMacroAction;
            if (action.modifierMask === 0) {
                this.title = 'Invalid ReleaseModifiersMacroAction!';
                return;
            }
            this.title = 'Release: ';
            for (let i = KeyModifiers.leftCtrl; i !== KeyModifiers.rightCtrl; i <<= 1) {
                if (action.isModifierActive(i)) {
                    this.title += ' ' + KeyModifiers[i];
                }
            }
        }
        // TODO: finish for all MacroAction
    }

    editAction() {
        this.edit.emit();
    }

    deleteAction() {
        this.delete.emit();
    }

}
