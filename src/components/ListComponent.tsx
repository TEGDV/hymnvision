import { createSignal, onMount, For, Index} from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import {Song, Section} from "../types";
import { createStore } from "solid-js/store";
import { A} from "@solidjs/router";
import {IconSearch} from "./Icons";


function ListComponent() {
  const [songEntries, setSongEntries] = createStore<Song[]>([]);
  const [previewLyrics, setPreviewLyrics] = createSignal<Section[]>([]);

  onMount(async () => {
    let songs: Song[] = [];
    await invoke("query_all", {}).then((entries) => {
      setSongEntries(entries)
    })
  });

  const search_song = async (event) => {
    // full text search function
    let search_string = event.target.value;
    if (search_string === "") {
      await invoke("query_all", {}).then((entries) => {
        setSongEntries(entries)
      })
    } else {
      const response = await invoke("search_song", {query: search_string });
      setSongEntries(response)
    }
  };

  return (
    <div class="container-primary grid grid-cols-12 auto-rows-[32px] gap-2">
      <input onInput={search_song} class="w-full col-span-5" type="text" placeholder="Search"/><IconSearch className="md-icon m-2 col-span-1"/>
        <div class="grid grid-cols-3 w-full col-span-6">
            <span>title</span>
            <span>author</span>
            <span>album</span>
        </div>

        <For each={songEntries}>
          {(song) => 
            <div class="grid grid-cols-3 w-full col-span-6 bg-neutral-800 p-2" onMouseEnter={() => setPreviewLyrics(song.lyrics)}>
                <span>{song.title}</span>
                <span>{song.author}</span>
                <span>{song.album}</span>
            </div>
          }
        </For>
      <div class="border-1 bg-neutral col-span-6 row-span-12 col-start-7 row-start-1">
        <For each={previewLyrics()}>
          {(section) => <p class="text-md m-4 whitespace-pre"><bold>{section.section_type}</bold><br/>{section.lines.join("\n")}</p>
          }
        </For>
      </div>

      <div class="container-neutral">
        <A class="h-full w-full ctr border-solid" href="/">Menu</A>
      </div>
    </div>
  );
}

export default ListComponent;
