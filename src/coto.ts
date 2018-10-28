import { IncomingMessage, ServerResponse } from 'http';
import { parse as urlParse, UrlWithStringQuery } from 'url';
import { request } from 'https';

export enum HTTP_VERB {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

export class Coto {

    private hasAnswered: boolean = false;

    constructor(private request: IncomingMessage, private response: ServerResponse) {
        if (request == null) { throw Error('erreur'); }

    }

    private performResponse = (f: (request: IncomingMessage, response: ServerResponse, r?: RegExpExecArray) => void, r?: RegExpExecArray) => {
        console.log('Coto request.url:', this.request.url); // DEBUG
        if (!this.hasAnswered) {
            this.hasAnswered = true;
            f(this.request, this.response, r);
        }
    }

    checkVerb = (verb: HTTP_VERB) => this.request.method === HTTP_VERB[verb];

    // DEPREC: too rigid
    checkPath = (pathName: string): boolean => {
        if(this.request.url === undefined){ return false; }
        return urlParse(this.request.url).pathname === pathName;
    };

    checkRegex = (regex: RegExp): boolean => {
        if(this.request.url === undefined){ return false; }
        return regex.test(urlParse(this.request.url).pathname);
    };

    // TO replace by httpMethodRegex
    httpMethod = (verb: HTTP_VERB) =>
        (pathName: string, f: any) => {
            if (this.checkVerb(verb) && this.checkPath(pathName)) {
                this.performResponse(f);
            }
        };

    httpMethodRegex = (verb: HTTP_VERB) =>
        (regex: RegExp, f: (request: IncomingMessage, response: ServerResponse, r?: RegExpExecArray) => void) => {
            const regExpExecArray: RegExpExecArray = regex.exec(urlParse(this.request.url).pathname);
            if (this.checkVerb(verb) && regExpExecArray != null) {
                this.performResponse(f, regExpExecArray);
            }
        };

    public getRegex = this.httpMethodRegex(HTTP_VERB.GET);
    public get = this.httpMethod(HTTP_VERB.GET);
    public put = this.httpMethod(HTTP_VERB.PUT);
    public post = this.httpMethod(HTTP_VERB.POST);
    public delete = this.httpMethod(HTTP_VERB.DELETE);

    // this should be placed after all others http methods
    public else = this.performResponse;
}

