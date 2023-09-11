import dev from "./dev.json";


const environments: any = {
    dev: dev
}
const env = process.env.NODE_ENV || 'dev';
const config = environments[env];

export default config;