/* eslint-disable*/

const initialState = {
  past: [],
  present: null,
  future: []
}

const historyReducer = (state, action) => {
  const { past, present, future } = state

  switch (action.type) {
  case 'UNDO':
    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)

  return {
    past: newPast,
    present: previous,
    future: [present, ...future]
  }

  case 'REDO':
    const next = future[0]
    const newFuture = future.slice(1)

    return {
      past: [...past, present],
      present: next,
      future: newFuture
    }

  case 'SET':
    const { newPreset } = action

    if (newPresent === present) {
      return state
    }

    return {
      past: [...past, present],
      present: newPresent,
      future: []
    }

  case 'CLEAR':
    const { initialPresent } = action

    return {
      ...initialState,
      present: initialPresent,
    }
  }
}



export default historyReducer
