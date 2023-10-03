"use client"

import Tooltip from '@mui/joy/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useState } from 'react';

export default function DateBox({
  date, didworkout, howmany
}: {
  date: string;
  didworkout: boolean;
  howmany: number;
}
) {

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const isOne = howmany === 1;
  const isZero = howmany === 0;
  const title = isOne ? (howmany.toString() + " Workout on " + date) : (isZero ? ("No Workouts on " + date) : (howmany.toString() + " Workouts on " + date));
  return (
    // <Tooltip disableInteractive disableFocusListener placement="top" arrow enterTouchDelay={125} leaveTouchDelay={30000} leaveDelay={0} enterDelay={0} title={title}>
    //   <div className={`rounded-sm ${didworkout ? "bg-green-500" : "bg-gray-700"} w-3 h-3`}></div>
    // </Tooltip>
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
  )
}
