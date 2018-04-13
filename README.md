# Bloomon-code-challenge

This project is the solution to the Bloomon code-challenge.

## Installing dependencies

To run this code, you must have ** Node.js LTS >= 8.10.0 ** and install the project dependencies with the following command in the application root directory.
```bash
yarn
```

## Running

To run use the command below:
```bash
node bin <input-file-path>
```

The **input-file** must follows the model described in the code-challenge [document](https://drive.google.com/file/d/1iHIzsBid0BU-ns7tU47kBlrKEiBrpnsR/view).


## Dockerizing

To run on a Docker container, first build the image:
```bash
docker build -t bloomon .
```

Then run the container:
```bash
docker run -v $(pwd):/var/input-files bloomon node bin /var/input-files/input-file-name.txt
```

or 

```bash
docker run -v /path/to/input/files:/var/input-files bloomon node bin /var/input-files/input-file-name.txt
```

## Tests

The tests were made using TDD methodology.

To run tests:
```bash
yarn 
yarn test
# or 
npm i
npm test
```

PS: Not all necessary tests were implemented in this code-challenge because the purpose is just for prove the concepts.