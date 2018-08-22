import VeeValidate, {Validator} from 'vee-validate'

export default {
  install(Vue) {
    Validator.extend('json', {
      getMessage: field => 'The ' + field + ' value is not valid JSON',
      validate: value => {
        try {
          JSON.parse(value)
          return true
        } catch (err) {
          return false
        }
      }
    })

    Validator.extend('udaru_id', {
      getMessage: field =>
        'The ' + field + ' value can only contain letters, numbers or the special characters - and _',
      validate: value => /^[A-Za-z0-9_-]+$/.test(value)
    })

    const dict = {
      custom: {
        id: {
          excluded: 'The id field should be unique'
        }
      }
    }

    Validator.localize('en', dict)

    Vue.use(VeeValidate)
  }
}
