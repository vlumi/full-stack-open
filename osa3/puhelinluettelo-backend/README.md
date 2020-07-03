# Puhelinluettelo

Full stack version of the phonebook app for the [Full Stack Open](https://fullstackopen.com) course.

A version running on the internet can be found at:

- https://puhelinluettelo.misaki.fi/

## Commands

### Building

- `npm run build-ui`
  - Builds the front-end module and copies it under `build/`

### Running

- `npm run dev`
  - Run in development mode using [nodemon](https://www.npmjs.com/package/nodemon).
- `npm run prod`
  - Run in production mode as a daemon, using [pm2](https://pm2.keymetrics.io/).
  - Logs can be tailed with `npm run prod:log`
- `npm run pm2 -- ls`
  - List the [pm2](https://pm2.keymetrics.io/) processes.
- `npm run pm2 -- stop [index]`
  - Stop the [pm2](https://pm2.keymetrics.io/) process with the given index.
