import { autoinject, bindable } from "aurelia-framework";
@autoinject
export class ConsoleMessage{
    @bindable model: { message: string, element: Element }

    constructor(private element: Element) {
        
    }
    
    bind(bindingContext: Object,overrideContext: Object) {
        this.model.element = this.element;        
    }

    detached() {
        this.model.element = null;
    }
}