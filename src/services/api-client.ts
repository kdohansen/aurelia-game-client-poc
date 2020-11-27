//import { HttpClient, json } from "aurelia-http-client";

/*
class RequestMethod {
    constructor(
        private requestConfig: RequestInit, 
        private baseUrl: string, 
        private client: HttpClient) {
        
    }

    public get(action: string): RequestExecution{
        this.requestConfig.method = 'GET';        
        return this.next(action);
    }
    public postJson(action: string, content: any): RequestExecution{
        let postHeaders = new Headers(this.requestConfig.headers);
        postHeaders.append("Content-Type", "application/json");
        this.requestConfig.method = 'POST';
        this.requestConfig.body = json(content);
        this.requestConfig.headers = postHeaders;
        return this.next(action);
    }
    public postText(action: string, content: string): RequestExecution{
        this.requestConfig.method = 'POST';
        this.requestConfig.body = content;
        return this.next(action);
    }
    private next(action: string): RequestExecution{
        return new RequestExecution(new Request(this.baseUrl + action, this.requestConfig), this.client);
    }
}
class RequestExecution {
    constructor(private request: Request, private client: HttpClient) {
        
    }
    public promise(): Promise<Response>{
        return this.client.fetch(this.request)
        .catch(x => {
            console.log(x);
            return x;
        })
        .then(x => {
            console.log(x);
            return x;
        });
    }

    public async response(): Promise<Response>{
        return await this.client.fetch(this.request);
    }
    
    public async objectResult<T>(typeInstance?: T): Promise<T>{
        return await this.client.fetch(this.request)
            .then(async response => {
                if (Boolean(typeInstance)){
                    // Do this when the dto has methods
                    let x = await response.json();
                    return Object.assign(typeInstance, x);
                }
                // Do this when the dto is an interface or only has properties
                return await response.json();
            });
    }

    public async stringResult(): Promise<string>{
        return await this.client.fetch(this.request)
            .then(async response => await response.text());
    }

    public async jsonResult(): Promise<any>{
        return await (await this.client.fetch(this.request)).json();
    }
}
*/
export class ApiClient {
    /*
    private client: HttpClient;

    constructor() {
        this.client = new HttpClient().configure(config => {
            config
                .useStandardConfiguration()
                .withInterceptor({
                    request(request) {
                        // Add auth header
                        return request;
                    }
                })
                .withBaseUrl("http://localhost:5000");
        });
    }
    private baseRequestConfig(): RequestInit {
        var init: RequestInit = {
            cache: "no-cache"
        };
        return init;
    }
    private buildConfig(headers: Headers): RequestInit{
        let config = this.baseRequestConfig();
        let token = sessionStorage.getItem('access_token');
        if(Boolean(token))
            headers.append("Authorization", "Bearer " + token);
        config.headers = headers;
        return config;
    }
    get character() {
        var config = this.buildConfig(new Headers());
        return new RequestMethod(config, this.client.baseUrl + "/api/character/", this.client);
    }
    get campaign(): RequestMethod{
        var config = this.buildConfig(new Headers());
        return new RequestMethod(config, this.client.baseUrl + "/api/campaign/", this.client);
    }
    get user(): RequestMethod{
        var config = this.buildConfig(new Headers());
        return new RequestMethod(config, this.client.baseUrl + "/api/user/", this.client);
    }
    get system(): RequestMethod{
        var config = this.buildConfig(new Headers());
        return new RequestMethod(config, this.client.baseUrl + "/api/system/", this.client);
    }
    get security(): RequestMethod{
        var config = this.buildConfig(new Headers());
        return new RequestMethod(config, this.client.baseUrl + "/api/security/", this.client);
    }
    */
}