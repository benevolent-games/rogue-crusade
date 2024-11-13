
import {Liaison} from "./liaison.js"
import {Feed, Feedbacks} from "./types.js"
import {LagProfile} from "../../../tools/fake-lag.js"
import {IdCounter} from "../../../tools/id-counter.js"
import {MetaClient} from "../../multiplayer/meta/client.js"
import {MetaHost, metaHostApi} from "../../multiplayer/meta/host.js"
import {renrakuChannel} from "../../multiplayer/utils/renraku-channel.js"
import {MultiplayerFibers} from "../../multiplayer/utils/multiplayer-fibers.js"

export class Contact {
	constructor(
		public replicatorId: number,
		public liaison: Liaison,
		public metaClient: MetaClient,
	) {}
}

export class Clientele {
	#replicatorIds = new IdCounter()
	#contacts = new Set<Contact>()

	add(fibers: MultiplayerFibers, lag: LagProfile | null = null) {
		const replicatorId = this.#replicatorIds.next()
		const liaison = new Liaison(fibers.game, lag)
		const metaClient = renrakuChannel<MetaHost, MetaClient>({
			timeout: 20_000,
			bicomm: fibers.meta.reliable,
			localFns: metaHostApi({replicatorId}),
		})
		const contact = new Contact(replicatorId, liaison, metaClient)
		this.#contacts.add(contact)
		return contact
	}

	delete(contact: Contact) {
		this.#contacts.delete(contact)
	}

	collectAllFeedbacks(): Feedbacks {
		return [...this.#contacts]
			.map(c => [c.replicatorId, c.liaison.take().feedback])
	}

	broadcastFeed(feed: Feed) {
		for (const contact of this.#contacts)
			contact.liaison.sendFeed(feed)
	}
}

