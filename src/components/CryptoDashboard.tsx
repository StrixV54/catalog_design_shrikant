"use client";
import React from "react";
import PriceDisplay from "./PriceDisplay";
import NavigationTabs from "./NavigationTabs";
import ChartSection from "./ChartSection";

const CryptoDashboard: React.FC = () => {
    return (
        <main className="flex min-h-screen w-screen overflow-x-hidden overflow-y-auto flex-col">
            <section className="flex z-10 flex-col px-16 pt-16 max-w-full">
                <PriceDisplay price="63,179.71" changeType="positive" changeValue="2,161.42" changePercent="3.54" currency="USD" />
                <NavigationTabs />
            </section>

            <hr className="w-full border border-gray-100 border-solid min-h-px max-md:max-w-full translate-y-[-2px]" />

            <ChartSection />
        </main>
    );
};

export default CryptoDashboard;
