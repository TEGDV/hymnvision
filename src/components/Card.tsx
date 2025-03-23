import {IconSong, IconMicrophone, IconPencil, IconInfo} from "./Icons";
import { invoke } from '@tauri-apps/api/core';
import {Song, Section} from "../types";

function Card(props: {song: Song, active: bool, onClick: () => void}) {
  return (
    <div onClick={props.onClick} class="container-secondary grid grid-flow-col max-h-[80px] grid-rows-4 grid-cols-[80px_200px] w-full box-border overflow-hidden" classList={{"opacity-100": props.active,
        "opacity-50": !props.active}}>
      <div class="row-span-4 w-80">
        <img class="h-full" src={props.song.image || "/sample_song.jpg"}/>
      </div>
      <div class="w-full flex items-center whitespace-pre text-xs"><p class="font-bold pr-2"><IconSong className="sm-icon"/> Title: </p>{props.song.title}</div>
      <div class="w-full flex items-center whitespace-pre text-xs"><p class="font-bold pr-2"><IconPencil className="sm-icon"/> Author: </p>{props.song.author}</div>
      <div class="w-full flex items-center whitespace-pre text-xs"><p class="font-bold pr-2"><IconInfo className="sm-icon"/> Album: </p>{props.song.album}</div>
      <div class="w-full flex items-center whitespace-pre text-xs"><p class="font-bold pr-2"><IconInfo className="sm-icon"/> Genre: </p>{props.song.genre}</div>
    </div>
  );
}

export default Card;

