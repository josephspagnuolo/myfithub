export default function DateBox({
  date, didworkout, howmany
}: {
  date: string;
  didworkout: boolean;
  howmany: number;
}
) {

  const isOne = howmany === 1;
  const isZero = howmany === 0;
  const title = isOne ? (howmany.toString() + " Workout on " + date) : (isZero ? ("No Workouts on " + date) : (howmany.toString() + " Workouts on " + date));
  return (
    <div className={`rounded-sm ${didworkout ? "bg-green-500" : "bg-slate-600"} w-3 h-3`} title={title}></div>
  )
}
