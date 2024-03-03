import DateBox from "./datebox";

export default function WorkoutList({
  workouts
}: {
  workouts: { id: string; content: string; createdAt: Date; }[];
}) {

  const workoutTimes = workouts.map(w => w.createdAt.toLocaleDateString('en-US', { timeZone: 'America/New_York' }));

  var getDaysArrayStrings = function (start: Date, end: Date) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt).toLocaleDateString('en-US', { timeZone: 'America/New_York' }));
    }
    return arr;
  };

  const whatDayIsIt = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', weekday: 'long' });

  const dayOfWeek =
    (whatDayIsIt === "Sunday") ? 1
      : (whatDayIsIt === "Monday") ? 2
        : (whatDayIsIt === "Tuesday") ? 3
          : (whatDayIsIt === "Wednesday") ? 4
            : (whatDayIsIt === "Thursday") ? 5
              : (whatDayIsIt === "Friday") ? 6
                : 7;

  const isItSunday = dayOfWeek === 1;

  var daylist = getDaysArrayStrings(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
  if (daylist.length === 367) daylist.shift();
  var week0 = daylist.slice(daylist.length - dayOfWeek, daylist.length);
  var week1 = daylist.slice(daylist.length - dayOfWeek - 7, daylist.length - dayOfWeek);
  var week2 = daylist.slice(daylist.length - dayOfWeek - 14, daylist.length - dayOfWeek - 7);
  var week3 = daylist.slice(daylist.length - dayOfWeek - 21, daylist.length - dayOfWeek - 14);
  var week4 = daylist.slice(daylist.length - dayOfWeek - 28, daylist.length - dayOfWeek - 21);
  var week5 = daylist.slice(daylist.length - dayOfWeek - 35, daylist.length - dayOfWeek - 28);
  var week6 = daylist.slice(daylist.length - dayOfWeek - 42, daylist.length - dayOfWeek - 35);
  var week7 = daylist.slice(daylist.length - dayOfWeek - 49, daylist.length - dayOfWeek - 42);
  var week8 = daylist.slice(daylist.length - dayOfWeek - 56, daylist.length - dayOfWeek - 49);
  var week9 = daylist.slice(daylist.length - dayOfWeek - 63, daylist.length - dayOfWeek - 56);
  var week10 = daylist.slice(daylist.length - dayOfWeek - 70, daylist.length - dayOfWeek - 63);
  var week11 = daylist.slice(daylist.length - dayOfWeek - 77, daylist.length - dayOfWeek - 70);
  var week12 = daylist.slice(daylist.length - dayOfWeek - 84, daylist.length - dayOfWeek - 77);
  var week13 = daylist.slice(daylist.length - dayOfWeek - 91, daylist.length - dayOfWeek - 84);
  var week14 = daylist.slice(daylist.length - dayOfWeek - 98, daylist.length - dayOfWeek - 91);
  var week15 = daylist.slice(daylist.length - dayOfWeek - 105, daylist.length - dayOfWeek - 98);
  var week16 = daylist.slice(daylist.length - dayOfWeek - 112, daylist.length - dayOfWeek - 105);
  var week17 = daylist.slice(daylist.length - dayOfWeek - 119, daylist.length - dayOfWeek - 112);
  var week18 = daylist.slice(daylist.length - dayOfWeek - 126, daylist.length - dayOfWeek - 119);
  var week19 = daylist.slice(daylist.length - dayOfWeek - 133, daylist.length - dayOfWeek - 126);
  var week20 = daylist.slice(daylist.length - dayOfWeek - 140, daylist.length - dayOfWeek - 133);
  var week21 = daylist.slice(daylist.length - dayOfWeek - 147, daylist.length - dayOfWeek - 140);
  var week22 = daylist.slice(daylist.length - dayOfWeek - 154, daylist.length - dayOfWeek - 147);
  var week23 = daylist.slice(daylist.length - dayOfWeek - 161, daylist.length - dayOfWeek - 154);
  var week24 = daylist.slice(daylist.length - dayOfWeek - 168, daylist.length - dayOfWeek - 161);
  var week25 = daylist.slice(daylist.length - dayOfWeek - 175, daylist.length - dayOfWeek - 168);
  var week26 = daylist.slice(daylist.length - dayOfWeek - 182, daylist.length - dayOfWeek - 175);
  var week27 = daylist.slice(daylist.length - dayOfWeek - 189, daylist.length - dayOfWeek - 182);
  var week28 = daylist.slice(daylist.length - dayOfWeek - 196, daylist.length - dayOfWeek - 189);
  var week29 = daylist.slice(daylist.length - dayOfWeek - 203, daylist.length - dayOfWeek - 196);
  var week30 = daylist.slice(daylist.length - dayOfWeek - 210, daylist.length - dayOfWeek - 203);
  var week31 = daylist.slice(daylist.length - dayOfWeek - 217, daylist.length - dayOfWeek - 210);
  var week32 = daylist.slice(daylist.length - dayOfWeek - 224, daylist.length - dayOfWeek - 217);
  var week33 = daylist.slice(daylist.length - dayOfWeek - 231, daylist.length - dayOfWeek - 224);
  var week34 = daylist.slice(daylist.length - dayOfWeek - 238, daylist.length - dayOfWeek - 231);
  var week35 = daylist.slice(daylist.length - dayOfWeek - 245, daylist.length - dayOfWeek - 238);
  var week36 = daylist.slice(daylist.length - dayOfWeek - 252, daylist.length - dayOfWeek - 245);
  var week37 = daylist.slice(daylist.length - dayOfWeek - 259, daylist.length - dayOfWeek - 252);
  var week38 = daylist.slice(daylist.length - dayOfWeek - 266, daylist.length - dayOfWeek - 259);
  var week39 = daylist.slice(daylist.length - dayOfWeek - 273, daylist.length - dayOfWeek - 266);
  var week40 = daylist.slice(daylist.length - dayOfWeek - 280, daylist.length - dayOfWeek - 273);
  var week41 = daylist.slice(daylist.length - dayOfWeek - 287, daylist.length - dayOfWeek - 280);
  var week42 = daylist.slice(daylist.length - dayOfWeek - 294, daylist.length - dayOfWeek - 287);
  var week43 = daylist.slice(daylist.length - dayOfWeek - 301, daylist.length - dayOfWeek - 294);
  var week44 = daylist.slice(daylist.length - dayOfWeek - 308, daylist.length - dayOfWeek - 301);
  var week45 = daylist.slice(daylist.length - dayOfWeek - 315, daylist.length - dayOfWeek - 308);
  var week46 = daylist.slice(daylist.length - dayOfWeek - 322, daylist.length - dayOfWeek - 315);
  var week47 = daylist.slice(daylist.length - dayOfWeek - 329, daylist.length - dayOfWeek - 322);
  var week48 = daylist.slice(daylist.length - dayOfWeek - 336, daylist.length - dayOfWeek - 329);
  var week49 = daylist.slice(daylist.length - dayOfWeek - 343, daylist.length - dayOfWeek - 336);
  var week50 = daylist.slice(daylist.length - dayOfWeek - 350, daylist.length - dayOfWeek - 343);
  var week51 = daylist.slice(daylist.length - dayOfWeek - 357, daylist.length - dayOfWeek - 350);
  var week52 = isItSunday ? (daylist.slice(1, daylist.length - dayOfWeek - 357)) : (daylist.slice(0, daylist.length - dayOfWeek - 357));
  var week53 = daylist.slice(0, 1);

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
      return (week.at(0)?.slice(0, 2) === "1/") ? (week.includes(`1/7/${year}`)) ? "Jan" : ""
        : (week.at(0)?.slice(0, 2) === "2/") ? (week.includes(`2/7/${year}`)) ? "Feb" : ""
          : (week.at(0)?.slice(0, 2) === "3/") ? (week.includes(`3/7/${year}`)) ? "Mar" : ""
            : (week.at(0)?.slice(0, 2) === "4/") ? (week.includes(`4/7/${year}`)) ? "Apr" : ""
              : (week.at(0)?.slice(0, 2) === "5/") ? (week.includes(`5/7/${year}`)) ? "May" : ""
                : (week.at(0)?.slice(0, 2) === "6/") ? (week.includes(`6/7/${year}`)) ? "Jun" : ""
                  : (week.at(0)?.slice(0, 2) === "7/") ? (week.includes(`7/7/${year}`)) ? "Jul" : ""
                    : (week.at(0)?.slice(0, 2) === "8/") ? (week.includes(`8/7/${year}`)) ? "Aug" : ""
                      : (week.at(0)?.slice(0, 2) === "9/") ? (week.includes(`9/7/${year}`)) ? "Sep" : ""
                        : (week.at(0)?.slice(0, 2) === "10") ? (week.includes(`10/7/${year}`)) ? "Oct" : ""
                          : (week.at(0)?.slice(0, 2) === "11") ? (week.includes(`11/7/${year}`)) ? "Nov" : ""
                            : (week.at(0)?.slice(0, 2) === "12") ? (week.includes(`12/7/${year}`)) ? "Dec" : ""
                              : ""
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="flex flex-row gap-1 pb-3 sm:pb-1.5 overflow-x-auto scroll-mt-1">
        <div className="grid gap-1 w-[26px] min-w-[26px]">
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-xs">Mon</div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-xs">Wed</div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-xs">Fri</div>
          <div className="w-3 h-3"></div>
        </div>
        {isItSunday ? <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week53)}</div>{remaining(week53.length).map(day => <div key={day} className="w-3 h-3"></div>)}{week53.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div> : null}
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week52)}</div>{remaining(week52.length).map(day => <div key={day} className="w-3 h-3"></div>)}{week52.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week51)}</div>{week51.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week50)}</div>{week50.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week49)}</div>{week49.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week48)}</div>{week48.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week47)}</div>{week47.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week46)}</div>{week46.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week45)}</div>{week45.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week44)}</div>{week44.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week43)}</div>{week43.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week42)}</div>{week42.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week41)}</div>{week41.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week40)}</div>{week40.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week39)}</div>{week39.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week38)}</div>{week38.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week37)}</div>{week37.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week36)}</div>{week36.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week35)}</div>{week35.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week34)}</div>{week34.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week33)}</div>{week33.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week32)}</div>{week32.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week31)}</div>{week31.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week30)}</div>{week30.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week29)}</div>{week29.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week28)}</div>{week28.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week27)}</div>{week27.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week26)}</div>{week26.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week25)}</div>{week25.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week24)}</div>{week24.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week23)}</div>{week23.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week22)}</div>{week22.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week21)}</div>{week21.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week20)}</div>{week20.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week19)}</div>{week19.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week18)}</div>{week18.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week17)}</div>{week17.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week16)}</div>{week16.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week15)}</div>{week15.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week14)}</div>{week14.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week13)}</div>{week13.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week12)}</div>{week12.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week11)}</div>{week11.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week10)}</div>{week10.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week9)}</div>{week9.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week8)}</div>{week8.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week7)}</div>{week7.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week6)}</div>{week6.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week5)}</div>{week5.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week4)}</div>{week4.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week3)}</div>{week3.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week2)}</div>{week2.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px]"><div className="h-[12px] overflow-visible text-xs p-0 leading-3 pl-[0.5px]">{getMonth(week1)}</div>{week1.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 w-[12px] h-min"><div className="h-[12px] overflow-visible text-xs p-0 leading-3"></div>{week0.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
      </div>
    </>
  );
}
