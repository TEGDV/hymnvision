import Card from "./Card.tsx"
import { createSignal, onMount, For, Index} from "solid-js";
import {Song} from "../types";
import SearchSongComponent from "./SearchSongComponent"
import { createStore } from "solid-js/store";

function PresentationView() {
  const [songs, setSongs] = createStore<{entries: Song[]}>({entries: []})
  const [showSearchSong, setShowSearchSong] = createSignal<bool>(false)
  return (<>
    <main class="grid gap-2 grid-cols-12 grid-rows-[32px_repeat(7,1fr)] h-full w-full p-2">
        <div class="ctr text-sm">Play Button</div>
        <div class="ctr text-sm">Open</div>
        <div class="ctr text-sm">Save</div>
        <div class="ctr text-sm">Add Media</div>
        <div class="ctr text-sm" onClick={() => setShowSearchSong(true)}>Add Songs</div>
        <div class="container-primary justify-start grid grid-cols-1 auto-rows-min overflow-auto p-2 row-start-2 col-span-4 row-span-5 gap-2">
        <For each={songs.entries}>{(song) => 
          <Card song={song}/>
        }
        </For>
        </div>
        <div class="ctr container-primary row-start-7 col-span-4 row-span-2 bg-green-500">Preview</div>
        <div class="ctr container-primary row-start-2 col-start-5 col-span-4 row-span-full bg-green-900">Text Content</div>
        <div class="ctr container-primary row-start-2 col-start-9 col-span-4 row-span-3 bg-purple-900">Slide</div>
        <div class="ctr container-primary col-start-9 col-span-4 row-span-4 bg-teal-400">Quick References</div>
    </main>
    <Show when={showSearchSong()}>
      <SearchSongComponent songsContext={[songs, setSongs]} shownModal={[showSearchSong, setShowSearchSong]}/>
    </Show>
  </>
  );
}

export default PresentationView;
