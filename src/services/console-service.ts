import { autoinject } from 'aurelia-framework';
import { SoundService } from './sound-service';
@autoinject
export class ConsoleService {
    entries: { message: string, element: Element }[] = [];
    private queue: string[] = [];
    private writing: boolean;
    public lockWhenWriting: boolean = true;
    public useTypeWriter: boolean = true;
    public writeNavigationMessages: boolean = false;
    public typingSpeed: number = 20;

    constructor(
        private sound: SoundService){

    }
    
    write(message: string) {
        this.queue.push(message);
        this.dequeue();
    }
    dequeue() {
        if (this.queue.length > 0 && !this.writing) {
            this.writing = true;
            let message = this.queue.splice(0, 1)[0];
            let entry = { message: "", element: null };
            if (this.entries.length > 500)
                this.entries.splice(0, 1);// Pop oldest
            this.entries.push(entry);
            let index = 0;
            let typeWriter = () => {
                if(this.useTypeWriter){
                    if (index < message.length) {
                        let letter = message.charAt(index);
                        entry.message += letter == "|" ? "<br />" : letter;
                        if (this.sound.useOutput)
                            this.sound.play();
                        index++;
                        if (Boolean(entry.element) && this.lockWhenWriting)
                            entry.element.scrollIntoView(false);
                        setTimeout(typeWriter, this.typingSpeed);
                    } else {
                        this.writing = false;
                        this.dequeue();
                    }
                } else {
                    entry.message = message.split("|").join("<br />");
                    setTimeout(() => {                        
                        if (Boolean(entry.element) && this.lockWhenWriting)
                        entry.element.scrollIntoView(false);
                    }, 100);
                    this.writing = false;
                    this.dequeue();
                }
            };
            typeWriter();
        }
    }
    public notImplementedMessage(){
        this.write("Error: Unable to perform requested operation");
    }
    public toggleMessageLock() {
        this.lockWhenWriting = !this.lockWhenWriting;
    }
    public toggleTypeWriter() {
        this.useTypeWriter = !this.useTypeWriter;
    }
    public toggleNavigationMessages() {
        this.writeNavigationMessages = !this.writeNavigationMessages;
    }
}