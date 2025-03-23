import Card from "./Card.tsx"
import { createSignal, onMount, For, Index, Show} from "solid-js";
import {Song} from "../types";
import SearchSongComponent from "./SearchSongComponent"
import { createStore } from "solid-js/store";

function PresentationView() {
  const [songs, setSongs] = createStore<{entries: Song[]}>({entries: []})
  const [showSearchSong, setShowSearchSong] = createSignal<bool>(false)
  const [activeSongId, setActiveSongId] = createSignal<string | null>(null);
  const [activeSong, setActiveSong] = createSignal<Song | null>(null);
  const [currentLines,setCurrentLines] = createSignal([""])
  const [currentPage,setCurrentPage] = createSignal(0)
  const [presentationControls, setPresentationControls] = createSignal({
    textSize: 1,
    displayedLines: 2,
    textStyle: "font-techno",
    backgroundAnimation: "Default"
  });
  // PresentationCommands
  // Styling

  // Controls
  function nextLines() {
    const song = activeSong(); // Access signal value
    const page = currentPage(); // Current index
    // Validate song and lyrics array
    if (!song?.lyrics || song.lyrics.length === 0) return;

    // Get the current page or loop to 0 if invalid
    const validPage = song.lyrics[page] ? page : 0;

    // Set current lines from valid page
    setCurrentLines(song.lyrics[validPage].lines);

    // Increment page, loop back to 0 if at the end
    const nextPage = (validPage + 1) % song.lyrics.length;
    setCurrentPage(nextPage);
  }
  return (<>
    <main class="grid gap-2 grid-cols-12 grid-rows-[32px_repeat(7,1fr)] h-full w-full p-2">
      <div class="ctr text-sm">Play Button</div>
      <div class="ctr text-sm">Open</div>
      <div class="ctr text-sm">Save</div>
      <div class="ctr text-sm">Add Media</div>
      <div class="ctr text-sm" onClick={() => setShowSearchSong(true)}>Add Songs</div>
      <div class="container-primary justify-start grid grid-cols-1 auto-rows-min overflow-auto p-2 row-start-2 col-span-4 row-span-5 gap-2">
        <For each={songs.entries}>{(song, index) => 
          <Card 
            song={song}
            onClick={() => {
              setActiveSongId(song.id)
              setActiveSong(song)
            }}
            active={activeSongId() === song.id}
          />
        }
        </For>
      </div>
      <div class="ctr flex-wrap container-primary row-start-7 col-span-4 row-span-2 w-full h-full">
        <div class="bg-neutral-950/50 w-full">
          <p class="">Content Here</p>
        </div>
      </div>
      <div class="container-primary row-start-2 col-start-5 col-span-4 row-span-full bg-green-900 grid auto-cols-min overflow-scroll">
        <Show when={activeSong() != null}>
          <For each={activeSong().lyrics}>
            {(section, index) => 
              <p class="text-md m-2 whitespace-pre"><b>{section.section_type}</b><br/>{section.lines.join("\n")}</p>
            }
          </For>
        </Show>
      </div>
      <div onClick={() => nextLines()} class="ctr flex-wrap container-primary row-start-2 col-start-9 col-span-4 row-span-3">
        <div class="bg-neutral-950/50 w-full">
          <For each={currentLines()}>
            {(line) => 
              <p class={`${presentationControls().textStyle} text-${presentationControls().textSize}xl `}>{line}</p>
            }
          </For>
        </div>
      </div>
      <div class="ctr container-primary col-start-9 col-span-4 row-span-4 bg-teal-400">Quick References</div>
    </main>
    <Show when={showSearchSong()}>
      <SearchSongComponent songsContext={[songs, setSongs]} shownModal={[showSearchSong, setShowSearchSong]}/>
    </Show>
  </>
  );
}

export default PresentationView;
