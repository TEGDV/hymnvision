import { createSignal, onMount, For, Index} from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import {Song, Section} from "../types";
import { createStore } from "solid-js/store";
import {IconSearch, IconPlusV2, IconUpdate, IconTrash} from "./Icons";
import ConfirmModal from "./ConfirmationModal";

import {A} from "@solidjs/router";

function ListComponent() {
  const [showModal, setShowModal] = createSignal(false);
  const [songEntries, setSongEntries] = createStore<{entries: Song[]}>({entries: []});
  const [selectedSongId, setSelectedSongId] = createSignal(null);
  const [previewLyrics, setPreviewLyrics] = createSignal<Section[]>([]);

  onMount(async () => {
    query_all();
  });

  const query_all = async () => {
    let songs: Song[] = [];
    await invoke("query_all", {}).then((entries) => {
      setSongEntries("entries", entries)
      setPreviewLyrics([])
    })
  }
  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedSongId(id);
  }
  const confirmDelete = async () => {
    let deletedSongInfo: Song = await invoke("delete_song", {id: selectedSongId()})
    query_all();
    setShowModal(false);
  }

  const search_song = async (event) => {
    // full text search function
    let search_string = event.target.value;
    if (search_string === "") {
      await invoke("query_all", {}).then((entries) => {
        setSongEntries("entries",entries)
      })
    } else {
      const response = await invoke("search_song", {query: search_string });
      setSongEntries("entries",response)
    }
  };

  return (
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
          {(song) => <>
            <div class="container-primary grid grid-cols-12 w-full col-span-12 max-h-[32px]" onMouseEnter={() => setPreviewLyrics(song.lyrics)}>
                <p class="text-sm ctrl h-full w-full truncate overflow-hidden col-span-3">{song.title}</p>
                <p class="text-sm ctrl h-full w-full truncate overflow-hidden col-span-3">{song.author}</p>
                <p class="text-sm ctrl h-full w-full truncate overflow-hidden col-span-3">{song.album}</p>
                <div class="ctr w-6">
                  <IconPlusV2 className="sm-icon"/>
                </div>
                <div class="ctr w-6">
                  <A class="h-full w-full ctr border-solid hover:bg-blue-900" href={"/songs/" + song.id}><IconUpdate className="sm-icon"/></A>
                </div>
                <div class="ctr w-6 hover:bg-blue-900" onClick={() => handleDelete(song.id)}>
                  <IconTrash className="sm-icon" />
                </div>
            </div>
          </>
          }
        </For>
      </div>
      <div class="container-secondary col-span-4 row-span-12 col-start-9 row-start-1 overflow-scroll">
        <For each={previewLyrics()}>
          {(section) => <p class="text-sm m-2 whitespace-pre"><b>{section.section_type}</b><br/>{section.lines.join("\n")}</p>
          }
        </For>
      </div>
      <Show when={showModal()}>
        <ConfirmModal
          message="Are you sure you want to delete this item?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      </Show>
    </div>
  );
}

export default ListComponent;
