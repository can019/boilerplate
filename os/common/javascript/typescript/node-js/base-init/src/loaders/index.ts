const figlet = require('figlet');
const env = require('dotenv');
import expressLoader from './express';

export default async ({ expressApp } : {expressApp: any}) => {
    env.config()
    console.log(figlet.textSync(process.env.PROJECT_NAME, {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true
    }));
    console.warn("Express in Intialize sequence ...")
    await expressLoader({ app: expressApp });
}