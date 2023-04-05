import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";
import "./index.scss";

IgrFinancialChartModule.register();

const CandleChart = ({ chartData }) => {
  const ShowTradingView = false;

  return (
    <>
      {ShowTradingView === false && (
        <div className="control-section" style={{ color: "black" }}>
          <IgrFinancialChart
            width="100%"
            height="400px"
            chartType="Candle"
            thickness={2}
            dataSource={chartData}
            isToolbarVisible={false}
            toolTipType={"Item"}
            dataToolTipUnitsText="Price"
          />
        </div>
      )}
    </>
  );
};

export default CandleChart;
