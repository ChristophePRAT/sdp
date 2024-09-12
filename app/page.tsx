"use client";
import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function Home() {
  const [p, setP] = useState("");
  const [root1, setR1] = useState(0);
  const [root2, setR2] = useState(0);

  const generateP = () => {
    const r1 = Math.floor(Math.random() * 20) - 10;
    const r2 = Math.floor(Math.random() * 20) - 10;
    const a = Math.floor(Math.random() * 20) - 10;

    // P = a(x - r1)(x - r2)
    const b = -a * (r1 + r2);
    const c = a * r1 * r2;
    setR1(r1);
    setR2(r2);
    if (a === 0) {
      generateP();
      return;
    } else if (b ===0) {
      if (c === 0) {
        setP(`$P = ${a !== 1 ? a : ''}x^2 $`);
        return;
      }
      setP(`$P = ${a !== 1 ? a : ''}x^2 ${c > 0 ? '+' : ''} ${c !== 1 ? c : ''} $`);
      return;
    } else if (c === 0) {
      setP(`$P = ${a !== 1 ? a : ''}x^2 ${b > 0 ? '+' : ''} ${b !== 1 ? b : ''}x $`);
      return;
    } 
    setP(`$P = ${a !== 1 ? a : ''}x^2 ${b > 0 ? '+' : ''}${b !== 1 ? b : ''}x ${c > 0 ? '+' : ''}${c !== 1 ? c : ''} $`);

  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    const predR1 = parseFloat(e.target[0].value);
    const predR2 = parseFloat(e.target[1].value);
    if ((predR1 === root1 && predR2 === root2) || (predR1 === root2 && predR2 === root1)) {
      alert("Bravo! Vous avez trouvé les racines de P");
      generateP();
    } else {
      alert("Désolé, vous avez fait une erreur");
    }
    e.target[0].value = "";
    e.target[1].value = "";
  }

  useEffect(() => {
    generateP();
  }, []);
  return (
    <div className="grid items-center justify-items-center min-h-screen place-content-center min-w-screen">
      <main className="flex flex-col align-middle items-center text-center justify-center m-auto min-w-screen">
        <h1 className="text-4xl my-3 font-medium tracking-wider">Trouver les racines de:</h1>
        <h2 className="text-5xl border-2 p-4 my-4">
          <Latex>{p}</Latex>
        </h2>
        <form className="p-6 bg-black shadow-md rounded-lg" onSubmit={(e) => onSubmit(e)}>
          <h3 className="text-xl mb-4">Racines réelles:</h3>
          <div className="flex justify-between gap-20 mb-8 font-bold w-1/2">
            <input
              type="text"
              maxLength={3}
              className="border-b-2 border-gray-300 text-5xl p-3 bg-black text-white focus:outline-none focus:ring-0 w-24 text-center"
              placeholder="0"
            />
            <input
              type="text"
              maxLength={3}
              className="border-b-2 border-gray-300 text-5xl p-3 bg-black text-white focus:outline-none focus:ring-0 w-24 text-center"
              placeholder="0"
            />
          </div>
          <input
            type="submit"
            className="bg-white  text-2xl text-black font-bold p-3 px-5 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
            value="Valider"
          />
        </form>
      </main>
    </div>
  );
}
