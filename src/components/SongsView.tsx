import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import ListComponent from "./ListComponent"
import {A} from "@solidjs/router";

function SongsView() {
  return (
    <div class="ctr w-full h-full">
      <ListComponent/>
      <div class="container-neutral">
        <A class="h-full w-full ctr border-solid" href="/">Menu</A>
      </div>
      <div class="container-neutral">
        <A class="h-full w-full ctr border-solid" href="/songs/new">Create</A>
      </div>
    </div>
  );
}

export default SongsView;
