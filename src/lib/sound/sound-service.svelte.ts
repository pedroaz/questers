import { Howl } from 'howler';

import { getConfigState, setConfigState } from '$lib/states/config-state.svelte';

export enum MusicId {
	BackgroundMusic = 'background-music',
	BattleMusic = 'battle-music'
}

export enum SfxId {
	Click = 'click'
}

const MUSIC_DICT: Map<MusicId, Howl> = new Map();
const SFX_DICT: Map<SfxId, Howl> = new Map();

const MUSIC_MAPPING: Record<MusicId, string> = {
	'background-music':
		'https://zdcdjzcvlbqeqhuomlkg.supabase.co/storage/v1/object/public/sounds//background-music.mp3',
	'battle-music':
		'https://zdcdjzcvlbqeqhuomlkg.supabase.co/storage/v1/object/public/sounds//battle-music.mp3'
};

const SFX_MAPPING: Record<SfxId, string> = {
	click: 'https://zdcdjzcvlbqeqhuomlkg.supabase.co/storage/v1/object/public/sounds//click.wav'
};

let currentMusic: MusicId | undefined;

export function playMusic(id: MusicId) {
	const config = getConfigState();
	// Stop currently playing music if any
	if (currentMusic && MUSIC_DICT.has(currentMusic)) {
		MUSIC_DICT.get(currentMusic)?.stop();
	}

	currentMusic = id;

	if (MUSIC_DICT.has(id)) {
		MUSIC_DICT.get(id)?.play();
	} else {
		const sound = new Howl({
			src: [MUSIC_MAPPING[id]],
			loop: true,
			volume: config.music
		});
		MUSIC_DICT.set(id, sound);
		sound.play();
	}
}

export function playSfx(id: SfxId) {
	const config = getConfigState();
	if (SFX_DICT.has(id)) {
		SFX_DICT.get(id)?.play();
	} else {
		const sound = new Howl({
			src: [SFX_MAPPING[id]],
			volume: config.sfx
		});
		SFX_DICT.set(id, sound);
		sound.play();
	}
}

export function setMusicVolume(volume: number) {
	const configState = getConfigState();
	configState.music = volume;
	console.log(MUSIC_DICT);
	for (const sound of MUSIC_DICT.values()) {
		sound.volume(volume);
	}
	setConfigState(configState);
}

export function setSfxVolume(volume: number) {
	const configState = getConfigState();
	configState.sfx = volume;
	for (const sound of SFX_DICT.values()) {
		sound.volume(volume);
	}
	setConfigState(configState);
}
