console.log("Project Zomboid Color Picker by Fluori!");

const C_TILES = {
	"mod":"Base",
	"tiles":[
		{
			"name":"Dark Grass",
			"color":{
				"r":90,
				"g":100,
				"b":35
			},
			"type":"Base",
			"img":"tiles/darkgrass.png"
		},
		{
			"name":"Medium Grass",
			"color":{
				"r":117,
				"g":117,
				"b":47
			},
			"type":"Base",
			"img":"tiles/mediumgrass.png"
		},
		{
			"name":"Light Grass",
			"color":{
				"r":145,
				"g":135,
				"b":60
			},
			"type":"Base",
			"img":"tiles/lightgrass.png"
		},
		{
			"name":"Sand",
			"color":{
				"r":210,
				"g":200,
				"b":160
			},
			"type":"Base",
			"img":"tiles/sand.png"
		},
		{
			"name":"Light Asphalt",
			"color":{
				"r":165,
				"g":160,
				"b":140
			},
			"type":"Base",
			"img":"tiles/lightasphalt.png"
		},
		{
			"name":"Dark Asphalt",
			"color":{
				"r":100,
				"g":100,
				"b":100
			},
			"type":"Base",
			"img":"tiles/darkasphalt.png"
		},
		{
			"name":"Medium Asphalt",
			"color":{
				"r":120,
				"g":120,
				"b":120
			},
			"type":"Base",
			"img":"tiles/mediumasphalt.png"
		},
		{
			"name":"Gravel Dirt",
			"color":{
				"r":140,
				"g":70,
				"b":15
			},
			"type":"Base",
			"img":"tiles/graveldirt.png"
		},
		{
			"name":"Dirt",
			"color":{
				"r":120,
				"g":70,
				"b":20
			},
			"type":"Base",
			"img":"tiles/dirt.png"
		},
		{
			"name":"Dark Pothole",
			"color":{
				"r":110,
				"g":100,
				"b":100
			},
			"type":"Base",
			"img":"tiles/darkpothole.png"
		},
		{
			"name":"Light Pothole",
			"color":{
				"r":130,
				"g":120,
				"b":120
			},
			"type":"Base",
			"img":"tiles/lightpothole.png"
		},
		{
			"name":"Water",
			"color":{
				"r":0,
				"g":138,
				"b":255
			},
			"type":"Base",
			"img":"tiles/water.png"
		},
		{
			"name":"Dense Forest",
			"color":{
				"r":255,
				"g":0,
				"b":0
			},
			"type":"Vegetation",
			"img":"tiles/denseforest.png"
		},
		{
			"name":"Dense Trees + Dark Grass",
			"color":{
				"r":127,
				"g":0,
				"b":0
			},
			"type":"Vegetation",
			"img":"tiles/densetf.png"
		},
		{
			"name":"Trees + Grass",
			"color":{
				"r":64,
				"g":0,
				"b":0
			},
			"type":"Vegetation",
			"img":"tiles/treesgrass.png"
		},
		{
			"name":"Grass + Some Trees",
			"color":{
				"r":0,
				"g":128,
				"b":0
			},
			"type":"Vegetation",
			"img":"tiles/sometrees.png"
		},
		{
			"name":"Light Long Grass",
			"color":{
				"r":0,
				"g":255,
				"b":0
			},
			"type":"Vegetation",
			"img":"tiles/lightlonggrass.png"
		},
		{
			"name":"None",
			"color":{
				"r":0,
				"g":0,
				"b":0
			},
			"type":"Vegetation",
			"img":"tiles/none.png"
		}
	]
};

class PZColorPicker {
		constructor(pickerDOM, tileList) {
			this.tiles = tileList;
			this.pickerDOM = pickerDOM;
			
			this.terrainListDOM = pickerDOM.querySelector(".terrainlist");
			
			this.tileNameDOM = pickerDOM.querySelector("#tilename");
			this.typePropertyDOM = pickerDOM.querySelector("#tiletype");
			this.colorPropertyDOM = pickerDOM.querySelector("#tilecolor");
			this.colorRGBPropertyDOM = pickerDOM.querySelector("#tilecolorrgb");
			this.colorRedPropertyDOM = pickerDOM.querySelector("#tilered");
			this.colorGreenPropertyDOM = pickerDOM.querySelector("#tilegreen");
			this.colorBluePropertyDOM = pickerDOM.querySelector("#tileblue");
			this.buildPropertyDOM = pickerDOM.querySelector("#tilebuild");
			this.imgDOM = pickerDOM.querySelector("#tileimg");
			
			this.lastSelectedTileDOM = null;
		}
		
