import { DisplayService } from 'services/display-service';
import { autoinject } from "aurelia-framework";
import { ConsoleService } from "services/console-service";
@autoinject
export class DisplaySettings {

    constructor(public display: DisplayService, public consoleService: ConsoleService){

    }


}