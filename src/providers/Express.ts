import * as express from "express";
import apiRouter from '../routes/Api';
import * as bodyParser from 'body-parser';
import ExceptionHandler from '../exceptions/Handler';

class Express {

	public app: express.Application;

	/**
	 * Creates an instance of express.
	 */
	constructor () {
		this.app = express();
		this.app.use(bodyParser.json());

		this.mountRoutes();
	}

	private mountRoutes (): void {
		this.app.use(`/${process.env.API_PREFIX}`, apiRouter)
	}

	/**
	 * Starts the express server
	 */
	public init (): any {
		const port = process.env.PORT || 3000;

		this.app.use(ExceptionHandler.logErrors);
		this.app.use(ExceptionHandler.clientErrorHandler);

		this.app.listen(port, () => {
			return console.log(`Server Running on 'http://localhost:${port}'`);
		}).on('error', (_error) => {
			return console.log('Error: ', _error.message);
		 });;
	}
}
export default new Express();
