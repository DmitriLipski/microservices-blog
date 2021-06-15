import 'reflect-metadata';
import http from 'http';
import chalk from 'chalk';
import app from './app';

const main = () => {
	const server = http.createServer(app);

	const port = process.env.PORT || 4003;

	server.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(
			`${chalk.yellow.bold('Query')} service is up ${chalk.green.bold(
				'successfully',
			)} on port ${chalk.blue.bold(port)}`,
		);
	});
};

main();
