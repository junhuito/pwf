import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');
  const submit = useCallback(async() => {
    if (value) {
     axios.post('https://lwmvoodzxa.execute-api.ap-southeast-1.amazonaws.com/sandbox', {
      name: value,
     })
      .then((res) => {
        setResponse(JSON.stringify(res, null, 2))
      })
      .catch((err) => {
        setResponse(JSON.stringify(err, null, 2))
     })
    }
  }, [value]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <label htmlFor="name">Name</label>
      <input name="name" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
      <button onClick={submit}>Submit</button>
      <button onClick={() => setResponse('')}>Clear</button>

      <pre className="text-wrap">
        {response}
      </pre>
    </main>
  );
}
