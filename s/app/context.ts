
import {httpRemote} from "renraku"
import {Pubkey} from "@authlocal/authlocal"

import {Commons} from "./types.js"
import {Kv} from "../packs/kv/kv.js"
import {Api, makeApi} from "./api.js"
import {HashRouter} from "../tools/hash-router.js"
import {StorageCore} from "../packs/kv/cores/storage.js"
import {makeLocalSchema} from "./features/schema/local.js"
import {Avatar} from "./features/accounts/avatars/avatar.js"
import {mockKeypair} from "./features/security/mock-keypair.js"
import {AccountManager} from "./features/accounts/ui/manager.js"
import {makeDatabaseSchema} from "./features/schema/database.js"
import {CharacterManager} from "./features/characters/ui/manager.js"
import {DecreeVerifier} from "./features/security/decree/verifier.js"
import {migrateDatabase} from "./features/schema/migrate-database.js"
import {migrateLocalStorage} from "./features/schema/migrate-local-storage.js"

export class Context {
	static #context: Context | null = null

	static get context() {
		if (!this.#context) throw new Error("context not set")
		return this.#context
	}

	static async #prepare(kv: Kv, api: Api) {
		const schema = makeLocalSchema(kv)
		await migrateLocalStorage(schema)
		const pubkey = await Pubkey.fromData(await api.v1.pubkey())
		const verifier = new DecreeVerifier(pubkey)
		const commons: Commons = {schema, api, verifier}
		const accountManager = await AccountManager.make(commons)
		const characterManager = new CharacterManager(commons, accountManager.session)
		const context = new this(commons, accountManager, characterManager)
		this.#context = context
		return context
	}

	static async mock() {
		const kv = new Kv(new StorageCore).namespace("rogueMock")
		const databaseKv = new Kv(new StorageCore).namespace("rogueMockDatabase")
		const databaseSchema = makeDatabaseSchema(databaseKv)
		await migrateDatabase(databaseSchema)
		const api = await makeApi(databaseSchema, await mockKeypair())
		return this.#prepare(kv, api)
	}

	static async make(url: string) {
		const api = httpRemote<Api>(url)
		const localKv = new Kv(new StorageCore).namespace("rogue")
		return this.#prepare(localKv, api)
	}

	static async auto() {
		const {hostname, pathname} = window.location

		if (/^\/dev\//.test(pathname))
			return this.mock()

		if (
				hostname === "localhost" ||
				hostname.includes("trycloudflare") ||
				hostname.startsWith("10.") ||
				hostname.startsWith("192.")
			)
			return (/^\/?mock/.test(HashRouter.hash))
				? this.mock()
				: this.make("http://localhost:8000/")

		return this.make("https://api.rogue.benevolent.games/")
	}

	avatarImages = Avatar.preloadAll()

	constructor(
			public commons: Commons,
			public accountManager: AccountManager,
			public characterManager: CharacterManager,
		) {

		accountManager.session.on(async session => {
			if (session)
				await characterManager.downloadFromApi()
		})
	}
}

