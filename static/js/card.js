// Make the DIV element draggable:

let boxes = document.getElementsByClassName("box");

let cur_x = 50;
let cur_y = 50;
for(let box of boxes)
{
  box.style.left = cur_x;
  box.style.top = cur_y;
  make_element_draggable(box);

  cur_x += box.offsetWidth + 10;
}

// TODO: spawn gives away from each other


function make_element_draggable(element)
{
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = on_mouse_down;

  function on_mouse_down(e) 
  {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = drag_element_end;
    // call a function whenever the cursor moves:
    document.onmousemove = drag_element_begin;
  }

  function drag_element_begin(e)
  {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function drag_element_end(e)
  {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

}


