export interface Profile {
  name: string,
  email: string,
  description: string
}

export interface State {
  profiles: ReadonlyArray<Profile>
  scan: boolean,
  askProfile: boolean
  profile?: Profile
}

export interface Action {
  type: string,
  payload: any
}

const currentProfile = (state: State = { profiles: [], scan: false, askProfile: false }, action: Action) => {
  switch (action.type) {
    case "ASK_PROFILE":
      return {
        ...state,
        askProfile: true,
      }
    default:
      return state
  }
}

export default currentProfile;
