export default {
    state: {
        user: '',
        token: localStorage.getItem('user-token') || '',
        uid: localStorage.getItem('uid') || '',
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.user = payload
        },
        SET_UID: (state, payload) => {
            state.uid = payload
        },
        SET_TOEKN: (state, payload) => {
            state.token = payload
        },
        ADD_CART: (state, payload) => {
            state.user.cart.push(payload)
        },
    },
    actions: {
        setCurrentUser: async ({commit, dispatch}, user) => {
            try {
                let token = await user.getIdToken()
                commit('SET_UID', user.uid)
                commit('SET_TOEKN', token)
                localStorage.setItem('user-token', token)
                localStorage.setItem('uid', user.uid)
            } catch (error) {
                console.log(`Error in store: ${error}`)
                return error
            }
        },
        UserLogout: async ({commit, dispatch}) => {
            commit('SET_USER', '')
            commit('SET_UID', '')
            commit('SET_TOEKN', '')
            localStorage.removeItem('user-token')
            localStorage.removeItem('uid')
        },
        UpdateAmountInItemCart: async ({commit, dispatch, state}, item) => {
            state.user.cart.forEach((c, index) => {
                if (
                    c.id === item.id &&
                    c.type === item.type &&
                    c.price === item.price
                ) {
                    state.user.cart[index].amount = item.amount
                }
            })
        },
        AddToAmountInItemCart: async ({commit, dispatch, state}, item) => {
            state.user.cart.forEach((c, index) => {
                if (
                    c.id === item.id &&
                    c.type === item.type &&
                    c.price === item.price
                ) {
                    state.user.cart[index].amount += 1
                }
            })
        },
        SubtractToAmountInItemCart: async ({commit, dispatch, state}, item) => {
            state.user.cart.forEach((c, index) => {
                if (
                    c.id === item.id &&
                    c.type === item.type &&
                    c.price === item.price
                ) {
                    state.user.cart[index].amount -= 1
                }
            })
        },
        RemoveItemInCart: async ({commit, dispatch, state}, item) => {
            state.user.cart.forEach((c, index) => {
                if (
                    c.id === item.id &&
                    c.type === item.type &&
                    c.price === item.price
                ) {
                    state.user.cart.splice(index, 1)
                }
            })
        },
    },
    getters: {
        user: state => state.user,
        uid: state => state.uid,
        isAuthenticated: state => !!state.token,
        role: state => state.user.role,
        cart: state => (state.user.cart ? state.user.cart : []),
    },
}
