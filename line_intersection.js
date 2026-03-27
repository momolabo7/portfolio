(function(window) {
  'use strict';
  const GRUVBOX = {
    bg:      [251, 241, 199],  // #fbf1c7
    fg:      [60,  56,  54],   // #3c3836
    red:     [204, 36,  29],   // #cc241d
    green:   [152, 151, 26],   // #98971a
    yellow:  [215, 153, 33],   // #d79921
    blue:    [69,  133, 136],  // #458588
    purple:  [177, 98,  134],  // #b16286
    aqua:    [104, 157, 106],  // #689d6a
    orange:  [214, 93,  14],   // #d65d0e
    gray:    [146, 131, 116],  // #928374
  };
  const color = GRUVBOX;

  function with_alpha(rgb, a) {
    return [...rgb, a];
  }

  const s0 = function (p) 
  {
    function line_intersection(a, b) 
    {
      let vx = a.p1.x - a.p0.x;
      let vy = a.p1.y - a.p0.y;
      let wx = b.p1.x - b.p0.x;
      let wy = b.p1.y - b.p0.y;
      let s = (vx * (a.p0.y - b.p0.y) + vy * (b.p0.x - a.p0.x)) / (vx * wy - wx * vy);
      let t = (b.p0.x + s * wx - a.p0.x) / vx;
      let ix = a.p0.x + t * vx;
      let iy = a.p0.y + t * vy;
      //ix = b.x0 + s * wx;
      //iy = b.y0 + s * wy;
      //console.log(ix, iy);
      return { 
        x: ix, 
        y: iy, 
        on_segment: s >= 0 && s <= 1 && t >= 0 && t <= 1,
        s,
        t
      };
    }

    function create_point(x, y) {
      return { x, y };
    }

    function create_line(p0, p1, color) {
      return { p0, p1, color };
    }

    function point_in_circle(cx, cy, r, px, py) {
      let x = cx - px;
      let y = cy - py;
      let d2 = x * x + y * y;
      return d2 < r * r;
    }
    const points = [];
    const lines = [];
    let selected_point = null;

    function draw_stats(s,t) {
      let x = 5
      let y = 270
      let y_offset = 15;
      p.textSize(15)
      p.strokeWeight(0)
      p.textFont('Courier New');
      p.fill(p.PURPLE);
      p.text("p", x, y)
      p.textSize(12)
      p.text("t", x + 10, y + 5)
      p.textSize(15)
      p.text(": " + t.toFixed(2), x + 20, y);
      y += y_offset;
      p.fill(p.ORANGE);
      p.text("q", x, y)
      p.textSize(12)
      p.text("t", x + 10, y + 5)
      p.textSize(15)
      p.text(": " + s.toFixed(2), x + 20, y);
    }
    p.mousePressed = function () {
      for (let pt of points) {
        if (point_in_circle(pt.x, pt.y, 10, p.mouseX, p.mouseY)) {
          selected_point = pt;
          break;
        }
      }
    };
    p.mouseReleased = function () {
      selected_point = null;
    };
    p.setup = function () {
      p.PURPLE = p.color(211, 134, 155)
      p.ORANGE = p.color(254, 128, 25)
      points.push(create_point(50, 50));
      points.push(create_point(250, 200));
      points.push(create_point(50, 200));
      points.push(create_point(250, 50));
      lines.push(create_line(points[0], points[1], p.PURPLE));
      lines.push(create_line(points[2], points[3], p.ORANGE));
      p.createCanvas(300, 300)
    };
    p.draw = function () {
      if (selected_point) {
        selected_point.x = p.mouseX;
        selected_point.y = p.mouseY;
      }
      p.background(color.bg);
      for (let l of lines) {
        let vx = (l.p1.x - l.p0.x) * 1000
        let vy = (l.p1.y - l.p0.y) * 1000
        p.stroke(l.color);
        p.strokeWeight(1.5);
        p.drawingContext.setLineDash([5, 5]); //create the dashed line pattern here
        p.line(l.p0.x, l.p0.y, l.p0.x - vx, l.p0.y - vy);
        p.line(l.p1.x, l.p1.y, l.p1.x + vx, l.p1.y + vy);
        p.drawingContext.setLineDash([0]);
        p.line(l.p0.x, l.p0.y, l.p1.x, l.p1.y);
      }
      p.stroke(color.gray);
      p.strokeWeight(1);
      for (let pt of points) {
        let size = 10;
        if (pt == selected_point) 
        {
          p.fill(color.blue)
          size = 15;
        }
        else if (point_in_circle(pt.x, pt.y, 10, p.mouseX, p.mouseY))
          size = 15
        else 
          p.fill(color.yellow);
        p.circle(pt.x, pt.y, size);
      }
      let intersection = line_intersection(lines[0], lines[1]);
      if (intersection.on_segment)
        p.fill(color.green);
      else
        p.fill(color.red);
      p.circle(intersection.x, intersection.y, 8);
      draw_stats(intersection.s, intersection.t);
    }
  }  
  new p5(s0, "s0");
})();
