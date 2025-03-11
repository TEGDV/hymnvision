import { createSignal, onMount, For, Index} from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import {Song, Section} from "../types";
import { createStore } from "solid-js/store";
import {IconSearch} from "./Icons";


function ListComponent() {
  const [songEntries, setSongEntries] = createStore<Song[]>([]);
  const [previewLyrics, setPreviewLyrics] = createSignal<Section[]>([]);

  onMount(async () => {
    let songs: Song[] = [];
    await invoke("query_all", {}).then((entries) => {
      console.log(entries);
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
    <div class="container-primary grid grid-cols-12 auto-rows-[24px] gap-1 min-w-[700px] max-h-[400px]">
      <input onInput={search_song} class="w-full col-span-7 ctrl container-secondary" type="text" placeholder="Search"/>
      <div class="ctr col-span-1 container-secondary"><IconSearch className="md-icon"/></div>
      <div class="grid grid-cols-3 w-full col-span-8">
          <span class="text-sm ctrl h-full w-full">Title</span>
          <span class="text-sm ctrl h-full w-full">Author</span>
          <span class="text-sm ctrl h-full w-full">Album</span>
      </div>

      <div class="grid grid-cols-3 auto-rows-[24px] gap-1 w-full row-span-10 col-span-8 overflow-scroll">
        <For each={songEntries}>
          {(song) => 
            <div class="container-primary grid grid-cols-subgrid w-full col-span-8 max-h-[32px]" onMouseEnter={() => setPreviewLyrics(song.lyrics)}>
                <p class="text-sm ctrl h-full w-full truncate overflow-hidden">{song.title}</p>
                <span class="text-sm ctrl h-full w-full overflow-x-hidden">{song.author}</span>
                <span class="text-sm ctrl h-full w-full overflow-x-hidden">{song.album}</span>
            </div>
          }
        </For>
      </div>
      <div class="container-secondary col-span-4 row-span-12 col-start-9 row-start-1 overflow-scroll">
        <For each={previewLyrics()}>
          {(section) => <p class="text-sm m-2 whitespace-pre"><b>{section.section_type}</b><br/>{section.lines.join("\n")}</p>
          }
        </For>
      </div>

    </div>
  );
}

export default ListComponent;
