
import {Scalar, Vec2} from "@benev/toolbox"

import {Cursor} from "../../../realm/parts/cursor.js"
import {cardinals} from "../../../../tools/directions.js"
import {getPlayerRotation} from "./get-player-rotation.js"
import {Cameraman} from "../../../realm/utils/cameraman.js"
import {CrusaderInputData, CrusaderState} from "../types.js"
import {UserInputs} from "../../../realm/inputs/user-inputs.js"
import {Coordinates} from "../../../realm/utils/coordinates.js"

export function getPlayerInput(
		state: CrusaderState,
		userInputs: UserInputs,
		cameraman: Cameraman,
		cursor: Cursor,
		buddyCoordinates: Coordinates,
	): CrusaderInputData {

	const {grip} = userInputs
	const walkSpeedFraction = state.speed / state.speedSprint
	const sprint = grip.state.normal.sprint.pressed
	const keyIntent = Vec2.zero()

	// stick movement
	const stickIntent = Vec2.from(userInputs.stick.vector)

	// grip keyboard inputs
	{
		const directions = [
			grip.state.normal.moveUp.value,
			grip.state.normal.moveRight.value,
			grip.state.normal.moveDown.value,
			grip.state.normal.moveLeft.value,
		]

		const deadzone = 0.2
		directions.forEach((value, index) => {
			if (value > deadzone) {
				keyIntent.add(
					cardinals.at(index)!
						.clone()
						.multiplyBy(Scalar.remap(value, deadzone, 1, 0, 1))
				)
			}
		})

		keyIntent
			.clampMagnitude(sprint ? 1 : walkSpeedFraction)
	}

	const movementIntent = Vec2.zero()
		.add(stickIntent)
		.add(keyIntent)
		.clampMagnitude(1)
		.rotate(cameraman.smoothed.swivel)

	const rotation = getPlayerRotation(cursor.coordinates, buddyCoordinates)

	return {
		sprint,
		rotation,
		movementIntent: movementIntent.array(),
	}
}

