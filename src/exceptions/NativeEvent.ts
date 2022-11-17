import { Cluster } from 'cluster';
import Log from '../middlewares/Log';

class NativeEvent{
	/**
	 * catch cluster events : listening,online,disconnect,exit
	 * @param _cluster 
	 */
	public cluster (_cluster:Cluster): void {
		_cluster.on('listening', (worker) =>
			Log.info(`Server :: Cluster with ProcessID '${worker.process.pid}' Connected!`)
		);

		_cluster.on('online', (worker) =>
			Log.info(`Server :: Cluster with ProcessID '${worker.process.pid}' has responded after it was forked! `)
		);

		_cluster.on('disconnect', (worker) =>
			Log.info(`Server :: Cluster with ProcessID '${worker.process.pid}' Disconnected!`)
		);

		_cluster.on('exit', (worker, code, signal) => {
			Log.info(`Server :: Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`);
			_cluster.fork();
		});
	}

	/**
	 * catches process events:uncaughtException,warning
	 */
	public process (): void {
		process.on('uncaughtException', (exception:Error) =>
			Log.error(exception.stack??'')
		);

		process.on('warning', (warning:Error) =>
			Log.warn(warning.stack??'')
		);
	}
}

export default new NativeEvent;