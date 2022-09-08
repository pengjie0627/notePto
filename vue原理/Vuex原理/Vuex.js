let Vue
class Store{
    constructor(options) {
        this.vm = new Vue({
            state: options.state
        })

        // for getters
        let getters = options.getter || {}
        this.getter = {}
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getter, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })

        // for mutation
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = payload => {
                mutations[mutationName](this.state, payload)
            }
        })

        // for actions
        let actions = option.actions || {}
        this.actions = {}
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = payload => {
                actions[actionName](this, payload)
            }
        })


    }

    // for dispatch
    dispatch(method, payload){
        this.actions[method](payload)
    }

    // for commit
    commit = (method, payload) => {
        this.mutations[method](payload)
    }


    get state(){
        return this.vm.state
    }
}

const install = (_Vue) => {
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

export default {
    install, Store
}