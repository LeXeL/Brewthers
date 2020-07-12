export default {
    state: {
        brewerys: [],
    },
    mutations: {
        SET_BREWERY: (state, payload) => {
            state.brewerys = payload
        },
    },
    actions: {
        setBrewerys: async ({commit, dispatch}, brewerys) => {
            try {
                commit('SET_BREWERY', brewerys)
            } catch (error) {
                console.log(`Error in store: ${error}`)
                return error
            }
        },
    },
    getters: {
        brewerys: state => state.brewerys,
    },
}
