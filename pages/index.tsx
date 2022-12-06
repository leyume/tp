import { ChangeEvent, useEffect } from "react";
import useTripPlanner from "../store/TripPlannerContext";

import { useRouter } from "next/router";
import Image from "next/image";
import Input from "../components/Input";

export default function Home() {
  const { name, setName, setOrigin } = useTripPlanner();

  const router = useRouter();

  useEffect(() => {
    if (name) {
      setOrigin({});
      router.push("/start");
    }
  }, []);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData: any = Object.fromEntries(form.entries());
    let { name } = formData;

    if (name) {
      await setName(name);
      router.push("/start");
    }
  };

  return (
    <div className="mt-36 md:mt-0">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex gap-8 items-end">
          <Input label="Enter your name" name="name" value={name} className="md:w-72" placeholder="" />

          <button className="-mb-4">
            <Image src="/img/proceed.svg" className="w-18" alt="Logo" width={72} height={72} />
          </button>
        </div>
      </form>
    </div>
  );
}
