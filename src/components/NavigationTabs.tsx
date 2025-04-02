"use client";
import React, { useState } from "react";

const tabs = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];

const NavigationTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Chart");

    return (
        <nav className="flex gap-5 mt-8 text-lg whitespace-nowrap text-zinc-500" role="navigation" aria-label="Dashboard sections">
            <div className="grow shrink-0 basis-0 w-fit">
                <div className="flex gap-2.5" role="tablist">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            aria-controls={`${tab.toLowerCase()}-panel`}
                            id={`${tab.toLowerCase()}-tab`}
                            className={`${idx === 0 ? "!pl-0" : ""} ${idx === tabs.length - 1 ? "!pr-0" : ""} ${activeTab === tab ? "text-[#1A243A] border-indigo-600 border-solid" : "text-[#6F7177] border-transparent"} pt-3 pb-4 px-2.5 border-b-5 cursor-pointer`}
                            onClick={() => setActiveTab(tab)}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                                    e.preventDefault();
                                    const currentIndex = tabs.indexOf(activeTab);
                                    const direction = e.key === "ArrowLeft" ? -1 : 1;
                                    const newIndex = (currentIndex + direction + tabs.length) % tabs.length;
                                    setActiveTab(tabs[newIndex]);
                                }
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavigationTabs;
