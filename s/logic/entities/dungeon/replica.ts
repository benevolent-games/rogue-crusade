
import {Realm} from "../../realm/realm.js"
import {RogueEntities} from "../entities.js"
import {Stopwatch} from "../../../tools/stopwatch.js"
import {replica} from "../../../archimedes/exports.js"
import {DungeonLayout} from "../../dungeons/dungeon-layout.js"
import {DungeonRenderer} from "../../dungeons/dungeon-renderer.js"

export const dungeonReplica = replica<RogueEntities, Realm>()<"dungeon">(
	({realm, state}) => {

	const cullingRange = 30
	const workloadLimit = 10
	const t1 = new Stopwatch("DungeonLayout")
	const t2 = new Stopwatch("DungeonRenderer")

	const dungeon = t1.measure(() => new DungeonLayout(state.options))
	const dungeonRenderer = t2.measure(() => new DungeonRenderer(realm, dungeon))

	t1.log()
	t2.log()

	const stopDrops = realm.onFilesDropped(files => {
		for (const file of files) {
			if (file.name.endsWith(".glb")) {
				console.log("loading", file.name)
				dungeonRenderer.loadGlb(URL.createObjectURL(file))
					.then(() => console.log("loaded", file.name))
					.catch(error => console.error("error", file.name, error))
			}
		}
	})

	return {
		gatherInputs: () => undefined,
		replicate: (_) => {
			const t3 = new Stopwatch(" - culling")
			t3.measure(() => {
				const {culler} = dungeonRenderer.skin
				const done = culler.execute(workloadLimit)
				if (done === 0) {
					culler.plan(realm.cameraman.coordinates, cullingRange)
					culler.execute(workloadLimit)
				}
			})
			if (t3.elapsed > 3)
				t3.log()
		},
		dispose: () => {
			dungeonRenderer.dispose()
			stopDrops()
		},
	}
})

