
import {Grip} from "../../../supercontrol/grip/grip.js"

export type GameBindings2 = ReturnType<typeof gameBindings2>

export const gameBindings2 = () => Grip.bindings({
	normal: {
		sprint: [["LeftShift"], ["g.stick.left.click"], ["g.lb"], ["g.lt"]],
		moveUp: [["KeyW"], ["Up"], ["g.stick.left.up"]],
		moveDown: [["KeyS"], ["Down"], ["g.stick.left.down"]],
		moveLeft: [["KeyA"], ["Left"], ["g.stick.left.left"]],
		moveRight: [["KeyD"], ["Right"], ["g.stick.left.right"]],
		lookUp: [["KeyI"], ["g.stick.right.up"]],
		lookDown: [["KeyK"], ["g.stick.right.down"]],
		lookLeft: [["KeyJ"], ["g.stick.right.left"]],
		lookRight: [["KeyL"], ["g.stick.right.right"]],
	},
})

