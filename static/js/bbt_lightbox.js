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

  window.lightbox = lightbox;

})(window);
