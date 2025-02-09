
import {Login} from "@authlocal/authlocal"
import {Account, AccountRecord} from "../types.js"

export type RandoIdentity = {kind: "rando", id: string, avatarId: string}
export type AccountIdentity = {kind: "account", accountToken: string}
export type Identity = RandoIdentity | AccountIdentity

export type Session = {
	login: Login
	account: Account
	accountToken: string
	accountRecord: AccountRecord
}

