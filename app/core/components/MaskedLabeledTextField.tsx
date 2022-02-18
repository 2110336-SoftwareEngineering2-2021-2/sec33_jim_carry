import { Controller, useFormContext } from 'react-hook-form'
import InputMask, {
  BeforeMaskedStateChangeStates,
  InputState,
} from 'react-input-mask'

import LabeledTextField, { LabeledTextFieldProps } from './LabeledTextField'

export interface MaskedLabeledTextFieldProps extends LabeledTextFieldProps {
  mask: string | Array<string | RegExp>
  maskChar?: string | null | undefined
  formatChars?: object | undefined
  alwaysShowMask?: boolean | undefined
  inputRef?: React.Ref<HTMLInputElement> | undefined
  beforeMaskedStateChange?(states: BeforeMaskedStateChangeStates): InputState
}

export const MaskedLabeledTextField = function (
  props: MaskedLabeledTextFieldProps
) {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => (
        <InputMask
          value={field.value ?? ''}
          onChange={field.onChange}
          {...props}
        >
          {(inputProps: any) => <LabeledTextField {...inputProps} />}
        </InputMask>
      )}
    />
  )
}

export default MaskedLabeledTextField
