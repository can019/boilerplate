import express, { Request, Response, NextFunction } from 'express'
const PORT: String = '13000' 
const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.send('init')
});

app.listen(PORT,() =>{
    console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT}🛡️
    ################################################
  `);
});