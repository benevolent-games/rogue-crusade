
import {splitAxis} from "../grip/utils/split-axis.js"

export function breakupStickInputs(x: number, y: number) {
	const [down, up] = splitAxis(y)
	const [left, right] = splitAxis(x)
	return {up, down, left, right}
}

