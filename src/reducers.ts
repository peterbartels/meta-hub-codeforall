export interface Profile {
  name: string,
  contact: string,
  description: string
  tags: ReadonlyArray<any>
  avatar: string
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
    case "CANCEL_EDIT_PROFILE":
      console.log('q')
      return {
        ...state,
        editProfile: false,
      }
    default:
      return state
  }
}

export default currentProfile;
