import * as os from 'os';
import * as clusterModule from 'cluster';
const cluster = clusterModule as unknown as clusterModule.Cluster;
import NativeEvent from './exceptions/NativeEvent';
import App from './providers/App';

if (cluster.isPrimary) {
	NativeEvent.process();
    const CPUS: any = os.cpus();
	CPUS.forEach(() => cluster.fork());
	NativeEvent.cluster(cluster);
	setTimeout(() => App.loadWorker(), 1000 * 60);
}else{
    App.loadDatabase();
	App.loadServer();
}