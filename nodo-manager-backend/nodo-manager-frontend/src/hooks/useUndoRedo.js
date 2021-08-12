import { useCallback, useReducer } from 'react'
import historyReducer from '../reducers/historyReducer'

const useUndoRedo = (initialPresent) => {
  const initialState = {
    past: [],
    present: null,
    future: [],
  }

  const [state, dispatch] = useReducer(historyReducer, {
    ...initialState,
    present: initialPresent,
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' })
    }
  }, [canUndo, dispatch])

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' })
    }
  }, [canRedo, dispatch])

  const set = useCallback((newPresent) => {
    dispatch({ type: 'SET', newPresent })
  }, [dispatch])

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR', initialPresent })
  }, [dispatch, initialPresent])

  return {
    state: state.present, set, undo, redo, clear, canUndo, canRedo,
  }
}

export default useUndoRedo
