import 'reflect-metadata';
import http from 'http';
import chalk from 'chalk';
import app from './app';

const main = () => {
	const server = http.createServer(app);

	const port = process.env.PORT || 4001;

	server.listen(port, () => {
		console.log(
			`${chalk.yellow.bold('Post')} service is up ${chalk.green.bold('successfully')} on port ${chalk.blue.bold(port)}`,
		);
	});
};

main();
