import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks'
import { setScreenSizeActions } from '.'

export const useScreenSizeReducer = () => {
  const { screenSize } = useAppSelector((state) => state.screenSizeReducer)
  const dispatch = useDispatch()

  const setScreenSize = (width: number) => {
    dispatch(
      setScreenSizeActions({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      }),
    )
  }

  return {
    screenSize,
    setScreenSize,
  }
}
