export { randomizeMap, findArea, colorChange, checkVictory }

function randomizeMap(colors=4, sizeX=16, sizeY=24, startX=0, startY=0) {
	let xs = array2d(sizeX)
	for(let x=0; x<sizeX; x++)
		for(let y=0; y<sizeY; y++) {
			let c = Math.floor(Math.random() * colors)
			xs.set(x, y, [c, x==startX && y==startY])
		}
	return xs
}

function array2d(sizeX) {
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

// Find the contiguous area centered on (x,y)
function findArea(array2d, x, y) {
	// return array2d.data.filter(({ color, owned }) => owned)
	let sizeY = array2d.data.length / array2d.sizeX
	let area = []
	// Set owned==true for every tile adjacent to an owned tile, if they have same color
	for(let x=0; x<array2d.sizeX; x++) {
		for(let y=0; y<sizeY; y++) {
			let p = array2d.get(x, y)
			if( p[1] ) {  // owned
				area.push({ x, y })
				let ns = [array2d.get(x-1, y), array2d.get(x, y-1), array2d.get(x+1, y), array2d.get(x, y+1)]
				ns.forEach(n => {
					// same color == same area
					if( n && n[0] === p[0] ) {
						n[1] = true
					}
				})
			}
		}
	}
	// let owned = array2d.data.filter(([ color, owned ]) => owned)
	// return owned
	return area

}
function colorChange(array2d, area, newColor) {
	// console.log('colorChange', area, newColor, array2d);
	area.forEach(({ x, y }) => array2d.set(x, y, [newColor, true]))
	let {x, y} = area[0]
	findArea(array2d, x, y).forEach(p => { p[1] = true; })
}
function checkVictory(array2d) {
	return array2d.data.every(([color, owned]) => owned)
}
/*function findEdge(area, array2d) {
	let edge = []
	let { x, y } = area[0]
	let color = array2d.get(x, y)
	area.forEach(p => {
		let ns = getNeighbours(p.x, p.y)
		ns.forEach(n => {
			if( array2d.get(n.x, n.y) !== color )

		})
	})
}*/
function getNeighbours(x, y) {
	return [{ x: x-1, y }, { x, y:y-1 }, { x:x+1, y }, { x, y: y+1 }]
}
