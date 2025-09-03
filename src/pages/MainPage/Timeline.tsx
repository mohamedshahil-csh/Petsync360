import React from "react";

interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

interface TimelineProps {
  events: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative max-w-4xl mx-auto p-6">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full border border-gray-300"></div>

      <div className="space-y-12">
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex items-center w-full ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="w-1/2">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 relative">
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
                <span className="text-sm text-gray-400">{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
