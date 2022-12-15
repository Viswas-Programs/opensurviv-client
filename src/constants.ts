export enum CommonAngle {
	PI_FOUR = Math.PI / 4,
	PI_TWO = Math.PI / 2
}

export enum CommonNumber {
	SIN45 = Math.sin(CommonAngle.PI_FOUR)
}

// More like configuration
export enum KeyBind {
	MENU = "Escape",
	HIDE_HUD = "F1",
	RIGHT = "d",
	UP = "w",
	LEFT = "a",
	DOWN = "s"
}

export const movementKeys = [KeyBind.RIGHT, KeyBind.UP, KeyBind.LEFT, KeyBind.DOWN].map(k => <string> k);