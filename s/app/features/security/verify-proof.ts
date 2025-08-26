
import {Proof} from "@authlocal/authlocal"

export async function verifyProof(proofToken: string) {
	return Proof.verify(proofToken, {allowedAudiences: [
		"http://localhost:8080",
		"http://localhost:8081",
		"https://rogue.benevolent.games",
	]})
}

