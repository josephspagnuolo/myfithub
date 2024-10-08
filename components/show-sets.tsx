import { showSets } from "@/lib/actions";

export default async function ShowSets({
  id
}: {
  id: string;
}) {
  const sets = await showSets(id);

  function getSetString1(set: {
    id: string;
    exerciseId: string;
    reps: string | null;
    weight: string | null;
    timehrs: string | null;
    timemins: string | null;
    timeseconds: string | null;
    createdAt: Date;
  }) {
    return (set.reps !== "" && set.weight !== "") ? (Number(set.reps) === 1) ? (`${set.reps} rep of ${set.weight} lbs`) : (`${set.reps} reps of ${set.weight} lbs`)
      : (set.reps !== "") ? (Number(set.reps) === 1) ? (`${set.reps} rep`) : (`${set.reps} reps`)
        : (set.weight !== "") ? (`${set.weight} lbs`)
          : ""
  }

  function getSetString2(set: {
    id: string;
    exerciseId: string;
    reps: string | null;
    weight: string | null;
    timehrs: string | null;
    timemins: string | null;
    timeseconds: string | null;
    createdAt: Date;
  }) {
    return (set.timehrs !== "" && set.timemins !== "" && set.timeseconds !== "") ? (`${set.timehrs}hr ${set.timemins}min ${set.timeseconds}s`)
      : (set.timehrs !== "" && set.timemins !== "") ? (`${set.timehrs}hr and ${set.timemins}min`)
        : (set.timehrs !== "" && set.timeseconds !== "") ? (`${set.timehrs}hr and ${set.timeseconds}s`)
          : (set.timemins !== "" && set.timeseconds !== "") ? (`${set.timemins}min and ${set.timeseconds}s`)
            : (set.timehrs !== "") ? (Number(set.timehrs) === 1) ? (`${set.timehrs} hour`) : (`${set.timehrs} hours`)
              : (set.timemins !== "") ? (Number(set.timemins) === 1) ? (`${set.timemins} minute`) : (`${set.timemins} minutes`)
                : (set.timeseconds !== "") ? (Number(set.timeseconds) === 1) ? (`${set.timeseconds} second`) : (`${set.timeseconds} seconds`)
                  : ""
  }

  return (
    <>
      <div className="w-full max-w-[950px] overflow-hidden flex flex-col">
        {sets.length === 0 ? (
          <span className="text-zinc-400 text-sm">
            No sets so far...
          </span>
        ) : (
          <>
            <ul className="flex grow flex-col divide-y-[1px] space-y-1">
              {sets.map((set, idx) => (
                <li className="-indent-[4.1em] pl-[4.1em] pb-1 pt-1.5" key={set.id}>
                  <span className="text-zinc-400 text-2xl font-light pr-1">Set {idx + 1}:&nbsp;</span>
                  {getSetString1(set) === "" ? (
                    <span className=" text-2xl">{getSetString2(set)}</span>
                  ) : (
                    ""
                  )}
                  {getSetString2(set) === "" ? (
                    <span className=" text-2xl">{getSetString1(set)}</span>
                  ) : (
                    ""
                  )}
                  {(getSetString1(set) !== "" && getSetString2(set) !== "") ? (
                    <span className=" text-2xl">{getSetString1(set)}{", "}<br className="sm:hidden" />{getSetString2(set)}</span>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

