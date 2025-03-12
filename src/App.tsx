import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import { A} from "@solidjs/router";

function App() {

  return (
  <section class="grid justify-items-center m-4 grid-cols-12 gap-4 grid-rows-[minmax(100px,auto)]">
    <h1 class="text-3xl text-center col-span-4 col-start-5 row-start-3">Welcome to HymnVision</h1>
    <div class="col-span-4 col-start-5 row-start-6 flex justify-center">
      <img class="invert " src="/logo-idn.png"/>
    </div>
    <div class="col-start-5 row-start-7 w-full col-span-4 text-center border rounded-lg border-white h-12 min-w-[120px] px-2 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/presentation/new">Presentation</A></div>
    <div class="col-start-5 row-start-8 w-full col-span-4 text-center border rounded-lg border-white h-12 min-w-[120px] px-2 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/songs">Songs</A></div>
    <div class="col-start-5 row-start-9 w-full col-span-4 text-center border rounded-lg border-white h-12 min-w-[120px] px-2 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/bible">Bible</A></div>
    <div class="col-start-5 row-start-10 w-full col-span-4 text-center border rounded-lg border-white h-12 min-w-[120px] px-2 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/configs">Configs</A></div>
  </section>
  );
}

export default App;
