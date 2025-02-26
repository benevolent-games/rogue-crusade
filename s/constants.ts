
import {Degrees, Vec2} from "@benev/toolbox"

export const constants = {
	urls: {
		cover: "/assets/images/rogue-crusade-poster.webp",
		benevLogo: "/assets/graphics/benevolent2.svg",
		envmap: "/assets/studiolights.env",
		dungeonGlb: "/assets/dungeons/byzantium-006.glb",
		pimsleyGlb: "/assets/glbs/pimsley-anims20.glb",
		shaders: {
			retro: "/assets/shaders/retro-02.json",
		},
	},

	ui: {
		animTime: 250,
	},

	fx: {
		antialiasing: false,
	},

	sim: {
		tickRate: 60,
		snapshotRate: 1,
		hashgridExtent: Vec2.all(8),
		localSnapshotArea: new Vec2(25, 25),
	},

	physics: {
		iterations: 2,
		defaultDamping: 5,
		timeTillSleep: 1000,
	},

	crusader: {
		height: 1.8,
		radius: 0.3,
		torchHeight: 3,
		movement: {
			walkSpeed: 1.5,
			sprintSpeed: 3.00,
			attackingSpeedMultiplier: 1,
			sprintWhileAttacking: false,
			omnidirectionalSprint: false,
		},
		combat: {
			turnCapEnabled: true,
			turnCap: Degrees.toRadians(90),
		},
		anim: {
			walkSpeedRatio: 5 / 10,
			sprintSpeedRatio: 7 / 10,
			strafeSpeedIncrease: 2 / 10,
			movementSharpness: 20,
			sprintSway: Degrees.toRadians(30),
		},
		grace: {
			adaptation: 3,
			walk: {
				legworkSharpness: 5,
				turnSharpness: 5,
				turnCap: Degrees.toRadians(500),
			},
			sprint: {
				legworkSharpness: 3,
				turnSharpness: 3,
				turnCap: Degrees.toRadians(180),
			},
		},
	},

	camera: {
		moveSharpness: 3,
		pivotHeight: 1.2,
		swivelSnappingIncrements: 0, // Degrees.toRadians(45),
		distanceBounds: new Vec2(3, 25),
		tiltBounds: new Vec2(Degrees.toRadians(0.1), Degrees.toRadians(60)),
		initial: {
			swivel: Degrees.toRadians(0),
			tilt: Degrees.toRadians(10),
			distanceFraction: 1 / 4,
		},
	},
}

