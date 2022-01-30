import Star from "./Star"

const Seller = (props) => {
  const seller = props.seller
  const shorten_amount = (amount: number): string => {
    if (amount < 1000) {
      return `${amount}`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`
    } else if (amount >= 10 ** 6) {
      return `${(amount / 10 ** 6).toFixed(1)}M`
    } else {
      return `${amount}`
    }
  }
  return (
    <div className="flex flex-row px-6 py-3 space-x-3">
      <div
        style={{ backgroundColor: "grey", width: "44px", height: "44px", borderRadius: "50%" }}
      ></div>
      <div className="flex flex-col">
        <p className="text-ink-light">{seller.name}</p>
        <div className="flex flex-row items-center space-x-1">
          <Star rating={seller.rating} />
          <p className="text-tiny text-ink-light">{`${seller.rating} · ${shorten_amount(
            seller.amount
          )} sold`}</p>
        </div>
      </div>
    </div>
  )
}
export default Seller
