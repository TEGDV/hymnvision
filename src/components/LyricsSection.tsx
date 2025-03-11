import { invoke } from '@tauri-apps/api/core';
import { createSignal, onMount,onCleanup, Show, Index} from "solid-js";
import {SongSectionType, Section} from "../types";

function LyricsSection(props: { section: Section; onUpdate: (newData: Partial<Section>) => void }) {

  const sectionOptions = Object.values(SongSectionType) as SongSectionType[];
  const [isOpen, setIsOpen] = createSignal(false);
  const [isDisabled, setIsDisabled] = createSignal(false);
  const [sectionType, setSectionType] = createSignal<SongSectionType>(props.section.section_type);
  const [lyricsLines, setLyricsLines] = createSignal<string[]>(props.section.lines);
  let lyricsRef: HTMLTextAreaElement | undefined;
  let dropdownRef: HTMLDivElement | undefined;
  let lyrics = props.section.lines.join("\n");
  onMount(() => {
    setSectionType(props.section.section_type);
    setLyricsLines(props.section.lines || [""]);

    // Click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        closeDropdown(); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  const closeDropdown = () => {
    setIsOpen(false);
    setIsDisabled(false); // Re-enable button when closing dropdown
  };

  const handleDropdownClick = () => {
    if (isDisabled()) return; // Prevent clicking if disabled

    setIsOpen(true);
    setIsDisabled(true); // Disable button when dropdown is open
  };

  const handleSelect = (selected: SongSectionType) => {
    setSectionType(selected);
    props.onUpdate({ section_type: selected });
    closeDropdown(); // Close dropdown and re-enable button
  };
  // Handle Lyrics Input
  const handleChangeLyrics = (e: Event) => {
    if (lyricsRef) {
      const newText = lyricsRef.innerText.trim();
      if (newText !== lyrics) {
        lyrics = newText; // ✅ Update local variable
        props.onUpdate({ lines: newText.split("\n") }); // ✅ Update parent only on blur
      }
    }
  };

  return (
    <>
      <div class="col-span-1 relative inline-block w-full" ref={dropdownRef}>
        {/* Button to toggle dropdown */}
        <button class="px-4 py-2 border-0 cursor-pointer text-sm" onClick={handleDropdownClick}
          disabled={isDisabled()}>
          {sectionType()}
        </button>

        {/* Dropdown Menu */}
        <Show when={isOpen()}>
          <ul class={`absolute left-0 top-0 mt-1 bg-neutral-950 z-50 overflow-hidden animate-dropdown`}>
            <Index each={sectionOptions}>
              {(section, index) => 
                <li class="px-4 py-2 cursor-pointer hover:bg-gray-600 text-sm" onClick={() => handleSelect(section() as SongSectionType)}>
                  {section}
                </li>
              }
            </Index>
          </ul>
        </Show>
      </div>
      {/* Lyrics Input */}
      <div contentEditable
        ref={lyricsRef}
        class="input-box text-area col-start-2 col-span-5 p-4 resize-none h-fit"
        placeholder="Lyrics"
        value={lyrics}
        onInput={handleChangeLyrics}
      >{lyrics}</div>

    </>
  );
}

export default LyricsSection;

