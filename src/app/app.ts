import { SoundService } from 'services/sound-service';
import { RouterSection, Routes } from './routes';
import { autoinject } from "aurelia-framework";
import { Router, RouterConfiguration, RouteConfig, NavigationInstruction, Next, Redirect, PipelineStep } from "aurelia-router";
import { ConsoleService } from "services/console-service";
import { DisplayService } from "services/display-service";
import { AppService } from 'services/app-service';

class AuthorizeStep implements PipelineStep {
    async run(instruction: NavigationInstruction, next: Next): Promise<any> {
        await App.EnsureStateIntegrety();
        //let instructions = instruction.getAllInstructions();
        if (instruction.config.name == "identification") {
            if(App.userIsAuthenticated()) {
                return next.cancel(new Redirect('user'));
            }
            App.setRouteSection(Routes.systemRoutes, instruction.config);
            App.write(instruction.config.title + " required");
            return next();
        } else if(instruction.config.name == "test"){
            App.setRouteSection(Routes.systemRoutes, instruction.config);
            App.write(instruction.config.title + " accessed");
            return next();
        } else if(!App.userIsAuthenticated()) {
                sessionStorage.setItem('unathorizedRoute', instruction.config.name);
                App.write("Unauthorized access");
                return next.cancel(new Redirect('identification'));
        }
        let routeSection = Routes.allSections.find(x => x.values.some(y => y.name === instruction.config.name));
        if (App.setRouteSection(routeSection, instruction.config)){
            App.write(instruction.config.title + " accessed");
            return next();
        }
        if (Boolean(routeSection)){
            let route = Routes.allRoutes.find(x => x.route == routeSection.fallbackRoute);
            if(Boolean(route)){
                App.write("Access to: " + instruction.config.title + " failed"
                    + "|Reason insufficient information"
                    + "|Redirected to: " + route.title); 
                return next.cancel(new Redirect(Array.isArray(route.route) ? route.route[0]: route.route));
            }
        }
        App.write("Unknown destination|Navigation aborted");
        return next.cancel();
    }
}

@autoinject
export class App {
    router: Router;
    imageUrl: string;    
    currentRouteSection: RouterSection;
    private static instance: App;
    constructor(public consoleService: ConsoleService, public app: AppService, public displayService: DisplayService, public sound: SoundService) {
        App.instance = this;
        this.consoleService.write("System terminal initialized");
    }

    static async EnsureStateIntegrety(): Promise<void> {
        if(App.userIsAuthenticated()) return;
        await App.instance.app.trySetUser();
        if(App.userIsAuthenticated())
            App.instance.consoleService.write("Access resumed|Welcome " + App.instance.app.state.user.name);
    }
    static userIsAuthenticated(): boolean {
        return Boolean(App.instance.app.state.user);
    }
    static setRouteSection(section: RouterSection, currentRoute: RouteConfig): boolean {
        return App.instance.setRouteSection(section, currentRoute);
    }
    static write(message: string) {
        if(App.instance.consoleService.writeNavigationMessages)
            App.instance.consoleService.write(message);
    }
    private setRouteSection(section: RouterSection, currentRoute: RouteConfig): boolean {
        if (!Boolean(section)) return false;
        section.currentRoute = currentRoute.name;
        let result = this[section.key]();
        return result;        
    }
    
    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.addAuthorizeStep(AuthorizeStep);
        //config.addPreActivateStep(closeDialogStep);
        config.map(Routes.systemRoutes.values);
        config.map(Routes.simulationRoutes.values);
        config.map(Routes.characterRoutes.values);
        config.map(Routes.campaignRoutes.values);
        config.map(Routes.userRoutes.values);
    }

    showRoute(routeName: string) {
        this.router.navigateToRoute(routeName);
    }
    showSection(section: string) {
        this.router.navigateToRoute(Routes[section].currentRoute);
    }

    private setSystemRoutes(): boolean {
        this.imageUrl = "/static.gif";
        this.currentRouteSection = Routes.systemRoutes;
        return true;
    }
    private setUserRoutes(): boolean {
        if(!Boolean(this.app.state.user))
            return false
        this.imageUrl = "/static.gif";
        this.currentRouteSection = Routes.userRoutes;
        return true;
    }

    private setCampaignRoutes(): boolean {
        if(!Boolean(this.app.state.campaign))
            return false
        this.imageUrl = "/Cityscape.jpg";
        // if no selected campaign goto user
        this.currentRouteSection = Routes.campaignRoutes;
        return true;
    }

    private setCharacterRoutes(): boolean {
        if(!Boolean(this.app.state.character))
        return false
        this.imageUrl = "/static.gif";
        // if no selected character goto campaign
        this.currentRouteSection = Routes.characterRoutes;
        return true;
    }
    private setSimulationRoutes(): boolean {
        if(!Boolean(this.app.state.character))
        return false
        this.imageUrl = "/static.gif";
        // if no selected character goto campaign
        this.currentRouteSection = Routes.simulationRoutes;
        return true;
    }
}
