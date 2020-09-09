import { SecurityService } from './../../../services/security-service';
import { AppService } from 'services/app-service';
import { autoinject } from 'aurelia-framework';
import { Router } from "aurelia-router";

@autoinject
export class Identification {
    name: string;
    passPhrase: string;
    sclKeyCode: string;
    constructor(private router: Router, private security: SecurityService){
        
    }
    
    async RequestAccess(){
        this.security.RequestAccess();
    }
    async verifyPassphrase(){
        this.security.verifyPassphrase(this.name, this.passPhrase);
    }
    
    async verifySCLKeyCode(){
        this.security.verifySCLKeyCode(this.sclKeyCode);
    }
}