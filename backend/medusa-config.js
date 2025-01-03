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

const config = {
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
  publishableApiKeyScopes: {
    sales_channel_id: [],
    store: true
  }
};

// Only enable admin in development
if (process.env.NODE_ENV !== "production") {
  config.admin_cors = ADMIN_CORS;
  config.store_cors = STORE_CORS;
  config.admin = {
    serve: true,
    path: "/app",
    outDir: "build/admin",
    develop: {
      open: false,
      port: 7001,
      serve: true,
      path: "/app/*"
    }
  };
}

module.exports = config;
