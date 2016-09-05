import { AnimationKeyboard } from '../../components/svg/wrap';
import { Serializable } from '../Serializable';
import { UhkBuffer } from '../UhkBuffer';
import { Modules } from './Modules';

export class Layer extends Serializable<Layer> {

    modules: Modules;
    animation: AnimationKeyboard = 'none';

    _fromJsObject(jsObject: any): Layer {
        this.modules = new Modules().fromJsObject(jsObject.modules);
        return this;
    }

    _fromBinary(buffer: UhkBuffer): Layer {
        this.modules = new Modules().fromBinary(buffer);
        return this;
    }

    _toJsObject(): any {
        return {
            modules: this.modules.toJsObject()
        };
    }

    _toBinary(buffer: UhkBuffer): void {
        this.modules.toBinary(buffer);
    }

    toString(): string {
        return `<Layer>`;
    }

}
