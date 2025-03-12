import {IconSong, IconMicrophone, IconPencil, IconInfo} from "./Icons";
import { invoke } from '@tauri-apps/api/core';
import {Song, Section} from "../types";

function Card(props: {song: Song, active: bool}) {
  return (
    <div class="container-secondary grid grid-flow-col gap-2 max-h-[100px] grid-rows-4 grid-cols-[80px_200px] w-full box-border p-2 overflow-hidden" classList={{"opacity-100": props.active,
        "opacity-50": !props.active}}>
      <div class="row-span-4 w-100">
        <img class="h-full" src={props.song.image || "/sampleSongImg.jpg"}/>
      </div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconSong className="sm-icon"/> Title: </p>{props.song.title}</div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconPencil className="sm-icon"/> Author: </p>{props.song.author}</div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconInfo className="sm-icon"/> Album: </p>{props.song.album}</div>
      <div class="w-full flex items-center pl-2 whitespace-pre text-sm"><p class="font-bold"><IconInfo className="sm-icon"/> Genre: </p>{props.song.genre}</div>
    </div>
  );
}

export default Card;

