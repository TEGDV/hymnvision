import { createSignal, onMount, For, Index, Show} from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import {Song, Section} from "../types";
import { createStore } from "solid-js/store";
import {IconPlusV2, IconXMark} from "./Icons";
import {A} from "@solidjs/router";

function SearchSongComponent(props: {
    songsContext: [{ songs: Song[] }, SetStoreFunction<{ songs: Song[] }>];
    shownModal: [() => boolean, (value: boolean) => void];
  }
) {
  const [songEntries, setSongEntries] = createStore<{entries: Song[]}>({entries: []});
  const [selectedSongId, setSelectedSongId] = createSignal(null);
  const [previewLyrics, setPreviewLyrics] = createSignal<Section[]>([]);
  const [songs, setSongs] = props.songsContext;
  const [isOpen, setIsOpen] = props.shownModal;

  onMount(async () => {
    query_all();
  });

  const query_all = async () => {
    let songs: Song[] = [];
    await invoke("query_all", {}).then((response) => {
      setSongEntries("entries", response)
      setPreviewLyrics([])
    })
  }
  const songExists = (song) => songs.entries.some((s) => s.id === song.id);
  const search_song = async (event) => {
    // full text search function
    let search_string = event.target.value;
    if (search_string === "") {
      await invoke("query_all", {}).then((response) => {
        setSongEntries("entries", response)
        setPreviewLyrics([])
      })
    } else {
      const response = await invoke("search_song", {query: search_string });
      setSongEntries("entries", response)
    }
  };
  const toggleAddRemove = (song: Song, flag: bool) => {
    if (flag) {
      // Remove
      setSongs("entries", (prev) => prev.filter((_song) => _song.id !== song.id));
    } else {
      setSongs("entries", (prev) => [...prev, song])
    }
  }

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-opacity-70">
      <div class="container-secondary" onClick={() => setIsOpen(false)}>Close</div>
      <div class="container-primary grid grid-cols-12 auto-rows-[24px] gap-1 w-[800px] max-h-[400px]">
        <input onInput={search_song} class="w-full col-span-8 ctrl container-secondary" type="text" placeholder="Search"/>
        <div class="grid grid-cols-12 w-full col-span-8">
          <span class="text-sm ctrl h-full w-full col-span-3">Title</span>
          <span class="text-sm ctrl h-full w-full col-span-3">Author</span>
          <span class="text-sm ctrl h-full w-full col-span-3">Album</span>
          <span class="text-sm ctrl h-full w-full col-span-3"></span>
        </div>
        <div class="grid grid-cols-12 auto-rows-[24px] gap-1 w-full row-span-10 col-span-8 overflow-scroll">
          <For each={songEntries.entries}>
            {(song) => {
              const isSongInList = () => songs.entries.some((s) => s.id === song.id); // ✅ Dynamically check
              return (
                <div class="container-primary grid grid-cols-12 w-full col-span-12 max-h-[32px]" onMouseEnter={() => setPreviewLyrics(song.lyrics)}>
                  <p class="text-sm ctrl h-full w-full truncate overflow-hidden col-span-3">{song.title}</p>
                  <p class="text-sm ctrl h-full w-full truncate overflow-hidden col-span-3">{song.author}</p>
                  <p class="text-sm ctrl h-full w-full truncate overflow-hidden col-span-3">{song.album}</p>
                  <div class="ctr w-6 col-span-3 hover:bg-blue-300" onClick={() => toggleAddRemove(song, isSongInList())} >
                    { isSongInList() ? (<IconXMark className="sm-icon" />) : <IconPlusV2 className="sm-icon"/>}
                  </div>
                </div>
              )
            }}
          </For>
        </div>
        <div class="container-secondary col-span-4 row-span-12 col-start-9 row-start-1 overflow-scroll">
          <For each={previewLyrics()}>
            {(section) => <p class="text-sm m-2 whitespace-pre"><b>{section.section_type}</b><br/>{section.lines.join("\n")}</p>
            }
          </For>
        </div>
      </div>
    </div>
  );
}

export default SearchSongComponent;
