export default {
    state: {
        showDrawer: false,
        movingbeerXY: 0,
    },
    mutations: {
        SET_DRAWER: (state, payload) => {
            state.showDrawer = payload
        },
        SET_MOVINGBEERXY: (state, payload) => {
            state.movingbeerXY = payload
        },
    },
    actions: {},
    getters: {
        showDrawer: state => state.showDrawer,
        movingbeerXY: state => state.movingbeerXY,
    },
}
