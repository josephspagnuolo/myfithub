import Tooltip from '@mui/joy/Tooltip';

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
    <Tooltip disableInteractive disableFocusListener placement="top" arrow enterTouchDelay={125} leaveTouchDelay={30000} leaveDelay={0} enterDelay={0} title={title}>
      <div className={`rounded-sm ${didworkout ? "bg-green-500" : "bg-gray-700"} w-3 h-3`}></div>
    </Tooltip>
  )
}
