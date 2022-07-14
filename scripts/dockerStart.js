import chalk from 'chalk';
console.log(
    chalk.green(
        `starting docker for version ${process.env.npm_package_version}`
    )
);
import dockerCmdJs from 'docker-cmd-js';
const cmd = new dockerCmdJs.Cmd();
const buildCmd = `docker run
--rm --name liabilities-bff
-p 8091:8080
-e "ENV=sb"
-e "https_proxy=http://docker.for.mac.host.internal:8099"
-e "http_proxy=http://docker.for.mac.host.internal:8099"
-e "HTTPS_PROXY=http://docker.for.mac.host.internal:8099"
-e "HTTP_PROXY=http://docker.for.mac.host.internal:8099"
populus/liabilities-bff:${process.env.npm_package_version}`;
console.log(buildCmd);
cmd.debug()
    .run(buildCmd, true)
    .then((msg) => {
        console.log(chalk.green(msg));
    })
    .catch((error) => {
        console.log(chalk.red(error));
    });
