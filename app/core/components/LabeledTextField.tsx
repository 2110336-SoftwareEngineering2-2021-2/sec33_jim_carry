import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { ErrorMessage, FloatingLabel, TextField } from './TextField'

export interface LabeledTextFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  asTextArea?: boolean
}

export const LabeledTextField = forwardRef<
  HTMLInputElement,
  LabeledTextFieldProps
>(
  (
    { className, label, outerProps, labelProps, name, asTextArea, ...props },
    ref
  ) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(', ')
      : errors[name]?.message || errors[name]
    const as = asTextArea ? 'textarea' : 'input'

    return (
      <div {...outerProps}>
        <div className="relative">
          <TextField
            className={className}
            as={as}
            placeholder={label}
            disabled={isSubmitting}
            {...register(name)}
            fullWidth
            floatingLabel
            hasError={!!error}
            {...props}
          />
          <FloatingLabel htmlFor={name} {...labelProps}>
            {label}
          </FloatingLabel>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    )
  }
)

export default LabeledTextField
