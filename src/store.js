import create from 'zustand'

const useStore = create(set => ({
	sizex: 7,
	sizey: 10,
	sizeem: '1.8em',
	setSizeX: x => set(state => ({ sizex: x })),
	setSizeY: y => set(state => ({ sizey: y })),
	setSize: (x, y) => set(state => ({ sizex: x, sizey: y })),

	// colors:

}))

export { useStore }
