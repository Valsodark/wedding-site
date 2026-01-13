import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar() {
    const fixedDate = new Date(2026, 7, 23); // Aug 23, 2026

    return (
        <div className="sm:text-lg card-body justify-center items-center gap-6 text-center">
            <DayPicker
                className="h-85"
                mode="single"
                selected={fixedDate}
                defaultMonth={fixedDate}
                weekStartsOn={1}
                disabled={(date) =>
                    date.toDateString() !== fixedDate.toDateString()
                }
                modifiersClassNames={{
                    selected: "custom-selected",
                }}
            />
            <span className='text-lg'>Дата: 23.08.2026</span>
        </div>
    );
}
