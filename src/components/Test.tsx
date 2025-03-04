import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/core";
import type { Song } from "../types";

function CreateSong() {
  const [title, setTitle] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [album, setAlbum] = createSignal("");
  const [genre, setGenre] = createSignal("");
  const [originalTone, setOriginalTone] = createSignal("");
  const [chordPatternsId, setChordPatternsId] = createSignal("");

  const createNewSong = async () => {
    const song: Song = {
      title: title(),
      author: author(),
      album: album(),
      genre: genre(),
      original_tone: originalTone(),
      chord_patterns_id: chordPatternsId(),
      lyrics: [
        {
          section_type: "verse",
          index: 1,
          lines: ["Example line 1", "Example line 2"],
          chord_pattern: "verse_chords",
        },
      ],
    };

    try {
      await invoke("create_song", { body: song });
      alert("Song created successfully!");
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };

  return (
    <div>
      <h2>Create a Song</h2>
      <input type="text" placeholder="Title" onInput={(e) => setTitle(e.currentTarget.value)} />
      <input type="text" placeholder="Author" onInput={(e) => setAuthor(e.currentTarget.value)} />
      <input type="text" placeholder="Album" onInput={(e) => setAlbum(e.currentTarget.value)} />
      <input type="text" placeholder="Genre" onInput={(e) => setGenre(e.currentTarget.value)} />
      <input type="text" placeholder="Original Tone" onInput={(e) => setOriginalTone(e.currentTarget.value)} />
      <input type="text" placeholder="Chord Patterns ID" onInput={(e) => setChordPatternsId(e.currentTarget.value)} />
      <button onClick={createNewSong}>Create Song</button>
    </div>
  );
}

export default CreateSong;
