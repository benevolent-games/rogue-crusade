
import {IdView} from "@authlocal/authlocal"
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../theme.css.js"
import {Account} from "../../../../accounts/types.js"
import {Character} from "../../../parts/character.js"
import {trueDate} from "../../../../../../tools/true-date.js"
import {AvatarView} from "../../../../../views/avatar/view.js"
import {CharacterDetails} from "../../../parts/character-details.js"

export type Controlbar = {
	del?: () => void
	claim?: () => void
	create?: () => void
	randomize?: () => void
}

export const CharacterCard = shadowView(use => (options: {
		account: Account
		character: Character | CharacterDetails
		onSelect?: () => void
		controlbar?: Controlbar
	}) => {

	use.name("character-card")
	use.styles(themeCss, stylesCss)

	const {character, controlbar, account, onSelect} = options

	const id = (character instanceof Character)
		? character.id
		: undefined

	const isOwned = (character instanceof Character)
		? character.ownerId === account.thumbprint
		: true

	const isSelectable = (character instanceof Character)
		? !!onSelect
		: false

	const click = onSelect ?? (() => {})

	function renderControlbar({claim, del, randomize, create}: Controlbar) {
		return html`
			<div class=controlbar>
				${(onSelect && !claim)
					? html`<button class="naked" @click="${() => onSelect()}">Select</button>`
					: null}

				${randomize &&
					html`<button class="naked" @click="${() => randomize()}">Randomize</button>`}

				${create &&
					html`<button class="naked happy" @click="${() => create()}">Create</button>`}

				${claim &&
					html`<button class="naked" @click="${() => claim()}">Claim</button>`}

				${del &&
					html`<button class="naked angry" @click="${() => del()}">Delete</button>`}
			</div>
		`
	}

	return html`
		<div class=card data-seed="${character.seed}" data-id="${id}">
			<div class=saucer
				@click="${click}"
				?data-owned="${isOwned}"
				?data-selectable="${isSelectable}">

				<div class=details>
					<h3 class=font-fancy>${character.name}</h3>
					<div class=infos>
						<div>${character.heightDisplay.full}</div>
						${(character instanceof Character) ? html`
							<div>${trueDate(character.created)}</div>
							<div hidden>${IdView([character.id, character.id.slice(0, 8)])}</div>
						` : null}
					</div>
				</div>

				<div>${AvatarView([character.avatar])}</div>
			</div>

			${controlbar && renderControlbar(controlbar)}
		</div>
	`
})

