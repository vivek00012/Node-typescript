
* This zippay project is built using [Express.js] web framework, and is using [Typescript Lang] for writing the app's logic. 

* It uses Node's [Cluster API] .This helps us to take advantage of multi-core systems & to handle the load.
* For storing custom constant configurations within the `dev.env` - [env-cmd] package is used.
* For Database - Repo contains the use of [Mongoose] (ie. [MongoDB] object modeling for [Node.js]).
* For Routing - Repo contains the use of [express-router] & haveAPI Routes. 
* For Logging - Repo uses custom Log class built in middlewares folder, and it creates logs file by date .
* For Handling Exception - Repo contains `NativeEvent` and `Handler` class.
* For mocking database - mongodb-memory-server in memory database is used - integrated in providers/database.ts.
* So far controller intergration tests are written.
* To Log - use `Log.info('Log message')`. Other options for logging are `Log.warn`, `Log.error` & `Log.custom`.



# Contents
* [Global Requisites](#global-requisites)
* [Install, Configure & Run](#install-configure--run)
* [List of Routes](#list-of-routes)

# Global Requisites

* node (>= 16.13.2)
* tsc (>= 4.4.4)
* typescript (>= 4.8.4)
* mongoose (>= 6.7.2)


# Install, Configure & Run

Below mentioned are the steps to install, configure & run in any machine

npm install;

# Build the app
npm run build

# Run the app
npm run dev;

# Test the app
npm run Test;


# List of Routes

```
# API Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  POST   | /api
  POST   | /api/createUser
  POST   | /api/createAccount
+--------+-------------------------+
```