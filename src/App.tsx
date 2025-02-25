import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import { A} from "@solidjs/router";

function App() {

  return (
  <section class="grid gap-8 place-items-center justify-center ">
    <h1 class="text-3xl">Welcome to HymnVision</h1>
    <img class="invert" src="/logo-idn.png"/>
    <div class="grid grid-cols-2 grid-rows-2 gap-4">
      <div class="text-center border rounded-lg border-white w-32 h-32 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/new-presentation">New Presentation</A></div>
      <div class="text-center border rounded-lg border-white w-32 h-32 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/lyrics">Lyrics</A></div>
      <div class="text-center border rounded-lg border-white w-32 h-32 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/bible">Bible</A></div>
      <div class="text-center border rounded-lg border-white w-32 h-32 transition duration-300 hover:-translate-2 hover:bg-black hover:border-black"><A class="h-full w-full flex justify-center items-center border-solid" href="/configs">Configs</A></div>
    </div>
  </section>
  );
}

export default App;
