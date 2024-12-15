
import {Degrees} from "@benev/toolbox"

export const constants = {

	urls: {
		cover: "/assets/images/rogue-crusade-poster.webp",
		benevLogo: "/assets/graphics/benevolent2.svg",
		envmap: "/assets/studiolights.env",
		templateGlb: "/assets/dungeons/byzantium-001.glb",
		shaders: {
			retro: "/assets/shaders/retro.json",
		},
	},

	ui: {
		animTime: 250,
	},

	game: {
		antialiasing: false,
		resolution: 0.375,
		tickRate: 60,
		snapshotRate: 1,
		cameraRotation: Degrees.toRadians(45),
		crusaderRadius: 0.4,
	},
}

