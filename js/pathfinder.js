
(function(window) {
  'use strict';

  function pathfinder(element)
  {
    const ret = {};

    ret.grid_rows = 30;
    ret.grid_cols = 30;

    // @todo: 
    // - we *should* compress creation of the navigation bars
    //   and standardize how to create each element
    // - there's a dragging issue in the browser...where there's the ghost image of the cells

    // maze generation commands 
    {
      const mazebar = document.createElement("div");
      mazebar.setAttribute("id", "mazebar");
      
      const title = document.createElement("span");
      title.classList.add("title");
      title.appendChild(document.createTextNode("Maze"));

      const rd = document.createElement("span");
      rd.classList.add("clickable");
      rd.innerHTML = "Recursive Division";
      rd.addEventListener("click", choose_rdivision.bind(null, ret, 0, 0, ret.grid_rows-1, ret.grid_cols-1));

      mazebar.appendChild(title);
      mazebar.appendChild(rd);


      ret.mazebar = mazebar;
    }


    // cmdbar construction
    {
      const cmdbar = document.createElement("div");
      cmdbar.setAttribute("id", "cmdbar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.innerHTML = "Commands";
  
      const cp = document.createElement("span");
      cp.classList.add("clickable");
      cp.innerHTML = "Clear Path";
      cp.addEventListener("click", () => {
        console.log("hello");
      });

      const cb = document.createElement("span");
      cb.classList.add("clickable");
      cb.innerHTML = "Clear Board";
      cb.addEventListener("click",  clear_board.bind(null, ret));

      const co = document.createElement("span");
      co.classList.add("clickable");
      co.innerHTML = "Clear Obstacles";

      cmdbar.appendChild(title);
      cmdbar.appendChild(cp);
      cmdbar.appendChild(cb);
      cmdbar.appendChild(co);

      ret.cmdbar = cmdbar;
    }

    // paint bar construction
    {
      const paintbar = document.createElement("div");
      paintbar.setAttribute("id", "paintbar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.appendChild(document.createTextNode("Paint Mode"));
  
      const none = document.createElement("span");
      {
        none.classList.add("clickable");
        none.classList.add("selected");
        none.addEventListener("click", choose_paint.bind(null, ret, 0));
        const none_circle = document.createElement("div");
        none_circle.classList.add("button-circle-none");
        none.appendChild(none_circle);
        none.appendChild(document.createTextNode("NONE"));
      }

      const start = document.createElement("span");
      {
        start.classList.add("clickable");
        start.addEventListener("click", choose_paint.bind(null, ret, 1));
        const start_circle = document.createElement("div");
        start_circle.classList.add("button-circle-start");
        start.appendChild(start_circle);
        start.appendChild(document.createTextNode("START"));
      }

      const end = document.createElement("span");
      {
        end.classList.add("clickable");
        end.addEventListener("click", choose_paint.bind(null, ret, 2));
        const end_circle = document.createElement("div");
        end_circle.classList.add("button-circle-end");
        end.appendChild(end_circle);
        end.appendChild(document.createTextNode("END"));
      }

      const obstacle = document.createElement("span");
      {
        obstacle.classList.add("clickable");
        obstacle.addEventListener("click", choose_paint.bind(null, ret, 3));
        const obstacle_circle = document.createElement("div");
        obstacle_circle.classList.add("button-circle-obstacle");
        obstacle.appendChild(obstacle_circle);
        obstacle.appendChild(document.createTextNode("OBSTACLE"));
      }

      const difficult = document.createElement("span");
      {
        difficult.classList.add("clickable");
        difficult.addEventListener("click", choose_paint.bind(null, ret, 4));
        const difficult_circle = document.createElement("div");
        difficult_circle.classList.add("button-circle-difficult");
        difficult.appendChild(difficult_circle);
        difficult.appendChild(document.createTextNode("DIFFICULT"));
      }

      paintbar.appendChild(title);
      paintbar.appendChild(none);
      paintbar.appendChild(start);
      paintbar.appendChild(end);
      paintbar.appendChild(obstacle);
      paintbar.appendChild(difficult);

      ret.paintbar = paintbar;
      ret.paint_mode = 0;
      ret.paintbar_choices = [ none, start, end, obstacle, difficult ]
    }

    // pathfind bar construction
    {
      const pathfindbar = document.createElement("div");
      pathfindbar.setAttribute("id", "pathfindbar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.innerHTML = "Pathfind";

      const dfs = document.createElement("span");
      dfs.classList.add("clickable");
      dfs.innerHTML = "DFS";
      dfs.addEventListener("click", () => {
        console.log("hello");
      });

      const bfs = document.createElement("span");
      bfs.classList.add("clickable");
      bfs.innerHTML = "BFS";
      bfs.addEventListener("click", () => {
        console.log("hello");
      });
      const dijkstra = document.createElement("span");
      dijkstra.classList.add("clickable");
      dijkstra.innerHTML = "Dijkstra";
      dijkstra.addEventListener("click", () => {
        console.log("hello");
      });
      const astar = document.createElement("span");
      astar.classList.add("clickable");
      astar.innerHTML = "A-Star";
      astar.addEventListener("click", () => {
        console.log("hello");
      });
  
      pathfindbar.appendChild(title);
      pathfindbar.appendChild(dfs);
      pathfindbar.appendChild(bfs);
      pathfindbar.appendChild(dijkstra);
      pathfindbar.appendChild(astar);

      ret.pathfindbar = pathfindbar;
    }

    element.appendChild(ret.cmdbar);
    element.appendChild(ret.pathfindbar);
    element.appendChild(ret.mazebar);
    element.appendChild(ret.paintbar);


    //
    // grid and cell initialization
    //
    ret.grid = document.createElement("div");
    ret.grid.setAttribute("id", "grid");

    ret.cells = []
    const wh_percentage = 100 / ret.grid_cols;
    for (let r = 0; r < ret.grid_rows; ++r)
    {
      const row = [];
      for (let c = 0; c < ret.grid_cols; ++c)
      {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${wh_percentage}%`; 
        cell.style.paddingTop = `${wh_percentage}%`
        cell.addEventListener("mouseover", cell_hover.bind(null, ret, r,c));
        cell.addEventListener("click", cell_click.bind(null, ret, r,c));
        cell.is_obstacle = false;
        cell.is_difficult = false;
        cell.row = r;
        cell.col = c;

        row.push(cell);
        ret.grid.appendChild(cell);
      }
      ret.cells.push(row);
    }

    // Initialize start and end cell manually
    // @note: this avoids an if statement in the functions
    {
      const cell = ret.cells[0][0];
      cell.classList.add("cell-start");
      ret.start_cell = cell;
    }
    
    {
      const cell = ret.cells[1][1];
      cell.classList.add("cell-end");
      ret.end_cell = cell;
    }
    

    element.appendChild(ret.grid);
  }

  function paint_cell(p, row, col)
  {
    const cell = p.cells[row][col];
    switch(p.paint_mode)
    {
      case 0: // 
      {
        clear_cell(cell);
      } break;
      case 1:
      {
        set_start_cell(p, cell);
      } break;
      case 2:
      {
        set_end_cell(p, cell);
      } break;
      case 3: 
      {
        set_cell_obstacle(cell);
      } break;
      case 4: 
      {
        set_cell_difficult(cell);
      } break;
    }
  }

  function cell_hover(p, row, col, e)
  {
    if (e.buttons > 0)
    {
      paint_cell(p, row,col);
    }
  }

  function cell_click(p, row, col, e)
  {
    paint_cell(p, row,col);
  }

  function clear_cell(cell)
  {
    cell.classList.remove(...cell.classList);
    cell.classList.add("cell");
    cell.is_obstacle = cell.is_difficult = false;
  }

  function set_cell_obstacle(cell)
  {
    cell.classList.add("cell-obstacle");
    cell.is_obstacle = true;
  }

  function set_cell_difficult(p, cell)
  {
    cell.classList.add("cell-difficult");
    cell.is_difficult = true;
  }
  
  function set_start_cell(p, cell)
  {
    p.start_cell.classList.remove("cell-start");
    clear_cell(cell);
    cell.classList.add("cell-start");
    p.start_cell = cell;
  }

  function set_end_cell(p, cell)
  {
    p.end_cell.classList.remove("cell-end");
    clear_cell(cell);
    cell.classList.add("cell-end");
    p.end_cell = cell;
  }

  function choose_rdivision(p, sr, sc, er, ec)
  {
    clear_board(p);
    rdivision(p, sr, sc, er, ec);
  }


  function rdivision(p, sr, sc, er, ec)
  {
    //clear_board(p);
    let ret = [];

    let w = ec - sc + 1;
    let h = er - sr + 1;

    // @note: minimum sized room is 2 cells
    if (w > 2 || h > 2) return;

    // @note: we need to generate 2 walls perpendicular to each other
    // This can be represented by a single midpoint, which we will randomize
    let mpc = Math.floor(rand(sc + 1, ec - 1));
    let mpr = Math.floor(rand(sr + 1, er - 1));
    
    // @note: We determine where the 4 walls are: up, down, left and right
    // let 0 = up, 1 = down, left = 2, right = 3.
    // We need to open up 3 out of the 4 walls, so we will just choose 1 to not open
    let exclude = Math.floor(rand(0,3));


    // @note: now we draw the 4 walls
    
    // up
    {
    }

    // down
    {
    }
    
    // left
    {
    }

    // right
    {
    }




    //rdivision(p, sr, sc, er, wall_c - 1);
    //rdivision(p, sr, wall_c + 1, er, ec);
    
    


    /*
    if (h > 2)
    {
      // random a wall that's NOT at the corner
      let wall_r = Math.floor(rand(sr + 1, er - 1));
      let hole_c = Math.floor(rand(sc + 1, ec - 1));

      for(let c = 0; c < w; ++c) 
      {
        if (c == hole_c) continue;
        const cell = p.cells[wall_r][c];
        if(cell == p.start_cell || cell == p.end_cell) continue;

        ret.push(cell);
        set_cell_obstacle(cell);

      }
      //rdivision(p, sr, sc, wall_r - 1, ec);
      //rdivision(p, wall_r + 1, sc, er, ec);

    }
    */
    return ret;

  }

  function choose_paint(p, which)
  {
    for(let e of p.paintbar_choices)
    {
      e.classList.remove("selected");
    }

    p.paintbar_choices[which].classList.add("selected");
    p.paint_mode = which;
  }

  
  function clear_board(p)
  {
    for (let r = 0; r < p.grid_rows; ++r)
    {
      for (let c = 0; c < p.grid_cols; ++c)
      {
        const cell = p.cells[r][c];

        // skip the start and end cell
        if(cell == p.start_cell || cell == p.end_cell) continue;


        clear_cell(cell);
      }
    }
  }


  function clear_path(p)
  {
  }


  // @note: inclusive of max
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  window.pathfinder = function(element) 
  {
    return new pathfinder(element);
  }

})(window);

