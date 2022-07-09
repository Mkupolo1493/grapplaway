window.loadImage = function(url) {
	const img = document.createElement("img");
	img.src = url;
	return img;
}
window.gridBG = document.createElement("canvas");
const squareImages = [
	loadImage("/assets/img/bg/grid-tile1.png"),
	loadImage("/assets/img/bg/grid-tile2.png"),
	loadImage("/assets/img/bg/grid-tile3.png"),
	loadImage("/assets/img/bg/grid-tile4.png"),
	loadImage("/assets/img/bg/grid-tile5.png")
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
gbgCtx.fillStyle = "#cde";
gbgCtx.fillRect(0, 0, 1600, 900);
window.onload = ()=>{for (let i = 0; i < 50; i++) {
	for (let j = 0; j < 29; j++) {
		gbgCtx.drawImage(squareImages[Math.floor(Math.random() * squareImages.length)], 32 * i, 32 * j, 32, 32);
	}
}}