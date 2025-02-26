
import {BotState} from "./bot/types.js"
import {BlockState} from "./block/state.js"
import {DungeonOptions} from "../dungeons/layouting/types.js"
import {AsEntities} from "../../packs/archimedes/framework/parts/types.js"
import {CrusaderInputData, CrusaderState} from "./crusader/types.js"

export type RogueEntities = AsEntities<{
	block: {
		state: BlockState
		input: undefined
	}
	dungeon: {
		state: {options: DungeonOptions}
		input: undefined
	}
	crusader: {
		state: CrusaderState
		input: CrusaderInputData
	}
	bot: {
		state: BotState
		input: undefined
	}
}>

