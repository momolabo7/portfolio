(function(window) {
  'use strict';

  let sketch = function(p) {
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 400;
    const SMALL_STROKE = 4;
    const BIG_STROKE = 8;

    const CIRCLE_RADIUS = CANVAS_WIDTH/4 * 2;
    const CIRCLE_X = CANVAS_WIDTH/8;
    const CIRCLE_Y = CANVAS_HEIGHT - CANVAS_WIDTH/8;
    const UNIT = CIRCLE_RADIUS;

    let point_x = 0
    let point_y = 0
    const POINT_RADIUS = 25;
    let angle = p.PI/4;
    let is_dragging = false;

    // line width respect to unit circle
    // x goes right and y goes up for my sanity
    function pline(x0, y0, x1, y1) {
      p.line(CIRCLE_X + x0 * UNIT, CIRCLE_Y - y0 * UNIT, CIRCLE_X + x1 * UNIT, CIRCLE_Y - y1 * UNIT);
    }

    function vline(x, y, vx, vy)
    {
      let px = CIRCLE_X + x * UNIT;
      let py = CIRCLE_Y - y * UNIT;
      p.line(px, py, px + vx * UNIT, py - vy * UNIT);
    }



    function ptext(t, x, y, ox, oy) {
      p.text(t, CIRCLE_X + x * UNIT + ox, CIRCLE_Y - y * UNIT + oy);
    }


    // place text at the center of two points
    function ctext(t, x0, y0, x1, y1, ox, oy) {
      ptext(t, x0 + (x1-x0)/2, y0 + (y1-y0)/2, ox, oy);
    }


    p.setup = function() {
      p.textAlign(p.CENTER, p.CENTER);
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent("sketch");
      p.textFont('Courier New');
      console.log("Hi");
    }

    function is_point_in_circle(px, py, cx, cy, r) 
    {
      let vx = cx - px;
      let vy = cy - py;

      let d = vx * vx + vy * vy;

      return  d < POINT_RADIUS * POINT_RADIUS
    }

    p.mousePressed = function() { 
      let vx = point_x - p.mouseX;
      let vy = point_y - p.mouseY;

      let d = vx * vx + vy * vy;

      if ( d < POINT_RADIUS * POINT_RADIUS) {
        is_dragging = true;
      }
    }

    p.mouseReleased = function() 
    {
      is_dragging = false;
    }


    p.draw = function() {
      let cosine = p.cos(angle);
      let sine = p.sin(angle);
      let tangent = p.tan(angle);
      let cotangent = 1/tangent;
      let secent = 1/cosine;
      let cosecent = 1/sine;

      point_x = CIRCLE_X + cosine *UNIT;
      point_y = CIRCLE_Y - sine*UNIT;

      let is_hovering_on_point = is_point_in_circle(p.mouseX, p.mouseY, point_x, point_y, POINT_RADIUS)


      // angle between vector: a.b = |a||b|cos(angle)
      // b is [1,0], so a.b is just a_x, and |b| is 1
      // so angle = acos(a_x/|a|)
      if (is_dragging) {
        const mouse_vec_x = p.mouseX - CIRCLE_X;
        const mouse_vec_y = p.mouseY - CIRCLE_Y;
        const mouse_vec_d = Math.sqrt(mouse_vec_x * mouse_vec_x + mouse_vec_y * mouse_vec_y);

        angle = p.acos(mouse_vec_x/mouse_vec_d) 

        // find whether a is CW or CCW wrt b
        // first, use cross product (a x b) = [0, 0, a_x*b_y - a_y*b_x]
        // b = [1,0], so it's just [0, 0, -a_y]
        // then we just check whether that is in the same direction 
        // as our canvas' z-direction. We can use dot product, but since
        // we just have z-axis value to deal with, we can just compare the sign.
        // 
        // Cross product always gives back the penpendicular vector
        // via the right hand rule.
        // P5's x goes right and y goes down, 
        // so by right hand rule, z goes inwards.
        //
        // a is the vector from circle origin to mouse and b is x-axis
        // We can say a x b gives a direction of a rotating towards b
        // So if a x b is +ve, a is on the CCW of b, -ve would be CW

        if (-mouse_vec_y < 0) angle = 0.0001; // lol

        if (angle > p.PI/2) angle = p.PI/2 - 0.0001; // lol

      }


      p.background(255);
      p.fill(0, 0, 0, 0);
      p.circle(CIRCLE_X, CIRCLE_Y, CIRCLE_RADIUS*2);


      // theta
      {
        let c = p.cos(angle/2);
        let s = p.sin(angle/2);
        p.strokeWeight(3);
        p.arc(CIRCLE_X, CIRCLE_Y, 80, 80, -angle, 0);
        p.strokeWeight(0.5);
        p.text("θ", CIRCLE_X + c*50, CIRCLE_Y - s*50);
      }

      // secent (must use secent variable)
      {
        const secent_color = [255, 140, 0]
        p.strokeWeight(BIG_STROKE);
        p.stroke(secent_color)
        pline(0, 0, secent, 0)

        if ((secent - cosine)*UNIT > 25)
        {
          p.fill(secent_color);
          p.stroke(secent_color);
          p.strokeWeight(0.5);
          p.textSize(16);
          ctext("secθ", cosine, 0, secent, 0, 0, 15)
        }
      }

      // cosecent (must use cosecent variable)
      {
        const cosecent_color = [80, 200, 200]
        p.strokeWeight(BIG_STROKE);
        p.stroke(cosecent_color)
        pline(0, 0, 0, cosecent);
        if ((cosecent - sine)*UNIT > 25)
        {
          p.fill(cosecent_color);
          p.stroke(cosecent_color);
          p.strokeWeight(0.5);
          p.textSize(16);
          ctext("cscθ", 0, sine, 0, cosecent, -25, 0)
        }
      }

      // hypothenuse  
      {
        const hypothenuse_color = [125, 125, 125]
        p.strokeWeight(SMALL_STROKE);
        p.stroke(hypothenuse_color);
        p.fill(hypothenuse_color);
        pline(0, 0, cosine, sine);


        if (angle > p.PI/180*5 && angle < p.PI/180*85) 
        {
          p.strokeWeight(0)
          p.fill(255, 255, 255);
          p.circle(CIRCLE_X + cosine/2 * UNIT, CIRCLE_Y - sine/2 * UNIT, 16)
          p.strokeWeight(0.5)
          p.stroke(hypothenuse_color);
          p.fill(hypothenuse_color);
          p.textSize(16)
          ctext("1", 0, 0, cosine, sine, 0, 0);
        }
      }

      // cosine
      {
        const cosine_color = [80, 80, 255]
        p.stroke(cosine_color);
        p.strokeWeight(SMALL_STROKE);
        p.fill(cosine_color)
        pline(0, 0, cosine, 0);
        pline(0, sine, cosine, sine);

        if (cosine * UNIT > 50) {
          p.strokeWeight(0.5)
          p.textSize(16)
          ptext("cosθ", cosine/2, 0, 0, 15)
          ptext("cosθ", cosine/2, sine, 0, -15)
        }
      }
      // sine
      {
        const sine_color = [255, 80, 80]

        p.strokeWeight(SMALL_STROKE);
        p.stroke(sine_color);
        p.fill(sine_color)
        pline(0, 0, 0, sine);
        pline(cosine, 0, cosine, sine);
        if (sine * UNIT > 50) {
          p.strokeWeight(0.5)
          p.textSize(16)
          ptext("sinθ", 0, sine/2, -25, 0)
          ptext("sinθ", cosine, sine/2, 25, 0)
        }
      }

      // tangent (must use tangent variable)
      {
        const tangent_color = [80, 180, 80]
        const x0 = cosine;
        const y0 = sine;
        const x1 = x0 + sine * tangent;
        const y1 = y0 - cosine * tangent;

        p.strokeWeight(SMALL_STROKE);
        p.stroke(tangent_color);
        p.fill(tangent_color);
        pline(x0,y0, x1, y1)
        if (tangent * UNIT > 50) {
          p.strokeWeight(0.5)
          p.textSize(16)
          ctext("tanθ", x0, y0, x1, y1, 15, -15);
        }
      }

      // cotangent (must use cotangent variable)
      {
        const x0 = cosine;
        const y0 = sine;
        const x1 = x0 - sine * cotangent;
        const y1 = y0 + cosine * cotangent;

        p.strokeWeight(SMALL_STROKE);
        p.stroke(255, 80, 255)
        p.fill(255, 80, 255)
        pline(x0, y0, x1, y1)
        if (cotangent * UNIT > 50) {
          p.strokeWeight(0.5)
          p.textSize(16)
          ctext("cotθ", x0, y0, x1, y1, 15, -15);
        }
      }

      p.stroke(0);
      p.strokeWeight(SMALL_STROKE);
      if (is_hovering_on_point || is_dragging)
      {
        p.fill(255, 125, 125)
        p.circle(point_x, point_y, POINT_RADIUS*1.2);
      }
      else 
      {
        p.fill(255, 0, 0)
        p.circle(point_x, point_y, POINT_RADIUS);
      }

      // center of circle
      p.fill(0);
      p.circle(CIRCLE_X, CIRCLE_Y, 10);
    }
  };
  
  new p5(sketch);
})();


