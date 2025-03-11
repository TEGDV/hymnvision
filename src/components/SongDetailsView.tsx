import { createSignal, createResource, createEffect } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import type { Song, Section } from "../types";
import {SongSectionType} from "../types";
import LyricsSection from "./LyricsSection.tsx"
import {IconPlus} from "./Icons";
import { A, useParams, useNavigate} from "@solidjs/router";

function fetchSongById(id: string) {
  return invoke<Song>("query_one", { id }); // ✅ Correctly pass `id` as a parameter
}

function SongDetailsView() {
  const params = useParams();
  const navigate = useNavigate();
  const isNew = () => params.id === "new";

  console.log("New")
  console.log(isNew())
  console.log("params.id")
  console.log(params.id)
  // Signals
  const [id, setId] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [album, setAlbum] = createSignal("");
  const [genre, setGenre] = createSignal("");
  const [originalTone, setOriginalTone] = createSignal("");
  const [chordPatternsId, setChordPatternsId] = createSignal("");
  const [sections, setSections] = createSignal<Section[]>([{
    section_type: SongSectionType.VERSE, // Using the enum
    index: 1,
    lines: [""],
    chord_pattern: "default_chord_pattern"
  }]);

  const [song] = createResource(() => (!isNew() ? params.id : null), fetchSongById);

createEffect(() => {
  const data = song();
  if (data) {
    setId(data.id);
    setTitle(data.title);
    setAuthor(data.author);
    setAlbum(data.album);
    setGenre(data.genre);
    setChordPatternsId(data.chord_patterns_id);
    setOriginalTone(data.original_tone);
    setSections(data.lyrics);
  }
});

// ✅ Handle Save (Create or Update)
  const saveSong = async () => {
    const songData: Song = {
      title: title(),
      author: author(),
      album: album(),
      genre: genre(),
      chord_patterns_id: chordPatternsId(),
      original_tone: originalTone(),
      lyrics: sections(),
    };

    try {
      if (isNew()) {
        console.log("Created")
        console.log(songData)
        await invoke("create_song", { body: songData });
      } else {
        console.log("Updated")
        console.log(songData)
        await invoke("update_song", { body: songData, id: id() });
      }
      // navigate("/songs"); // ✅ Redirect after saving
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };
  // Update a specific section
  const updateSection = (index: number, newData: Partial<Section>) => {
    setSections((prev) => {
      const updatedSections = [...prev]; // ✅ Clone the array to avoid reference issues
      Object.assign(updatedSections[index], newData); // ✅ Mutate only the changed section
      return updatedSections; // ✅ Return the same array reference
    });
  };

  // Add a new section dynamically
  const addSection = () => {
    setSections([...sections(), {
      section_type: SongSectionType.VERSE,
      index: sections().length + 1,
      lines: [""],
      chord_pattern: "default_chord_pattern"
    }]);
  };

  return (
    <div class="grid gap-8 grid-cols-12 grid-rows-[repeat(12,1fr)] h-full w-full p-2">
      <div class="grid grid-cols-[120px_repeat(2,1fr)] gap-4 col-span-4 w-full">
        <h2 class="ctr col-span-3 h-full">Song Details</h2>
        <span class="p-4">Title: </span><input type="text" class="container-secondary col-span-2" placeholder="Title" onInput={(e) => setTitle(e.currentTarget.value)} />
        <span class="p-4">Author: </span><input type="text" class="container-secondary col-span-2" placeholder="Author" onInput={(e) => setAuthor(e.currentTarget.value)} />
        <span class="p-4">Album: </span><input type="text" class="container-secondary col-span-2" placeholder="Album" onInput={(e) => setAlbum(e.currentTarget.value)} />
        <span class="p-4">Genre: </span><input type="text" class="container-secondary col-span-2" placeholder="Genre" onInput={(e) => setGenre(e.currentTarget.value)} />
        <span class="p-4">Original Tone: </span><input type="text" class="container-secondary col-span-2" placeholder="Original Tone" onInput={(e) => setOriginalTone(e.currentTarget.value)} />
        <span class="p-4">Chord Patterns: </span><input type="text" class="container-secondary col-span-2" placeholder="Chord Patterns" onInput={(e) => setChordPatternsId(e.currentTarget.value)} />
      </div>

      <div class="container-neutral grid grid-cols-[120px_1fr] grid-flow-row grid-rows-auto auto-rows-min col-span-8 row-span-12 h-full p-4 overflow-scroll gap-2">
        <For each={sections()}>
          {(section, index) => (
            <LyricsSection
              section={section}
              onUpdate={(newData) => updateSection(index(), newData)} // ✅ Use index() instead of static index
            />
          )}
        </For>
        <div class="flex justify-center w-full" onClick={addSection}>
          <IconPlus className="md-icon hover:shadow-md hover:bg-white" />
        </div>
      </div>
      <button class="container-neutral w-[120px] col-span-2" onClick={saveSong}>Save</button>
      <div class="container-neutral">
        <A class="h-full w-full ctr border-solid" href="/">Menu</A>
      </div>
    </div>
  );
}

export default SongDetailsView;
