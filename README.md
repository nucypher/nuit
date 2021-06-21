# Nuit

Official NuCypher web staking UI.  This repository is currently a work-in-progress.

```
  yarn react-app:start
    Starts the development server.

  yarn react-app:test
    Runs the tests

  yarn react-app:build
  yarn react-app:build-production
  yarn react-app:build-staging
    Builds the app for production.

  yarn subgraph:codegen
    Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

  yarn subgraph:deploy
    Deploys the subgraph to the official Graph Node.

  yarn workspace @project/react-app add <package name(s)>
    Add new libraries to main react app
```

### Running in docker (recommended)
_Note: all these commands can be run without Docker via eg: `yarn react-app:start`.  Docker is used to reduce some of the variables between different local Node environments._

##### install (on first run or after dependency changes)
```
docker run -it -v $(pwd):/work --workdir /work -p 3000:3000  node:latest yarn install
```

##### run the dev server
```
docker run -it -v $(pwd):/work --workdir /work -p 3000:3000  node:latest yarn react-app:start
```

##### Build for production
```
# PRODUCTION
docker run -it -v $(pwd):/work --workdir /work -p 3000:3000 node:latest yarn react-app:build-production

# STAGING
docker run -it -v $(pwd):/work --workdir /work -p 3000:3000 node:latest yarn react-app:build-staging
```

##### To deploy to AWS:

* Check that you have an `.env.production` file located at `packages/react-app/.env.production` containing:
  1. An Infura APP id for WalletConnect functionality - `REACT_APP_INFURA_ID=<app ID from infura>`
  2. The Public URL for the deployment - `PUBLIC_URL=<URL>`
* build the app (see above)
* Ensure you have an [AWS profile configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) called "nucypher", then `yarn deploy`
   * to deploy to staging `yarn deploy`
   * to deploy to production `yarn deploy production`
