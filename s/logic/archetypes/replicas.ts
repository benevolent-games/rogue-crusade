
import {simulas} from "./simulas.js"
import {Realm} from "../realm/realm.js"
import {levelReplica} from "./level/replica.js"
import {playerReplica} from "./player/replica.js"
import {asReplicas} from "../framework/replication/types.js"

export const replicas = asReplicas<Realm, typeof simulas>({
	player: playerReplica,
	level: levelReplica,
})

