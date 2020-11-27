import { ApiClient } from 'services/api-client';
import { Router } from 'aurelia-router';
import { AppState } from 'models/app-state';
import { autoinject } from 'aurelia-framework';
import { UserDto } from 'models/user-dto';

@autoinject
export class AppService {
    constructor(
        public state: AppState,
        private api: ApiClient){
    }
    
    reset() {
        this.state.user = null;
        this.state.campaign = null;
        this.state.character = null;
    }

    async trySetUser(): Promise<boolean> {
        if(!Boolean(sessionStorage.getItem("access_token"))) return false;
        this.state.user = { id: "id", name: "Unknown", keyCode: "keyCode", passPhrase: "passPhrase"}; //await this.api.user.get("getUser").jsonResult();
        return Boolean(this.state.user);
    }

    async selectCampaign(){
        if(!Boolean(sessionStorage.getItem("access_token"))) return false;
        this.state.campaign = { id: "id", name: "Game"};
        return Boolean(this.state.campaign);

    }
    async selectCharacter(){
        if(!Boolean(sessionStorage.getItem("access_token"))) return false;
        this.state.character = { id: "id", name: "Subject"};
        return Boolean(this.state.character);
    }
}