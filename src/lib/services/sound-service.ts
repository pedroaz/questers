import { Howl, Howler } from 'howler';

export type MusicId = 'background-music';
export type SfxId = 'click';

let MUSIC_DICT: Record<MusicId, Howl>;
let SFX_DICT: Record<string, Howl>;

let currentMusic: MusicId | undefined;

export function loadSounds() {
	MUSIC_DICT = {
		'background-music': new Howl({
			src: ['/sound/music/background-music.mp3'],
			autoplay: false,
			loop: true
		})
	};

	// SFX
	SFX_DICT = {
		click: new Howl({
			src: ['/sound/sfx/mouse-click.wav'],
			autoplay: false,
			loop: false
		})
	};
}

export function playMusic(id: MusicId) {
	return;
	if (currentMusic === id) {
		return;
	}
	if (currentMusic && MUSIC_DICT[currentMusic as MusicId]) {
		MUSIC_DICT[currentMusic as MusicId].stop();
	}
	MUSIC_DICT[id].play();
	currentMusic = id;
}

export function playSfx(id: SfxId) {
	SFX_DICT[id].play();
}

// Change global volume.
Howler.volume(0.5);
