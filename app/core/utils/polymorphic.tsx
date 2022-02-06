import { ComponentProps, ElementType, forwardRef, ReactElement, Ref } from "react"

const restProps = Symbol()

type RestProps = { [restProps]: {} }

export type BoxOwnProps<E extends ElementType = ElementType> = {
  as?: E
}

export type BoxProps<E extends ElementType> = BoxOwnProps<E> &
  Omit<ComponentProps<E>, keyof BoxOwnProps>

type BoxElement<E extends ElementType> = ElementType<ComponentProps<E> & RestProps>

export type PolymorphicComponentProps<E extends ElementType, P> = P & BoxProps<E> & RestProps

export type PolymorphicComponent<P, D extends ElementType = "div"> = <E extends ElementType = D>(
  props: P & BoxProps<E>
) => ReactElement | null

export type PolymorphicComponentBuilder<D extends ElementType = "div"> = <P>(
  render: RenderFunc<P, D>
) => PolymorphicComponent<P, D>

type RenderFunc<P, D extends ElementType> = (
  Box: BoxElement<D>,
  props: Omit<PolymorphicComponentProps<D, P>, "as">,
  ref: Ref<D>
) => ReactElement<any, any> | null

export function polymorphic<D extends ElementType>(
  defaultComponent: D
): PolymorphicComponentBuilder<D> {
  return function builder<P>(render: RenderFunc<P, D>) {
    return buildPolymorphicComponent(defaultComponent, render)
  }
}

function buildPolymorphicComponent<P, D extends ElementType>(
  defaultComponent: D,
  render: RenderFunc<P, D>
): PolymorphicComponent<P, D> {
  const Component = forwardRef(function <E extends ElementType = D>(
    { as, ...props }: PolymorphicComponentProps<E, P>,
    ref: Ref<E>
  ) {
    const Box = (as || defaultComponent) as BoxElement<D>
    return render(Box, props as ComponentProps<E>, ref as Ref<D>)
  })
  Component.displayName = render.name
  return Component
}
