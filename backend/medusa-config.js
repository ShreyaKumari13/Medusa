const dotenv = require('dotenv')

let ENV_FILE_NAME = '.env';
try {
  dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "*";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "*";

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";

module.exports = {
  projectConfig: {
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra: { 
      ssl: { 
        rejectUnauthorized: false 
      } 
    },
  },
  plugins: [],
  featureFlags: {
    medusa_v2: true
  },
  cli_admin_disable: process.env.NODE_ENV === "production",
  admin_cors: process.env.ADMIN_CORS || "*",
  store_cors: process.env.STORE_CORS || "*"
};
