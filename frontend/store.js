const store = window.Vuex.createStore({
    state () {
        return {
            count: 7
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})


export default store;