		clearTerrainList() {
			while(this.terrainListDOM.firstChild) {
				this.terrainListDOM.removeChild(this.terrainListDOM.lastChild);
			}
		}
		
		getHexColorFromRGB(rgb) {
			let color = rgb.toString(16);
			if(color.length < 2)
				color = "0" + color;
			return color;
		}
		
		getHexColorStringFromTile(tile) {
			return "#" + (this.getHexColorFromRGB(tile.color.r) + this.getHexColorFromRGB(tile.color.g) + this.getHexColorFromRGB(tile.color.b)).toUpperCase();
		}
		
		updatePropertiesDOM(tile) {
			this.tileNameDOM.innerText = tile.name;
			this.typePropertyDOM.innerText = tile.type;
			this.colorPropertyDOM.innerText = this.getHexColorStringFromTile(tile);
			this.colorRGBPropertyDOM.innerText = tile.color.r + ", " + tile.color.g + ", " + tile.color.b;
			this.colorRedPropertyDOM.innerText = tile.color.r;
			this.colorGreenPropertyDOM.innerText = tile.color.g;
			this.colorBluePropertyDOM.innerText = tile.color.b;
			this.buildPropertyDOM.innerText = "Current";
			let clipEvents = [this.tileNameDOM, this.typePropertyDOM,this.colorPropertyDOM,
							this.colorRGBPropertyDOM, this.colorRedPropertyDOM, this.colorGreenPropertyDOM,
							this.colorBluePropertyDOM, this.buildPropertyDOM];
			
			for(const clipe in clipEvents) {
				clipEvents[clipe].addEventListener("click", evt => {
					navigator.clipboard.writeText(clipEvents[clipe].innerText);
				});
			}
			
			if(tile.hasOwnProperty("img")) {
				this.imgDOM.src = tile.img;
			} else {
				this.imgDOM.src = "deftile.png";
			}
		}
		
		setSelectedTileDOM(tileDOM) {
			if(this.lastSelectedTileDOM !== null) {
				this.lastSelectedTileDOM.className = "terrainbtn";
			}
			
			this.lastSelectedTileDOM = tileDOM;
			tileDOM.className = "terrainbtn active";
		}
		
		createTerrainTileDOM(tile) {
			let tileDOM = document.createElement("div");
			let tilePreviewDOM = document.createElement("div");
			let tilePreviewIMGDOM = document.createElement("img");
			let tileLabelDOM = document.createElement("div");
			
			tileDOM.className = "terrainbtn";
			if(tile.hasOwnProperty("img")) {
				tilePreviewIMGDOM.src = tile.img;
			} else {
				tilePreviewIMGDOM.src = "deftile.png";
			}
			tileLabelDOM.innerText = tile.name;
			
			tilePreviewDOM.appendChild(tilePreviewIMGDOM);
			tileDOM.appendChild(tilePreviewDOM);
			tileDOM.appendChild(tileLabelDOM);
			
			tileDOM.addEventListener("click", evt => {
				this.updatePropertiesDOM(tile);
				this.setSelectedTileDOM(tileDOM);
			});
			
			return tileDOM;
		}
		
		addTerrainToDOM(tile) {
			this.terrainListDOM.appendChild(this.createTerrainTileDOM(tile));
		}
		
		populateTerrainList() {
			this.clearTerrainList();
			
			for(const tilen in this.tiles.tiles) {
				const tile = this.tiles.tiles[tilen];
				
				this.addTerrainToDOM(tile);
			}
		}
		
		start() {
			this.populateTerrainList();
		}
}

class FLDraggableWindows {
	constructor() {
		this.windows = [];
		this.detect();
	}
	
	mouseDown(evt) {
		console.log("Draggable window lol");
	}
	
	detect() {
		let windowsFound = document.querySelectorAll("window");
		
		for(const win in windowsFound) {
			let winTitleBarDOM = windowsFound[win].querySelector("wintitle");
			if(!winTitleBarDOM) return false;
			
			let winPane = winTitleBarDOM.parentElement;
			
			winTitleBarDOM.addEventListener("mousedown", this.mouseDown);
		}
	}
}

function fl_preloadImgs(_cb, imgList) {
	let imgs = [];
	
};

function loadedEvt() {
	console.log("Okay... here we go!");
	
	let pzcp = new PZColorPicker(document.getElementById("pzcpw"), C_TILES);
	
	let first = true;
	
	pzcp.start();
}

window.addEventListener("load", loadedEvt);