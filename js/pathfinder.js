
(function(window) {
  'use strict';

  function pathfinder(element)
  {
    const ret = {};

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

      const rdivision = document.createElement("span");
      rdivision.classList.add("clickable");
      rdivision.innerHTML = "Recursive Division";
      //rdivision.addEventListener("click", this.rdivision.bind(this));

      mazebar.appendChild(title);
      mazebar.appendChild(rdivision);


      ret.mazebar = mazebar;
    }


    // cmdbar construction
    {
      const cmdbar = document.createElement("div");
      cmdbar.setAttribute("id", "cmdbar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.innerHTML = "Commands";
  
      const clear_path = document.createElement("span");
      clear_path.classList.add("clickable");
      clear_path.innerHTML = "Clear Path";
      clear_path.addEventListener("click", () => {
        console.log("hello");
      });

      const clear_board = document.createElement("span");
      clear_board.classList.add("clickable");
      clear_board.innerHTML = "Clear Board";
      //clear_board.addEventListener("click",  this.clear_board.bind(this));

      const clear_obstacles = document.createElement("span");
      clear_obstacles.classList.add("clickable");
      clear_obstacles.innerHTML = "Clear Obstacles";

      cmdbar.appendChild(title);
      cmdbar.appendChild(clear_path);
      cmdbar.appendChild(clear_board);
      cmdbar.appendChild(clear_obstacles);

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
        end.addEventListener("click", choose_paint.bind(ret, 2));
        const end_circle = document.createElement("div");
        end_circle.classList.add("button-circle-end");
        end.appendChild(end_circle);
        end.appendChild(document.createTextNode("END"));
      }

      const obstacle = document.createElement("span");
      {
        obstacle.classList.add("clickable");
        obstacle.addEventListener("click", choose_paint.bind(ret, 3));
        const obstacle_circle = document.createElement("div");
        obstacle_circle.classList.add("button-circle-obstacle");
        obstacle.appendChild(obstacle_circle);
        obstacle.appendChild(document.createTextNode("OBSTACLE"));
      }

      const difficult = document.createElement("span");
      {
        difficult.classList.add("clickable");
        difficult.addEventListener("click", choose_paint.bind(ret, 4));
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

    ret.grid_rows = 30;
    ret.grid_cols = 30;
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
        //cell.addEventListener("mouseover", this.cell_hover.bind(this, r,c));
        //cell.addEventListener("click", this.cell_click.bind(this, r,c));
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

  pathfinder.prototype.paint_cell = function(row, col)
  {
    const cell = this.cells[row][col];
    switch(this.paint_mode)
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
  
  pathfinder.prototype.set_start_cell = function(cell)
  {
    this.start_cell.classList.remove("cell-start");
    this.clear_cell(cell);
    cell.classList.add("cell-start");
    this.start_cell = cell;
  }

  pathfinder.prototype.set_end_cell = function(cell)
  {
    this.end_cell.classList.remove("cell-end");
    this.clear_cell(cell);
    cell.classList.add("cell-end");
    this.end_cell = cell;
  }

  pathfinder.prototype.rdivision = function()
  {
    console.log("lesgo");
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
  
  pathfinder.prototype.clear_board = function()
  {
    for (let r = 0; r < this.grid_rows; ++r)
    {
      for (let c = 0; c < this.grid_cols; ++c)
      {
        // skip the start and end cell
        if (r == this.start_row && c == this.start_col) continue;
        if (r == this.end_row && c == this.end_col) continue;

        const cell = this.cells[r][c];
        this.clear_cell(cell);
      }
    }
  }

  pathfinder.prototype.clear_path = function()
  {
  }



  window.pathfinder = function(element) 
  {
    return new pathfinder(element);
  }

})(window);

