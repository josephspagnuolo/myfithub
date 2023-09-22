import DateBox from "./datebox";

export default function WorkoutList(
  { workouts
  }: {
    workouts:
    { id: string; userEmail: string; content: string; createdAt: Date; }[]
  }) {

  const workoutTimes = workouts.map(w => w.createdAt.toLocaleDateString('en-US', { timeZone: 'America/New_York' }))

  var getDaysArrayStrings = function (start: Date, end: Date) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt).toLocaleDateString('en-US', { timeZone: 'America/New_York' }));
    }
    return arr;
  };

  const whatDayIsIt = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', weekday: 'long' })
  const dayOfWeek =
    (whatDayIsIt === "Sunday") ? 1
      : (whatDayIsIt === "Monday") ? 2
        : (whatDayIsIt === "Tuesday") ? 3
          : (whatDayIsIt === "Wednesday") ? 4
            : (whatDayIsIt === "Thursday") ? 5
              : (whatDayIsIt === "Friday") ? 6
                : 7

  var daylist = getDaysArrayStrings(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
  var week0 = daylist.slice(daylist.length - dayOfWeek, daylist.length)
  var week1 = daylist.slice(daylist.length - dayOfWeek - 7, daylist.length - dayOfWeek)
  var week2 = daylist.slice(daylist.length - dayOfWeek - 14, daylist.length - dayOfWeek - 7)
  var week3 = daylist.slice(daylist.length - dayOfWeek - 21, daylist.length - dayOfWeek - 14)
  var week4 = daylist.slice(daylist.length - dayOfWeek - 28, daylist.length - dayOfWeek - 21)
  var week5 = daylist.slice(daylist.length - dayOfWeek - 35, daylist.length - dayOfWeek - 28)
  var week6 = daylist.slice(daylist.length - dayOfWeek - 42, daylist.length - dayOfWeek - 35)
  var week7 = daylist.slice(daylist.length - dayOfWeek - 49, daylist.length - dayOfWeek - 42)
  var week8 = daylist.slice(daylist.length - dayOfWeek - 56, daylist.length - dayOfWeek - 49)
  var week9 = daylist.slice(daylist.length - dayOfWeek - 63, daylist.length - dayOfWeek - 56)
  var week10 = daylist.slice(daylist.length - dayOfWeek - 70, daylist.length - dayOfWeek - 63)
  var week11 = daylist.slice(daylist.length - dayOfWeek - 77, daylist.length - dayOfWeek - 70)
  var week12 = daylist.slice(daylist.length - dayOfWeek - 84, daylist.length - dayOfWeek - 77)
  var week13 = daylist.slice(daylist.length - dayOfWeek - 91, daylist.length - dayOfWeek - 84)
  var week14 = daylist.slice(daylist.length - dayOfWeek - 98, daylist.length - dayOfWeek - 91)
  var week15 = daylist.slice(daylist.length - dayOfWeek - 105, daylist.length - dayOfWeek - 98)


  return (
    <>
      <div className="flex flex-row gap-1 pb-1.5">
        <div className="grid gap-1 w-7">
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-xs">Mon</div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-xs">Wed</div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-xs">Fri</div>
          <div className="w-3 h-3"></div>
        </div>
        <div className="grid gap-1">{week15.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week14.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week13.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week12.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week11.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week10.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week9.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week8.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week7.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week6.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week5.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week4.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week3.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week2.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week1.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 h-min">{week0.map(day => <DateBox key={day} date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
      </div>
    </>
  )
}
