import {flatten} from 'lodash/fp'
import {mapActions as originalMapActions} from 'vuex'

export const mapMutations = (...mutations) => flatten(mutations).reduce((acc, m) => ({...acc, [m]: m}), {})

export const createMutation = (type, body) => {
  const mutation = (state, payload) => {
    if (!payload) {
      return {
        type,
        ...state
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
  originalMapActions(flatten(actions).reduce((acc, a) => ({...acc, [a.type]: a.type}), {}))
