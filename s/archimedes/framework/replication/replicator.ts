
import {Map2} from "@benev/slate"
import {Entities} from "../parts/types.js"
import {Lifecycles} from "../parts/lifecycles.js"
import {ReplicaReturn, Replicas} from "./types.js"

export class Replicator<xEntities extends Entities, xRealm> {
	lifecycles: Lifecycles<ReplicaReturn<any>>

	constructor(
			public realm: xRealm,
			public replicas: Replicas<xEntities, xRealm>,
		) {

		this.lifecycles = new Lifecycles<ReplicaReturn<any>>(
			new Map2(Object.entries(replicas).map(([kind, replica]) => {
				const fn = (id: number, state: any) => replica(realm, id, state)
				return [kind, fn]
			}))
		)
	}
}

