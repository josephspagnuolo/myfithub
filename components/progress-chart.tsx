"use client";

import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'July',
    Bench: 110,
    Deadlift: 240,
    Squat: 140,
  },
  {
    name: 'Aug',
    Bench: 150,
    Deadlift: 239,
    Squat: 221,
  },
  {
    name: 'Sep',
    Bench: 200,
    Deadlift: 280,
    Squat: 229,
  },
  {
    name: 'Oct',
    Bench: 178,
    Deadlift: 390,
    Squat: 290,
  },
  {
    name: 'Nov',
    Bench: 239,
    Deadlift: 380,
    Squat: 318,
  },
  {
    name: 'Dec',
    Bench: 319,
    Deadlift: 408,
    Squat: 388,
  },
  {
    name: 'Jan',
    Bench: 339,
    Deadlift: 518,
    Squat: 450,
  },
]

export default function ProgressChart() {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const renderColorfulLegendText = (value: string, entry: any, index: any) => {
    const { color } = entry;
    if (index === 2)
      return <span style={{ color, fontSize: '14px' }}>Bench</span>;
    if (index === 1)
      return <span style={{ color, fontSize: '14px' }}>Squat</span>;
    if (index === 0)
      return <span style={{ color, fontSize: '14px' }}>Deadlift</span>;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md bg-black/75 p-2 pt-1 pb-1.5">
          <p className="">{`${label}`}</p>
          <p className="text-zinc-400 text-sm">{`${payload[0].dataKey}: ${payload[0].value}`}</p>
          <p className="text-zinc-400 text-sm">{`${payload[1].dataKey}: ${payload[1].value}`}</p>
          <p className="text-zinc-400 text-sm">{`${payload[2].dataKey}: ${payload[2].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      {!isSSR ? (
        <>
          <ResponsiveContainer width="100%" height={225} >
            <AreaChart width={700} height={225} data={data}
              margin={{ top: 10, right: 8, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="35%" stopColor="#2a7cf7" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2a7cf7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="35%" stopColor="#82ca9d" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="35%" stopColor="#f23535" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f23535" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: '14' }} tickLine={{ stroke: '#a1a1aa' }} axisLine={{ stroke: '#a1a1aa' }} />
              <YAxis tick={{ fill: '#a1a1aa', fontSize: '14' }} tickLine={{ stroke: '#a1a1aa' }} axisLine={{ stroke: '#a1a1aa' }} />
              <Tooltip content={<CustomTooltip />} animationEasing='ease-in-out' cursor={false} />
              <Legend formatter={renderColorfulLegendText} verticalAlign='top' height={3} fontSize={14} align='right' />
              <Area type="linear" dataKey="Deadlift" stroke="#82ca9d" strokeWidth={2} fillOpacity={0.5} fill="url(#colorPv)" activeDot={{ strokeWidth: 1.8, r: 2.3, fill: '#1a1a1c', stroke: '#82ca9d' }} />
              <Area type="linear" dataKey="Squat" stroke="#f23535" strokeWidth={2} fillOpacity={0.5} fill="url(#colorAmt)" activeDot={{ strokeWidth: 1.8, r: 2.3, fill: '#1a1a1c', stroke: '#f23535' }} />
              <Area type="linear" dataKey="Bench" stroke="#2a7cf7" strokeWidth={2} fillOpacity={0.5} fill="url(#colorUv)" activeDot={{ strokeWidth: 1.8, r: 2.3, fill: '#1a1a1c', stroke: '#2a7cf7' }} />
            </AreaChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="flex justify-center items-center h-[225px]"><svg aria-hidden className="animate-spin h-20 w-20 text-zinc-600 fill-sky-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg></div>
      )}
    </div>
  );
}