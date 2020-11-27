import { AppService } from 'services/app-service';
import { ApiClient } from 'services/api-client';
import { SecurityService } from 'services/security-service';
import { autoinject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@autoinject
export class User {
    name: string;
    keycode: string;
    passPhrase: string;
    passPhraseValidation: string;
    timeOfLogin: string;
    sessionDuration: string = "?";
    constructor(
        private router: Router, 
        private security: SecurityService, 
        private api: ApiClient,
        public app: AppService){
        
    }

    async attached() {
        
    }

    confirmName() {

    }
    changeUserImage(){

    }
    confirmPassphrase(){

    }
    generateNewKeycode(){

    }
    endAccess(){
        this.security.endAccess();
    }
}