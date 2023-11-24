import dev from "./dev";

const environments: any = {
    development: dev
}
const env = process.env.NODE_ENV || 'dev';
const config = environments[env];

export default config;