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

  var getDaysArray = function (start: Date, end: Date) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  var listOfDays = getDaysArray(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
  var daylist = getDaysArrayStrings(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());
  var week = daylist.slice(daylist.length - 7, daylist.length)
  var weekbefore = daylist.slice(daylist.length - 14, daylist.length - 7)
  const dayofweek = listOfDays.at(listOfDays.length - 1)!.getDay() + 1
  var week0 = daylist.slice(daylist.length - dayofweek, daylist.length)
  var week1 = daylist.slice(daylist.length - dayofweek - 7, daylist.length - dayofweek)
  var week2 = daylist.slice(daylist.length - dayofweek - 14, daylist.length - dayofweek - 7)
  var week3 = daylist.slice(daylist.length - dayofweek - 21, daylist.length - dayofweek - 14)
  var week4 = daylist.slice(daylist.length - dayofweek - 28, daylist.length - dayofweek - 21)
  var week5 = daylist.slice(daylist.length - dayofweek - 35, daylist.length - dayofweek - 28)
  var week6 = daylist.slice(daylist.length - dayofweek - 42, daylist.length - dayofweek - 35)
  var week7 = daylist.slice(daylist.length - dayofweek - 49, daylist.length - dayofweek - 42)
  var week8 = daylist.slice(daylist.length - dayofweek - 56, daylist.length - dayofweek - 49)
  var week9 = daylist.slice(daylist.length - dayofweek - 63, daylist.length - dayofweek - 56)
  var week10 = daylist.slice(daylist.length - dayofweek - 70, daylist.length - dayofweek - 63)


  return (
    <>
      <div className="flex flex-row gap-1">
        <div className="grid gap-1 w-8">
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-sm">Mon</div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-sm">Wed</div>
          <div className="w-3 h-3"></div>
          <div className="w-3 h-3 leading-3 text-sm">Fri</div>
          <div className="w-3 h-3"></div>
        </div>
        <div className="grid gap-1">{week10.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week9.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week8.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week7.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week6.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week5.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week4.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week3.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week2.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1">{week1.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
        <div className="grid gap-1 h-min">{week0.map(day => <DateBox date={day} didworkout={workoutTimes.includes(day)} howmany={workoutTimes.filter(c => c === day).length} />)}</div>
      </div>
    </>
  )
}
