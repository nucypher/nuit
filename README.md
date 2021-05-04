# Nuit

Official NuCypher web staking UI.  This repository is currently a work-in-progress.

```
  yarn react-app:start
    Starts the development server.

  yarn react-app:test
    Runs the tests

  yarn react-app:build
    Builds the app for production.

  yarn subgraph:codegen
    Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

  yarn subgraph:deploy
    Deploys the subgraph to the official Graph Node.

  yarn workspace @project/react-app add <package name(s)>
    Add new libraries to main react app
```

### To run in Docker (recommended)

```
docker run -it -v $(pwd):/work --workdir /work -p 3000:3000  node:latest yarn react-app:start

```


### to deploy to AWS:
* first run `yarn react-app:build` if you haven't built the app
* ensure you have an [AWS profile configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) called "nucypher"
* then `yarn deploy`