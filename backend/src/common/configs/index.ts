import dotenv from 'dotenv';
dotenv.config();

import dev from "./dev";

const environments: any = {
    dev: dev
}
const env = process.env.NODE_ENV || 'dev';
const config = environments[env];

export default config;