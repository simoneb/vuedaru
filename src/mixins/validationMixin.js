const validationMixin = {
  methods: {
    isFormChanged(scope) {
      const root = scope ? (this.fields && this.fields[`$${scope}`]) || {} : this.fields

      return Object.keys(root).some(field => root[field].changed)
    }
  }
}

export default validationMixin
