export default {
    name: 'RouterLink',
    props: {
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a'
        },
    },
    render(h){
        return h(this.tag, {
            attrs: {
                href: this.to
            }
        }, this.$slots.default)
    }
}