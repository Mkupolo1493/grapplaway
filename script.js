// module aliases
{
	window.Engine = Matter.Engine;
	window.Renderer = Matter.Render;
	window.Runner = Matter.Runner;
	window.Bodies = Matter.Bodies;
	window.Composite = Matter.Composite;
	window.Events = Matter.Events;
	window.Body = Matter.Body;
	window.Constraint = Matter.Constraint;
	window.Collision = Matter.Collision;
}

// create an engine
const engine = Engine.create();
engine.timing.timeScale = 1;
engine.constraintIterations = 5;
engine.positionIterations = 200;

// create a renderer
const renderer = Renderer.create({
    element: document.body,
    engine: engine,
	options: {
		showCollisions: false,
		showAngleIndicator: false,
		wireframes: false
	}
});

// settings
{
	window.playerDensity = 0.0003;
	window.wheelDensity = 0.002;
	window.playerSpeed = 0.005;

	window.playerStiffness = 1;
	window.showJoints = false;
	window.jointRenderType = "pin";
	window.jointStroke = 2;
	window.jointTargetLength = 0;
	window.showLigamentAttachments = false;
}

const player = {
	leftForeleg: Bodies.rectangle(264, 188, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	rightForeleg: Bodies.rectangle(336, 188, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	leftUpperLeg: Bodies.rectangle(282, 175, 40, 4, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	rightUpperLeg: Bodies.rectangle(318, 175, 40, 4, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	upperBody: Bodies.rectangle(300, 147, 4, 60, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	leftForearm: Bodies.rectangle(272, 135, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	rightForearm: Bodies.rectangle(328, 135, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	leftUpperArm: Bodies.rectangle(287, 122, 30, 4, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	rightUpperArm: Bodies.rectangle(313, 122, 30, 4, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: playerDensity }),
	head: Bodies.circle(300, 100, 20, { collisionFilter: { group: -1 }, render: { fillStyle: "white" }, density: 0.4 * playerDensity }),
	skateboard: Bodies.rectangle(300, 205, 140, 4, { collisionFilter: { group: -2 }, render: { fillStyle: "#ff8833" }, density: playerDensity }),
	leftWheel: Bodies.circle(250, 215, 8, { collisionFilter: { group: -2 }, render: { fillStyle: "#bedead00", lineWidth: 1, strokeStyle: "white", sprite: { texture: "./not-creepy-smile.png" } }, density: wheelDensity }),
	rightWheel: Bodies.circle(350, 215, 8, { collisionFilter: { group: -2 }, render: { fillStyle: "#bedead00", lineWidth: 1, strokeStyle: "white", sprite: { texture: "./not-creepy-smile.png" } }, density: wheelDensity })
};
const playerJoints = {
	leftKnee: Constraint.create({
		bodyA: player.leftForeleg,
		pointA: {x: 0, y: -13},
		bodyB: player.leftUpperLeg,
		pointB: {x: -18, y: 0},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	rightKnee: Constraint.create({
		bodyA: player.rightForeleg,
		pointA: {x: 0, y: -13},
		bodyB: player.rightUpperLeg,
		pointB: {x: 18, y: 0},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	leftHip: Constraint.create({
		bodyA: player.leftUpperLeg,
		pointA: {x: 18, y: 0},
		bodyB: player.upperBody,
		pointB: {x: 0, y: 28},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	rightHip: Constraint.create({
		bodyA: player.rightUpperLeg,
		pointA: {x: -18, y: 0},
		bodyB: player.upperBody,
		pointB: {x: 0, y: 28},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	leftShoulder: Constraint.create({
		bodyA: player.leftUpperArm,
		pointA: {x: 13, y: 0},
		bodyB: player.upperBody,
		pointB: {x: 0, y: -28},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	rightShoulder: Constraint.create({
		bodyA: player.rightUpperArm,
		pointA: {x: -13, y: 0},
		bodyB: player.upperBody,
		pointB: {x: 0, y: -28},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	leftElbow: Constraint.create({
		bodyA: player.leftUpperArm,
		pointA: {x: -13, y: 0},
		bodyB: player.leftForearm,
		pointB: {x: 0, y: -13},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	rightElbow: Constraint.create({
		bodyA: player.rightUpperArm,
		pointA: {x: 13, y: 0},
		bodyB: player.rightForearm,
		pointB: {x: 0, y: -13},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	neck: Constraint.create({
		bodyA: player.head,
		pointA: {x: 0, y: 19},
		bodyB: player.upperBody,
		pointB: {x: 0, y: -28},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	leftFootGrip: Constraint.create({
		bodyA: player.leftForeleg,
		pointA: {x: 0, y: 15},
		bodyB: player.skateboard,
		pointB: {x: -38, y: -3},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	rightFootGrip: Constraint.create({
		bodyA: player.rightForeleg,
		pointA: {x: 0, y: 15},
		bodyB: player.skateboard,
		pointB: {x: 38, y: -3},
		stiffness: playerStiffness,
		length: jointTargetLength,
		render: { visible: showJoints, lineWidth: jointStroke, type: jointRenderType, anchors: showLigamentAttachments }
	}),
	axle1: Constraint.create({
		bodyA: player.skateboard,
		pointA: {x: -50, y: 15},
		bodyB: player.leftWheel,
		pointB: {x: 0, y: 0},
		stiffness: 0.1,
		length: 0,
		damping: 0.2,
		render: { visible: showJoints, lineWidth: jointStroke, type: "line", anchors: showLigamentAttachments }
	}),
	axle2: Constraint.create({
		bodyA: player.skateboard,
		pointA: {x: 50, y: 15},
		bodyB: player.rightWheel,
		pointB: {x: 0, y: 0},
		stiffness: 0.1,
		length: 0,
		damping: 0.2,
		render: { visible: showJoints, lineWidth: jointStroke, type: "line", anchors: showLigamentAttachments }
	})
};
const playerMuscles = {
	neckStrength: Constraint.create({
		bodyA: player.head,
		pointA: {x: 0, y: 0},
		bodyB: player.upperBody,
		pointB: {x: 0, y: -20},
		stiffness: 0.05,
		length: 40,
		damping: 0.08,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	crotch: Constraint.create({
		bodyA: player.leftUpperLeg,
		pointA: {x: 10, y: 0},
		bodyB: player.rightUpperLeg,
		pointB: {x: -10, y: 0},
		stiffness: 0.05,
		length: 10,
		damping: 0.1,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	leftLowerKnee: Constraint.create({
		bodyA: player.leftForeleg,
		pointA: {x: 0, y: 0},
		bodyB: player.leftUpperLeg,
		pointB: {x: 0, y: 0},
		stiffness: 0.05,
		length: 25,
		damping: 0.1,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightLowerKnee: Constraint.create({
		bodyA: player.rightForeleg,
		pointA: {x: 0, y: 0},
		bodyB: player.rightUpperLeg,
		pointB: {x: 0, y: 0},
		stiffness: 0.05,
		length: 25,
		damping: 0.1,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	leftKneeStrength: Constraint.create({
		bodyA: player.skateboard,
		pointA: {x: 0, y: 0},
		bodyB: player.leftUpperLeg,
		pointB: {x: -18, y: 0},
		stiffness: 0.03,
		length: 40,
		damping: 0.1,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightKneeStrength: Constraint.create({
		bodyA: player.skateboard,
		pointA: {x: 0, y: 0},
		bodyB: player.rightUpperLeg,
		pointB: {x: 18, y: 0},
		stiffness: 0.03,
		length: 40,
		damping: 0.1,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	leftSpinalSupport: Constraint.create({
		bodyA: player.head,
		pointA: {x: 0, y: 0},
		bodyB: player.leftForeleg,
		pointB: {x: 0, y: 13},
		stiffness: 0.05,
		length: 110,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightSpinalSupport: Constraint.create({
		bodyA: player.head,
		pointA: {x: 0, y: 0},
		bodyB: player.rightForeleg,
		pointB: {x: 0, y: 13},
		stiffness: 0.05,
		length: 110,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	leftArmpit: Constraint.create({
		bodyA: player.upperBody,
		pointA: {x: -8, y: -22},
		bodyB: player.leftUpperArm,
		pointB: {x: 3, y: 0},
		stiffness: 0.03,
		length: 0,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightArmpit: Constraint.create({
		bodyA: player.upperBody,
		pointA: {x: 8, y: -22},
		bodyB: player.rightUpperArm,
		pointB: {x: -3, y: 0},
		stiffness: 0.03,
		length: 0,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	leftLowerElbow: Constraint.create({
		bodyA: player.leftForearm,
		pointA: {x: 0, y: 0},
		bodyB: player.leftUpperArm,
		pointB: {x: 0, y: 0},
		stiffness: 0.001,
		length: 20,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightLowerElbow: Constraint.create({
		bodyA: player.rightForearm,
		pointA: {x: 0, y: 0},
		bodyB: player.rightUpperArm,
		pointB: {x: 0, y: 0},
		stiffness: 0.001,
		length: 20,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	angleCorrection: Constraint.create({
		bodyA: player.upperBody,
		pointA: {x: 0, y: -25},
		bodyB: player.upperBody,
		pointB: {x: 0, y: 0},
		stiffness: 0.005,
		length: 0,
		damping: 0.05,
		render: { visible: showJoints, lineWidth: 1, type: "line", strokeStyle: "red"}
	})
};

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const wall = Bodies.rectangle(-10, 290, 60, 580, { isStatic: true });
const wall2 = Bodies.rectangle(810, 290, 60, 580, { isStatic: true });
const ceiling = Bodies.rectangle(400, -10, 810, 60, { isStatic: true });

const redBall = Bodies.circle(600, 50, 15, { render: { fillStyle: "red" }, isStatic: true, isSensor: true });
class HalfConstraint {
	constructor(limit, limitIsMax=true, bodyA=null, pointA, bodyB=null, pointB, render=true) {
		this.isMax = limitIsMax;
		this.disabled = false;
		this.render = true;
		this.internalConstraint = Constraint.create({
			bodyA: bodyA,
			pointA: pointA,
			bodyB: bodyB,
			pointB: pointB,
			stiffness: Number.EPSILON,
			length: limit,
			render: { visible: render, type: "line", strokeStyle: "gray" }
		});
		const self = this;
		Events.on(engine, "beforeUpdate", function() {
			if (((Math.sqrt((Constraint.pointAWorld(self.internalConstraint).x - Constraint.pointBWorld(self.internalConstraint).x) ** 2 + (Constraint.pointAWorld(self.internalConstraint).y - Constraint.pointBWorld(self.internalConstraint).y) ** 2) > self.internalConstraint.length) ? 1 : 0) ^ (self.isMax ? 0 : 1) && !self.disabled) {
				self.internalConstraint.stiffness = 1;
			}
			else {
				self.internalConstraint.stiffness = Number.EPSILON;
			}
		});
	}
	disable() {
		this.disabled = true;
		this.internalConstraint.render.visible = false;
	}
	enable() {
		this.internalConstraint.length = Math.sqrt((Constraint.pointAWorld(this.internalConstraint).x - Constraint.pointBWorld(this.internalConstraint).x) ** 2 + (Constraint.pointAWorld(this.internalConstraint).y - Constraint.pointBWorld(this.internalConstraint).y) ** 2);
		this.disabled = false;
		this.internalConstraint.render.visible = this.render;
	}
}
const raintHalf = new HalfConstraint(
	100,
	true,
	redBall,
	{x: 0, y: 0},
	player.leftForearm,
	{x: 0, y: 13},
	true
);
raintHalf.disable();

window.keys = {
	right_: false,
	left_: false,
	up_: false,
	down_: false,
	jump: false,
	left: false,
	right: false
};

function checkPlayerGroundCollision() {
	return Collision.collides(player.leftWheel, ground)
		|| Collision.collides(player.rightWheel, ground)
		|| Collision.collides(player.skateboard, ground)
		|| Collision.collides(player.leftForeleg, ground)
		|| Collision.collides(player.rightForeleg, ground)
		|| Collision.collides(player.leftUpperLeg, ground)
		|| Collision.collides(player.rightUpperLeg, ground)
		|| Collision.collides(player.upperBody, ground)
		|| Collision.collides(player.leftUpperArm, ground)
		|| Collision.collides(player.rightUpperArm, ground)
		|| Collision.collides(player.leftForearm, ground)
		|| Collision.collides(player.rightForearm, ground)
		|| Collision.collides(player.head, ground);
}

Events.on(engine, "beforeUpdate", function() {
	playerMuscles.angleCorrection.pointB = {x: 0, y: 0};
	playerMuscles.angleCorrection.bodyB = player.upperBody;
	const converted = Constraint.pointBWorld(playerMuscles.angleCorrection);
	playerMuscles.angleCorrection.pointB = {x: converted.x, y: converted.y - 25};
	playerMuscles.angleCorrection.bodyB = null;
	playerMuscles.angleCorrection.stiffness = raintHalf.disabled ? (checkPlayerGroundCollision() ? 0.005 : 0.001) : 0;
	if (keys.right_) {
		Body.setPosition(redBall, {x: redBall.position.x + 5, y: redBall.position.y});
	}
	if (keys.left_) {
		Body.setPosition(redBall, {x: redBall.position.x - 5, y: redBall.position.y});
	}
	if (keys.up_) {
		Body.setPosition(redBall, {x: redBall.position.x, y: redBall.position.y - 5});
	}
	if (keys.down_) {
		Body.setPosition(redBall, {x: redBall.position.x, y: redBall.position.y + 5});
	}
});
Events.on(engine, "afterUpdate", function() {
	if (keys.jump && (Collision.collides(player.leftWheel, ground) || Collision.collides(player.rightWheel, ground))) {
		/*player.leftForeleg.position.y -= 3;
		player.rightForeleg.position.y -= 3;
		player.leftUpperLeg.position.y -= 3;
		player.rightUpperLeg.position.y -= 3;
		player.upperBody.position.y -= 3;
		player.leftForearm.position.y -= 3;
		player.rightForearm.position.y -= 3;
		player.leftUpperArm.position.y -= 3;
		player.rightUpperArm.position.y -= 3;
		player.head.position.y -= 3;
		player.skateboard.position.y -= 3;
		player.leftWheel.position.y -= 3;
		player.rightWheel.position.y -= 3;*/
		Body.setVelocity(player.leftForeleg, {x: player.leftForeleg.velocity.x, y: -10});
		Body.setVelocity(player.rightForeleg, {x: player.rightForeleg.velocity.x, y: -10});
		Body.setVelocity(player.leftUpperLeg, {x: player.leftUpperLeg.velocity.x, y: -10});
		Body.setVelocity(player.rightUpperLeg, {x: player.rightUpperLeg.velocity.x, y: -10});
		Body.setVelocity(player.upperBody, {x: player.upperBody.velocity.x, y: -10});
		Body.setVelocity(player.leftForearm, {x: player.leftForearm.velocity.x, y: -10});
		Body.setVelocity(player.rightForearm, {x: player.rightForearm.velocity.x, y: -10});
		Body.setVelocity(player.leftUpperArm, {x: player.leftUpperArm.velocity.x, y: -10});
		Body.setVelocity(player.rightUpperArm, {x: player.rightUpperArm.velocity.x, y: -10});
		Body.setVelocity(player.head, {x: player.head.velocity.x, y: -10});
		Body.setVelocity(player.skateboard, {x: player.skateboard.velocity.x, y: -10});
		Body.setVelocity(player.leftWheel, {x: player.leftWheel.velocity.x, y: -10});
		Body.setVelocity(player.rightWheel, {x: player.rightWheel.velocity.x, y: -10});
	}
	if (keys.left) {
		player.leftWheel.torque = -playerSpeed;
		player.rightWheel.torque = -playerSpeed;
	}
	if (keys.right) {
		player.leftWheel.torque = playerSpeed;
		player.rightWheel.torque = playerSpeed;
	}
});

Composite.add(engine.world, [
	player.leftForeleg,
	player.rightForeleg,
	player.leftUpperLeg,
	player.rightUpperLeg,
	player.upperBody,
	player.leftForearm,
	player.rightForearm,
	player.leftUpperArm,
	player.rightUpperArm,
	player.head,
	
	playerJoints.leftKnee,
	playerJoints.rightKnee,
	playerJoints.leftHip,
	playerJoints.rightHip,
	playerJoints.leftShoulder,
	playerJoints.rightShoulder,
	playerJoints.leftElbow,
	playerJoints.rightElbow,
	playerJoints.neck, 
	
	playerMuscles.neckStrength,
	playerMuscles.crotch,
	playerMuscles.leftLowerKnee,
	playerMuscles.rightLowerKnee,
	playerMuscles.leftKneeStrength,
	playerMuscles.rightKneeStrength,
	playerMuscles.leftSpinalSupport,
	playerMuscles.rightSpinalSupport,
	playerMuscles.leftArmpit,
	playerMuscles.rightArmpit,
	playerMuscles.leftLowerElbow,
	playerMuscles.rightLowerElbow,
	
	ground,
	wall,
	wall2,
	ceiling,
	playerMuscles.angleCorrection,
	redBall,
	raintHalf.internalConstraint,
	player.skateboard,
	playerJoints.leftFootGrip,
	playerJoints.rightFootGrip,
	player.leftWheel,
	player.rightWheel,
	playerJoints.axle1,
	playerJoints.axle2
]);

Renderer.run(renderer);
const runner = Runner.create();
window.addEventListener("keydown", function(e) {
	if (window.hasStarted != true && e.key == " ") {
		Runner.run(runner, engine);
		window.hasStarted = true;
	}
	if (e.key == "l" || e.key == "L") keys.right_ = true;
	if (e.key == "j" || e.key == "J") keys.left_ = true;
	if (e.key == "i" || e.key == "I") keys.up_ = true;
	if (e.key == "k" || e.key == "K") keys.down_ = true;
	if (e.key == "Shift") raintHalf.enable();
	if (e.key == "d" || e.key == "D") {
		keys.right = true;
	}
	if (e.key == "a" || e.key == "A") {
		keys.left = true;
	}
	if (e.key == "w" || e.key == "W") {
		keys.jump = true;
	}
});
window.addEventListener("keyup", function(e) {
	if (e.key == "l" || e.key == "L") keys.right_ = false;
	if (e.key == "j" || e.key == "J") keys.left_ = false;
	if (e.key == "i" || e.key == "I") keys.up_ = false;
	if (e.key == "k" || e.key == "K") keys.down_ = false;
	if (e.key == "Shift") raintHalf.disable();
	if (e.key == "d" || e.key == "D") {
		keys.right = false;
	}
	if (e.key == "a" || e.key == "A") {
		keys.left = false;
	}
	if (e.key == "w" || e.key == "W") {
		keys.jump = false;
	}
});