import { useEffect, useState } from "react";


type StatCardProps = {
    title: string;
    value: string | number;
    icon: React.ReactElement;
    bgGradient: string;
    description?: string;
};

export function StatCard({ title, value, icon, bgGradient, description }: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = Number(value);

    useEffect(() => {
        let start = 0;
        const duration = 1500;
        const stepTime = 30;
        const increment = numericValue / (duration / stepTime);

        if (numericValue > 0) {
            const timer = setInterval(() => {
                start += increment;
                if (start >= numericValue) {
                    setDisplayValue(numericValue);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(start));
                }
            }, stepTime);

            return () => clearInterval(timer);
        } else {
            setDisplayValue(0);
        }
    }, [numericValue]);

    function formatNumber(num: number) {
        return new Intl.NumberFormat("de-DE").format(num);
    }

    return (
        <article
            role="region"
            aria-label={`${title} stat card`}
            tabIndex={0}
            className="
        relative
        bg-white/70
        backdrop-blur-md
        rounded-xl
        shadow-xl
        flex
        items-center
        p-5
        space-x-6
        cursor-pointer
        hover:shadow-2xl
        focus:shadow-2xl
        focus:outline-none
        focus:ring-4
        focus:ring-indigo-400
        transition
        duration-300
        ease-in-out
        min-w-0
        transform
        hover:scale-[1.04]
        focus:scale-[1.04]
        dark:bg-gray-900/60
        max-w-sm
        sm:max-w-full
      "
        >
            <div
                className={`
          flex
          items-center
          justify-center
          rounded-full
          w-14 h-14
          bg-gradient-to-tr
          ${bgGradient}
          text-white
          shadow-lg
          transform
          transition-transform
          duration-300
          ease-in-out
          group-hover:scale-110
          group-focus:scale-110
          flex-shrink-0
        `}
            >
                {icon}
            </div>

            <div className="flex flex-col ">
                <p className="text-gray-900 dark:text-gray-200 font-semibold text-base ">
                    {title}
                </p>
                <p className="font-extrabold text-3xl text-gray-900 dark:text-white mt-1 ">
                    {formatNumber(displayValue)}
                </p>
                {description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 ">{description}</p>
                )}
            </div>

        </article>
    );
}