export interface Profile {
  alias: string,
  name: string,
  contact: string,
  email: string,
  description: string
  skills: any
  competences?: any
  avatar: string
  picture?: string
}

export interface State {
  profiles: ReadonlyArray<Profile>
  scan: boolean,
  editProfile: boolean
  profile?: Profile
}

export interface Action {
  type: string,
  payload: any
}

const currentProfile = (state: State = {
  profiles: [],
  scan: false,
  editProfile: false
}, action: Action) => {

  switch (action.type) {
    case "EDIT_PROFILE":
      return {
        ...state,
        editProfile: true,
      }
    case "UPDATE_PROFILE":
      return {
        ...state,
        editProfile: false,
        profiles: [...state.profiles, action.payload]
      }
    case "CANCEL_EDIT_PROFILE":
      return {
        ...state,
        editProfile: false,
      }
    default:
      return state
  }
}

export default currentProfile;
