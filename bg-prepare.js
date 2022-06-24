window.loadImage = function(url) {
	const img = document.createElement("img");
	img.src = url;
	return img;
}
window.gridBG = document.createElement("canvas");
const squareImages = [
	loadImage("grid-bg.png"),
	loadImage("grid-bg2.png"),
	loadImage("grid-bg3.png"),
	loadImage("grid-bg4.png"),
	loadImage("grid-bg5.png")
];
gridBG.width = 1600;
gridBG.height = 900;
window.addEventListener("resize", () => {
	if (window.innerHeight / window.innerWidth > 0.5625 /* 1600/900 */) {
		gridBG.style.width = `${1.777777778 * window.innerHeight}px`;
		gridBG.style.height = `100%`;
		gridBG.style.top = "0";
		gridBG.style.left = `${(window.innerWidth - 1.777777778 * window.innerHeight) * 0.5}px`;
	}
	else {
		gridBG.style.width = "100%";
		gridBG.style.height = `${0.5625 * window.innerWidth}px`;
		gridBG.style.top = `${(window.innerHeight - 0.5625 * window.innerWidth) * 0.5}px`;
		gridBG.style.left = "0";
	}
});
window.dispatchEvent(new Event('resize'));
gridBG.className = "bg";
document.body.appendChild(gridBG);
window.gbgCtx = gridBG.getContext("2d");
gbgCtx.fillStyle = "#696969";
gbgCtx.fillRect(0, 0, 1600, 900);
gbgCtx.filter = "brightness(150%)";
window.onload = ()=>{for (let i = 0; i < 50; i++) {
	for (let j = 0; j < 29; j++) {
		gbgCtx.drawImage(squareImages[Math.floor(Math.random() * 5)], 32 * i, 32 * j, 32, 32);
	}
}}