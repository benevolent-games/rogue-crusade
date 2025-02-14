
import {AccountView} from "./view.js"
import {context} from "../../../../context.js"
import {gigapanel} from "../../utils/gigapanel.js"
import {AvatarView} from "../../../avatar/view.js"
import {Avatar} from "../../../../../server/avatars/avatar.js"
import userCheckSvg from "../../../../icons/tabler/user-check.svg.js"
import userQuestionSvg from "../../../../icons/tabler/user-question.svg.js"

export const AccountPanel = gigapanel(() => ({
	label: "Account",

	button: () => {
		const session = context.session.value

		if (session) {
			const avatar = Avatar.library.get(session.account.avatarId)
			if (avatar)
				return AvatarView([avatar, {loading: context.isSessionLoading}])
		}

		return context.auth.login
			? userCheckSvg
			: userQuestionSvg
	},

	content: () => AccountView([]),
}))

