declare module 'react-date-range' {
  import * as React from 'react';

  export interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface DateRangePickerProps {
    ranges: Range[];
    onChange?: (ranges: { [key: string]: Range }) => void;
    moveRangeOnFirstSelection?: boolean;
    showSelectionPreview?: boolean;
    months?: number;
    direction?: 'horizontal' | 'vertical';
    rangeColors?: string[];
    [key: string]: any; // for any other props
  }

  export const DateRangePicker: React.FC<DateRangePickerProps>;
}
