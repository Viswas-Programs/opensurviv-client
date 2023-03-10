import { WEAPON_SUPPLIERS } from "..";
import { Vec2 } from "../../../types/math";
import { MinWeapon } from "../../../types/minimized";
import { WeaponSupplier } from "../../../types/supplier";
import { GunWeapon } from "../../../types/weapon";
import { circleFromCenter, roundRect } from "../../../utils";
import { Player } from "../../entities";

class MP220Supplier implements WeaponSupplier {
	create(minWeapon: any) {
		return new MP220(minWeapon);
	}
}

export default class MP220 extends GunWeapon {
	static readonly ID = "mp220";
	id = MP220.ID;
	name = "MP220";

	constructor(weapon: MinWeapon | GunWeapon) {
		super();
		// This is a full weapon
		if ((<any>weapon)["recoil"]) {
			const fullWeapon = <GunWeapon>weapon;
			this.magazine = fullWeapon.magazine;
		}
	}

	static {
		WEAPON_SUPPLIERS.set(MP220.ID, new MP220Supplier());
	}

	render(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const radius = scale * player.hitbox.comparable;
		const fistRadius = radius / 3;
		const fistPositions = [new Vec2(player.hitbox.comparable, 0.1), new Vec2(player.hitbox.comparable + 0.25, -0.1)];
		var offset = Vec2.ZERO;
		ctx.fillStyle = "#222";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 0.025 * scale;
		//ctx.fillRect(player.hitbox.comparable * scale, -0.15 * scale, 1.2 * scale, 0.3 * scale);
		roundRect(ctx, player.hitbox.comparable * scale, -0.15 * scale, 2.0 * scale, 0.3 * scale, 0.15 * scale, true, true);
		ctx.fillStyle = "#F8C675";
		ctx.lineWidth = fistRadius / 3;
		ctx.strokeStyle = "#000000";
		for (const pos of fistPositions) {
			const fist = pos.addVec(offset).scaleAll(scale);
			circleFromCenter(ctx, fist.x, fist.y, fistRadius, true, true);
		}
	}
}