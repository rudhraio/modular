import dev from "./dev.json";


const environments: any = {
    development: dev
}
const env = process.env.NODE_ENV || 'dev';
const config = environments[env];
console.log("environments[env]", dev);
console.log("environments[env]", env);

export default config;