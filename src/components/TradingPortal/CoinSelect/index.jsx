import "./index.scss";

const CoinSelect = ({ AllPairs, AllPairsPrice, onClose }) => {
  const s_tableFilter = "";
  const navigate = (baseAsset, quoteAsset) => {
    window.location.href = "trade/" + baseAsset + "_" + quoteAsset;
  };

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <>
      <div className="modal-body">
        <table className="table">
          <thead>
            <tr className="fixed-header">
              <th scope="col">Pairs</th>
              <th scope="col">Price</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {AllPairs.map(
              (dta, i) =>
                dta.quoteAsset.includes(s_tableFilter) &&
                AllPairsPrice[dta.symbol]?.lastPrice > 0 && (
                  <tr onClick={() => navigate(dta.baseAsset, dta.quoteAsset)}>
                    <td className="s-bld">
                      {dta.baseAsset}/{dta.quoteAsset}
                    </td>
                    <td className="">
                      {numberWithCommas(
                        AllPairsPrice[dta.symbol]?.lastPrice.toFixed(16)
                      )}
                    </td>
                    <td className="">
                      {numberWithCommas(
                        AllPairsPrice[dta.symbol]?.priceChangePercent.toFixed(2)
                      )}
                      %
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-primary d-block mx-auto"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default CoinSelect;
