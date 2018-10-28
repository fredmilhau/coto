import { IncomingMessage, ServerResponse } from 'http';
import { parse as urlParse } from 'url';
import { Coto } from './coto';
import { Dao } from './service/Dao';
const HTTP = require('http');
// const URL = require('url'); // alternative


const server = HTTP.createServer((request: IncomingMessage, response: ServerResponse) => {

    const coto: Coto = new Coto(request, response);

    // TODO: get index.html file
    // coto.get('/', (req: IncomingMessage, res: ServerResponse) => {
    //
    //
    //
    // });

    // liste les messages
    coto.getRegex(/^\/messages\/([a-zA-Z0-9_]+)$/, (req: IncomingMessage, res: ServerResponse, regExpExecArray: RegExpExecArray) => {

        const id: string = regExpExecArray[1];

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write(`<h1>find message id:${id}</h1>`);
        res.end();
    });


    // coto.get('/messages', (req: IncomingMessage, res: ServerResponse) => {
    coto.getRegex(/^\/messages\/?$/, (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write('<h1>liste les messages</h1>');
        res.end();
    });

    // remplace tous les messages
    coto.put('/messages', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write('<h1>remplace tous les messages</h1>');
        res.end();
    });

    // créé une nouvelle entrée et renvoie l'uri ou l'id generée
    coto.post('/messages', (req: IncomingMessage, res: ServerResponse) => {
        // find POST body data
        // const buffers: Buffer[] = [];
        // req.on('data', (buffer: Buffer) => {
        //     buffers.push(buffer);
        // }).on('end', () => {
        //     const body = Buffer.concat(buffers).toString();

        //     response.setHeader('Content-Type', 'application/json');
        //     response.writeHead(200);

        //     response.write(JSON.stringify(body));
        //     response.end();
        // });


        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write('<h1>créé une nouvelle entrée</h1>');
        res.end();
    });


    coto.get('/mongo', (req: IncomingMessage, res: ServerResponse) => {

        new Dao();

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        res.writeHead(200);
        res.write('<h1>mongo</h1>');
        res.end();
    });



    coto.get('/info', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        res.writeHead(200);
        res.write('<h1>Info yeah</h1>');
        res.end();
    });


    coto.get('/404', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.write('<h1>404 not found</h1><h2>(else)</h2>');
        res.end();
    });


    coto.post('/', (req: IncomingMessage, res: ServerResponse) => {
        // find POST body data
        const buffers: Buffer[] = [];
        req.on('data', (chunk: Buffer) => {
            buffers.push(chunk);
        }).on('end', () => {
            const body = Buffer.concat(buffers).toString();

            response.setHeader('Content-Type', 'application/json');
            response.writeHead(200);

            response.write(JSON.stringify(body));
            response.end();
        });
    });


    coto.else((req: IncomingMessage, res: ServerResponse) => {

        const txt: any = {};

        txt['request'] = {
            headers: request.headers,
            httpVersion: request.httpVersion,
            method: request.method,
            trailers: request.trailers,
            statusCode: request.statusCode,
            statusMessage: request.statusMessage,
            url: request.url,
        };


        txt['parsed url'] = urlParse(request.url);
        txt['parsed testURL'] = urlParse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

        // response.setHeader('Content-Type', 'text/html');
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('toto', 'totobar');
        response.writeHead(200, 'tout est ok !');

        // response.write(JSON.stringify(request.headers));
        response.write(JSON.stringify(txt));
        response.end();
    });

});
server.listen(3000);



