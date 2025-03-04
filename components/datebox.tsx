"use client";

import Tooltip from "@mui/joy/Tooltip";
import { useState } from "react";
import Link from "next/link";
import { ClickAwayListener } from "@mui/material";

export default function DateBox({
  date,
  didworkout,
  workoutsThatDay,
  howmany,
}: {
  date: string;
  didworkout: boolean;
  workoutsThatDay: { id: string; name: string; date: string }[];
  howmany: number;
}) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const [openTouch, setOpenTouch] = useState(false);

  const handleTouchTooltipClose = () => {
    setOpenTouch(false);
  };

  const handleTouchTooltipOpen = () => {
    setOpenTouch(true);
  };

  function getMonth(day: string) {
    return day.slice(0, 2) === "1/"
      ? "January"
      : day.slice(0, 2) === "2/"
        ? "February"
        : day.slice(0, 2) === "3/"
          ? "March"
          : day.slice(0, 2) === "4/"
            ? "April"
            : day.slice(0, 2) === "5/"
              ? "May"
              : day.slice(0, 2) === "6/"
                ? "June"
                : day.slice(0, 2) === "7/"
                  ? "July"
                  : day.slice(0, 2) === "8/"
                    ? "August"
                    : day.slice(0, 2) === "9/"
                      ? "September"
                      : day.slice(0, 2) === "10"
                        ? "October"
                        : day.slice(0, 2) === "11"
                          ? "November"
                          : day.slice(0, 2) === "12"
                            ? "December"
                            : "";
  }
  const month = getMonth(date);
  const format1 = date.substring(date.indexOf("/") + 1);
  const format2 = format1.substring(0, format1.indexOf("/"));
  const suffix =
    format2 === "1" || format2 === "21" || format2 === "31"
      ? "st"
      : format2 === "2" || format2 === "22"
        ? "nd"
        : format2 === "3" || format2 === "23"
          ? "rd"
          : "th";
  const formattedDate = month + " " + format2 + suffix;
  const isOne = howmany === 1;
  const isZero = howmany === 0;
  const title = isOne
    ? howmany.toString() + " Workout on " + formattedDate
    : isZero
      ? "No Workouts on " + formattedDate
      : howmany.toString() + " Workouts on " + formattedDate;
  return (
    <>
      <div className="flex md:hidden">
        <ClickAwayListener onClickAway={handleTouchTooltipClose}>
          <div className="flex">
            <Tooltip
              onClose={handleTouchTooltipClose}
              open={openTouch}
              disableFocusListener
              sx={{
                boxShadow: "0px 0px 0px 0px",
                p: "3px 8px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                translate: "0.5px 8px",
              }}
              arrow
              placement="top"
              disableHoverListener
              disableTouchListener
              variant="plain"
              title={
                <>
                  <span className="text-balance text-base">
                    {howmany > 0 ? title + ":" : title}
                  </span>
                  {howmany > 0 && (
                    <div className="pb-1 text-center text-sm">
                      {workoutsThatDay.map((workout, index) => (
                        <Link
                          key={workout.id}
                          href={`/dashboard/workout/${workout.id}`}
                          className="text-sky-500 hover:text-sky-700"
                        >
                          {workout.name}
                          {index < workoutsThatDay.length - 1 && ", "}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              }
            >
              <span
                onClick={handleTouchTooltipOpen}
                className={`rounded-sm ${didworkout ? "bg-green-500" : "bg-[#2d2d30]"} h-3 w-3`}
              ></span>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </div>
      <div className="hidden md:flex">
        <Tooltip
          onClose={handleTooltipClose}
          onOpen={handleTooltipOpen}
          open={open}
          arrow
          sx={{
            boxShadow: "0px 0px 0px 0px",
            p: "3px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            translate: "0.5px 8px",
          }}
          placement="top"
          variant="plain"
          disableInteractive={howmany === 0}
          disableTouchListener
          title={
            <>
              <span className="text-balance text-base">
                {howmany > 0 ? title + ":" : title}
              </span>
              {howmany > 0 && (
                <div className="pb-1 text-center text-sm">
                  {workoutsThatDay.map((workout, index) => (
                    <Link
                      key={workout.id}
                      href={`/dashboard/workout/${workout.id}`}
                      className="text-sky-500 hover:text-sky-700"
                    >
                      {workout.name}
                      {index < workoutsThatDay.length - 1 && ", "}
                    </Link>
                  ))}
                </div>
              )}
            </>
          }
        >
          <span
            onClick={handleTooltipOpen}
            className={`rounded-sm ${didworkout ? "bg-green-500" : "bg-[#2d2d30]"} h-3 w-3`}
          ></span>
        </Tooltip>
      </div>
    </>
  );
}
