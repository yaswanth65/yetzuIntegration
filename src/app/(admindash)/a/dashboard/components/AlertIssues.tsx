import Image from "next/image";
import React from "react";

type AlertType = "error" | "warning" | "info"

interface AlertItems {
    id: string;
    alertName: string;
    type: AlertType;
}

interface AlertStyles {
    bgColor: string,
    icon: string,
}

const AlertData: AlertItems[] = [
    { id: "1", alertName: "Payment failure for student ID #4821", type: "error" },
    { id: "2", alertName: "Session conflict: WEB-204 & COH-112 overlap", type: "warning", },
    { id: "3", alertName: "3 assignments overdue in Cohort Batch 11", type: "warning" },
    { id: "4", alertName: "Educator Dr. Patel unavailable on Mar 17", type: "info" },
];

const alertStyle: Record<AlertType, AlertStyles> = {
  error: {
    icon: "/admin-dashboard/ad-error-icon.svg",
    bgColor: "#FB2C3626",
  },
  warning: {
    icon: "/admin-dashboard/alert-icon.svg",
    bgColor: "#FE9A0026",
  },
  info: {
    icon: "/admin-dashboard/symbol-icon.svg",
    bgColor: "#2B7FFF26",
  },
};

export default function AlertIssues() {
    return (
        <div className="bg-white rounded-2xl mt-10 border shadow-sm border-gray-100 p-6 ">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Image width={20} height={20} src="/admin-dashboard/alert-icon.svg" alt="dashBoard" />
                    <h3 className="font-semibold">Alerts & Issues</h3>
                </div>
                <span className="inline-block px-2 py-1 bg-gray-200/50 rounded-sm text-xs">
                    5
                </span>
            </div>
            <div className="w-[calc(100%+3rem)] -mx-6 h-px bg-gray-200 my-3"></div>

            <div className="flex flex-col gap-3 mt-4">
                {AlertData.map((data) => {

                    const style = alertStyle[data.type];

                    return (
                        <div key={data.id} className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: style.bgColor}}>
                            <Image width={25} height={(25)} src={style.icon} alt="AlertIcon" />
                            <h3 className="text-[15px]">{data.alertName}</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
