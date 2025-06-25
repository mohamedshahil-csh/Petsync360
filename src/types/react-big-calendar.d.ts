declare module 'react-big-calendar' {
  import * as React from 'react';
  import { ComponentType } from 'react';

  export interface Event {
    id?: string | number;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface CalendarProps {
    events: Event[];
    localizer: any;
    startAccessor?: string | ((event: Event) => Date);
    endAccessor?: string | ((event: Event) => Date);
    style?: React.CSSProperties;
    onSelectEvent?: (event: Event) => void;
    defaultView?: string;
    views?: string[] | { [key: string]: boolean | ComponentType };
    step?: number;
    showMultiDayTimes?: boolean;
    drilldownView?: string;
    // add other props you need here
  }

  export const Calendar: React.ComponentType<CalendarProps>;

  export function momentLocalizer(moment: any): any;
}
