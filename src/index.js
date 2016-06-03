var toggle = {
  data: {
    isToggle: true,
  },
  methods: {
    toggle: function () {
      this.isToggle = !this.isToggle
    }
  }
}

new Vue({
  el: '#root',
  mixins: [toggle]
})

// new Vue({
//   el: '#root',
//   mixins: [
//     require('vue-hash-router')
//   ]
// })
