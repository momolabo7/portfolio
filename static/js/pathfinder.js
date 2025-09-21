
(function(window) {
  'use strict';

  function pathfinder(element)
  {
    this.grid_rows = 30;
    this.grid_cols = 30;

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
      rd.addEventListener("click", this.choose_rdivision.bind(this));

      mazebar.appendChild(title);
      mazebar.appendChild(rd);


      this.mazebar = mazebar;
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
      cb.addEventListener("click",  this.clear_board.bind(this));

      const co = document.createElement("span");
      co.classList.add("clickable");
      co.innerHTML = "Clear Obstacles";

      cmdbar.appendChild(title);
      cmdbar.appendChild(cp);
      cmdbar.appendChild(cb);
      cmdbar.appendChild(co);

      this.cmdbar = cmdbar;
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
        none.addEventListener("click", () => this.choose_paint(0));
        const none_circle = document.createElement("div");
        none_circle.classList.add("button-circle-none");
        none.appendChild(none_circle);
        none.appendChild(document.createTextNode("NONE"));
      }

      const start = document.createElement("span");
      {
        start.classList.add("clickable");
        start.addEventListener("click", () => this.choose_paint(1));
        const start_circle = document.createElement("div");
        start_circle.classList.add("button-circle-start");
        start.appendChild(start_circle);
        start.appendChild(document.createTextNode("START"));
      }

      const end = document.createElement("span");
      {
        end.classList.add("clickable");
        end.addEventListener("click", () => this.choose_paint(2));
        const end_circle = document.createElement("div");
        end_circle.classList.add("button-circle-end");
        end.appendChild(end_circle);
        end.appendChild(document.createTextNode("END"));
      }

      const obstacle = document.createElement("span");
      {
        obstacle.classList.add("clickable");
        obstacle.addEventListener("click", () => this.choose_paint(3));
        const obstacle_circle = document.createElement("div");
        obstacle_circle.classList.add("button-circle-obstacle");
        obstacle.appendChild(obstacle_circle);
        obstacle.appendChild(document.createTextNode("OBSTACLE"));
      }

      const difficult = document.createElement("span");
      {
        difficult.classList.add("clickable");
        difficult.addEventListener("click", () => this.choose_paint(4));
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

      this.paintbar = paintbar;
      this.paint_mode = 0;
      this.paintbar_choices = [ none, start, end, obstacle, difficult ]
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

      this.pathfindbar = pathfindbar;
    }

    element.appendChild(this.cmdbar);
    element.appendChild(this.pathfindbar);
    element.appendChild(this.mazebar);
    element.appendChild(this.paintbar);


    //
    // grid and cell initialization
    //
    this.grid = document.createElement("div");
    this.grid.setAttribute("id", "grid");

    this.cells = []
    const wh_percentage = 100 / this.grid_cols;
    for (let r = 0; r < this.grid_rows; ++r)
    {
      const row = [];
      for (let c = 0; c < this.grid_cols; ++c)
      {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${wh_percentage}%`; 
        cell.style.paddingTop = `${wh_percentage}%`
        cell.addEventListener("mouseover", this.cell_hover.bind(this, r,c));
        cell.addEventListener("click", this.cell_click.bind(this, r,c));
        cell.is_obstacle = false;
        cell.is_difficult = false;
        cell.row = r;
        cell.col = c;

        row.push(cell);
        this.grid.appendChild(cell);
      }
      this.cells.push(row);
    }

    // Initialize start and end cell manually
    // @note: this avoids an if statement in the functions
    {
      const cell = this.cells[15][25];
      cell.classList.add("cell-start");
      this.start_cell = cell;
    }
    
    {
      const cell = this.cells[15][5];
      cell.classList.add("cell-end");
      this.end_cell = cell;
    }
    
    this.animes = [];

    element.appendChild(this.grid);
  }

  pathfinder.prototype.paint_cell = function(row, col)
  {
    const cell = this.cells[row][col];
    switch(p.paint_mode)
    {
      case 0: // 
      {
        this.clear_cell(cell);
      } break;
      case 1:
      {
        this.set_start_cell(cell);
      } break;
      case 2:
      {
        this.set_end_cell(cell);
      } break;
      case 3: 
      {
        this.set_cell_obstacle(cell);
      } break;
      case 4: 
      {
        this.set_cell_difficult(cell);
      } break;
    }
  }

  pathfinder.prototype.cell_hover = function(row, col, e)
  {
    if (e.buttons > 0)
    {
      this.paint_cell(row,col);
    }
  }

  pathfinder.prototype.cell_click = function(row, col, e)
  {
    this.paint_cell(row,col);
  }

  pathfinder.prototype.clear_cell = function(cell)
  {
    cell.classList.remove(...cell.classList);
    cell.classList.add("cell");
    cell.is_obstacle = cell.is_difficult = false;
  }

  pathfinder.prototype.set_cell_obstacle = function(cell)
  {
    cell.classList.add("cell-obstacle");
    cell.is_obstacle = true;
  }

  pathfinder.prototype.set_cell_difficult = function(cell)
  {
    cell.classList.add("cell-difficult");
    cell.is_difficult = true;
  }
  
  pathfinder.prototype.set_start_cell = function(p, cell)
  {
    this.start_cell.classList.remove("cell-start");
    clear_cell(cell);
    cell.classList.add("cell-start");
    this.start_cell = cell;
  }

  pathfinder.prototype.set_end_cell = function(pcell)
  {
    this.end_cell.classList.remove("cell-end");
    clear_cell(cell);
    cell.classList.add("cell-end");
    this.end_cell = cell;
  }

  pathfinder.prototype.update_animes = function(duration_per_anime, prev_time, timestamp) 
  {
    if (prev_time === 0) {
      prev_time = timestamp;
    }
    let dt = timestamp - prev_time;

    this.anime_timer += dt;
    if (this.anime_timer > duration_per_anime) 
    {
      this.anime_timer = 0;
      const current_anime = this.animes[this.anime_current_index++];
      current_anime.cb(current_anime.e);
      if (this.anime_current_index >= this.animes.length)
      {
        cancelAnimationFrame(this.anime_handle);
        this.anime_handle = 0; 
        thisurn;
      }
    }

    this.anime_handle = requestAnimationFrame(this.update_animes.bind(this, duration_per_anime, timestamp));

  }


  pathfinder.prototype.begin_animes = function() 
  {
    this.animes.length = 0;
  }

  pathfinder.prototype.end_animes = function() 
  {
    this.anime_timer = 0;
    this.anime_current_index = 0;
    this.anime_handle = requestAnimationFrame(this.update_animes.bind(this, 10, 0));
  }

  pathfinder.prototype.push_anime = function(element, callback)
  {
    this.animes.push({ e: element, cb: callback });
  }


  //
  // Choices
  //
  function choose_dfs(p)
  {
    clear_path();
  }


  pathfinder.prototype.rdivision = function(sr, sc, er, ec)
  {

    // @note: the algorithm implementation is a bit scuffed.
    // Currently, walls are ALWAYS on even tiles and holes are on odd tiles.
    // The reason why we do that is that it is an easy way to make sure that
    // the walls will never block a hole.
    // Apparently this is an widely accepted technique online but ew.
    let ret = [];


    let width = ec - sc + 1;
    let height = er - sr + 1;

    if (width < 3 || height < 3)
        return;

    let slice_vertically = (width >= height);

    if (slice_vertically)
    {
      // slices_vertically

      // @note: Walls are always EVEN. 
      // We also never add walls at the edge, so we need to +1 at least to the start column (sc)
      // If sc is even, then we do +2 instead. 
      let wall_offset = (sc % 2 == 0) ? 2 : 1;
      let wall_c = rand_step(sc + wall_offset, ec - 1, 2);

      // @note: Holes are always ODD. 
      // Same logic as the walls
      let hole_offset = (sr % 2 == 0) ? 1 : 2;
      let hole_r = rand_step(sr + hole_offset, er - 1, 2);

      
      // add wall
      for (let i = sr; i <= er; ++i) 
      {
        if ( i === hole_r ) continue;
        const cell = this.cells[i][wall_c];
        if(cell == this.start_cell || cell == this.end_cell) continue;

        this.push_anime(cell, this.set_cell_obstacle);

      }
      this.rdivision(sr, sc, er, wall_c - 1);
      this.rdivision(sr, wall_c + 1, er, ec);

    }
    else 
    {
      // @note: Same algorithm as the one above
      let wall_offset = (sr % 2 == 0) ? 2 : 1;
      let wall_r = rand_step(sr + wall_offset, er - 1, 2);

      let hole_offset = (sc % 2 == 0) ? 1 : 2;
      let hole_c = rand_step(sc + hole_offset, ec - 1, 2);

      // add wall
      for (let i = sc; i <= ec; ++i) {
        if ( i === hole_c ) continue;

        const cell = this.cells[wall_r][i];
        if(cell == this.start_cell || cell == this.end_cell) continue;

        this.push_anime(cell, this.set_cell_obstacle);

      }
      this.rdivision(sr, sc, wall_r - 1, ec);
      this.rdivision(wall_r + 1, sc, er, ec);
    }

  }

  pathfinder.prototype.choose_paint = function(which)
  {
    for(let e of this.paintbar_choices)
    {
      e.classList.remove("selected");
    }

    this.paintbar_choices[which].classList.add("selected");
    this.paint_mode = which;
  }

  pathfinder.prototype.choose_rdivision = function(which)
  {
    this.clear_board();
    this.begin_animes();
    this.rdivision(0, 0, this.grid_rows-1, this.grid_cols-1);
    this.end_animes();
  }
  
  pathfinder.prototype.clear_board = function()
  {
    for (let r = 0; r < this.grid_rows; ++r)
    {
      for (let c = 0; c < this.grid_cols; ++c)
      {
        const cell = this.cells[r][c];

        // skip the start and end cell
        if(cell == this.start_cell || cell == this.end_cell) continue;


        this.clear_cell(cell);
      }
    }
  }


  pathfinder.prototype.clear_path = function()
  {
  }


  // @note: inclusive of max
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // @note: random, but with steps e.g. only every 2 numbers or every 3 numbers are valid)
  function rand_step(min, max, step)
  {
    let range = max - min;
    let ret = min + Math.floor(rand(0, range) / step) * step;
    return ret;

  }

  window.pathfinder = function(element) 
  {
    return new pathfinder(element);
  }

})(window);

