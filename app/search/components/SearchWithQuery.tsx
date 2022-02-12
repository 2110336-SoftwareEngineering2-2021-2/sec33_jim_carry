import { Button } from "app/core/components/Button"
import { SegmentedControl, SegmentedControlItem } from "app/core/components/SegmentedControl"
import { useState } from "react"
import { SearchTag } from "./SearchTag"

export const SearchWithQuery = () => {
  const [value, setValue] = useState(1)
  return (
    <div>
      <div className="flex flex-row">
        {/* This is handcode since I am not sure what it is supposed to do */}
        <Button buttonType="transparent"> Name </Button>
        <button className="px-8 text-ink-light"> Date</button>
        <button className="px-8 text-ink-light"> Price</button>
        <button className="px-8 text-ink-light"> Rating</button>
      </div>
      <div className="flex flex-col mx-6">
        <div className="h-20 my-6 flex items-center">
          <SearchTag></SearchTag>
        </div>
        <p> Product card</p>
        <p> Another Product card</p>
      </div>
    </div>
  )
}
