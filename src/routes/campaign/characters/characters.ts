import { AppService } from "services/app-service";
import { autoinject } from 'aurelia-framework';

@autoinject
export class Characters {
    public title: string = "characters";
    constructor(
        public app: AppService){
        
    }
}