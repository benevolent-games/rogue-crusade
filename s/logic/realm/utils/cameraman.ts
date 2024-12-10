
import {Env} from "./make-environment.js"
import {Coordinates} from "./coordinates.js"

export class Cameraman {
	#coordinates = new Coordinates(0, 0)

	constructor(private env: Env) {}

	get coordinates() {
		return this.#coordinates
	}

	set coordinates(coords: Coordinates) {
		this.#coordinates = coords
		this.env.camera.target.set(
			...coords
				.position()
				.array()
		)
	}
}

