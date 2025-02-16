import { useEffect, useState } from 'react'
import Input, { InputProps } from '../input/input'

interface InputMoneyProps extends InputProps {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  addonBefore?: string
}

const InputMoney = ({ value, onChange, addonBefore = 'R$', ...props }: InputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState(`${value}`)

  useEffect(() => {
    const valueString = `${value}`

    if (!/\D/.test(valueString.replace('.', ''))) {
      setCurrentValue(value.toFixed(2).toString().replace('.', ','))
    }
  }, [value])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueRemoved = event.target.value.replace('.', '')

    const sizeSlice = valueRemoved.length - 2
    const newValue = [valueRemoved.slice(0, sizeSlice), '.', valueRemoved.slice(sizeSlice)].join('')

    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    })
  }

  return (
    <Input addonBefore={addonBefore} onChange={handleOnChange} value={currentValue} {...props} />
  )
}

export default InputMoney
