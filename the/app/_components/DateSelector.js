"use client"
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
// import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./reservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({settings, bookedDates,cabin}) {
  // CHANGE
  const {range, setRange,resetRange} = useReservation()
   const  displayRange = isAlreadyBooked(range, bookedDates)? {}: range;

  const {regular_Price, dissount} = cabin;

  const numNights = differenceInDays(displayRange.to ,displayRange.from )
  const cabinPrice= numNights *(regular_Price -dissount)
  
  // SETTINGS
  const {minBookingLength,maxBookingLength} =settings;
  
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        onSelect={setRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currentDate)=>isPast(currentDate) ||
          bookedDates.some((date)=>isSameDay(date,currentDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {dissount > 0 ? (
              <>
                <span className="text-2xl">${regular_Price - dissount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_Price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_Price}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
