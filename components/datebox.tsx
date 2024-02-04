"use client";

import Tooltip from '@mui/joy/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

export default function DateBox({
  date, didworkout, howmany
}: {
  date: string;
  didworkout: boolean;
  howmany: number;
}) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  function getMonth(day: string) {
    return (day.slice(0, 2) === "1/") ? "January"
      : (day.slice(0, 2) === "2/") ? "February"
        : (day.slice(0, 2) === "3/") ? "March"
          : (day.slice(0, 2) === "4/") ? "April"
            : (day.slice(0, 2) === "5/") ? "May"
              : (day.slice(0, 2) === "6/") ? "June"
                : (day.slice(0, 2) === "7/") ? "July"
                  : (day.slice(0, 2) === "8/") ? "August"
                    : (day.slice(0, 2) === "9/") ? "September"
                      : (day.slice(0, 2) === "10") ? "October"
                        : (day.slice(0, 2) === "11") ? "November"
                          : (day.slice(0, 2) === "12") ? "December"
                            : ""
  }
  const month = getMonth(date);
  const format1 = date.substring(date.indexOf("/") + 1);
  const format2 = format1.substring(0, format1.indexOf("/"));
  const suffix = (format2 === "1" || format2 === "21" || format2 === "31") ? "st" : (format2 === "2" || format2 === "22") ? "nd" : (format2 === "3" || format2 === "23") ? "rd" : "th";
  const formattedDate = month + " " + format2 + suffix;
  const isOne = howmany === 1;
  const isZero = howmany === 0;
  const title = isOne ? (howmany.toString() + " Workout on " + formattedDate) : (isZero ? ("No Workouts on " + formattedDate) : (howmany.toString() + " Workouts on " + formattedDate));
  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip onClose={handleTooltipClose} open={open} placement="top" arrow
            disableInteractive disableFocusListener disableHoverListener disableTouchListener title={title}>
            <div onMouseEnter={handleTooltipOpen} onMouseLeave={handleTooltipClose} onClick={handleTooltipOpen} className={`rounded-sm ${didworkout ? "bg-green-500" : "bg-gray-700"} w-3 h-3`}></div>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
}
