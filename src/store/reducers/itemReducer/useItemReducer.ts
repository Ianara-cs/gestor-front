import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { ItemType } from '../../../modules/items/types/ItemType'
import { setItemActions } from '.'

export const useItemReducer = () => {
  const dispatch = useDispatch()
  const { items } = useAppSelector((state) => state.itemReducer)

  const setItems = (currentItem: ItemType[]) => {
    dispatch(setItemActions(currentItem))
  }

  return {
    items,
    setItems,
  }
}
