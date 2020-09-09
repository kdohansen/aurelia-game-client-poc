import { ConsoleService } from './console-service';
import { autoinject } from 'aurelia-framework';
import { ApiClient } from 'services/api-client';
import { Router } from 'aurelia-router';
import { AppService } from 'services/app-service';
@autoinject
export class SecurityService {
    constructor(
        private router: Router,
        //private api: ApiClient,
        private app: AppService,
        private console: ConsoleService){
            this.loadSession();
    }

    loadSession(){     
        this.app.trySetUser();
    }
    async verifyPassphrase(name: string, passPhrase: string){
        let token = "Token"; // await this.api.security.postJson("verifyPassphrase", { name, passPhrase }).stringResult();
        await this.openAccess(token);
    }
    async verifySCLKeyCode(keyCode: string){
        let token = "Token"; // await this.api.security.postText("verifySCLKeyCode", keyCode).stringResult();
        await this.openAccess(token);
    }
    async RequestAccess(){
        let token = "Token"; // await this.api.security.postText("RequestAccess", null).stringResult();
        await this.openAccess(token);
    }
    private async openAccess(token: string){
        sessionStorage.setItem('access_token', token);
        if (await this.app.trySetUser()){
            let route = sessionStorage.getItem('unathorizedRoute') ?? "user";
            sessionStorage.removeItem('unathorizedRoute');            
            this.router.navigateToRoute(route);
        } else {
            this.console.write("Access denied");
            this.endAccess();
        }
    }
    endAccess(){
        this.app.reset();
        sessionStorage.removeItem('unathorizedRoute');
        sessionStorage.removeItem('access_token');
        this.router.navigateToRoute("identification");
    }
}