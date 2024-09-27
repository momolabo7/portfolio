const lightbox = {
  is_dragging: false,
  is_active: false,
  start_x: 0,
  start_y: 0,
  translate_x: 0,
  translate_y: 0,
  scale: 0,

  init: function(element) 
  {
    // <div class="lightbox">
    //   <span class="lightbox-close" onclick="close_lightbox()">&times;</span>
    //   <img id="lightbox-img" src="" alt="Lightbox Image" draggable="false">
    // </div>
    let div = document.createElement("div");
    div.setAttribute("class", "lightbox")

    let img = document.createElement("img");
    img.setAttribute("id", "lightbox-img");
    img.setAttribute("draggable", "false");
    div.appendChild(img);

    let span = document.createElement("span");
    span.setAttribute("class", "lightbox-close");
    span.setAttribute("onclick", "lightbox.close()");
    span.innerHTML = "&times;"
    div.appendChild(span);

    element.appendChild(div);
  },

  open: function(image_src) 
  {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.add('active');

    const lightboxImg = document.getElementById('lightbox-img');
    // add the image to the lightbox
    lightboxImg.src = image_src;

    // initialize lightbox variables
    this.is_active = true;
    this.translate_x = 0;
    this.translate_y = 0;
    this.scale = 1;

    lightbox.addEventListener('mousedown', (e) => {
      this.is_dragging = true;
      this.start_x = e.clientX;
      this.start_y = e.clientY;
    });

    lightbox.addEventListener('mousemove', (e) => {
      if (!this.is_dragging || !this.is_active) return;
      this.translate_x += e.clientX - this.start_x;
      this.translate_y += e.clientY - this.start_y;
      this.start_x = e.clientX;
      this.start_y = e.clientY;

      this.update_transforms();
    });

    lightbox.addEventListener('mouseup', () => {
      this.is_dragging = false;
    });

    lightbox.addEventListener('wheel', (e) => {
      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
      this.scale *= scaleFactor;

      this.update_transforms()
      e.preventDefault();
    });

    this.update_transforms();

  },

  update_transforms: function() {
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.style.transform = `scale(${this.scale}) translate(${this.translate_x}px, ${this.translate_y}px)`;
  },

  close: function() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');

    const lightboxImg = document.getElementById('lightbox-img');
    this.is_active = false;
  },

} // lightbox

