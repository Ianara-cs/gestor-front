import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { setButtonMenuCollapsedActions } from '.'

export const useButtonMenuCollapsedReducer = () => {
  const dispatch = useDispatch()
  const { buttonMenuActivate } = useAppSelector((state) => state.buttonMenuCollapsedReducer)

  const setButtonMenuCollapsed = (activate: boolean) => {
    dispatch(setButtonMenuCollapsedActions(activate))
  }

  return {
    buttonMenuActivate,
    setButtonMenuCollapsed,
  }
}
