import { autoinject } from "aurelia-framework";
import { ConsoleService } from "services/console-service";
@autoinject
export class ConsoleSettings {

    constructor(public console: ConsoleService) {
        
    }
}