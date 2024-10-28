import { CssVarsProvider } from "@mui/joy";
import DateBox from "@/components/datebox";

export default function ActivityCalendar({
  workouts,
}: {
  workouts: {
    id: string;
    content: string;
    createdAt: Date;
  }[];
}) {
  const workoutNamesAndTimes = workouts.map((w) => ({
    id: w.id,
    name: w.content,
    date: w.createdAt.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    }),
  }));

  var getDaysArrayStrings = function (start: Date, end: Date) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(
        new Date(dt).toLocaleDateString("en-US", {
          timeZone: "America/New_York",
        }),
      );
    }
    return arr;
  };

  const whatDayIsIt = new Date().toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
  });

  const dayOfWeek =
    whatDayIsIt === "Sunday"
      ? 1
      : whatDayIsIt === "Monday"
        ? 2
        : whatDayIsIt === "Tuesday"
          ? 3
          : whatDayIsIt === "Wednesday"
            ? 4
            : whatDayIsIt === "Thursday"
              ? 5
              : whatDayIsIt === "Friday"
                ? 6
                : 7;

  const isItSunday = dayOfWeek === 1;

  var daylist = getDaysArrayStrings(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    new Date(),
  );
  if (daylist.length === 367) daylist.shift();

  const weeks: string[][] = [];
  for (let i = 0; i <= 53; i++) {
    if (i === 0) {
      weeks.push(daylist.slice(daylist.length - dayOfWeek, daylist.length));
    } else if (i === 52) {
      weeks.push(
        isItSunday
          ? daylist.slice(1, daylist.length - dayOfWeek - 357)
          : daylist.slice(0, daylist.length - dayOfWeek - 357),
      );
    } else if (i === 53) {
      weeks.push(daylist.slice(0, 1));
    } else {
      weeks.push(
        daylist.slice(
          daylist.length - dayOfWeek - i * 7,
          daylist.length - dayOfWeek - (i - 1) * 7,
        ),
      );
    }
  }

  var remaining = function (lengthOfWeek52: number) {
    for (var arr = [], i = 0; i < 7 - lengthOfWeek52; i++) {
      arr.push(i);
    }
    return arr;
  };

  function getMonth(week: string[]) {
    if (week.at(0)?.slice(0, 2) === week.at(week.length - 1)?.slice(0, 2)) {
      const len = week.at(0)?.length || 0;
      const year = week.at(0)?.slice(len - 4, len);
      return week.at(0)?.slice(0, 2) === "1/"
        ? week.includes(`1/7/${year}`)
          ? "Jan"
          : ""
        : week.at(0)?.slice(0, 2) === "2/"
          ? week.includes(`2/7/${year}`)
            ? "Feb"
            : ""
          : week.at(0)?.slice(0, 2) === "3/"
            ? week.includes(`3/7/${year}`)
              ? "Mar"
              : ""
            : week.at(0)?.slice(0, 2) === "4/"
              ? week.includes(`4/7/${year}`)
                ? "Apr"
                : ""
              : week.at(0)?.slice(0, 2) === "5/"
                ? week.includes(`5/7/${year}`)
                  ? "May"
                  : ""
                : week.at(0)?.slice(0, 2) === "6/"
                  ? week.includes(`6/7/${year}`)
                    ? "Jun"
                    : ""
                  : week.at(0)?.slice(0, 2) === "7/"
                    ? week.includes(`7/7/${year}`)
                      ? "Jul"
                      : ""
                    : week.at(0)?.slice(0, 2) === "8/"
                      ? week.includes(`8/7/${year}`)
                        ? "Aug"
                        : ""
                      : week.at(0)?.slice(0, 2) === "9/"
                        ? week.includes(`9/7/${year}`)
                          ? "Sep"
                          : ""
                        : week.at(0)?.slice(0, 2) === "10"
                          ? week.includes(`10/7/${year}`)
                            ? "Oct"
                            : ""
                          : week.at(0)?.slice(0, 2) === "11"
                            ? week.includes(`11/7/${year}`)
                              ? "Nov"
                              : ""
                            : week.at(0)?.slice(0, 2) === "12"
                              ? week.includes(`12/7/${year}`)
                                ? "Dec"
                                : ""
                              : "";
    } else {
      return "";
    }
  }

  return (
    <>
      <CssVarsProvider defaultMode="dark" />
      <div className="flex scroll-mt-1 flex-row justify-center gap-1 overflow-x-auto pb-3 sm:pb-1.5">
        <div className="grid w-[26px] min-w-[26px] gap-1">
          <div className="h-3 w-3"></div>
          <div className="h-3 w-3"></div>
          <div className="h-3 w-3 text-xs leading-3">Mon</div>
          <div className="h-3 w-3"></div>
          <div className="h-3 w-3 text-xs leading-3">Wed</div>
          <div className="h-3 w-3"></div>
          <div className="h-3 w-3 text-xs leading-3">Fri</div>
          <div className="h-3 w-3"></div>
        </div>
        {isItSunday ? (
          <div className="grid w-[12px] gap-1">
            <div className="h-[12px] overflow-visible p-0 pl-[0.5px] text-xs leading-3">
              {getMonth(weeks[53])}
            </div>
            {remaining(weeks[53].length).map((day) => (
              <div key={day} className="h-3 w-3"></div>
            ))}
            {weeks[53].map((day) => (
              <DateBox
                key={day}
                date={day}
                didworkout={workoutNamesAndTimes
                  .map((w) => w.date)
                  .includes(day)}
                workoutsThatDay={workoutNamesAndTimes.filter(
                  (c) => c.date === day,
                )}
                howmany={
                  workoutNamesAndTimes.filter((c) => c.date === day).length
                }
              />
            ))}
          </div>
        ) : null}
        <div className="grid w-[12px] gap-1">
          <div className="h-[12px] overflow-visible p-0 pl-[0.5px] text-xs leading-3">
            {getMonth(weeks[52])}
          </div>
          {remaining(weeks[52].length).map((day) => (
            <div key={day} className="h-3 w-3"></div>
          ))}
          {weeks[52].map((day) => (
            <DateBox
              key={day}
              date={day}
              didworkout={workoutNamesAndTimes.map((w) => w.date).includes(day)}
              workoutsThatDay={workoutNamesAndTimes.filter(
                (c) => c.date === day,
              )}
              howmany={
                workoutNamesAndTimes.filter((c) => c.date === day).length
              }
            />
          ))}
        </div>
        {weeks
          .slice(1, 52)
          .reverse()
          .map((week, index) => (
            <div key={index} className="grid w-[12px] gap-1">
              <div className="h-[12px] overflow-visible p-0 pl-[0.5px] text-xs leading-3">
                {getMonth(week)}
              </div>
              {week.map((day) => (
                <DateBox
                  key={day}
                  date={day}
                  didworkout={workoutNamesAndTimes
                    .map((w) => w.date)
                    .includes(day)}
                  workoutsThatDay={workoutNamesAndTimes.filter(
                    (c) => c.date === day,
                  )}
                  howmany={
                    workoutNamesAndTimes.filter((c) => c.date === day).length
                  }
                />
              ))}
            </div>
          ))}
        <div className="grid h-min w-[12px] gap-1">
          <div className="h-[12px] overflow-visible p-0 text-xs leading-3"></div>
          {weeks[0].map((day) => (
            <DateBox
              key={day}
              date={day}
              didworkout={workoutNamesAndTimes.map((w) => w.date).includes(day)}
              workoutsThatDay={workoutNamesAndTimes.filter(
                (c) => c.date === day,
              )}
              howmany={
                workoutNamesAndTimes.filter((c) => c.date === day).length
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
