export { randomizeMap, findArea, colorChange, checkVictory }

import { Random } from 'seeded-random-utils'

function getRandom(maybeSeed=false, amount=2) {
	if( maybeSeed ) {
		let r = new Random(maybeSeed)
		return () => r.int(0, amount)
	} else {
		return () => Math.floor(Math.random() * amount)
	}
}
function randomizeMap(colors=4, sizeX=16, sizeY=24, startX=0, startY=0, seed) {
	let random = getRandom(seed, colors)
	let xs = array2d(sizeX)
	for(let x=0; x<sizeX; x++)
		for(let y=0; y<sizeY; y++) {
			let c = random()
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

function recurseFindArea(array2d, x, y, color, area, visited) {
	let swapped = 0
	const toIndex = (x, y) => y * array2d.sizeX + x
	const fromIndex = i => ({ x: i % array2d.sizeX, y: Math.floor(u / array2d.sizeX) })

	let i = toIndex(x, y)
	let p = array2d.get(x, y)  // [color, owned]

	// Base case
	if( visited[i] || !p ) {
		return swapped
	}

	visited[i] = true  // only visit each position once
	// Include if already owned, or the color we're looking for
	if( p[1] || p[0] === color ) {
		if( !p[1] ) swapped++
		area.push({ x, y })
		p[0] = color
		p[1] = true
		let ns = getNeighbours(x, y)
		ns.forEach(n => {
			swapped += recurseFindArea(array2d, n.x, n.y, color, area, visited)
		})
	}
	return swapped
}
// Find the contiguous area centered on (x,y)
// then change it and return how many was swapped
function findArea(array2d, x, y, newColor) {
	// return array2d.data.filter(({ color, owned }) => owned)
	let sizeY = array2d.data.length / array2d.sizeX
	let area = []


	let visited = []
	// visited[toIndex(x, y)] = true
	let color = array2d.get(x, y)[0]
	return recurseFindArea(array2d, x, y, newColor, area, visited)
	/*
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
	*/
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
