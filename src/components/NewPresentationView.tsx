import Card from "./Card.tsx"
import { invoke } from "@tauri-apps/api/core";

function NewPresentationView() {
  return (
    <main class="grid gap-2 grid-cols-12 grid-rows-[32px_repeat(7,1fr)] h-full w-full p-2">
        <div class="ctr" onClick={query_all}>Play Button</div>
        <div class="ctr">Open</div>
        <div class="ctr">Save</div>
        <div class="ctr">+ Media</div>
        <div class="container-primary justify-start grid grid-cols-1 auto-rows-min overflow-auto p-2 row-start-2 col-span-4 row-span-5 gap-2">
          <Card active={true} />
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div class="ctr container-primary row-start-7 col-span-4 row-span-2 bg-green-500">Preview</div>
        <div class="ctr container-primary row-start-2 col-start-5 col-span-4 row-span-full bg-green-900">Text Content</div>
        <div class="ctr container-primary row-start-2 col-start-9 col-span-4 row-span-3 bg-purple-900">Slide</div>
        <div class="ctr container-primary col-start-9 col-span-4 row-span-4 bg-teal-400">Quick References</div>
    </main>
  );
}

export default NewPresentationView;
