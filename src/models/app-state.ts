import { UserDto } from "./user-dto";
import { CampaignDto } from './campaign-dto';
import { CharacterDto } from "./character-dto";

export class AppState {
    user: UserDto;
    campaign: CampaignDto;
    character: CharacterDto;
    constructor(){

    }
}