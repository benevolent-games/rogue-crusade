
import {html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import themeCss from "../../../../dom/theme.css.js"

export const CharacterList = shadowView(use => () => {
	use.name("character-list")
	use.styles(themeCss, stylesCss)

	return html`
		<div>character-list</div>
	`
})

