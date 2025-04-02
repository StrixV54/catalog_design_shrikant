import React from "react";

interface PriceDisplayProps {
    price: string;
    changeValue: string;
    changePercent: string;
    changeType: "positive" | "negative";
    currency: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, changeValue, changePercent, changeType, currency }) => {
    // Determine if the change is positive or negative for accessibility
    const isPositive = changeType ? changeType === "positive" : changeValue.trim().startsWith("+");
    const valueWithoutSign = changeValue.replace("+", "").replace("-", "");
    const percentWithoutSign = changePercent.replace("+", "").replace("-", "").replace("%", "");
    const changeDescription = `Price ${isPositive ? "increased" : "decreased"} by ${changePercent}`;

    return (
        <div className="flex gap-1.5 self-start">
            <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                <h2 className="text-7xl -translate-x-0.5 text-slate-800 max-md:text-4xl" aria-label={`Current price ${price} ${currency}`}>
                    {price}
                </h2>
                <p className="self-start mt-2.5 text-lg text-[#67BF6B]" aria-live="polite" aria-label={changeDescription}>
                    {`${isPositive ? "+" : "-"} ${valueWithoutSign} (${percentWithoutSign}%)`}
                </p>
            </div>
            <span className="self-start mt-2 text-2xl text-[#BDBEBF] font-[Circular_Std_Medium]">{currency}</span>
        </div>
    );
};

export default PriceDisplay;
