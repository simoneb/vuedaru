import VeeValidate, {Validator} from 'vee-validate'

export default function plugin(Vue) {
  if (plugin.installed) return

  plugin.installed = true

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
    getMessage: field => 'The ' + field + ' value can only contain letters, numbers or the special characters - and _',
    validate: value => /^[A-Za-z0-9_-]+$/.test(value)
  })

  Vue.use(VeeValidate)
}
