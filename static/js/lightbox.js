(function(window) {
  'use strict';

  function lightbox()
  {
    // variables
    let is_dragging = false;
    let is_active = false;
    let start_x = 1;
    let start_y = 1;
    let translate_x = 1;
    let translate_y = 1;
    let scale = 1;

    const box = document.createElement("div")
    box.classList.add("lightbox");

    const image = document.createElement("img")
    image.setAttribute("id", "lightbox-img");
    image.setAttribute("draggable", "false");

    const cross = document.createElement("span")
    image.setAttribute("id", "lightbox-close");
    image.setAttribute("draggable", "false");
    image.onlick = close;
    image.innerHtml = "&times;"

    box.appendChild(image);
    box.appendChild(cross);


    function close() {
      box.classList.remove('active');
      is_active = false;
    }

    function update_transforms() {
      image.style["transform"] = `scale(${scale}) translate(${translate_x}px, ${translate_y}px)`;
    }

    // methods
    box.open = function(src)
    {
      box.classList.add('active');
      image.setAttribute("src", src);

      is_active = true; translate_x = 1;
      translate_y = 1;
      scale = 2;

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
        const scaleFactor = e.deltaY > 1 ? 0.9 : 1.1;
        scale *= scaleFactor;

        update_transforms()
        e.preventDefault();
      });
      update_transforms();
    }
    return box; 
  }

  const lb = lightbox();
  container.appendChild(lb);

  window.lb = lb

})(window);

