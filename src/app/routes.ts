import { RouteConfig } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export interface RouterSection {
    key: string;
    currentRoute: string;
    fallbackRoute: string;
    values: RouteConfig[];
}
export class Routes {    
    static systemRoutes: RouterSection = {
        key: "setSystemRoutes",
        currentRoute: "identification",
        fallbackRoute: "identification",
        values: [
            {
                route: ['', 'identification'],
                title: "Identification",
                name: 'identification',
                moduleId: PLATFORM.moduleName('routes/system/identification/identification')
            },
            {
                route: 'test',
                title: "Test",
                name: 'test',
                moduleId: PLATFORM.moduleName('routes/system/test/test')
            }
        ]
    };
    static userRoutes: RouterSection = {
        key: "setUserRoutes",
        currentRoute: "user",
        fallbackRoute: "identification",
        values: [
            {
                route: ['user', 'user/profile'],
                title: "User profile",
                name: 'user',
                moduleId: PLATFORM.moduleName('routes/user/user/user')
            },
            {
                route: 'user/campaigns',
                title: "User campaigns",
                name: 'campaigns',
                moduleId: PLATFORM.moduleName('routes/user/campaigns/campaigns')
            },
            {
                route: 'user/console-settings',
                title: "Console settings",
                name: 'console-settings',
                moduleId: PLATFORM.moduleName('routes/user/console-settings/console-settings')
            },
            {
                route: 'user/display-settings',
                title: "Display settings",
                name: 'display-settings',
                moduleId: PLATFORM.moduleName('routes/user/display-settings/display-settings')
            },
            {
                route: 'user/sound-settings',
                title: "Sound settings",
                name: 'sound-settings',
                moduleId: PLATFORM.moduleName('routes/user/sound-settings/sound-settings')
            }
        ]
    };
    static campaignRoutes: RouterSection = {
        key: "setCampaignRoutes",
        currentRoute: "campaign",
        fallbackRoute: "user/campaigns",
        values: [
            {
                route: ['campaign', 'campaign/settings'],
                title: "Campaign settings",
                name: 'campaign',
                moduleId: PLATFORM.moduleName('routes/campaign/campaign/campaign')
            },
            {
                route: 'campaign/sessions',
                title: "Sessions",
                name: 'sessions',
                moduleId: PLATFORM.moduleName('routes/campaign/sessions/sessions')
            },
            {
                route: 'campaign/characters',
                title: "Characters",
                name: 'characters',
                moduleId: PLATFORM.moduleName('routes/campaign/characters/characters')
            },
            {
                route: 'campaign/story-arcs',
                title: "Story arcs",
                name: 'story-arcs',
                moduleId: PLATFORM.moduleName('routes/campaign/story-arcs/story-arcs')
            },
            {
                route: 'campaign/encounters',
                title: "Encounters",
                name: 'encounters',
                moduleId: PLATFORM.moduleName('routes/campaign/encounters/encounters')
            }
        ]
    };
    static characterRoutes: RouterSection = {
        key: "setCharacterRoutes",
        currentRoute: "character",
        fallbackRoute: 'campaign/characters',
        values: [
            {
                route: ['character', 'character/profile'],
                title: "Character profile",
                name: 'character',
                moduleId: PLATFORM.moduleName('routes/character/profile/profile')
            },
            {
                route: 'character/skills',
                title: "Capabilities",
                name: 'skills',
                moduleId: PLATFORM.moduleName('routes/character/skills/skills')
            },
            {
                route: 'character/combat',
                title: "Combat performance",
                name: 'combat',
                moduleId: PLATFORM.moduleName('routes/character/combat/combat')
            },
            {
                route: 'character/biometrics',
                title: "Biometrics",
                name: 'biometrics',
                moduleId: PLATFORM.moduleName('routes/character/biometrics/biometrics')
            },
            {
                route: 'character/psych',
                title: "Psych evaluation",
                name: 'psych',
                moduleId: PLATFORM.moduleName('routes/character/psych/psych')
            },
            {
                route: 'character/assets',
                title: "Assets",
                name: 'assets',
                moduleId: PLATFORM.moduleName('routes/character/assets/assets')
            },
            {
                route: 'character/background',
                title: "Background check",
                name: 'background',
                moduleId: PLATFORM.moduleName('routes/character/background/background')
            },
            {
                route: 'character/information',
                title: "Additional info",
                name: 'info',
                moduleId: PLATFORM.moduleName('routes/character/info/info')
            }
        ]
    };
    static simulationRoutes: RouterSection = {
        key: "setSimulationRoutes",
        currentRoute: "simulation",
        fallbackRoute: "campaign/characters",
        values: [
            {
                route: ['simulation', 'simulation/settings'],
                title: "Simulation",
                name: 'simulation',
                moduleId: PLATFORM.moduleName('routes/simulation/simulation')
            }
        ]
    };
    static allSections = [Routes.systemRoutes, Routes.characterRoutes, Routes.campaignRoutes, Routes.userRoutes, Routes.simulationRoutes];
    static allRoutes = [...Routes.systemRoutes.values, ...Routes.characterRoutes.values, ...Routes.campaignRoutes.values, ...Routes.userRoutes.values, ...Routes.simulationRoutes.values];
}