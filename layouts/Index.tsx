import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useTripPlanner from "../store/TripPlannerContext";

export default function Layout({ children }: any) {
  const router = useRouter();
  const { name, setName, mode, setMode } = useTripPlanner();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const signOut = async () => {
    await setName("");
    router.push("/");
  };

  return (
    <div className={"central md:h-screen grid md:grid-rows-5"}>
      <div className="flex justify-between pt-12">
        {name ? (
          <div className="leading-none">
            <h4 className="text-2xl md:text-4xl opacity-40 font-extralight">Hello</h4>
            <h2 className="text-3xl md:text-5xl">{name}</h2>
            <a className="text-xxs md:text-sm opacity-40 tracking-widest mt-4 inline-block" onClick={() => signOut()}>
              SIGNOUT
            </a>
          </div>
        ) : (
          ""
        )}
        <div className="z-100 relative">
          <Link href="/">
            <Image src={`/img/logo-${mode}.svg`} className={"h-auto -mt-6 " + (name ? "w-28 md:w-40" : "w-40 md:w-56")} alt="Logo" width={273} height={135} />
          </Link>
          <a className="block text-right text-xxs uppercase" onClick={() => setMode(mode == "dark" ? "light" : "dark")}>
            {mode == "dark" ? "Light" : "Dark"} Mode
          </a>
        </div>
      </div>

      <main>{children}</main>

      <div className={"py:0 md:py-3 bottom-6 " + (name ? "m:absolute" : "absolute")}>
        <p className="text-xxs md:text-xs font-extralight tracking-wide py-3">quick project for</p>
        <Image src={`/img/lendis-${mode}.svg`} className="w-20 md:w-28 h-auto" alt="Lendis" width={143} height={32} />
      </div>

      {/* <Image src="/img/bike-green.svg" className="" alt="Logo" width={544} height={689} /> */}
    </div>
  );
}
