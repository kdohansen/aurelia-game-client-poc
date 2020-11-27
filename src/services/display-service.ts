import { ConsoleService } from 'services/console-service';
import { autoinject } from 'aurelia-framework';

// ToDo move styling values to css vars
@autoinject
export class DisplayService {

    useTouch: boolean = false;
    readonly hoverKey: string = " hover";
    readonly touchKey: string = " touch";

    terminalEffects: string = this.hoverKey;

    colorSetting: string;
    monitorScaling: string;
    wavelength: string;
    useMonitorPixelation: boolean;
    useMonitorDiffusion: boolean;
    useMonitorFlicker: boolean;
    readonly monitorPixelation: string = " monitor-pixelation";
    readonly monitorDiffusion: string = " monitor-diffusion";
    readonly monitorFlicker: string = " monitor-flicker";

    textStyle: string;
    readonly default: string = "Inconsolata, monospace";
    readonly alt1: string = "'Courier New', monospace";    
    readonly alt2: string = "'Lucida Console', monospace";
    readonly alt3: string = "Arial, Helvetica, sans-serif";
    useTextBold: boolean;
    useTextDiffusion: boolean;
    useTextFlicker: boolean;
    useContentDiffusion: boolean;
    readonly textDiffusion: string = " text-diffusion";
    readonly textFlicker: string = " text-flicker";
    readonly contentDiffusion: string = " content-diffusion";
    
    blackIndex: number;
    blackOptions: { title: string, value: string}[] = [
        {title: "Minimum black", value: "40,40,40" },
        {title: "Light black", value: "30,30,30" },
        {title: "Medium black", value: "20,20,20" },
        {title: "Dark black", value: "10,10,10" },
        {title: "Maximum black", value: "0,0,0" },
    ];

    constructor(private consoleService: ConsoleService) {
        this.wavelength = "503";      
        this.monitorScaling = "1";
        this.blackIndex = this.blackOptions.length-1;
        this.setSpectrumOnBlack();
        this.setMonitorScaling();
        this.toggleMonitorDiffusion();
        this.toggleMonitorPixelation();
        this.toggleMonitorFlicker();
        this.setTextStyle("default");
        this.toggleTextFlicker();
        this.toggleContentDiffusion();
    }

