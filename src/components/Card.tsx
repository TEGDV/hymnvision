import {IconSong, IconMicrophone, IconPencil, IconInfo} from "./Icons";
import { invoke } from '@tauri-apps/api/core';
function Card({active = false}) {
  return (
    <div class="container-secondary grid grid-flow-col gap-2 max-h-[100px] grid-rows-4 grid-cols-[80px_200px] w-full box-border p-2" classList={{"opacity-100": active,
        "opacity-50": !active}}>
      <div class="row-span-4 w-100">
        <img class="h-full" src="/sampleSongImg.jpg"/>
      </div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconSong className="sm-icon"/> Title: </p>Socorro</div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconPencil className="sm-icon"/> Author: </p>Un Corazon </div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconInfo className="sm-icon"/> Album: </p>Kitsugi </div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconInfo className="sm-icon"/> Genre: </p>Worship </div>
    </div>
  );
}

export default Card;

