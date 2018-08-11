import {flatten} from 'lodash/fp'
import {mapActions as originalMapActions} from 'vuex'

export const mapMutations = (...mutations) => flatten(mutations).reduce((acc, m) => ({...acc, [m]: m}), {})

export const createMutation = (type, body) => {
  const mutation = (state, payload) => {
    if (!state || !payload) {
      payload = state
      return {
        type,
        ...payload
      }
    }

    return body(state, payload)
  }

  mutation.toString = () => type
  mutation.type = type

  return mutation
}

export const createAction = (type, action) => {
  action.type = type
  return action
}

export const mapActions = (...actions) =>
  originalMapActions(
    flatten(actions).reduce((acc, action) => {
      if (!action) {
        throw new Error('Expected an action with shape {type: String, ...args} but got null or undefined')
      }

      return {...acc, [action.type]: action.type}
    }, {})
  )
