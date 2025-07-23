

async function init_jukebox(parent)
{
  const response = await fetch("songs/playlist.json");
  const playlist = await response.json();
  const entries = []

  function create_entry(song) 
  {
    ret = {}

    let audio = new Audio('songs/' + song.path)
    audio.loop = true;
    let is_playing = false;

    function play() {
      element.push_class("play");
      audio.play();
    }

    function stop() {
      element.pop_class("play");
      audio.pause();
      audio.currentTime = 0;
    }

    const element = div(song.name)
      .attr("class", "item")
      .on_click(() => {
        if (is_playing)
        {
          stop();
        }
        else 
        {
          for (let entry of entries)
          {
            entry.stop()
          }
          play();
        }
        is_playing = !is_playing;

      });



    ret.play = play;
    ret.stop = stop;
    ret.element = element;
    return ret;
  }


  function add_entry(song) {
    const e = create_entry(song);
    entries.push(e);
    parent.appendChild(e.element);
  }

  for(let song of playlist.songs)
  {
    add_entry(song);
  }
}

init_jukebox(jukebox);








