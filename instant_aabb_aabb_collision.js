(function(window) {
  'use strict';

  let s2 = function (p) {
    const PURPLE = p.color(128, 0, 125)
    const ORANGE = p.color(255, 140, 0)
    const ORANGE_DARK = p.color(200, 100, 0)
    const CYAN = p.color(0, 200, 200)
    const PURPLE_A = p.color(128, 0, 125, 140)
    const ORANGE_A = p.color(255, 140, 0, 140)
    const PURPLE_B = p.color(128, 0, 125, 200)
    const ORANGE_B = p.color(255, 140, 0, 200)
    const FADED_RED = p.color(255, 0, 0, 80)
    const FADED_GREEN = p.color(0, 255, 0, 80)



    function create_aabb(x, y, hw, hh, c) {
      return {
        x, y, hw, hh, c
      };
    }



    let aabbs = [
      create_aabb(120, 100, 50, 50, ORANGE),
      create_aabb(180, 150, 40, 40, PURPLE_A),
    ]

    function is_mouse_on_aabb(l) {
      return (
        p.mouseX > l.x-l.hw && 
        p.mouseX < l.x+l.hw &&
        p.mouseY > l.y-l.hh &&
        p.mouseY < l.y+l.hh)
    }




    let selected = null
    p.mousePressed = function () {
      for(let aabb of aabbs) {
        if (is_mouse_on_aabb(aabb))
        {
          selected = aabb;
          break;
        }
        else {
        }

      }
    };

    p.mouseReleased = function () {
      selected = null
    };

    p.setup = function () {
      p.rectMode(p.CENTER);
      p.createCanvas(300, 300).parent("s2");
    };

    function max(a, b) {
      return a > b ? a : b
    }

    function min(a, b) {
      return a < b ? a : b
    }

    function clamp(smol, beeg, x) {
      return min(beeg, max(smol, x) );
    }

    function draw_arrow(base, vec, c) {
      p.push();
      p.stroke(c);
      p.strokeWeight(3);
      p.fill(c);
      p.translate(base.x, base.y);
      p.line(0, 0, vec.x, vec.y);
      p.rotate(vec.heading());
      let arrowSize = 7;
      p.translate(vec.mag() - arrowSize, 0);
      p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
      p.pop();
    }

    function sign(x) {
      return x <= 0 ? -1 : 1;
    }

    p.draw = function () 
    {
      if (selected) {
        if (p.mouseX < 0 || p.mouseX > 300 ||
          p.mouseY < 0 || p.mouseY > 300)
          selected = null;
        else {
          selected.x = p.mouseX;
          selected.y = p.mouseY;
        }
      }




      let dx = aabbs[1].x - aabbs[0].x;
      let rx = aabbs[1].hw + aabbs[0].hw;
      let diff_x = rx - Math.abs(dx);

      let dy = aabbs[1].y - aabbs[0].y;
      let ry = aabbs[1].hh + aabbs[0].hh;
      let diff_y = ry - Math.abs(dy);

      p.background(255, 255, 255)

      /*if (diff_x > 0 && diff_y > 0)
        p.fill(FADED_GREEN)
      else
        p.fill(FADED_RED)
          */
          p.fill(0,0,0,0)
      // draw aabbs
      for(let aabb of aabbs) 
      {
        p.push()
        p.stroke(aabb.c)
        //p.fill(0,0,0,0)
        if (aabb == selected || is_mouse_on_aabb(aabb))
          p.strokeWeight(8)
        else 
          p.strokeWeight(4)
        p.rect(aabb.x, aabb.y, aabb.hw*2, aabb.hh*2);
        p.pop()
      }


      // Projection lines
      p.push()
      p.stroke(125);
      p.strokeWeight(2)
      p.line(0,250, 300, 250);
      p.line(50, 0, 50, 300);
      p.pop()


      // push out x
      let vec_x = 0;
      if (diff_x > 0) 
      {
        const start_y = 280;
        let end_y = min(aabbs[0].y - aabbs[0].hh, aabbs[1].y - aabbs[1].hh)

        let start_x = aabbs[0].x < aabbs[1].x ? aabbs[1].x - aabbs[1].hw : aabbs[1].x + aabbs[1].hw;
        vec_x = sign(dx) * diff_x
        let end_x = start_x + vec_x;

        draw_arrow(p.createVector(start_x,start_y), p.createVector(vec_x,0), CYAN);

        // trace
        p.push()
        p.stroke(CYAN)
        p.strokeWeight(2)
        p.drawingContext.setLineDash([10,10]);
        p.line(start_x, start_y, start_x, end_y)
        p.line(end_x, start_y, end_x, end_y)
        p.pop()
      }



      // push out y
      let vec_y = 0;
      if (diff_y > 0) 
      {
        const start_x = 20;
        let end_x = min(aabbs[0].x + aabbs[0].hw, aabbs[1].x + aabbs[1].hw)

        let start_y = aabbs[0].y < aabbs[1].y ? aabbs[1].y - aabbs[1].hh : aabbs[1].y + aabbs[1].hh;
        vec_y = sign(dy) * diff_y
        let end_y = start_y + vec_y;

        draw_arrow(p.createVector(start_x,start_y), p.createVector(0,vec_y), CYAN);

        // trace
        p.push()
        p.stroke(CYAN)
        p.strokeWeight(2)
        p.drawingContext.setLineDash([10,10]);
        p.line(start_x, start_y, end_x, start_y)
        p.line(start_x, end_y, end_x, end_y)
        p.pop()
      }

      // push back drawing
      if (diff_x > 0 && diff_y > 0)
      {
        const original_aabb = structuredClone(aabbs[1])
        if (diff_x < diff_y)
          original_aabb.x += vec_x;
        else 
          original_aabb.y += vec_y;
        p.push()
        p.stroke(PURPLE)
        p.fill(FADED_GREEN)
        p.strokeWeight(4)
        p.drawingContext.setLineDash([10,10]);
        p.rect(original_aabb.x, original_aabb.y, original_aabb.hw*2, original_aabb.hh*2);
        p.pop()
      }


    }


  }

  new p5(s2);
  let s0 = function (p) {
    const PURPLE = p.color(128, 0, 125)
    const ORANGE = p.color(255, 140, 0)
    const ORANGE_DARK = p.color(200, 100, 0)
    const CYAN = p.color(0, 200, 200)
    const PURPLE_A = p.color(128, 0, 125, 140)
    const ORANGE_A = p.color(255, 140, 0, 140)
    const PURPLE_B = p.color(128, 0, 125, 200)
    const ORANGE_B = p.color(255, 140, 0, 200)

    function draw_arrow(base, vec, c) {
      p.push();
      p.stroke(c);
      p.strokeWeight(3);
      p.fill(c);
      p.translate(base.x, base.y);
      p.line(0, 0, vec.x, vec.y);
      p.rotate(vec.heading());
      let arrowSize = 7;
      p.translate(vec.mag() - arrowSize, 0);
      p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
      p.pop();
    }

    function scale(v, n) {
      return { x: v.x * n, y : v.y*n}
    }
    function sub(lhs, rhs) {
      return { x: lhs.x - rhs.x, y: lhs.y - rhs.y };
    }

    function add(lhs, rhs) {
      return { x: rhs.x + lhs.x, y: rhs.y + lhs.y };
    }
    function len(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y); 
    }

    function norm(v) {
      let l = len(v);
      return { x: v.x/l, y: v.y/l };  
    }
    function neg(v) {
      let l = len(v);
      return { x: v.x/l, y: v.y/l };  
    }

    function perp(v) {
      return { x: v.y, y: -v.x }
    }


    function create_circle(x, y, r) {
      return { x, y, r}
    }

    function pt_within_circle(c, x, y) {

      let vx = x - c.x;
      let vy = y - c.y;
      let d2 = vx * vx + vy * vy;

      return  d2 < c.r*c.r;
    }

    // x-center aligned line
    function create_line(x, y, hw, c) {
      return {
        x: x,
        y: y,
        hw: hw,
        c: c,
      }
    }

    let lines = [
      create_line(120, 100, 50, ORANGE),
      create_line(180, 150, 40, PURPLE),
    ]

    function is_mouse_on_line(l) {
      const hh = 10;
      return (
        p.mouseX > l.x-l.hw && 
        p.mouseX < l.x+l.hw &&
        p.mouseY > l.y-hh &&
        p.mouseY < l.y+hh)
    }




    let selected = null
    p.mousePressed = function () {
      for(let l of lines) {
        if (is_mouse_on_line(l))
        {
          selected = l;
          break;
        }
        else {
        }

      }
    };

    p.mouseReleased = function () {
      selected = null
    };

    p.setup = function () {
      p.createCanvas(300, 300).parent("s0");
    };

    function max(a, b) {
      return a > b ? a : b
    }

    function min(a, b) {
      return a < b ? a : b
    }

    function clamp(smol, beeg, x) {
      return min(beeg, max(smol, x) );
    }

    function sign(x) {
      return x <= 0 ? -1 : 1
    }



    p.draw = function () 
    {
      p.background(255, 255, 255)
      if (selected) {
        selected.x = p.mouseX;
      }

      // Draw lines
      for(let l of lines) {
        p.stroke(l.c)
        if (l == selected || is_mouse_on_line(l))
          p.strokeWeight(8)
        else 
          p.strokeWeight(4)
        p.line(l.x-l.hw, l.y, l.x+l.hw, l.y);
      }


      // Projection line
      p.stroke(125);
      p.strokeWeight(2)
      p.line(0,200, 300, 200);

      // push out x
      {
        const y = 280;
        let d = lines[1].x - lines[0].x;
        let r = lines[1].hw + lines[0].hw;
        let diff = r - Math.abs(d);
        if (diff > 0) 
        {

          let start_x = lines[0].x < lines[1].x ? lines[1].x - lines[1].hw : lines[1].x + lines[1].hw;
          let vec = sign(d) * diff

          draw_arrow(p.createVector(start_x,y), p.createVector(vec,0), CYAN);

          // trace
          p.push()
          p.stroke(CYAN)
          p.strokeWeight(2)
          p.drawingContext.setLineDash([10,10]);
          p.line(start_x, y, start_x, 100)
          p.line(start_x + vec, y, start_x + vec, 100)
          p.pop()
        }


      }

    }


  }

  new p5(s0);



  let s1 = function (p) {
    const PURPLE = p.color(128, 0, 125)
    const ORANGE = p.color(255, 140, 0)
    const ORANGE_DARK = p.color(200, 100, 0)
    const CYAN = p.color(0, 200, 200)
    const PURPLE_A = p.color(128, 0, 125, 140)
    const ORANGE_A = p.color(255, 140, 0, 140)
    const PURPLE_B = p.color(128, 0, 125, 200)
    const ORANGE_B = p.color(255, 140, 0, 200)
    const FADED_RED = p.color(255, 0, 0, 80)
    const FADED_GREEN = p.color(0, 255, 0, 80)



    function create_aabb(x, y, hw, hh, c) {
      return {
        x, y, hw, hh, c
      };
    }



    let aabbs = [
      create_aabb(120, 100, 50, 50, ORANGE),
      create_aabb(180, 150, 40, 40, PURPLE),
    ]

    function is_mouse_on_aabb(l) {
      return (
        p.mouseX > l.x-l.hw && 
        p.mouseX < l.x+l.hw &&
        p.mouseY > l.y-l.hh &&
        p.mouseY < l.y+l.hh)
    }




    let selected = null
    p.mousePressed = function () {
      for(let aabb of aabbs) {
        if (is_mouse_on_aabb(aabb))
        {
          selected = aabb;
          break;
        }
        else {
        }

      }
    };

    p.mouseReleased = function () {
      selected = null
    };

    p.setup = function () {
      p.rectMode(p.CENTER);
      p.createCanvas(300, 300).parent("s1");
    };

    function max(a, b) {
      return a > b ? a : b
    }

    function min(a, b) {
      return a < b ? a : b
    }

    function clamp(smol, beeg, x) {
      return min(beeg, max(smol, x) );
    }

    function draw_arrow(base, vec, c) {
      p.push();
      p.stroke(c);
      p.strokeWeight(3);
      p.fill(c);
      p.translate(base.x, base.y);
      p.line(0, 0, vec.x, vec.y);
      p.rotate(vec.heading());
      let arrowSize = 7;
      p.translate(vec.mag() - arrowSize, 0);
      p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
      p.pop();
    }

    function sign(x) {
      return x <= 0 ? -1 : 1;
    }

    p.draw = function () 
    {
      if (selected) {
        if (p.mouseX < 0 || p.mouseX > 300 ||
          p.mouseY < 0 || p.mouseY > 300)
          selected = null;
        else {
          selected.x = p.mouseX;
          selected.y = p.mouseY;
        }
      }




      let dx = aabbs[1].x - aabbs[0].x;
      let rx = aabbs[1].hw + aabbs[0].hw;
      let diff_x = rx - Math.abs(dx);

      let dy = aabbs[1].y - aabbs[0].y;
      let ry = aabbs[1].hh + aabbs[0].hh;
      let diff_y = ry - Math.abs(dy);

      p.background(255, 255, 255)

      if (diff_x > 0 && diff_y > 0)
        p.fill(FADED_GREEN)
      else
        p.fill(FADED_RED)

      // draw aabbs
      for(let aabb of aabbs) 
      {
        p.push()
        p.stroke(aabb.c)
        //p.fill(0,0,0,0)
        if (aabb == selected || is_mouse_on_aabb(aabb))
          p.strokeWeight(8)
        else 
          p.strokeWeight(4)
        p.rect(aabb.x, aabb.y, aabb.hw*2, aabb.hh*2);
        p.pop()
      }


      // Projection lines
      p.push()
      p.stroke(125);
      p.strokeWeight(2)
      p.line(0,250, 300, 250);
      p.line(50, 0, 50, 300);
      p.pop()


      // push out x

      if (diff_x > 0) 
      {
        const start_y = 280;
        let end_y = min(aabbs[0].y - aabbs[0].hh, aabbs[1].y - aabbs[1].hh)

        let start_x = aabbs[0].x < aabbs[1].x ? aabbs[1].x - aabbs[1].hw : aabbs[1].x + aabbs[1].hw;

        let vec = sign(dx) * diff_x
        let end_x = start_x + vec;

        draw_arrow(p.createVector(start_x,start_y), p.createVector(vec,0), CYAN);

        // trace
        p.push()
        p.stroke(CYAN)
        p.strokeWeight(2)
        p.drawingContext.setLineDash([10,10]);
        p.line(start_x, start_y, start_x, end_y)
        p.line(end_x, start_y, end_x, end_y)
        p.pop()
      }



      // push out y
      if (diff_y > 0) 
      {
        const start_x = 20;
        let end_x = min(aabbs[0].x + aabbs[0].hw, aabbs[1].x + aabbs[1].hw)

        let start_y = aabbs[0].y < aabbs[1].y ? aabbs[1].y - aabbs[1].hh : aabbs[1].y + aabbs[1].hh;
        let vec = sign(dy) * diff_y
        let end_y = start_y + vec;

        draw_arrow(p.createVector(start_x,start_y), p.createVector(0,vec), CYAN);

        // trace
        p.push()
        p.stroke(CYAN)
        p.strokeWeight(2)
        p.drawingContext.setLineDash([10,10]);
        p.line(start_x, start_y, end_x, start_y)
        p.line(start_x, end_y, end_x, end_y)
        p.pop()
      }


    }


  }

  new p5(s1);


})();


