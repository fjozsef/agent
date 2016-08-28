import { Component, OnInit } from '@angular/core';

import { Keymap } from '../../../config-serializer/config-items/Keymap';
import { UhkConfigurationService } from '../../services/uhk-configuration.service';
import { Macro } from '../../../config-serializer/config-items/Macro';
import { MacroActions } from '../../../config-serializer/config-items/MacroActions';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'side-menu',
    template: require('./side-menu.component.html'),
    styles: [require('./side-menu.component.scss')],
    providers: [UhkConfigurationService],
    directives: [ROUTER_DIRECTIVES]
})
export class SideMenuComponent implements OnInit {
    private keymaps: Keymap[];
    private macros: Macro[];

    constructor(private uhkConfigurationService: UhkConfigurationService) { }

    ngOnInit() {
        this.keymaps = this.uhkConfigurationService.getUhkConfiguration().keymaps.elements;
        this.macros = this.uhkConfigurationService.getUhkConfiguration().macros.elements;
    }

    /* tslint:disable:no-unused-variable: This function is used in the template */
    private toggleHide(event: Event, view: Element) {
        /* tslint:enable:no-unused-variable */
        let header: DOMTokenList = (<Element> event.target).classList;

        view.classList.toggle('slide-up');
        header.toggle('fa-chevron-up');
        header.toggle('fa-chevron-down');
    }

    private addMacro() {
        // @todo Too naive approach, should add new macro via UhkConfigurationService so it can be loaded in macro component
        const macroObj = {
            id: this.macros.length,
            name: 'New Macro',
            isLooped: false,
            isPrivate: false,
            macroActions: new MacroActions
        };
        const newMacro = new Macro().fromJsObject(macroObj);
        this.macros.push(newMacro);
    }
}