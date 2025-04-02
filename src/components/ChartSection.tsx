import React from "react";
import CryptoChart from "./CryptoChart";

const ChartSection: React.FC = () => {
    return (
        <section className="self-start px-16 pt-16 text-lg whitespace-nowrap text-zinc-500 max-md:mt-10 max-md:max-w-full" aria-labelledby="chart-section-title">
            <CryptoChart />
        </section>
    );
};

export default ChartSection;
