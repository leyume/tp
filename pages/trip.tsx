import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { format } from "date-fns";

import API from "../utils/fetchAPI";
import useTripPlanner from "../store/TripPlannerContext";

export default function Trip() {
  const [open, setOpen] = useState<number>(0);
  const { origin, destination, start_date, journeys, setJourneys } = useTripPlanner();
  const router = useRouter();

  const getJourneys = async () => {
    if (!origin?.id || !destination?.id || !start_date) {
      router.push("/");
    } else {
      let departure = format(new Date(start_date), "yyyy-MM-dd'T'hh:mm:ss'Z'");
      let res = await API.get(`journeys?from=${origin.id}&to=${destination.id}&departure=${departure}&results=10`);
      if (res) {
        let trips: any = await res.journeys.map((j: any) => ({
          stops: j.legs.length,
          price: j.price,
          legs: j.legs.map((leg: any) => ({
            arrival: leg.arrival,
            departure: leg.departure,
            origin: leg.origin.name,
            destination: leg.destination.name,
            walking: leg.walking ?? false,
            line: {
              mode: leg.line?.mode,
              product: leg.line?.product,
              operator: leg.line?.operator?.name,
            },
          })),
        }));
        // console.log({ trips });
        setJourneys(trips);
      }
    }
  };

  useEffect(() => {
    if (!journeys?.length) getJourneys();
  }, []);

  let arrow = <Image src="/img/arrow.svg" className="w-8" alt="arrow" width={12} height={12} />;

  return (
    <div className="">
      {origin?.id && destination?.id && journeys?.length ? (
        <div className="flex pb-12 font-extralight leading-6">
          <div className="text-3xl pr-3 opacity-0 md:opacity-100">
            <div className="lbl">your journey start from</div>
            <div className="pt-3">{origin?.name}&nbsp;</div>

            <div className="lbl">going to</div>
            <div className="pt-3">{destination?.name}&nbsp;</div>

            {start_date ? (
              <>
                <div className="lbl">planned for</div>
                <div className="pt-3">{start_date}&nbsp;</div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="trip-result">
            <div className="pt-46">
              <h2 className="text-4xl pb-8 px-6 md:px-12 border-b border-white border-opacity-50">
                Trip Results <span className="text-brand-neon">- {journeys.length}</span>
              </h2>
              <div className="h-[calc(100vh_-_260px)] overflow-auto">
                {journeys.map((j: any, index: number) => (
                  <div key={index} className={"pt-8 border-t border-white border-opacity-25 pb-8"}>
                    <div className="flex gap-6 md:gap-12 justify-between px-6 md:px-12">
                      <div>
                        <h4 className="text-3xl font-bold mt-2">
                          {j.stops} stop{j.stops > 1 ? "s" : ""}
                        </h4>
                        <div className="text-base md:text-lg font-medium mt-4">
                          {j.legs.map((leg: any) => (
                            <span key={leg.origin} className="">
                              {leg.origin} {arrow}
                            </span>
                          ))}
                          <span className="">{j.legs[j.legs.length - 1].destination}</span>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-2xl">&nbsp;{j.price?.currency}</div>
                        <div className="text-5xl text-brand-neon font-medium mt-4 mb-8">&nbsp;{j.price?.amount}</div>
                      </div>
                    </div>
                    <div className="md:flex justify-between px-6 md:px-12 mt-2 items-center">
                      <div className="text-sm opacity-60 mb-4 md:mb-0">
                        {format(new Date(j.legs[0].departure), "LLL d, yyyy h:mm a")} {arrow}
                        {format(new Date(j.legs[j.legs.length - 1].arrival), "LLL d, yyyy h:mm a")}
                      </div>
                      <a className="btn" onClick={() => setOpen(index + 1)}>
                        VIEW DETAILS
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={"trip-result trip-details z-5 transition-all duration-500 " + (open ? "-mr-8" : "-mr-300")}>
            {open ? (
              <div className="pt-28">
                <a className="btn ml-6 md:ml-12" onClick={() => setOpen(0)}>
                  GO BACK
                </a>
                <div className="flex justify-between items-end pt-4 pb-6 pl-6 md:pl-12 pr-16 md:pr-28 border-b border-white border-opacity-50">
                  <h2 className="text-5xl mb-3">
                    {journeys[open - 1].stops} <span className="text-brand-neon">stop{journeys[open - 1].stops > 1 ? "s" : ""}</span>
                  </h2>
                  <div className="">
                    <div className="text-2xl">&nbsp;{journeys[open - 1].price?.currency}</div>
                    <div className="text-5xl text-brand-neon font-medium mt-4">&nbsp;{journeys[open - 1].price?.amount}</div>
                  </div>
                </div>
                <div className="h-[calc(100vh_-_260px)] overflow-auto">
                  <div className=" border-t border-white border-opacity-25 pb-8">
                    <div className="pt-8 bg-brand-purple bg-opacity-20  px-6 md:px-12">
                      <div className="text-lg font-medium">
                        {journeys[open - 1].legs.map((leg: any) => (
                          <span key={leg.origin} className="">
                            {leg.origin} {arrow}
                          </span>
                        ))}
                        <span className="">{journeys[open - 1].legs[journeys[open - 1].legs.length - 1].destination}</span>
                      </div>
                      <div className="mt-4 items-center pb-6">
                        {format(new Date(journeys[open - 1].legs[0].departure), "LLL d, yyyy h:mm a")} {arrow}
                        {format(new Date(journeys[open - 1].legs[journeys[open - 1].legs.length - 1].arrival), "LLL d, yyyy h:mm a")}
                      </div>
                    </div>
                    {journeys[open - 1].legs.map((leg: any) => (
                      <div key={leg.origin} className={"flex px-6 md:px-12 border-t border-white border-opacity-15 py-6"}>
                        <div className="h-2 w-2 bg-brand-neon rounded-full mt-2 mr-4"></div>
                        <div className="tracking-wide">
                          <div className="text-xl font-medium">
                            {leg.origin} {arrow} {leg.destination}
                          </div>
                          <div className="flex mt-2 gap-10 text-sm">
                            <div>
                              <div className="lbl_">DEPARTURE</div>
                              <div>{format(new Date(leg.departure), "LLL d, yyyy h:mm a")} </div>
                            </div>
                            <div>
                              <div className="lbl_">ARRIVAL</div>
                              <div>{format(new Date(leg.arrival), "LLL d, yyyy h:mm a")} </div>
                            </div>
                          </div>
                          <div className="flex mt-2 gap-10">
                            {leg.walking ? (
                              <div>
                                <div className="lbl_">MODE</div>
                                <div className="capitalize">Walking </div>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <div className="lbl_">MODE</div>
                                  <div className="capitalize">{leg.line.mode} </div>
                                </div>
                                <div>
                                  <div className="lbl_">PRODUCT </div>
                                  <div className="capitalize">{leg.line.product}</div>
                                </div>
                                <div className="hidden md:block">
                                  <div className="lbl_">OPERATOR</div>
                                  <div>{leg.line.operator}</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
