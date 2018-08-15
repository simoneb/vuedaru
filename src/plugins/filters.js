export default function plugin(Vue) {
  if (plugin.installed) return

  plugin.installed = true

  Vue.filter('json', value => JSON.stringify(value, null, 2))
}
