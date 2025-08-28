(function(window) {
  'use strict';



  function pathfinder(element)
  {
    // @todo: 
    // - we *should* compress creation of the navigation bars
    //   and standardize how to create each element

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
      rdivision.addEventListener("click", () => {
        console.log("rdivision");
      });

      mazebar.appendChild(title);
      mazebar.appendChild(rdivision);


      this.mazebar = mazebar;
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
      clear_board.addEventListener("click", () => {
        console.log("hello");
      });

      const clear_obstacles = document.createElement("span");
      clear_obstacles.classList.add("clickable");
      clear_obstacles.innerHTML = "Clear Obstacles";

      cmdbar.appendChild(title);
      cmdbar.appendChild(clear_path);
      cmdbar.appendChild(clear_board);
      cmdbar.appendChild(clear_obstacles);

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
        none.addEventListener("click", this.choose_paint.bind(this, 0));
        const none_circle = document.createElement("div");
        none_circle.classList.add("button-circle-none");
        none.appendChild(none_circle);
        none.appendChild(document.createTextNode("NONE"));
      }

      const start = document.createElement("span");
      {
        start.classList.add("clickable");
        start.addEventListener("click", this.choose_paint.bind(this, 1));
        const start_circle = document.createElement("div");
        start_circle.classList.add("button-circle-start");
        start.appendChild(start_circle);
        start.appendChild(document.createTextNode("START"));
      }

      const end = document.createElement("span");
      {
        end.classList.add("clickable");
        end.addEventListener("click", this.choose_paint.bind(this, 2));
        const end_circle = document.createElement("div");
        end_circle.classList.add("button-circle-end");
        end.appendChild(end_circle);
        end.appendChild(document.createTextNode("END"));
      }

      const obstacle = document.createElement("span");
      {
        obstacle.classList.add("clickable");
        obstacle.addEventListener("click", this.choose_paint.bind(this, 3));
        const obstacle_circle = document.createElement("div");
        obstacle_circle.classList.add("button-circle-obstacle");
        obstacle.appendChild(obstacle_circle);
        obstacle.appendChild(document.createTextNode("OBSTACLE"));
      }

      const difficult = document.createElement("span");
      {
        difficult.classList.add("clickable");
        difficult.addEventListener("click", this.choose_paint.bind(this, 4));
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

    // @todo: the rows and cols calculaton is wrong
    this.grid_rows = 30;
    this.grid_cols = 30;
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
        cell.addEventListener("click", this.cell_clicked.bind(this, r,c));
        row.push(cell);
        this.grid.appendChild(cell);
      }
      this.cells.push(row);
    }


    this.set_start_position(0,0);
    this.set_end_position(1,1);


    element.appendChild(this.grid);
  }

  pathfinder.prototype.cell_clicked = function(row, col)
  {
    switch(this.paint_mode)
    {
      case 0:
      {
      } break;
      case 1:
      {
        const old_cell = this.cells[this.start_r, this.start_c];
        old_cell.classList.pop("cell_start");

        this.set_start_cell(row, col);
      } break;
      case 2:
      {
      } break;
      case 3: 
      {
      } break;
    }
    console.log(row, col);
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

  pathfinder.prototype.set_start_position = function(r, c)
  {
    const old_cell = this.cells[this.start_r, this.start_c];
    old_cell.classList.pop("cell-start");

    const cell = this.cells[r][c];
    cell.classList.add("cell-start");
    this.start_r = r;
    this.start_c = c;

  }

  pathfinder.prototype.set_end_position = function(r, c)
  {
    const old_cell = this.cells[this.end_r, this.end_c];
    old_cell.classList.pop("cell-end");

    const cell = this.cells[r][c];
    cell.classList.add("cell-end");
    this.end_r = r;
    this.end_c = c;
  }



  window.pathfinder = function(element) 
  {
    return new pathfinder(element);
  }

})(window);

