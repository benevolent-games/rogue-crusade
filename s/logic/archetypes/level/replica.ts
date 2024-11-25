
import {TransformNode} from "@babylonjs/core"
import {loop, Randy, Vec2} from "@benev/toolbox"

import {LevelArchetype} from "./types.js"
import {Realm} from "../../realm/realm.js"
import {Grid} from "../../dungeons/utils/grid.js"
import {Vecset2} from "../../dungeons/utils/vecset2.js"
import {Coordinates} from "../../realm/utils/coordinates.js"
import {Pathfinder} from "../../dungeons/utils/pathfinder.js"

export const levelReplica = Realm.replica<LevelArchetype>(
	({realm, replicator, facts}) => {
		const {config} = facts

		const randy = Randy.seed(config.seed)
		const grid = new Grid(Vec2.new(7, 7))
		const pathfinder = new Pathfinder(randy, grid)
		const instances = new Set<TransformNode>()
		const floorInstancer = realm.glbs.templateGlb.instancer("floor, size=1x1, type=ref")

		function generatePath() {
			const start = Vec2.new(3, 0)
			const end = Vec2.new(3, 6)
			const goals = [
				start,
				pathfinder.pickRandomPoint(),
				pathfinder.pickRandomPoint(),
				pathfinder.pickRandomPoint(),
				end,
			]
			return pathfinder.aStarChain(goals)
		}

		function generateLevelBlock(offset: Vec2) {
			const path = generatePath()
			if (!path) throw new Error("pathfinder failed")

			const walkable = new Vecset2()
			const knobCount = 2

			for (const vec of path)
				walkable.add(vec)

			const knobRoots = randy.extract(knobCount, walkable.list())

			for (const root of knobRoots) {
				for (const n1 of grid.neighbors(root)) {
					walkable.add(n1)

					for (const n2 of grid.neighbors(n1)) {
						walkable.add(n2)

						for (const n3 of grid.neighbors(n2)) {
							walkable.add(n3)
						}
					}
				}
			}

			for (const vec of walkable.list()) {
				const coordinates = Coordinates.import(vec.clone().add(offset))
				const floor = floorInstancer()
				instances.add(floor)
				floor.position.set(...coordinates.position().add_(0, 0.2, 0).array())
			}
		}

		for (const i of loop(5))
			generateLevelBlock(Vec2.new(0, (i * grid.extent.y)))

		return {
			replicate({feed, feedback}) {},
			dispose() {
				for (const instance of instances)
					instance.dispose()
			},
		}
	}
)

