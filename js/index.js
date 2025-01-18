const MAX_MUSICS = 6;
const fav_musics = [];

let is_music_playing = false;
const fav_music_div = document.getElementById('music_container');
for(let i = 0; i < MAX_MUSICS; ++i)
{
  const audio = new Audio('fav_music/' + i + '.mp3')
  audio.loop = true;
  fav_musics.push(audio);

  const music_item = document.createElement('div');
  music_item.setAttribute('class', 'music_item');


  // overlay play/pause button
  const play_button = document.createElement('span');
  play_button.setAttribute('class', 'music_item_overlay');
  play_button.setAttribute('id', 'fav_music_button_' + i);
  play_button.innerHTML = '▶';
  play_button.onclick = () => {
    if (!is_music_playing)
    {
      fav_musics[i].play();
      play_button.innerHTML = '⏹';
      is_music_playing = true;
    }
    else
    {
      fav_musics[i].pause();
      play_button.innerHTML = '▶';
      is_music_playing = false;
    }
  };
  music_item.appendChild(play_button);

  const thumbnail = document.createElement('img');
  thumbnail.setAttribute('class', 'music_item_thumbnail');
  thumbnail.setAttribute('src', 'fav_music/' + i + '.png'); 
  music_item.appendChild(thumbnail);

  fav_music_div.appendChild(music_item);



}
