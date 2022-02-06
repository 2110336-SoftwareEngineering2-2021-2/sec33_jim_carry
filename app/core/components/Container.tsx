import { polymorphic } from "../utils/polymorphic"

export const Container = polymorphic("div")(function Container(Box, props) {
  const { className, ...restProps } = props
  return <Box className={`${className} max-w-[428px] m-auto`} {...restProps} />
})
