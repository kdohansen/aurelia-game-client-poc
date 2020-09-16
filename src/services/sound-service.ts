

export class SoundService{
    private soundPool: HTMLAudioElement[] = [];
    private timeout: boolean;
    public volume: number = 0.1;
    public repeatTimeout: number = 20;
    public useClick: boolean = true;
    public useHover: boolean = false;
    public useInput: boolean = true;
    public useOutput: boolean = false;
    public clickables: string[] = ["INPUT", "BUTTON"]
    constructor(){
        window.oninput = (event) => { if(this.useInput) this.play();};
        window.onmouseover = (event) => { debugger
            if(this.useHover && this.clickables.some(x => x === event.target.nodeName)) this.play();};
        window.onclick = (event) => { debugger
            if(this.useClick && this.clickables.some(x => x === event.target.nodeName)) this.play();};
    }
    public soundKeys: { name: string, key: string }[] = [
        { name: "Beep", key: "/beep.mp3"},
        { name: "Pling", key: "/pling.wav"}
    ];
    public selectedKey: { name: string, key: string } = this.soundKeys[1];

    public play(){
        if (Boolean(this.timeout))
            return;
        this.timeout = true;
        setTimeout(() => this.timeout = false, this.repeatTimeout);
        let sound = this.getSound();
        sound.play();/*
        sound.onended = () => {
            //sound.pause();
            //sound.removeAttribute('src');
            //sound.load();
            //sound.remove();
        }*/
    }
    private initializeSound(): HTMLAudioElement{
        let sound = new Audio(this.selectedKey.key);
        sound.volume = this.volume;
        sound.load();
        this.soundPool.push(sound);
        return sound;
    }
    private getSound(): HTMLAudioElement {
        let sound = this.soundPool.find(x => x.ended)
        return Boolean(sound) ? sound : this.initializeSound();        
    }
    public setVolume(){
        if (this.volume < 0)
            this.volume = 0;
        if (this.volume > 1)
            this.volume = 1;
        this.soundPool.forEach(x => x.volume = this.volume);
    }
    public setSoundKey(selected: { name: string, key: string }){
        if (this.selectedKey === selected) return;
        this.selectedKey = selected;
        this.soundPool.forEach(x => {
            x.src = this.selectedKey.key; 
            x.load();
        });
    }
}