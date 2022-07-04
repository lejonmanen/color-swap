

export function randomizeMap(colors=4, sizeX=16, sizeY=24, startX=0, startY=0) {
	let xs = array2d(sizeX)
	for(let x=0; x<sizeX; x++)
		for(let y=0; y<sizeY; y++) {
			let c = Math.floor(Math.random() * colors)
			xs.set(x, y, [c, x==startX && y==startY])
		}
	return xs
}

export function array2d(sizeX) {
	let data = []
	return {
		// create: (sx, sy) => { this.sizeX = sx; this.sizeY = sy; },
		sizeX: sizeX,
		// sizeY: sy,
		data: data,
		get: (x, y) => { return data[y * sizeX + x] },
		set: (x, y, value) => { data[y * sizeX + x] = value },
		forEach: data.forEach
	}
}
