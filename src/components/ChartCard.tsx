import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
} from "recharts";

export const ChartCard = ({
  title,
  icon: Icon,
  link,
  linkText = "View All",
  data,
  dataKeyX,
  dataKeyLine,
  dataKeyArea,
  colors,
  gradientId,
  borderColors,
  tooltipStyles,
  areaProps = {},
  lineProps = {},
}: any) => {
  return (
    <div
      className={`relative bg-white dark:bg-gray-900/70 rounded-xl shadow-md backdrop-blur-md border p-4 hover:shadow-lg transition duration-300 ease-in-out transform cursor-pointer
      border-${borderColors.light} dark:border-${borderColors.dark}`}
    >
      <div
        className={`flex justify-between items-center mb-4 border-b pb-2
        border-${borderColors.light} dark:border-${borderColors.dark}`}
      >
        <h2
          className={`text-lg font-semibold flex items-center space-x-2
          text-${colors.text} dark:text-${colors.textDark}`}
        >
          <Icon
            className={`w-5 h-5 text-${colors.icon} dark:text-${colors.iconDark}`}
          />
          <span>{title}</span>
        </h2>
        <a
          href={link}
          className={`text-xs font-medium text-${colors.link} hover:text-${colors.linkHover} dark:hover:text-${colors.linkHoverDark} transition`}
        >
          {linkText}
        </a>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              {colors.gradientStops.map(({ offset, stopColor, stopOpacity }: any) => (
                <stop
                  key={offset}
                  offset={offset}
                  stopColor={stopColor}
                  stopOpacity={stopOpacity}
                />
              ))}
            </linearGradient>
          </defs>
          <CartesianGrid stroke={colors.gridStroke} strokeDasharray="5 5" />
          <XAxis
            dataKey={dataKeyX}
            tick={{ fill: colors.axisTickFill, fontSize: 10, fontWeight: "600" }}
            axisLine={{ stroke: colors.axisLineStroke }}
          />
          <YAxis
            tick={{ fill: colors.axisTickFill, fontSize: 10, fontWeight: "600" }}
            axisLine={{ stroke: colors.axisLineStroke }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: tooltipStyles.backgroundColor }}
            itemStyle={{ color: tooltipStyles.itemColor }}
          />
          <Area
            type="monotone"
            dataKey={dataKeyArea}
            stroke="none"
            fill={`url(#${gradientId})`}
            isAnimationActive={true}
            animationDuration={1200}
            {...areaProps}
          />
          <Line
            type="monotone"
            dataKey={dataKeyLine}
            stroke={colors.lineStroke}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={1200}
            {...lineProps}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
