import { showSets } from "@/lib/actions";

export default async function ShowSets({ id }: { id: string }) {
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
    return set.reps !== "" && set.weight !== ""
      ? Number(set.reps) === 1
        ? `${set.reps} rep of ${set.weight} lbs`
        : `${set.reps} reps of ${set.weight} lbs`
      : set.reps !== ""
        ? Number(set.reps) === 1
          ? `${set.reps} rep`
          : `${set.reps} reps`
        : set.weight !== ""
          ? `${set.weight} lbs`
          : "";
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
    return set.timehrs !== "" && set.timemins !== "" && set.timeseconds !== ""
      ? `${set.timehrs}hr ${set.timemins}min ${set.timeseconds}s`
      : set.timehrs !== "" && set.timemins !== ""
        ? `${set.timehrs}hr and ${set.timemins}min`
        : set.timehrs !== "" && set.timeseconds !== ""
          ? `${set.timehrs}hr and ${set.timeseconds}s`
          : set.timemins !== "" && set.timeseconds !== ""
            ? `${set.timemins}min and ${set.timeseconds}s`
            : set.timehrs !== ""
              ? Number(set.timehrs) === 1
                ? `${set.timehrs} hour`
                : `${set.timehrs} hours`
              : set.timemins !== ""
                ? Number(set.timemins) === 1
                  ? `${set.timemins} minute`
                  : `${set.timemins} minutes`
                : set.timeseconds !== ""
                  ? Number(set.timeseconds) === 1
                    ? `${set.timeseconds} second`
                    : `${set.timeseconds} seconds`
                  : "";
  }

  return (
    <>
      <div className="-pb-3 flex w-full flex-col overflow-hidden">
        {sets.length === 0 ? (
          <span className="text-sm text-zinc-400">No sets so far...</span>
        ) : (
          <>
            <ul className="-my-1 flex grow flex-col divide-y-[1px] divide-zinc-800">
              {sets.map((set, idx) => (
                <li
                  className="pb-1 pl-[3.9em] pt-0.5 -indent-[3.9em]"
                  key={set.id}
                >
                  <span className="pr-1 text-2xl font-light text-zinc-400">
                    Set {idx + 1}:&nbsp;
                  </span>
                  {getSetString1(set) === "" ? (
                    <span className="text-2xl">{getSetString2(set)}</span>
                  ) : (
                    ""
                  )}
                  {getSetString2(set) === "" ? (
                    <span className="text-2xl">{getSetString1(set)}</span>
                  ) : (
                    ""
                  )}
                  {getSetString1(set) !== "" && getSetString2(set) !== "" ? (
                    <span className="text-2xl">
                      {getSetString1(set)}
                      {", "}
                      <br className="sm:hidden" />
                      {getSetString2(set)}
                    </span>
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
