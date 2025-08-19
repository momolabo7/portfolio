(function(window) {
  'use strict';


  function lightbox(element)
  {
    // variables
    this.is_dragging = false;
    this.start_x = 1;
    this.start_y = 1;
    this.translate_x = 1;
    this.translate_y = 1;
    this.scale = 1;

    this.box = document.createElement("div")
    this.box.classList.add("lightbox");
    this.is_active = false;

    const image = document.createElement("img")
    image.setAttribute("id", "lightbox-img");
    image.setAttribute("draggable", "false");
    this.image = image;

    const cross = document.createElement("span")
    cross.classList.add("lightbox-close");
    cross.addEventListener('click', this.close.bind(this));
    cross.innerHTML = "&times;"
    this.cross = cross;

    this.box.appendChild(image);
    this.box.appendChild(cross);


    element.appendChild(this.box);
  }

  lightbox.prototype.update_transforms = function() {
    this.image.style["transform"] = `scale(${this.scale}) translate(${this.translate_x}px, ${this.translate_y}px)`;
  }

  lightbox.prototype.close = function() 
  {
    this.box.classList.remove('active');
    this.is_active = false;
  }

  lightbox.prototype.mousedown = function(e)
  {
    this.is_dragging = true;
    this.start_x = e.clientX;
    this.start_y = e.clientY;
  }

  lightbox.prototype.mousemove = function(e)
  {
    if (!this.is_dragging || !this.is_active) return;
    this.translate_x += (e.clientX - this.start_x) * (1/this.scale);
    this.translate_y += (e.clientY - this.start_y) * (1/this.scale);
    this.start_x = e.clientX;
    this.start_y = e.clientY;

    this.update_transforms();
  }

  lightbox.prototype.mouseup = function(e)
  {
    this.is_dragging = false;
  }

  lightbox.prototype.wheel = function(e)
  {
    const scaleFactor = e.deltaY > 1 ? 0.9 : 1.1;
    this.scale *= scaleFactor;

    this.update_transforms()
    e.preventDefault();
  }

  lightbox.prototype.open = function(src)
  {
    this.box.classList.add('active');
    this.image.setAttribute("src", src);

    this.is_active = true; 
    this.translate_x = 1;
    this.translate_y = 1;
    this.scale = 2;

    this.box.addEventListener('mousedown', this.mousedown.bind(this));
    this.box.addEventListener('mousemove', this.mousemove.bind(this));
    this.box.addEventListener('mouseup', this.mouseup.bind(this));
    this.box.addEventListener('wheel', this.wheel.bind(this)); 
    this.update_transforms();
  }


  window.lightbox = function(element) 
  {
    return new lightbox(element);
  }

})(window);

