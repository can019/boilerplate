// Static variables
import * as configure from "./configure.json";
const DEV_DB_URI:string = configure.develop.database.uri;
const DEV_DB_PORT: string = configure.develop.database.port;
const DEV_URI: string = configure.develop.uri;
const DEV_PORT: string = configure.develop.port;

const MAIN_DB_URI: string = configure.main.database.uri;
const MAIN_DB_PORT: string = configure.main.database.port;
const MAIN_URI: string = configure.main.uri;
const MAIN_PORT: string = configure.main.port;

function getDomainUri(condition: string): string{
    if(condition === "dev")
        return DEV_URI;
    else
        return MAIN_URI;
}
function getDomainPort(condition: string): string{
    if(condition === "dev")
        return DEV_PORT;
    else
        return MAIN_PORT;
}
function getDbUri(condition: string): string{
    if(condition === "dev")
        return DEV_DB_URI;
    else
        return MAIN_DB_URI;
}

function getDbPort(condition: string): string{
    if(condition === "dev")
        return DEV_DB_PORT;
    else
        return MAIN_DB_PORT;
}
export { getDomainUri, getDomainPort, getDbUri, getDbPort}