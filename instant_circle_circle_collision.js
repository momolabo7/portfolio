(function(window) {
  'use strict';

  let s0 = function (p) 
  {
    const PURPLE = p.color(128, 0, 125)
    const ORANGE = p.color(255, 140, 0)
    const ORANGE_DARK = p.color(200, 100, 0)
    const RED = p.color(255, 0, 0)
    const PURPLE_A = p.color(128, 0, 125, 125)
    const ORANGE_A = p.color(255, 140, 0, 125)

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
    const c0 = create_circle(100, 100, 50)
    const c1 = create_circle(180, 150, 70)
    let selected = null

    p.mousePressed = function () {
      if (pt_within_circle(c0, p.mouseX, p.mouseY))
        selected = c0;
      else if (pt_within_circle(c1, p.mouseX, p.mouseY))
        selected = c1;
    };

    p.mouseReleased = function () {
      selected = null
    };

    p.setup = function () {
      p.createCanvas(300, 300)
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

    p.draw = function () {
      if (selected) {
        selected.x = clamp(0, 300, p.mouseX);
        selected.y = clamp(0, 300, p.mouseY);
      }
      p.background(255);

      p.strokeWeight(2)
      p.stroke(PURPLE)
      p.fill(PURPLE_A)
      p.circle(c0.x, c0.y, c0.r*2);



      p.stroke(ORANGE)
      p.fill(ORANGE_A)
      p.circle(c1.x, c1.y, c1.r*2);

      // lines and stats
      {
        let v = sub(c1, c0);

        let nv = norm(v);
        let per = perp(nv);

        let c0rs = add(c0, scale(per, 5))
        let c0re = add(c0rs, scale(nv, c0.r))

        let c1rs = add(c1, scale(per, 10))
        let c1re = add(c1rs, scale(nv, -c1.r))

        let d = len(v)
        let r = c0.r + c1.r;
        let diff = r - d;

        let intersect_start = add(c1re, scale(per, 5))
        let intersect_end = add(c0re, scale(per, 10))

        p.stroke(0)
        p.line(c0.x, c0.y, c1.x, c1.y)

        p.stroke(PURPLE)
        p.line(c0rs.x, c0rs.y, c0re.x, c0re.y)

        p.stroke(ORANGE_DARK)
        p.line(c1rs.x, c1rs.y, c1re.x, c1re.y)

        if ( diff > 0) {
          p.stroke(RED)
          p.line(intersect_start.x, intersect_start.y, intersect_end.x, intersect_end.y)
        }



        // stats
        {
          let x = 5
          let y = 230
          let y_offset = 15;
          p.textSize(15)
          p.strokeWeight(0)
          p.textFont('Courier New');

          p.fill(PURPLE);
          p.text("s radius: " + c0.r.toFixed(2), x, y += y_offset);
          p.fill(ORANGE);
          p.text("k radius: " + c1.r.toFixed(2), x, y += y_offset);
          p.fill(RED);
          p.text("diff    : " + diff.toFixed(2), x, y += y_offset);
          p.fill(0);
          p.text("distance: " + d.toFixed(2), x, y += y_offset);
        }
      }
    } 
  }

  let s1 = function(p) 
  {
    function update_slider(val, minVal, maxVal, x, y, w) {
      let diameter = 15;
      // 1. Draw the track line
      p.stroke(100);
      p.strokeWeight(4);
      p.line(x, y, x + w, y);

      // 2. Calculate knob position
      // Map the current value to a pixel position
      let knobX = p.map(val, minVal, maxVal, x, x + w);

      // 3. Check for mouse interaction
      // If mouse is pressed within the slider's rectangular area...
        if (p.mouseIsPressed && 
          p.mouseX >= x && 
          p.mouseX <= x + w && 
          p.mouseY >= y - diameter/2 && 
          p.mouseY <= y + diameter/2) {

          // Move the knob to the mouse (constrained to the track)
          knobX = p.constrain(p.mouseX, x, x + w);

          // Calculate the new value based on the new position
          val = p.map(knobX, x, x + w, minVal, maxVal);
        }

      // 4. Draw the knob
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(1);
      p.circle(knobX, y, diameter);

      // 5. Return the (potentially changed) value
      return val;
    }
    const PURPLE = p.color(128, 0, 125)
    const ORANGE = p.color(255, 140, 0)
    const ORANGE_DARK = p.color(200, 100, 0)
    const RED = p.color(255, 0, 0)
    const PURPLE_A = p.color(128, 0, 125, 140)
    const ORANGE_A = p.color(255, 140, 0, 140)
    const PURPLE_B = p.color(128, 0, 125, 200)
    const ORANGE_B = p.color(255, 140, 0, 200)

    let slider0 = 50;
    let slider1 = 50;

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


    const c0 = create_circle(100, 100, 30)
    const c1 = create_circle(170, 170, 50)
    let selected = null

    p.mousePressed = function () {
      if (pt_within_circle(c0, p.mouseX, p.mouseY))
        selected = c0;
      else if (pt_within_circle(c1, p.mouseX, p.mouseY))
        selected = c1;
    };

    p.mouseReleased = function () {
      selected = null
    };

    p.setup = function () {
      let canvas = p.createCanvas(300, 300)
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

    p.draw = function () 
    {
      let v = sub(c1, c0);

      let nv = norm(v);
      let per = perp(nv);

      let c0rs = add(c0, scale(per, 5))
      let c0re = add(c0rs, scale(nv, c0.r))

      let c1rs = add(c1, scale(per, 10))
      let c1re = add(c1rs, scale(nv, -c1.r))

      let d = len(v)
      let r = c0.r + c1.r;
      let diff = r - d;

      if (selected) {
        selected.x = clamp(0, 300, p.mouseX);
        selected.y = clamp(0, 300, p.mouseY);
      }
      p.background(255);

      p.strokeWeight(2)
      p.stroke(PURPLE_A)
      p.fill(0,0,0,0)
      p.circle(c0.x, c0.y, c0.r*2)

      p.stroke(ORANGE_A)
      p.fill(0,0,0,0)
      p.circle(c1.x, c1.y, c1.r*2);



      // draw push back circles
      if ( diff > 0) 
      {
        // Slider value actually represents mass but
        // our formula is using inverse mass, so we
        // need to convert our mass to inverse mass.


        let s_mass = slider0;
        let k_mass = slider1;

        let s_pen = k_mass/(s_mass + k_mass) * diff
        let k_pen = s_mass/(s_mass + k_mass) * -diff

        let c0p = scale(nv, s_pen)
        let c1p = scale(nv, k_pen)

        p.stroke(PURPLE_B)
        p.fill(PURPLE_B)
        p.circle(c0.x - c0p.x, c0.y - c0p.y, c0.r*2);

        p.stroke(ORANGE_B)
        p.fill(ORANGE_B)
        p.circle(c1.x - c1p.x, c1.y - c1p.y, c1.r*2);
      }

      // stats
      {
        let x = 5
        let y = 263
        let y_offset = 20;
        p.textSize(16)
        p.strokeWeight(0)
        p.textFont('Courier New');

        p.fill(PURPLE);
        p.text("s mass: ", x, y);
        p.fill(ORANGE);
        p.text("k mass: ", x, y+=y_offset);

        slider0 = update_slider(slider0, 0, 100, 80, 260, 100);
        slider1 = update_slider(slider1, 0, 100, 80, 280, 100);
      }

    }
  }
  new p5(s0, "s0");
  new p5(s1, "s1");
})();


