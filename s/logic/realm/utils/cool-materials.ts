
import {Scene} from "@babylonjs/core/scene.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"

export class CoolMaterials {
	gray: PBRMaterial
	pearl: PBRMaterial
	happy: PBRMaterial
	angry: PBRMaterial
	spicy: PBRMaterial
	sad: PBRMaterial

	constructor(private scene: Scene) {
		this.gray = this.create(.1, .1, .1)
		this.pearl = this.create(.7, .7, .7)
		this.happy = this.create(.1, .7, .7)
		this.angry = this.create(.7, .1, .1)
		this.spicy = this.create(.6, .5, .1)
		this.sad = this.create(.2, .1, .7)
	}

	create(r: number, g: number, b: number) {
		const m = new PBRMaterial("custom", this.scene)
		m.albedoColor = new Color3(r, g, b)
		m.roughness = 0.9
		m.metallic = 0
		return m
	}
}

