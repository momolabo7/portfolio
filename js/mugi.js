(function(window) {
  'use strict';

  function tag(name, ...children) 
  {
    const result = document.createElement(name);

    result.attr = function(n, v) {
      if (typeof(v) === "undefined") {
        this.removeAttribute(n); 
      }
      else {
        this.setAttribute(n,v);
      }
      return this;
    }

    
    result.styles = function(n, v) {
      if (typeof(v) === "undefined") {
        delete this.style[n];
      }
      else {
        this.style[n] = v; 
      }
      return this;
    }

    result.on_click = function(callback) {
      this.onclick = callback;
      return this;
    }

    result.on_event = function(n, callback) {
      //TODO: removeEventListener. We have to store the callback somehow
      this.addEventListener(n, callback);
      return this;
    }


    result.push = function(...children)
    {
      for (const child of children) 
      {
        if (typeof(child) === 'string') 
        {
          result.appendChild(document.createTextNode(child));
        }
        else {
          result.appendChild(child);
        }
      }
      return this;
    }

    result.push_class = function(...classnames)
    {
      for(const child of classnames)
      {
        result.classList.add(child);
      }
      return this;
    }

    result.pop_class = function(...classnames)
    {
      for(const child of classnames)
      {
        result.classList.remove(child);
      }
      return this;
    }

    result.html = function(raw_html)
    {
      result.innerHTML = raw_html; // @todo: sanitize?
      return this;
    }

    result.push(...children);

    return result;
  }

  function router(routes) 
  {
    let result = div();

    // This is quite clever. We use a '#' to indicate where we are in a way.
    function sync_hash() 
    {
      let hash_location = document.location.hash.split('#')[1];
      // If there is no hash, we are at root

      if (!hash_location) {
        hash_location = '/'

      }

      if (!(hash_location in routes)) {
        // TODO: do something when we can't find the hash.
          const route_404 = '/404';
        console.assert(route_404 in routes);
        hash_location = route_404;
      }
      result.replaceChildren(routes[hash_location]());

      return result;
    }
    sync_hash();

    // Apparently browsers have an event to detect change in '#' location in URLs???
    window.addEventListener("hashchange", sync_hash);
    result.refresh = sync_hash;
    return result;
  }

  function lightbox()
  {
    // variables
    let is_dragging = false;
    let is_active = false;
    let start_x = 0;
    let start_y = 0;
    let translate_x = 0;
    let translate_y = 0;
    let scale = 0;

    let box = div().attr("class", "lightbox")
    let image = img()
      .attr("id", "lightbox-img")
      .attr("draggable", "false")
    let cross = span() 
      .push_class("lightbox-close")
      .on_click(close)
      .html("&times;");
    box.push(image, cross);


    function close() {
      box.pop_class('active');
      is_active = false;
    }

    function update_transforms() {
      image.styles("transform", `scale(${scale}) translate(${translate_x}px, ${translate_y}px)`);
    }

    // methods
    box.open = function(src)
    {
      box.push_class('active');
      image.attr("src", src);

      is_active = true; translate_x = 0;
      translate_y = 0;
      scale = 1;

      box.addEventListener('mousedown', (e) => {
        is_dragging = true;
        start_x = e.clientX;
        start_y = e.clientY;
      });

      box.addEventListener('mousemove', (e) => {
        if (!is_dragging || !is_active) return;
        translate_x += e.clientX - start_x;
        translate_y += e.clientY - start_y;
        start_x = e.clientX;
        start_y = e.clientY;

        update_transforms();
      });

      box.addEventListener('mouseup', () => {
        is_dragging = false;
      });

      box.addEventListener('wheel', (e) => {
        const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
        scale *= scaleFactor;

        update_transforms()
        e.preventDefault();
      });
      update_transforms();
    }

    return box; 
  }

  //
  // export functions for global use
  //
  const tag_types = ["div", "img", "h1", "h2", "h3", "h4", "h5", "span", "p", "button", "hr", "span", "br", "a", "table", "tr", "td", "input", "section"]
  for (const type of tag_types) {
    window[type] = (...children) => tag(type, ...children)
  }
  window.router = router;
  window.lightbox = lightbox;

})(window);
