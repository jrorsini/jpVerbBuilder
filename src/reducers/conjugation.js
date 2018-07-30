const initialState= {
  formsToDrill = []
}

export default (state = initialState, action ) => {
  switch (action.type) {
    case 'ADD_TO_DRILL':
      const formsToDrill = state.formsToDrill.concat(action.load)
      return {...state, formsToDrill}
      break;
    default:
      break;
  }
}