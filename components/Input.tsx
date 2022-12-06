import { ChangeEvent, useId, useState } from "react";

interface InputProps {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string | number;
  readonly?: any;
  search?: boolean;
  onChange?: (e: { name?: string; value?: string }) => void;
}

export default function Input({ name, label, placeholder, type, className, readonly, search, value = "", onChange }: InputProps) {
  const [val, setVal] = useState<string | number>(value);
  const [valID, setValID] = useState<string | number>("");
  const [options, setOptions] = useState<[] | void>([]);
  const id = useId();

  const fc = async (e: ChangeEvent<HTMLInputElement>) => {
    let el = e.target;
    setVal(el.value);
    if (onChange) {
      let res = await onChange({ name: el.name, value: el.value });
      if (search) setOptions(res);
    }
  };

  const select = (sel: { name: string; id: string | number }) => {
    setVal(sel.name);
    setValID(sel.id);
    setOptions([]);
  };

  let input_el = (
    <>
      <>
        <input
          type={type || "text"}
          step="any"
          value={val}
          readOnly={readonly ? true : false}
          className={val ? "filled" : ""}
          id={name + id}
          name={search ? "_" + name : name}
          placeholder={placeholder}
          onChange={(e) => fc(e)}
          autoComplete="off"
        />
        {search ? <input type="hidden" name={name} value={valID} /> : ""}
      </>
      <label htmlFor={name + id}>{label}</label>
    </>
  );

  let opts = options?.length ? (
    <div className="opts">
      {options.map((o: any) => (
        <div key={o.id} className="py-2" onClick={() => select(o)}>
          {o.name}
        </div>
      ))}
    </div>
  ) : (
    ""
  );

  return (
    <div className={"el " + (className ?? "w-full")}>
      {input_el}
      {opts}
    </div>
  );
}
