
import "@benev/slate/x/node.js"
import {endpoint} from "renraku"
import {HttpServer} from "renraku/x/server.js"

import {Kv} from "./packs/kv/kv.js"
import {makeApi} from "./app/api.js"
import {readEnv} from "./app/env.js"
import {LevelCore} from "./packs/kv/cores/level.js"

const env = await readEnv()
const kv = new Kv(new LevelCore(env.databasePath))
const api = await makeApi(kv, env.keypair)

new HttpServer(() => endpoint(api)).listen(8000)

