import { SoundService } from 'services/sound-service';
import { autoinject } from "aurelia-framework";

@autoinject
export class DisplaySettings {

    constructor(public sound: SoundService){

    }


}