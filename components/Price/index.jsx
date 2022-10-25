import { priceFormatter } from "../../utils";

const Price = ({ amount, currency, decimals, showDecimals }) => {
  return (
    <span className="Price">
      {priceFormatter(currency).format(amount).split(',')[0]}
      {showDecimals && <sup>{decimals}</sup>}
    </span>
  );
};

export default Price;
