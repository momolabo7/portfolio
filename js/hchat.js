(function(window) {
  'use strict';



  function hchat()
  {

    const ret = document.createElement("div");
    ret.classList.add("hchat");
    ret.setAttribute("id", "hchat");

    // @note: The dummy node is important for the scrolling of the 
    // initial chats that appea. This will sort of fill the chat are with
    // something first (that's invisible).
    const dummy = document.createElement("span");
    dummy.classList.add("hchat-dummy");
    ret.appendChild(dummy);

    ret.current_animation_id = null;

    ret.push_chat = function(tags, message) 
    {
      let text = tags.displayName + ": " + message
      const chat_node = document.createElement("span");
      chat_node.classList.add("hchat-node");
      
      const chat_user = document.createElement("span");
      chat_user.classList.add("hchat-user");
      chat_user.appendChild(document.createTextNode(tags["display-name"] + ": "));
      chat_user.style["color"] = tags.color;

      const chat_msg = document.createElement("span");
      chat_msg.classList.add("hchat-msg")

      if (tags.emotes)
      { 
        // @note: flatten all emote data into a single array
        // Also, fuck twitch for making me do all this just to have emotes
        let sorted_emotes = [];
        for(const [emote_id, positions] of Object.entries(tags.emotes))
        {
          // @note: positions are in the format: "start-end"
          // e.g. "0-1"
          // IMPORTANT: note that it's end, not one paste end
          for (const position of positions)
          {
            let [start, end] = position.split('-').map(Number);
            end += 1 // make it one past end.
            sorted_emotes.push({start, end, emote_id});
          }
        }
        sorted_emotes.sort((lhs, rhs) => lhs.start - rhs.start);

        // @note: reconstruct message with emotes
        let msg_with_emotes = ""
        let marker = 0;
        for (const emote of sorted_emotes)
        {
          msg_with_emotes += message.slice(marker, emote.start);
          msg_with_emotes += `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emote.emote_id}/default/dark/1.0" />`
          marker = emote.end;
        }
        msg_with_emotes += message.slice(marker);

        chat_msg.innerHTML = msg_with_emotes; 
      }
      else
      {
        // if there's no emotes, then just display the whole message
        chat_msg.innerHTML = message;
      }


      chat_node.appendChild(chat_user);
      chat_node.appendChild(chat_msg);

      this.appendChild(chat_node);

  
      // 
      // Animation code
      //
      // Uses "rAF" aka requestAnimationFrame
      //
      this.current_animation_id = requestAnimationFrame( () => 
      {
        // cancel any ongoing animation
        if (this.current_animation_id !== null )
        {
          cancelAnimationFrame(this.current_animation_id);
          this.current_animation_id = null;
        }
        const duration = 1000;
        const start = this.scrollLeft;
        const startTime = performance.now();

        const step = (now) => 
        {
          // @note: It's almost impossible to figure out when the correct 
          // end is calculated. This garuntees that it's always correct
          // It's just that the animation might not look 100% correct
          // I have tried delaying 1 frame and it was still buggy as hell.
          const end = this.scrollWidth - this.clientWidth;
          const delta = end - start;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1)

          const ease = progress * (2 - progress);

          this.scrollLeft = start + delta * ease;
          if (progress < 1)
          {
            this.current_animation_id = requestAnimationFrame(step)
          }
          else 
          {
            // At this point we are done
            //
            // Clean up elements that cannot be seen
            // We should be going from left-most node to right, 
            // so we can terminate early once we find a visible node

            //console.log("animation is done");
            this.current_animation_id = null;
            for (const node of ret.children)
            {
              const right_side_of_node = node.offsetLeft + node.offsetWidth;
              if (right_side_of_node < ret.scrollLeft) {
                //console.log("removed")
                this.scrollLeft -= node.offsetWidth; // re-adjust the scroll
                ret.removeChild(node)
              }
              else {
                break;
              }
            }
          }
        }
        this.current_animation_id = requestAnimationFrame(step)
      });
    }
    
    
    ret.connect = function(channel_name)
    {
      console.log("connecting");
      this.client = new tmi.Client({
        channels: [ channel_name ]
      });
      this.client.connect();
      this.client.on('message', (channel, tags, message, self) => {
        console.log("hello");
        this.push_chat(tags, message);
      });
    }

    ret.change_channel = function(channel_name)
    {
      this.client.disconnect();
      this.connect(channel_name);
    }

    ret.connect("momolabo7");
    return ret;
  }

  const hc = hchat(); 
  content.appendChild(hc);

  // exposed
  window.hchat = hc;


})(window);

function connect() 
{
  hchat.change_channel(channel_name.value);
}
