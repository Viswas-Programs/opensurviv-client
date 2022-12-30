import { CommonNumber, CommonAngle } from "../../constants";
import { CircleHitbox, Vec2 } from "../../types/math";
import { Weapon } from "../../types/weapon";
import { circleFromCenter } from "../../utils";
import { animations } from "../animations";
import { Player } from "../entities";

const fistAnimations = ["left_fist", "right_fist"];

export default class Fists extends Weapon {
	constructor() {
		super({ id: "fists", name: "Fists" });
	}

	render(player: Player, relative: Vec2, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const radius = scale * (<CircleHitbox> player.hitbox).radius;
		const fistScale = radius * 1.2 * CommonNumber.SIN45;
		const fistExtend = Vec2.ONE.scaleAll(fistScale);
		const fists = [];
		const anim = animations.get(player.animation.name);
		if (anim) {
			const index = fistAnimations.indexOf(player.animation.name);
			const portion = (anim.duration - player.animation.duration) / anim.duration;
			for (let ii = 0; ii < anim.keyframes.length - 1; ii++) {
				if (portion >= anim.keyframes[ii] && portion <= anim.keyframes[ii + 1]) {
					const position = anim.positions[ii].addVec(anim.positions[ii + 1].addVec(anim.positions[ii].inverse()).scaleAll((portion - anim.keyframes[ii]) / (anim.keyframes[ii + 1] - anim.keyframes[ii]))).scaleAll(fistScale);
					// TODO: handle rotation
					//const rotation = anim.rotations[ii]
					fists.push(fistExtend.addVec(position));
					break;
				}
			}
			fists.push(fistExtend.addVec(fistExtend.addAngle(CommonAngle.PI_TWO * (-index * 2 + 1))));
		} else {
			fists.push(fistExtend.addVec(fistExtend.addAngle(CommonAngle.PI_TWO)));
			fists.push(fistExtend.addVec(fistExtend.addAngle(-CommonAngle.PI_TWO)));
		}
	
		const fistRadius = radius / 3;
		ctx.lineWidth = fistRadius / 3;
		ctx.strokeStyle = "#000000";
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(player.direction.angle());
		for (const fist of fists) circleFromCenter(ctx, fist.x, fist.y, fistRadius, true, true);
		ctx.resetTransform();
	}
}