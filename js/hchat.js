(function(window) {
  'use strict';

  function ease_out_expo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }


  function hchat()
  {

    const ret = document.createElement("div");
    ret.classList.add("hchat");

    // @note: The dummy node is important for the scrolling of the 
    // initial chats that appea. This will sort of fill the chat are with
    // something first (that's invisible).
    const dummy = document.createElement("span");
    dummy.classList.add("hchat-dummy");
    ret.appendChild(dummy);


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
      {
        const duration = 2000;
        const start = this.scrollLeft;
        const end = this.scrollWidth;
        const delta = end - start;
        const startTime = performance.now();

        const step = (now) => 
        {
          // "now" is current timestamp
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1)

          const ease = progress * progress;

          // start + (end - start) * percentage
          this.scrollLeft = start + delta * ease;
          if (progress < 1)
          {
            requestAnimationFrame(step)
          }
          else 
          {
            // At this point we are done
            //
            // Clean up elements that cannot be seen
            // We should be going from left-most node to right, 
            // so we can terminate early once we find a visible node

            for (const node of ret.children)
            {
              const right_side_of_node = node.offsetLeft + node.offsetWidth;
              if (right_side_of_node < ret.scrollLeft) {
                console.log("removed")
                ret.removeChild(node)
              }
              else {
                break;
              }
            }
          }
        }

        requestAnimationFrame(step)
      }
    }
    

    const client = new tmi.Client({
      channels: [ 'momolabo7' ]
    });
    client.connect();
    client.on('message', (channel, tags, message, self) => {
      ret.push_chat(tags, message);
    });

    return ret;
  }

  content.appendChild(hchat());

})(window);
