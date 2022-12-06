import API from "../utils/fetchAPI";
import { ChangeEvent, useState } from "react";
import useTripPlanner from "../store/TripPlannerContext";

import { useRouter } from "next/router";
import Image from "next/image";
import Input from "../components/Input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Start() {
  const { origin, destination, start_date, setOrigin, setDestination, setStartDate, setJourneys } = useTripPlanner();
  const [startDateTime, setStartDateTime] = useState();

  const router = useRouter();

  const locations = async (input: { name?: string; value?: string }) => {
    if (!input.value || input.value.length < 3) return;
    let res = await API.get("locations?query=" + input.value);
    return res;
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await setJourneys([]);

    const form = new FormData(e.target);
    const formData: any = Object.fromEntries(form.entries());

    let { _from, from, _to, to, date } = formData;

    if (from && to) {
      await setOrigin({ id: from, name: _from });
      await setDestination({ id: to, name: _to });
      await setStartDate("");
    } else if (date) {
      await setStartDate(date);
      router.push("/trip");
    }
  };

  return (
    <div className="mt-24 md:mt-0">
      {origin?.id && destination?.id ? (
        <div className="flex pb-6 md:pb-12 font-extralight leading-6">
          <div className="text-lg md:text-2xl opacity-50 text-right pr-3">
            <div className="pt-3">your journey start from</div>
            <a className="text-xxs">&nbsp;</a>
            <div className="pt-3">going to</div>
            <a className="text-xxs">&nbsp;</a>
            {start_date ? <div className="pt-3">planned for</div> : ""}
          </div>
          <div className="text-lg md:text-2xl">
            <div className="pt-3">{origin?.name}&nbsp;</div>
            <a className="text-xxs opacity-50 tracking-wider" onClick={() => setOrigin({})}>
              CHANGE
            </a>
            <div className="pt-3">{destination?.name}&nbsp;</div>
            <a className="text-xxs opacity-50 tracking-wider" onClick={() => setDestination({})}>
              CHANGE
            </a>
            <div className="pt-3">{start_date}&nbsp;</div>
          </div>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        {!origin?.id || !destination?.id ? (
          <div className="md:flex md:gap-8 md:items-end">
            <Input label="your journey start from" name="from" className="md:w-72" placeholder="city / station" onChange={(e) => locations(e)} search={true} />
            <Image src="/img/arrow.svg" className="w-7 h-auto mb-8 hidden md:inline-block" alt="to" width={72} height={72} />
            <Input label="going to" name="to" className="md:w-72 mt-6 md:mt-0" placeholder="city / station" onChange={(e) => locations(e)} search={true} />

            <button className="-mb-4 mt-6 md:mt-0">
              <Image src="/img/proceed.svg" className="w-18" alt="Logo" width={72} height={72} />
            </button>
          </div>
        ) : !start_date ? (
          <div className="flex gap-8 items-end">
            <div className="md:w-168">
              <label className={startDateTime ? "opacity-40" : ""}>when are you going?</label>
              <DatePicker
                selected={startDateTime}
                name="date"
                onChange={(date: any) => setStartDateTime(date)}
                showTimeSelect
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="day & time"
              />
            </div>
            <button className="-mb-4">
              <Image src="/img/proceed.svg" className="w-18" alt="Logo" width={72} height={72} />
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
