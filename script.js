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
		showAngleIndicator: false,
		wireframes: false,
		background: "#bedead00"
	}
});

// settings
{
	window.playerDensity = 0.0003;
	window.playerDisjointDensity = 0.00000069;
	window.playerDisjointStiffness = 1;
	window.wheelDensity = 0.002;
	window.playerSpeed = 0.6;
	window.playerAcceleration = 0.01;
	window.playerColor = "black";
	window.playerLineWidth = 4;

	window.playerStiffness = 1;
	window.showJoints = false;
	window.jointRenderType = "pin";
	window.jointStroke = 2;
	window.jointTargetLength = 0;
	window.showLigamentAttachments = false;
}

const player = {
	leftForeleg: Bodies.rectangle(264, 188, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	rightForeleg: Bodies.rectangle(336, 188, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	leftUpperLeg: Bodies.rectangle(282, 175, 40, 4, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	rightUpperLeg: Bodies.rectangle(318, 175, 40, 4, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	upperBody: Bodies.rectangle(300, 147, 4, 60, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	leftForearm: Bodies.rectangle(272, 135, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	rightForearm: Bodies.rectangle(328, 135, 4, 30, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	leftUpperArm: Bodies.rectangle(287, 122, 30, 4, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	rightUpperArm: Bodies.rectangle(313, 122, 30, 4, { collisionFilter: { group: -1 }, render: { fillStyle: playerColor }, density: playerDensity, frictionAir: 0 }),
	head: Bodies.circle(300, 100, 20, { collisionFilter: { group: -1 }, render: { fillStyle: "#bedead00", lineWidth: playerLineWidth, strokeStyle: playerColor }, density: 0.4 * playerDensity, frictionAir: 0 }),
	skateboard: Bodies.rectangle(300, 205, 140, 4, { collisionFilter: { group: -1 }, render: { fillStyle: "#ff8833" }, density: playerDensity, frictionAir: 0 }),
	leftWheel: Bodies.circle(250, 215, 8, { collisionFilter: { group: -1 }, render: { fillStyle: "#bedead00", lineWidth: 1, strokeStyle: "white", sprite: { texture: "./not-creepy-smile.png" } }, density: wheelDensity, frictionAir: 0 }),
	rightWheel: Bodies.circle(350, 215, 8, { collisionFilter: { group: -1 }, render: { fillStyle: "#bedead00", lineWidth: 1, strokeStyle: "white", sprite: { texture: "./not-creepy-smile.png" } }, density: wheelDensity, frictionAir: 0 }),
	grappleDisjoint: Bodies.circle(328, 148, 3, { collisionFilter: { group: -1 } , render: { 
fillStyle: "#291" }, density: playerDisjointDensity, frictionAir: 0 })
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
	}),
	disjointConnector: Constraint.create({
		bodyA: player.leftForearm,
		pointA: {x: 0, y: 13},
		pointB: {x: 328, y: 148},
		stiffness: playerDisjointStiffness,
		length: 0,
		render: { visible: /*showJoints*/true, lineWidth: jointStroke, type: "pin", anchors: false }
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
		stiffness: 0.05,
		length: 0,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightArmpit: Constraint.create({
		bodyA: player.upperBody,
		pointA: {x: 8, y: -22},
		bodyB: player.rightUpperArm,
		pointB: {x: -3, y: 0},
		stiffness: 0.05,
		length: 0,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	leftLowerElbow: Constraint.create({
		bodyA: player.leftForearm,
		pointA: {x: 0, y: 0},
		bodyB: player.leftUpperArm,
		pointB: {x: 0, y: 0},
		stiffness: 0.005,
		length: 20,
		damping: 0.05,
		render: { visible: showJoints, anchors: false, lineWidth: 1, type: "line", strokeStyle: "green" }
	}),
	rightLowerElbow: Constraint.create({
		bodyA: player.rightForearm,
		pointA: {x: 0, y: 0},
		bodyB: player.rightUpperArm,
		pointB: {x: 0, y: 0},
		stiffness: 0.005,
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

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true, fillStyle: "#bedead00" });
const wall = Bodies.rectangle(-10, 290, 60, 580, { isStatic: true });
const wall2 = Bodies.rectangle(810, 290, 60, 580, { isStatic: true, isSensor: true });
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
		if (this.disabled) this.internalConstraint.length = Math.sqrt((Constraint.pointAWorld(this.internalConstraint).x - Constraint.pointBWorld(this.internalConstraint).x) ** 2 + (Constraint.pointAWorld(this.internalConstraint).y - Constraint.pointBWorld(this.internalConstraint).y) ** 2);
		this.disabled = false;
		this.internalConstraint.render.visible = this.render;
	}
}
const raintHalf = new HalfConstraint(
	100,
	true,
	redBall,
	{x: 0, y: 0},
	/*player.leftForearm,
	{x: 0, y: 13},*/
	player.grappleDisjoint,
	{x: 0, y: 0},
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
	// playerJoints.disjointConnector.pointB = player.grappleDisjoint.position;
	playerMuscles.angleCorrection.pointB = {x: 0, y: 0};
	playerMuscles.angleCorrection.bodyB = player.upperBody;
	const converted = Constraint.pointBWorld(playerMuscles.angleCorrection);
	playerMuscles.angleCorrection.pointB = {x: converted.x, y: converted.y - 25};
	playerMuscles.angleCorrection.bodyB = null;
	playerMuscles.angleCorrection.stiffness = /*raintHalf.disabled*/false ? (checkPlayerGroundCollision() ? 0.005 : 0.001) : 0;
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

let jumpData = {
	canDoubleJump: false,
	jumpFrame: 0,
	// constants
	startSpeed: -6,
	gravCoefficient: 0.1,
	maxJumpFrames: 20
};

Events.on(engine, "afterUpdate", function() {
	playerJoints.disjointConnector.pointB = player.grappleDisjoint.position;
	/*if (raintHalf.disabled) playerJoints.disjointConnector.stiffness = Number.EPSILON;
	else playerJoints.disjointConnector.stiffness = playerDisjointStiffness;*/
	const isColliding = Collision.collides(player.leftWheel, ground) || Collision.collides(player.rightWheel, ground) || Collision.collides(player.skateboard, ground);
	if (keys.jump && (isColliding || (jumpData.jumpFrame > 0 && jumpData.jumpFrame < jumpData.maxJumpFrames))) {
		if (isColliding) jumpData.jumpFrame = 0;
		Body.setVelocity(player.upperBody, {x: player.upperBody.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		Body.setVelocity(player.leftUpperArm, {x: player.leftUpperArm.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		Body.setVelocity(player.rightUpperArm, {x: player.rightUpperArm.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		Body.setVelocity(player.head, {x: player.head.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		Body.setVelocity(player.skateboard, {x: player.skateboard.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		Body.setVelocity(player.leftWheel, {x: player.leftWheel.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		Body.setVelocity(player.rightWheel, {x: player.rightWheel.velocity.x, y: jumpData.startSpeed + jumpData.jumpFrame * jumpData.gravCoefficient});
		jumpData.jumpFrame++;
	}
	else {
		jumpData.jumpFrame = 0;
	}
	if (keys.left) {
		if (player.leftWheel.angularVelocity > -playerSpeed) player.leftWheel.torque = -playerAcceleration;
		if (player.rightWheel.angularVelocity > -playerSpeed) player.rightWheel.torque = -playerAcceleration;
	}
	if (keys.right) {
		if (player.leftWheel.angularVelocity < playerSpeed) player.leftWheel.torque = playerAcceleration;
		if (player.rightWheel.angularVelocity < playerSpeed) player.rightWheel.torque = playerAcceleration; 
	}
	Renderer.lookAt(renderer, player.head, {
	  x: 800,
	  y: 450
	});
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
	player.grappleDisjoint,
	
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
	playerJoints.axle2,
	playerJoints.disjointConnector
]);

Renderer.run(renderer);
const runner = Runner.create();
Runner.run(runner, engine);
window.addEventListener("keydown", function(e) {
	// if (window.hasStarted != true && e.key == " ") {
	// 	Runner.run(runner, engine);
	// 	window.hasStarted = true;
	// }
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


/* when time allows, fix these low-priority bugs:
	Done: • (U+2022) unshifting then pressing shift again causes grapple to slide
	• use rotation of upper body instead of ugly-ass constraint
	• fix knee and axle inversion
*/