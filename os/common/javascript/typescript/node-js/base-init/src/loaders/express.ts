import express, { Request, Response, NextFunction }from 'express';
import routes from '../routes';

export default async ({ app }: { app: express.Application }) => {
    require('dotenv').config();
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');

    app.use(require('helmet')())

    app.use(routes)

    // import type { ErrorRequestHandler } from "express";
    // export type ErrorRequestHandler = (err: any, req: Request, res: Response, next:NextFunction
    // const errorHandler: ErrorRequestHandler = (err, req, res, next) => {};
    // app.use(errorHandler); 다음과 같은 명세를 해도 된다.

    app.use(function (err:any, req:Request, res:Response, next:NextFunction) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "production" ? err : {};
        
        // render the error page
        res.status(err.status || 500);
        res.render("error");
        });
    app.get('/', (req: Request, res: Response, next: NextFunction)=>{
        res.send('init')
    });

    // ...More middlewares
  
    console.log('Express Intialized ✅');
    return app;   // Return the express app
}