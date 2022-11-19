const PLAYER_ALLOWED_ANIMATIONS = ["left_fist", "right_fist"];

/**
 * Renders a player
 * @param {Player} you 
 * @param {Player} other 
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} scale
 */
function drawPlayer(you, other, canvas, ctx, scale) {
	const relative = other.position.addVec(you.position.inverse());
	const radius = scale * other.hitbox.radius;
	ctx.fillStyle = "#F8C675";
	circleFromCenter(ctx, canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale, radius);
	// If player is holding nothing, render fist
	if (!other.inventory.holding || other.inventory.holding.name == "fist") {
		const scale = radius * 1.2 * COMMON_NUMBERS.SIN45;
		const fistExtend = Vec2.ONE.scaleAll(scale);
		const fists = [];
		if (PLAYER_ALLOWED_ANIMATIONS.includes(other.attack.name) && ANIMATIONS.has(other.attack.name)) {
			const index = PLAYER_ALLOWED_ANIMATIONS.indexOf(other.attack.name);
			const anim = ANIMATIONS.get(other.attack.name);
			const portion = (anim.duration - other.attack.duration) / anim.duration;
			for (let ii = 0; ii < anim.keyframes.length - 1; ii++) {
				if (portion >= anim.keyframes[ii] && portion <= anim.keyframes[ii + 1]) {
					const position = anim.positions[ii].addVec(anim.positions[ii + 1].addVec(anim.positions[ii].inverse()).scaleAll((portion - anim.keyframes[ii]) / (anim.keyframes[ii + 1] - anim.keyframes[ii]))).scaleAll(scale);
					// TODO: handle rotation
					//const rotation = anim.rotations[ii]
					console.log(position);
					fists.push(fistExtend.addVec(position).addAngle(other.direction.angle()));
					break;
				}
			}
			fists.push(fistExtend.addVec(fistExtend.addAngle(COMMON_ANGLES.PI_TWO * (-index * 2 + 1))).addAngle(other.direction.angle()));
		} else {
			fists.push(fistExtend.addVec(fistExtend.addAngle(COMMON_ANGLES.PI_TWO)).addAngle(other.direction.angle()));
			fists.push(fistExtend.addVec(fistExtend.addAngle(-COMMON_ANGLES.PI_TWO)).addAngle(other.direction.angle()));
		}
	
		const fistRadius = radius / 3;
		ctx.lineWidth = fistRadius / 3;
		ctx.strokeStyle = "#000000";
		for (const fist of fists) circleFromCenter(ctx, canvas.width / 2 + relative.x * scale + fist.x, canvas.height / 2 + relative.y * scale + fist.y, fistRadius, true, true);
	}
}