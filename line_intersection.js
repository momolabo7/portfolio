(function(window) {
  'use strict';

  function len(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
  }

  function mul(v, s) {
    return {
      x: v.x*s,
      y: v.y*s,
    }
  }

  function negate(v) {
    return {
      x: -v.x,
      y: -v.y
    };
  }

  function create_circle(x, y, r)
  {
    return {x, y, r}  
  }

  function create_rect(x, y, w, h) {
    return { x, y, w, h }
  }

  function is_point_within_circle(c, px, py) 
  {
    let vx = px - c.x;
    let vy = py - c.y;
    let d2 = vx * vx + vy * vy
    return d2 < c.r * c.r;
  }


  function is_point_within_rect(r, px, py) 
  {
    return px >= r.x && px <= r.x + r.w &&
      py >= r.y && py <= r.y + r.h 
  }

  const s0 = function(p) 
  {
    let mouse_x = 100;
    let mouse_y = 100;
    function get_nearest_point_of_contact(r, px, py)
    {
      let x = p.max(r.x, p.min(r.x + r.w, px))
      let y = p.max(r.y, p.min(r.y + r.h, py))
      return {x, y};
    }


    let r = create_rect(75, 100, 150, 100);





    p.setup = function() {
      p.createCanvas(300, 300).parent("s0");
    }

    p.draw = function() {
      if (p.mouseX >= 0 && p.mouseX <= 300 && p.mouseY >= 0 && p.mouseY <= 300) 
      {
        mouse_x = p.mouseX;
        mouse_y = p.mouseY;
      }


      let n = get_nearest_point_of_contact(r, mouse_x, mouse_y);
      let nc = {
        x: n.x - mouse_x,
        y: n.y - mouse_y
      };
      let nc_len = len(nc);
      let nc_unit = {
        x: nc.x/nc_len,
        y: nc.y/nc_len,
      };

      p.background(255);
      p.fill(0,0,0,0)

      // mouse
      {
        p.fill(0,0,0)
        p.circle(mouse_x, mouse_y, 5);
      }

      // AABB
      {
        p.fill(0,0,0,40);
        p.rect(r.x, r.y, r.w, r.h)
      }

      // draw nearest point on AABB
      {
        p.line(mouse_x, mouse_y, n.x, n.y);
        p.fill(255,0,0)
        p.circle(n.x, n.y, 10);
      }



    }


  };

  const s1 = function(p, i) {
    function get_nearest_point_of_contact(r,c) {
      let x = p.max(r.x, p.min(r.x + r.w, c.x))
      let y = p.max(r.y, p.min(r.y + r.h, c.y))
      return {x, y};
    }

    let is_dragging = 0;

    let c = create_circle(100, 100, 50);
    let r = create_rect(120, 170, 150, 100);

    p.mousePressed = function() {
      if (is_point_within_circle(c, p.mouseX, p.mouseY)) {
        is_dragging = 1;
      }
      else if (is_point_within_rect(r, p.mouseX, p.mouseY)) {
        is_dragging = 2;
      }
    }

    p.mouseReleased = function() {
      is_dragging = 0;
    }




    p.setup = function() {
      p.createCanvas(300, 300).parent("s1");
    }


    p.draw = function() 
    {
      let n = get_nearest_point_of_contact(r,c);
      let nc = {
        x: n.x - c.x,
        y: n.y - c.y
      };
      let nc_len = len(nc);
      let nc_unit = {
        x: nc.x/nc_len,
        y: nc.y/nc_len,
      };

      let is_colliding = false;
      {
        if (nc_len < c.r) {
          is_colliding = true;
        }
      }
      p.background(255);
      p.fill(0,0,0,0)

      if (is_dragging == 1) {
        c.x = p.mouseX;
        c.y = p.mouseY;
      }
      else if (is_dragging == 2) {
        r.x = p.mouseX - r.w/2;
        r.y = p.mouseY - r.h/2;
      }


      // AABB
      {
        p.fill(0,0,0,40);
        p.rect(r.x, r.y, r.w, r.h)
      }

      // draw nearest point on AABB
      {

        p.line(c.x, c.y, n.x, n.y);
        p.fill(255,0,0)
        p.circle(n.x, n.y, 10);
      }


      // circle 
      {
        p.fill(0);
        p.circle(c.x, c.y, 3)
        if (is_colliding)
          p.fill(0, 255, 0, 125)
        else
          p.fill(255, 0, 0, 125)
        p.circle(c.x, c.y, c.r * 2);
      }

    }

  };

  const s2 = function(p) 
  {
    function get_nearest_point_of_contact(r,c) {
      let x = p.max(r.x, p.min(r.x + r.w, c.x))
      let y = p.max(r.y, p.min(r.y + r.h, c.y))
      return {x, y};
    }

    let is_dragging = 0;

    let c = create_circle(100, 100, 50);
    let r = create_rect(120, 170, 150, 100);

    p.mousePressed = function() {
      if (is_point_within_circle(c, p.mouseX, p.mouseY)) {
        is_dragging = 1;
      }
      else if (is_point_within_rect(r, p.mouseX, p.mouseY)) {
        is_dragging = 2;
      }
    }

    p.mouseReleased = function() {
      is_dragging = 0;
    }

    p.setup = function() {
      p.createCanvas(300, 300).parent("s2");
    }


    p.draw = function() {

      if (is_dragging == 1) {
        c.x = p.mouseX;
        c.y = p.mouseY;
      }
      else if (is_dragging == 2) {
        r.x = p.mouseX - r.w/2;
        r.y = p.mouseY - r.h/2;
      }

      let n = get_nearest_point_of_contact(r,c);
      let nc = {
        x: n.x - c.x,
        y: n.y - c.y
      };
      let nc_len = len(nc);
      let nc_unit = {
        x: nc.x/nc_len,
        y: nc.y/nc_len,
      };

      let is_colliding = false;
      {
        if (nc_len < c.r) {
          is_colliding = true;
        }
      }
      p.background(255);
      p.fill(0,0,0,0)



      // AABB
      {
        p.fill(0,0,0,40);
        p.rect(r.x, r.y, r.w, r.h)
      }

      // draw nearest point on AABB
      {

        p.line(c.x, c.y, n.x, n.y);
        p.fill(255,0,0)
        p.circle(n.x, n.y, 10);
      }


      // circle 
      {
        p.fill(0);
        p.circle(c.x, c.y, 3)
        if (is_colliding)
          p.fill(0, 255, 0, 125)
        else
          p.fill(255, 0, 0, 125)
        p.circle(c.x, c.y, c.r * 2);
      }

      // response
      if(is_colliding)
      {
        let pen = mul(negate(nc_unit), c.r - nc_len)
        p.fill(0, 0, 255, 80);
        p.stroke(0,0,0, 80);
        p.circle(c.x + pen.x, c.y + pen.y, c.r*2);
        p.stroke(0);
      }

    }
  };

  const s3 = function(p) 
  {
    function get_nearest_point_of_contact(r,c) {
      let x = p.max(r.x, p.min(r.x + r.w, c.x))
      let y = p.max(r.y, p.min(r.y + r.h, c.y))
      return {x, y};
    }

    let is_dragging = 0;

    let c = create_circle(100, 100, 50);
    let r = create_rect(120, 170, 150, 100);

    p.mousePressed = function() {
      if (is_point_within_circle(c, p.mouseX, p.mouseY)) {
        is_dragging = 1;
      }
      else if (is_point_within_rect(r, p.mouseX, p.mouseY)) {
        is_dragging = 2;
      }
    }

    p.mouseReleased = function() {
      is_dragging = 0;
    }

    p.setup = function() {
      p.createCanvas(300, 300).parent("s3");
    }


    p.draw = function() {

      if (is_dragging == 1) {
        c.x = p.mouseX;
        c.y = p.mouseY;
      }
      else if (is_dragging == 2) {
        r.x = p.mouseX - r.w/2;
        r.y = p.mouseY - r.h/2;
      }

      let n = get_nearest_point_of_contact(r,c);
      let nc = {
        x: n.x - c.x,
        y: n.y - c.y
      };
      let nc_len = len(nc);
      let nc_unit = {
        x: nc.x/nc_len,
        y: nc.y/nc_len,
      };

      let is_colliding = false;
      {
        if (nc_len < c.r) {
          is_colliding = true;
        }
      }
      p.background(255);
      p.fill(0,0,0,0)


      // AABB
      {
        p.fill(0,0,0,40);
        p.rect(r.x, r.y, r.w, r.h)
      }

      // draw nearest point on AABB
      {

        p.line(c.x, c.y, n.x, n.y);
        p.fill(255,0,0)
        p.circle(n.x, n.y, 10);
      }


      // circle 
      {
        p.fill(0);
        p.circle(c.x, c.y, 3)
        if (is_colliding)
          p.fill(0, 255, 0, 125)
        else
          p.fill(255, 0, 0, 125)
        p.circle(c.x, c.y, c.r * 2);
      }

      // response
      if(is_colliding)
      {
        p.fill(0, 0, 255, 80);
        if (Math.abs(nc_len) > 0)
        {
          let pen = mul(negate(nc_unit), c.r - nc_len)
          p.stroke(0,0,0, 80);
          p.circle(c.x + pen.x, c.y + pen.y, c.r*2);
          p.stroke(0);
        }
        else 
        {
          let left = r.x - c.x;
          let right = (r.x + r.w) - c.x;
          let up = r.y - c.y;
          let down = (r.y + r.h) - c.y;

          let lr = Math.abs(left) < Math.abs(right) ? left : right;
          let ud = Math.abs(up) < Math.abs(down) ? up : down;
          if (Math.abs(lr) < Math.abs(ud))
          {
            let r = lr < 0 ? -c.r : c.r;
            p.line(c.x, c.y, c.x + lr, c.y);

            p.stroke(0,0,0, 80);
            p.circle(c.x + lr + r, c.y, c.r*2);
            p.stroke(0);
          }
          else {
            let r = ud < 0 ? -c.r : c.r;
            p.line(c.x, c.y, c.x, c.y + ud);

            p.stroke(0,0,0, 80);
            p.circle(c.x, c.y + ud + r, c.r*2);
            p.stroke(0);
          }

        }
      }

    }
  };

  new p5(s0);
  new p5(s1);
  new p5(s2);
  new p5(s3);
})();


