import { SoundService } from 'services/sound-service';
import { bindable, bindingMode, autoinject } from 'aurelia-framework';
@autoinject
export class RangeSlider {
    @bindable public name: string;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) public valueSource: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public min: string = "0";
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public max: string;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public step: string = "1";
    @bindable({ defaultBindingMode: bindingMode.oneTime }) public inputTrigger: boolean = false;
    @bindable public changeHandler: Function;
    constructor(private sound: SoundService){

    }
    valueChanged(newValue, oldValue){
        if(Boolean(this.changeHandler) && this.inputTrigger)
            this.changeHandler();
    }

    changeValue(){
        if(Boolean(this.changeHandler) && !this.inputTrigger)
            this.changeHandler();
    }
    changeInput(){
        if(Boolean(this.changeHandler) && this.inputTrigger)
            this.changeHandler();
    }
}