# Bloomon-code-challenge

This project is the solution to the Bloomon code-challenge.

## Installing dependencies

To run this code, you must have ** Node.js LTS >= 8.10.0 ** and install the project dependencies with the following command in the application root directory.
```bash
npm install
```

## Running

To run use the command below:
```bash
node bin
# or
npm start
```

If you want to run in debug mode (more verbose logs), add the environment variable _DEBUG_ as follows:
```bash
DEBUG=true node bin
# or 
DEBUG=true npm start
```

### Extra task
There is a limit for the storage of unused flowers. By default, this limit is 256 flowers, but it can be changed using the environment variable _MAX_STORAGE_ as follows:
```bash
MAX_STORAGE=10 node bin
# or
MAX_STORAGE=10 npm start
```
    
## Running as a command line tool

To run as a command line tool, first link the project:
```bash
npm link
```

Or install directly from GitHub as a command line tool:
```bash
npm i -g https://github.com/jaimelopesflores/bloomon-code-challenge.git
```

Finally run the **bloomon-cli**
```bash
bloomon-cli
```

## Dockerizing

To run on a Docker container, first build the image:
```bash
docker build -t bloomon-cli .
```

Then run the container:
```bash
docker run -it bloomon-cli
```

PS: The container is built using multi-stage build.

## Tests

To run tests:
```bash
npm i
npm test
```

PS: Not all necessary tests were implemented in this code-challenge because the purpose is just for prove the concepts.

## PS Extra Task

This code is considering first the storage of a _flower_, and then the build of a _bouquet_.
In that case, when the storage is in its limit and a new _flower_ is added, even if that _flower_ can build a new _bouquet_ the cli will crash. The cause is because the _flower_ first need to be stored, and only then a _bouquet_ can be built. For example.

If we input the following command sequence:
```bash
MAX_STORAGE=1 bloomon-cli
AS1a

aL
aS # crash! exited with 1
```

So, event this new _flower_ making possible the bouquet build, the application will crash because (again), first a _flower_ have to be stored, so then a _bouquet_ can be made.