    toggleTouch() {
        this.useTouch = !this.useTouch;
        if (this.useTouch) {
            this.terminalEffects = this.terminalEffects.replace(this.hoverKey, this.touchKey);
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.touchKey, this.hoverKey);
        }
    }
    toggleMonitorPixelation() {
        this.useMonitorPixelation = !this.useMonitorPixelation;
        if (this.useMonitorPixelation) {
            this.terminalEffects += this.monitorPixelation;
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.monitorPixelation, "");
        }
    }
    toggleMonitorDiffusion() {
        this.useMonitorDiffusion = !this.useMonitorDiffusion;
        if (this.useMonitorDiffusion) {
            this.terminalEffects += this.monitorDiffusion;
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.monitorDiffusion, "");
        }
    }
    toggleMonitorFlicker() {
        this.useMonitorFlicker = !this.useMonitorFlicker;
        if (this.useMonitorFlicker) {
            this.terminalEffects += this.monitorFlicker;
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.monitorFlicker, "");
        }
    }
    setMonitorScaling(){
        document.documentElement.style.fontSize = this.monitorScaling + "rem";
    }

    setTextStyle(value: string){
        this.textStyle = value;
        value = this[value];
        document.documentElement.style.setProperty("--font-family", value);
    }
    toggleTextBold() {
        this.useTextBold = !this.useTextBold;
        if (this.useTextBold) {
            document.documentElement.style.fontWeight = "bold";
            if(this.useTextFlicker) this.toggleTextFlicker();
            if(this.useTextDiffusion) this.toggleTextDiffusion();
        } else {
            document.documentElement.style.fontWeight = "normal";
        }
    }
    toggleTextDiffusion() {
        this.useTextDiffusion = !this.useTextDiffusion;
        if (this.useTextDiffusion) {
            this.terminalEffects += this.textDiffusion;
            if(this.useTextBold) this.toggleTextBold();
            if(this.useTextFlicker) this.toggleTextFlicker();
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.textDiffusion, "");
        }
    }
    toggleTextFlicker() {
        this.useTextFlicker = !this.useTextFlicker;
        if (this.useTextFlicker) {
            this.terminalEffects += this.textFlicker;
            if(this.useTextBold) this.toggleTextBold();
            if(this.useTextDiffusion) this.toggleTextDiffusion();
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.textFlicker, "");
        }
    }
    toggleContentDiffusion() {
        this.useContentDiffusion = !this.useContentDiffusion;
        if (this.useContentDiffusion) {
            this.terminalEffects += this.contentDiffusion;
        } else {
            this.terminalEffects = this.terminalEffects.replace(this.contentDiffusion, "");
        }
    }
    setColors(colour: string, background: string): CSSStyleDeclaration {
        let style = document.documentElement.style;        
        style.setProperty("--color-background", `rgba(${background})`);
        style.setProperty("--color-main", `rgba(${colour})`);
        style.setProperty("--color-opaque", `rgba(${colour}, 0.3)`);
        style.setProperty("--color-dim", `rgba(${colour}, 0.2)`);
        style.setProperty("--color-silhuet", `rgba(${colour}, 0.1)`);
        return style;
    }
    flickerWhite(style: CSSStyleDeclaration){
        style.setProperty("--color-flicker", `rgba(255, 255, 255, 0.15)`);        
    }
    flickerBlue(style: CSSStyleDeclaration){
        style.setProperty("--color-flicker", `rgba(1, 26, 66, 0.15)`);
    }
    flickerBlack(style: CSSStyleDeclaration){
        style.setProperty("--color-flicker", `rgba(20, 20, 20, 0.2)`);
    }
    opacityDark(style: CSSStyleDeclaration){
        style.setProperty("--opaque", "0.5");
    }
    opacityLight(style: CSSStyleDeclaration){
        style.setProperty("--opaque", "0.8");
    }
    pixelationDark(style: CSSStyleDeclaration){
        style.setProperty("--pixelation", `linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%), 
            linear-gradient(90deg, 
            rgba(255, 0, 0, 0.06), 
            rgba(0, 255, 0, 0.02), 
            rgba(0, 0, 255, 0.06))`);

            /*`repeating-linear-gradient(
            rgba(18, 16, 16, 0), 
            rgba(0, 0, 0, 0.3))` */
    }
    pixelationLight(style: CSSStyleDeclaration){
        style.setProperty("--pixelation", `linear-gradient(
            rgba(200, 200, 200, 0) 50%, 
            rgba(255, 255, 255, 0.25) 50%), 
            linear-gradient(90deg, 
            rgba(255, 0, 0, 0.06), 
            rgba(0, 255, 0, 0.02), 
            rgba(0, 0, 255, 0.06))`);
    }
    setBlackBackground(){
        if(this.colorSetting.endsWith("OnBlack")){
            document.documentElement.style.setProperty("--color-background", `rgba(${this.blackOptions[this.blackIndex].value})`);
        }
    }
    setSpectrumOnBlack() {
        this.colorSetting = "setSpectrumOnBlack";
        let style = this.setColors(this.toRGB(this.wavelength), this.blackOptions[this.blackIndex].value);
        let newCursor = style.cursor;
        if(this.wavelength <= "495"){
            newCursor = "url('/crosshair-blue.cur'), auto";
        } else if(this.wavelength <= "560"){
            newCursor = "url('/crosshair-green.cur'), auto";
        } else if(this.wavelength <= "595"){
            newCursor = "url('/crosshair-yellow.cur'), auto";
        } else {
            newCursor = "url('/crosshair-amber.cur'), auto";
        }
        if(style.cursor != newCursor){
            setTimeout(() => style.cursor = newCursor, 100);
        }
        this.flickerBlack(style);
        this.opacityDark(style);
        this.pixelationDark(style);
    }

    setWhiteOnBlack() {
        this.colorSetting = "setWhiteOnBlack";
        let style = this.setColors("255, 255, 255", this.blackOptions[this.blackIndex].value);
        style.cursor = "crosshair";
        this.flickerBlack(style);
        this.opacityDark(style);
        this.pixelationDark(style);
    }
    setNeon() {
        this.colorSetting = "setNeon";
        let style = this.setColors("255,97, 190", "25,50,155");
        style.cursor ="url('/crosshair-neon.cur'), auto";
        this.flickerBlue(style);
        this.opacityDark(style);
        this.pixelationDark(style);
    }
    setWhiteOnBlue() {
        this.colorSetting = "setWhiteOnBlue";
        let style = this.setColors("255, 255, 255", "1, 36, 86");
        style.cursor = "crosshair";
        this.flickerBlue(style);
        this.opacityDark(style);
        this.pixelationDark(style);
    }
    setBlackOnWhite() {
        this.colorSetting = "setBlackOnWhite";
        let style = this.setColors("40, 40, 40", "255, 255, 255");
        style.cursor = "crosshair";
        this.flickerWhite(style);
        this.opacityLight(style);
        this.pixelationLight(style);
    }
    setBlueInkOnWhite() {
        this.colorSetting = "setBlueInkOnWhite";
        let style = this.setColors("49, 70, 95", "255, 255, 255");
        style.cursor = "crosshair";
        this.flickerWhite(style);
        this.opacityLight(style);
        this.pixelationLight(style);
    }
    setBrownInkOnWhite() {
        this.colorSetting = "setBrownInkOnWhite";
        let style = this.setColors("96, 85, 79", "255, 255, 255");
        style.cursor = "crosshair";
        this.flickerWhite(style);
        this.opacityLight(style);
        this.pixelationLight(style);
    }
    toRGB(wavelength): string {
        var Gamma = 0.80,
            IntensityMax = 255,
            factor, red, green, blue;
        if ((wavelength >= 380) && (wavelength < 440)) {
            red = -(wavelength - 440) / (440 - 380);
            green = 0.0;
            blue = 1.0;
        } else if ((wavelength >= 440) && (wavelength < 490)) {
            red = 0.0;
            green = (wavelength - 440) / (490 - 440);
            blue = 1.0;
        } else if ((wavelength >= 490) && (wavelength < 510)) {
            red = 0.0;
            green = 1.0;
            blue = -(wavelength - 510) / (510 - 490);
        } else if ((wavelength >= 510) && (wavelength < 580)) {
            red = (wavelength - 510) / (580 - 510);
            green = 1.0;
            blue = 0.0;
        } else if ((wavelength >= 580) && (wavelength < 645)) {
            red = 1.0;
            green = -(wavelength - 645) / (645 - 580);
            blue = 0.0;
        } else if ((wavelength >= 645) && (wavelength < 781)) {
            red = 1.0;
            green = 0.0;
            blue = 0.0;
        } else {
            red = 0.0;
            green = 0.0;
            blue = 0.0;
        };
        // Let the intensity fall off near the vision limits
        if ((wavelength >= 380) && (wavelength < 420)) {
            factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
        } else if ((wavelength >= 420) && (wavelength < 701)) {
            factor = 1.0;
        } else if ((wavelength >= 701) && (wavelength < 781)) {
            factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
        } else {
            factor = 0.0;
        };
        if (red !== 0) {
            red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
        }
        if (green !== 0) {
            green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
        }
        if (blue !== 0) {
            blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
        }
        return `${red},${green},${blue}`;
    }
}