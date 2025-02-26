function NewPresentationView() {

  return (
    <main class="grid gap-2 grid-cols-12 grid-rows-[32px_repeat(7,1fr)] h-full w-full p-2">
        <div class="text-center flex items-center justify-center">Play</div>
        <div class="text-center flex items-center justify-center">Open</div>
        <div class="text-center flex items-center justify-center">Save</div>
        <div class="text-center flex items-center justify-center">+ Media</div>
        <div class="text-center flex items-center justify-center row-start-2 col-span-4 row-span-5 bg-blue-900">List Active Items</div>
        <div class="text-center flex items-center justify-center row-start-7 col-span-4 row-span-2 bg-green-500">Preview</div>
        <div class="text-center flex items-center justify-center row-start-2 col-start-5 col-span-4 row-span-full bg-green-900">Text Content</div>
        <div class="text-center flex items-center justify-center row-start-2 col-start-9 col-span-4 row-span-3 bg-purple-900">Slide</div>
        <div class="text-center flex items-center justify-center col-start-9 col-span-4 row-span-4 bg-teal-400">Quick References</div>
    </main>
  );
}

export default NewPresentationView;
