import Card from "./Card.tsx"
import { createSignal, createMemo,onMount, batch, For, Index, Show} from "solid-js";
import {Song} from "../types";
import SearchSongComponent from "./SearchSongComponent"
import { createStore } from "solid-js/store";
import {IconEye, IconEyeSlash, IconPlay, IconStop, IconArrowRight, IconArrowLeft, IconZoomIn, IconZoomOut} from "./Icons";

function PresentationView() {
  const [songs, setSongs] = createStore<{entries: Song[]}>({entries: []})
  const [showSearchSong, setShowSearchSong] = createSignal<bool>(false)
  const [activeSongId, setActiveSongId] = createSignal<string | null>(null);
  const [activeSong, setActiveSong] = createSignal<Song | null>(null);
  const [currentLines,setCurrentLines] = createSignal([""])
  const [currentPage,setCurrentPage] = createSignal(0)
  const currentLyrics = createMemo(() => activeSong()?.lyrics ?? []);
  const firstSectionLines = createMemo(() => currentLyrics()[0]?.lines ?? []);
  // Controls Signals


  const [textSize, setTextSize] = createSignal(2);
  const [displayedLines, setDisplayedLines] = createSignal(2);
  const [textStyle, setTextStyle] = createSignal("font-techno");
  const [backgroundAnimation, setBackgroundAnimation] = createSignal("default");
  const [page, setPage] = createSignal(0);
  const fontSizeClass = createMemo(() => {
    const size = textSize();
    return {
      1: "text-xl",
      2: "text-2xl",
      3: "text-3xl",
      4: "text-4xl",
      5: "text-5xl",
      6: "text-6xl",
      7: "text-7xl",
    }[size] ?? "text-xl";
  });
  // PresentationCommands

  // Styling
  function zoomIn() {
    setTextSize((size) => Math.min(size + 1, 7));
  }

  function zoomOut() {
    setTextSize((size) => Math.max(size - 1, 1));
  }

  // Controls
  function nextLines() {
    const song = activeSong();
    const currentPage = page();

    if (!song?.lyrics || song.lyrics.length === 0) return;

    const nextPage = (currentPage + 1) % song.lyrics.length;

    const lines = song.lyrics[nextPage]?.lines ?? [];

    batch(() => {
      setPage(nextPage);
      setCurrentLines(lines);
    });
  }

  function prevLines() {
    const song = activeSong();
    const currentPage = page();

    if (!song?.lyrics || song.lyrics.length === 0) return;

    if (currentPage <= 0) return;

    const prevPage = currentPage - 1;

    const lines = song.lyrics[prevPage]?.lines ?? [];

    batch(() => {
      setPage(prevPage);
      setCurrentLines(lines);
    });
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
          <Show when={firstSectionLines().length}>
              <p class="whitespace-pre">{firstSectionLines().join("\n")}</p>
          </Show>
        </div>
      </div>
      <div class="container-primary row-start-2 col-start-5 col-span-4 row-span-full bg-green-900 grid auto-cols-min overflow-scroll">
        <Show when={currentLyrics().length}>
          <For each={currentLyrics()}>
            {(section, index) => 
              <p class="text-md m-2 whitespace-pre"><b>{section.section_type}</b><br/>{section.lines.join("\n")}</p>
            }
          </For>
        </Show>
      </div>
      <div  class="ctr relative flex-wrap container-primary row-start-2 col-start-9 col-span-4 row-span-3">
        <div class="bg-neutral-950/50 w-full">
          <For each={currentLines()}>
            {(line) => 
              <p class={`${textStyle()} ${fontSizeClass()}`}>{line}</p>
            }
          </For>
        </div>
        <button onClick={prevLines} class="mx-2 absolute bottom-2 right-[120px] z-50 bg-blue-100"><IconArrowLeft className="md-icon"/></button>
        <button onClick={nextLines} class="mx-2 absolute bottom-2 right-[94px] z-50"><IconArrowRight className="md-icon"/></button>
        <button class="mx-2 absolute bottom-2 right-[68px] z-50"><IconEye className="md-icon" /></button>
        <button onClick={zoomIn} class="mx-2 absolute bottom-2 right-[42px] z-50"><IconZoomIn className="md-icon" /></button>
        <button onClick={zoomOut} class=" mx-2 absolute bottom-2 right-[16px] z-50"><IconZoomOut className="md-icon" /></button>
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
