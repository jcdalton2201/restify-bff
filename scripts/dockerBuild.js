import chalk from 'chalk';

console.log(
    chalk.green(
        `running build docker for version ${process.env.npm_package_version}`
    )
);
import dockerCmdJs from 'docker-cmd-js';
const cmd = new dockerCmdJs.Cmd();
const buildCmd = `docker build -t populus/liabilities-bff:${process.env.npm_package_version} .`;
console.log(buildCmd);
cmd.run(buildCmd)
    .then((msg) => {
        console.log(chalk.green(msg));
    })
    .catch((error) => {
        console.log(chalk.red(error));
    });
