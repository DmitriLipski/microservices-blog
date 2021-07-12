import 'reflect-metadata';
import http from 'http';
import chalk from 'chalk';
import app from './app';

const main = () => {
	const server = http.createServer(app);

	const port = process.env.PORT || 4004;

	server.listen(port, () => {
		console.log(
			`${chalk.yellow.bold('Moderation')} service is up ${chalk.green.bold(
				'successfully',
			)} on port ${chalk.blue.bold(port)}`,
		);
	});
};

main();
