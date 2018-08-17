const validationMixin = {
  computed: {
    isFormChanged() {
      return Object.keys(this.fields).some(field => this.fields[field].changed)
    }
  }
}

export default validationMixin
