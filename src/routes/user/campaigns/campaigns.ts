import { AppService } from "services/app-service";
import { autoinject } from 'aurelia-framework';

@autoinject
export class Campaigns {
    constructor(
        public app: AppService){
        
    }
}