import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import type { Song, Section } from "../types";
import {SongSectionType} from "../types";
import LyricsSection from "./LyricsSection.tsx"
import {IconPlus} from "./Icons";

function CreateSong() {
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

  const createNewSong = async () => {
    const song: Song = {
      title: title(),
      author: author(),
      album: album(),
      genre: genre(),
      original_tone: originalTone(),
      chord_patterns_id: chordPatternsId(),
      lyrics: sections(),
    };

    try {
      await invoke("create_song", { body: song });
      alert("Song created successfully!");
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };
  // Update a specific section
  const updateSection = (index: number, newData: Partial<Section>) => {
    setSections((prev) => {
      const updatedSections = [...prev]; // ✅ Clone the array to avoid reference issues
      Object.assign(updatedSections[index], newData); // ✅ Mutate only the changed section
      console.log(newData);
      return updatedSections; // ✅ Return the same array reference
    });
  };

  // Add a new section dynamically
  const addSection = () => {
    console.log("Tuki");
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
        <h2 class="ctr col-span-3 h-full">Create a Song</h2>
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

      <button class="container-neutral" onClick={createNewSong}>Save Song</button>
    </div>
  );
}

export default CreateSong;
