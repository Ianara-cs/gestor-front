import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { ItemType } from '../../../modules/items/types/ItemType'
import { setItemActions, setItemsActions } from '.'

export const useItemReducer = () => {
  const dispatch = useDispatch()
  const { items, item } = useAppSelector((state) => state.itemReducer)

  const setItems = (currentItem: ItemType[]) => {
    dispatch(setItemsActions(currentItem))
  }

  const setItem = (currentItem?: ItemType) => {
    dispatch(setItemActions(currentItem))
  }

  return {
    items,
    item,
    setItems,
    setItem,
  }
}
