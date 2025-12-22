// @todo:
// - title
// - difficult icon should be nicer

(function(window) {
  'use strict';
    


  function create_cell(p, r, c, wh) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${wh}%`; 
    cell.style.paddingTop = `${wh}%`
    cell.addEventListener("mouseover", (e) => {
      if (e.buttons > 0)
        set_cell(p, r, c);
    });
    cell.addEventListener("click", () => {
      set_cell(p, r, c);
    });
    cell.is_obstacle = false;
    cell.is_difficult = false;
    cell.row = r;
    cell.col = c;

    // pathfinding purposes
    cell.parent = null;
    cell.visited = false;
    cell.considering = false;
    cell.g_score = 0;
    cell.h_score = 0;


    return cell;
  }


  function clear_board(p) 
  {
    anime_complete_everything_now(p);
    for (let r = 0; r < p.grid_rows; ++r)
    {
      for (let c = 0; c < p.grid_cols; ++c)
      {
        const cell = p.cells[r][c];

        // skip the start and end cell
        if(cell == p.start_cell || cell == p.end_cell) continue;
        set_cell_none(p, cell);
      }
    }
  }

  function clear_path(p) 
  {
    anime_complete_everything_now(p);
    for (let r = 0; r < p.grid_rows; ++r)
    {
      for (let c = 0; c < p.grid_cols; ++c)
      {
        const cell = p.cells[r][c];

        cell.classList.remove("visited");
        cell.classList.remove("considering");
        cell.classList.remove("path");
      }
    }
  }


  function pathfinder()
  {
    const ret = document.createElement("div");
    ret.classList.add("pathfinder");
    ret.grid_rows = 30;
    ret.grid_cols = 30;


    const header = document.createElement("div");
    header.classList.add("header");
    header.appendChild(document.createTextNode("Pathfinding Visualizer"));
    ret.appendChild(header);

    // cmdbar construction
    const bars = document.createElement("div");
    bars.classList.add("bars");
    {
      const cmdbar = document.createElement("div");
      cmdbar.classList.add("bar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.innerHTML = "Clear";
  
      const cp = document.createElement("span");
      cp.classList.add("clickable");
      cp.innerHTML = "Clear Path";
      cp.addEventListener("click", () => clear_path(ret));

      const cb = document.createElement("span");
      cb.classList.add("clickable");
      cb.innerHTML = "Clear Board";
      cb.addEventListener("click",  () => clear_board(ret));


      cmdbar.appendChild(title);
      cmdbar.appendChild(cb);
      cmdbar.appendChild(cp);

      bars.appendChild(cmdbar);
    }


    // maze generation commands 
    {
      const mazebar = document.createElement("div");
      mazebar.classList.add("bar");
      
      const title = document.createElement("span");
      title.classList.add("title");
      title.appendChild(document.createTextNode("Maze"));

      const rd = document.createElement("span");
      rd.classList.add("clickable");
      rd.innerHTML = "Recursive Division";
      rd.addEventListener("click", () => rdivision(ret));

      mazebar.appendChild(title);
      mazebar.appendChild(rd);

      bars.appendChild(mazebar);
    }

    // pathfind bar construction
    {
      const pathfindbar = document.createElement("div");
      pathfindbar.classList.add("bar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.appendChild(document.createTextNode("Pathfind"));

      const dfs_option = document.createElement("span");
      dfs_option.classList.add("clickable");
      dfs_option.innerHTML = "DFS";
      dfs_option.addEventListener("click", () => dfs(ret));

      const bfs_option = document.createElement("span");
      bfs_option.classList.add("clickable");
      bfs_option.innerHTML = "BFS";
      bfs_option.addEventListener("click", () => bfs(ret));

      const dijkstra_option = document.createElement("span");
      dijkstra_option.classList.add("clickable");
      dijkstra_option.innerHTML = "Dijkstra";
      dijkstra_option.addEventListener("click", () =>dijkstra(ret));

      const astar_option = document.createElement("span");
      astar_option.classList.add("clickable");
      astar_option.innerHTML = "A-Star";
      astar_option.addEventListener("click", () => astar(ret));
  
      pathfindbar.appendChild(title);
      pathfindbar.appendChild(dfs_option);
      pathfindbar.appendChild(bfs_option);
      pathfindbar.appendChild(dijkstra_option);
      pathfindbar.appendChild(astar_option);

      bars.appendChild(pathfindbar);
    }


    // paint bar construction
    {
      const paintbar = document.createElement("div");
      paintbar.classList.add("bar");

      const title = document.createElement("span");
      title.classList.add("title");
      title.appendChild(document.createTextNode("Paint"));
  
      const none = document.createElement("span");
      {
        none.classList.add("clickable");
        none.classList.add("selected");
        none.addEventListener("click", () => choose_paint(ret, 0));
        const none_circle = document.createElement("div");
        none_circle.classList.add("button-circle-none");
        none.appendChild(none_circle);
        none.appendChild(document.createTextNode("NONE"));
      }

      const start = document.createElement("span");
      {
        start.classList.add("clickable");
        start.addEventListener("click", () => choose_paint(ret, 1));
        const start_circle = document.createElement("div");
        start_circle.classList.add("button-circle-start");
        start.appendChild(start_circle);
        start.appendChild(document.createTextNode("START"));
      }

      const end = document.createElement("span");
      {
        end.classList.add("clickable");
        end.addEventListener("click", () => choose_paint(ret, 2));
        const end_circle = document.createElement("div");
        end_circle.classList.add("button-circle-end");
        end.appendChild(end_circle);
        end.appendChild(document.createTextNode("END"));
      }

      const obstacle = document.createElement("span");
      {
        obstacle.classList.add("clickable");
        obstacle.addEventListener("click", () => choose_paint(ret, 3));
        const obstacle_circle = document.createElement("div");
        obstacle_circle.classList.add("button-circle-obstacle");
        obstacle.appendChild(obstacle_circle);
        obstacle.appendChild(document.createTextNode("OBSTACLE"));
      }

      const difficult = document.createElement("span");
      {
        difficult.classList.add("clickable");
        difficult.addEventListener("click", () => choose_paint(ret, 4));
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

      ret.paint_mode = 0;
      ret.paintbar_choices = [ none, start, end, obstacle, difficult ]

      bars.appendChild(paintbar);

    }
    ret.appendChild(bars);

    //
    // grid and cell initialization
    //
    ret.grid = document.createElement("div");
    ret.grid.classList.add("grid");

    const wh_percentage = 100/ret.grid_rows;
    ret.cells = []
    for (let r = 0; r < ret.grid_rows; ++r)
    {
      const row = [];
      const row_element = document.createElement("div");
      row_element.classList.add("row");
      for (let c = 0; c < ret.grid_cols; ++c)
      {
        const cell = create_cell(ret, r, c, wh_percentage)
        row.push(cell);
        row_element.appendChild(cell);
      }
      ret.grid.appendChild(row_element);
      ret.cells.push(row);
    }
    ret.appendChild(ret.grid);

    ret.start_cell = ret.end_cell = null;

    set_start_cell(ret, ret.cells[15][4]);
    set_end_cell(ret, ret.cells[15][25]);
    
    ret.animes = [];

    return ret;
  }

  function set_cell(p, row, col)
  {
    const cell = p.cells[row][col];
    switch(p.paint_mode)
    {
      case 0: // 
      {
        set_cell_none(p, cell);
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
        set_cell_obstacle(p, cell);
      } break;
      case 4: 
      {
        set_cell_difficult(p, cell);
      } break;
      
    }
  }


  function set_cell_none(p, cell)
  {
    //@note: cannot remove start/end cells
    if(cell == p.start_cell || cell == p.end_cell)
      return;
    cell.classList.remove(...cell.classList);
    cell.classList.add("cell");
    cell.is_obstacle = cell.is_difficult = false;
  }


  function set_cell_obstacle(p, cell)
  {
    //@note: cannot be an obstacle on start/end cells
    if(cell == p.start_cell || cell == p.end_cell)
      return;
    cell.classList.remove("difficult");
    cell.classList.add("obstacle");
    cell.is_obstacle = true;
    cell.is_difficult = false;
  }

  function set_cell_difficult(p, cell)
  {
    //@note: difficult cells can be on anything
    cell.classList.remove("obstacle");
    cell.classList.add("difficult");
    cell.is_difficult = true;
    cell.is_obstacle = false;
  }

  // @note: painting cell visited/considering/path should always be
  // in order of considering -> visited -> path and never in any 
  // other combination.
  // 
  // We also NEVER paint over start or end cells, 
  // but they can technically be 'considered' or 'visited'
  function set_cell_visited(p, cell)
  {
    if(cell == p.start_cell || cell == p.end_cell)
      return;
    cell.classList.remove("considering");
    cell.classList.add("visited");
  }

  function set_cell_considering(p, cell)
  {
    if(cell == p.start_cell || cell == p.end_cell)
      return;
    cell.classList.add("considering");
  }

  function set_cell_path(p, cell)
  {
    if(cell == p.start_cell || cell == p.end_cell)
      return;
    cell.classList.remove("considering");
    cell.classList.remove("visited");
    cell.classList.add("path");
  }
  
  function set_start_cell(p, cell)
  {
    if (p.start_cell !== null) 
      p.start_cell.classList.remove("start");
    set_cell_none(p, cell);
    cell.classList.add("start");
    p.start_cell = cell;
  }

  function set_end_cell(p, cell)
  {
    if (p.end_cell !== null) 
      p.end_cell.classList.remove("end");
    set_cell_none(p, cell);
    cell.classList.add("end");
    p.end_cell = cell;
  }

  function anime_update(p, duration_per_anime, prev_time, cur_time) 
  {
    console.log("hello");
    if (prev_time === 0) {
      prev_time = cur_time;
    }
    let dt = cur_time - prev_time;

    p.anime_timer += dt;

    if (p.anime_timer > duration_per_anime) 
    {
      p.anime_timer = 0;
      const current_anime = p.animes[p.anime_current_index++];
      current_anime.cb(p, current_anime.e);
      if (p.anime_current_index >= p.animes.length)
      {
        return;
      }
    }

    p.anime_handle = requestAnimationFrame( (now) => { 
      anime_update(p, duration_per_anime, cur_time, now)
    });

  }

  function anime_complete_everything_now(p) 
  {
    cancelAnimationFrame(p.anime_handle);
    p.anime_handle = 0; 
    while(p.anime_current_index < p.animes.length)
    {
      const current_anime = p.animes[p.anime_current_index++];
      current_anime.cb(p, current_anime.e);
    }
  }

  function anime_begin(p)
  {
    p.animes.length = 0;
  }

  function anime_end(p)
  {
    p.anime_timer = 0;
    p.anime_current_index = 0;
    p.anime_handle = requestAnimationFrame( (now) => anime_update(p, 10, 0, now));
  }

  function prepare_for_pathfinding(p)
  {
    for(const rows of p.cells)
    {
      for(const cells of rows)
      {
        cells.parent = null;
        cells.visited = false;
        cells.considering = false;
        cells.g_score = 0;
        cells.h_score = 0;
      }
    }
  }


  function get_cell_neighbours(p, cell)
  {
    const neighbours = [];

    // explore neighbours
    if (cell.row - 1 >= 0)
    {
      const neighbour = p.cells[cell.row-1][cell.col];
      neighbours.push(neighbour);
    }
    if (cell.col - 1 >= 0)
    {
      const neighbour = p.cells[cell.row][cell.col-1];
      neighbours.push(neighbour);
    }
    if (cell.row + 1 < p.grid_rows)
    {
      const neighbour = p.cells[cell.row+1][cell.col];
      neighbours.push(neighbour);
    }
    if (cell.col + 1 < p.grid_cols)
    {
      const neighbour = p.cells[cell.row][cell.col+1];
      neighbours.push(neighbour);
    }
    return neighbours;
  }

  function bfs(p)
  {
    anime_complete_everything_now(p);
    anime_begin(p);
    prepare_for_pathfinding(p);
    const queue = [];

    queue.push(p.start_cell);

    let found = false;


    while(queue.length !== 0 && !found) 
    {
      let current_cell = queue.shift();

      if (!current_cell.visited) 
      {
        const neighbours = get_cell_neighbours(p, current_cell);
        for (const neighbour of neighbours) 
        {
          if (neighbour.visited || neighbour.is_obstacle) 
            continue;

          neighbour.parent = current_cell

          if (neighbour == p.end_cell)
          {
            found = true;
            break;
          }

          queue.push(neighbour);
          anime_push(p, neighbour, set_cell_considering);
        }

        current_cell.visited = true;
        anime_push(p, current_cell, set_cell_visited);
      }
    }

    anime_push_path(p);
    anime_end(p);
  }


  function astar(p)
  {
    const h = function(cell, goal) {
      return Math.abs(cell.row - goal.row) + Math.abs(cell.col - goal.col); 
    }
    const f = function(cell) {
      return cell.g_score + cell.h_score;
    }

    anime_complete_everything_now(p);
    clear_path(p);
    prepare_for_pathfinding(p);
    anime_begin(p);

    const open_list = [];
    const closed_list = [];

    open_list.push(p.start_cell);
    p.start_cell.h_score = h(p.start_cell, p.end_cell);

    while(open_list.length !== 0)
    {
      // get cell with the lowest f-score
      let found_index = 0;
      let current_cell = open_list[0];
      for(let i = 0 ; i < open_list.length; ++i) 
      {
        const cell = open_list[i];
        if (f(cell) < f(current_cell)) 
        {
          found_index = i;
          break;
        }

      }
      current_cell = open_list[found_index];
      open_list.splice(found_index, 1); 

      // check if it's the end
      if (current_cell == p.end_cell) {
        break;
      }

      // count the cell as visited
      closed_list.push(current_cell);
      current_cell.visited = true;
      anime_push(p, current_cell, set_cell_visited);

      const neighbours = get_cell_neighbours(p, current_cell);
      for (const neighbour of neighbours) 
      {
        if (neighbour.visited || neighbour.is_obstacle) 
          continue;

        // cost is 10 if difficult
        const g = current_cell.g_score + ((neighbour.is_difficult) ? 10 : 1);  


        // @note: 'considering' cells should be in open_list. 
        // Doing this saves some performance; we don't have to search 
        // if the cell exists in open_list
        if (neighbour.considering) 
        {
          // if the neighbour is already in the open_list,
          // simply update the g_score and parent if g current g_score is lower
          //
          // @note: technically, we should update the h_score too but I believe
          // that since we are using manhatten distance, h_score of a cell should
          // always be the same. If we are using any other heuristics we might need
          // to consider updating the h_score!
          if(g < neighbour.g_score) {
            neighbour.g_score = g;
            neighbour.parent = current_cell
            console.log("test");
          }
        }
        else  // not considering
        {
          // initialize initial g_score and h_score and parent
          neighbour.g_score = g;
          neighbour.h_score = h(neighbour, p.end_cell);
          neighbour.parent = current_cell

          // then start considering
          neighbour.considering = true;
          open_list.push(neighbour);

          anime_push(p, neighbour, set_cell_considering);
        }
      }
    }
    anime_push_path(p);
    anime_end(p);
  }

  function dijkstra(p)
  {
    anime_complete_everything_now(p);
    clear_path(p);
    prepare_for_pathfinding(p);
    anime_begin(p);

    const open_list = [];
    const closed_list = [];

    open_list.push(p.start_cell);

    while(open_list.length !== 0)
    {
      // get cell with the lowest g-score
      let found_index = 0;
      let current_cell = open_list[0];
      for(let i = 0 ; i < open_list.length; ++i) 
      {
        const cell = open_list[i];
        if (cell.g_score < current_cell.g_score) 
        {
          found_index = i;
          break;
        }

      }
      current_cell = open_list[found_index];
      open_list.splice(found_index, 1); 

      // check if it's the end
      if (current_cell == p.end_cell) {
        break;
      }

      // count the cell as visited
      closed_list.push(current_cell);
      current_cell.visited = true;
      anime_push(p, current_cell, set_cell_visited);

      const neighbours = get_cell_neighbours(p, current_cell);
      for (const neighbour of neighbours) 
      {
        if (neighbour.visited || neighbour.is_obstacle) 
          continue;

        // calculate g score
        // cost is 10 if difficult
        const g = current_cell.g_score + ((neighbour.is_difficult) ? 10 : 1);         

        // @note: 'considering' cells should be in open_list. 
        // Doing this saves some performance; we don't have to search 
        // if the cell exists in open_list
        if (neighbour.considering) 
        {
          // if the neighbour is already in the open_list,
          // simply update the g_score and parent if g current g_score is lower
          if(g < neighbour.g_score) {
            neighbour.g_score = g;
            neighbour.parent = current_cell
          }
        }
        else  // not considering
        {
          // initialize initial g_score and parent
          neighbour.g_score = g;
          neighbour.parent = current_cell

          // then start considering
          neighbour.considering = true;
          open_list.push(neighbour);
          anime_push(p, neighbour, set_cell_considering);
        }


      }


    }


    anime_push_path(p);
    anime_end(p);
  }

  function dfs(p)
  {
    anime_complete_everything_now(p);
    clear_path(p);
    anime_begin(p);
    prepare_for_pathfinding(p);
    const stack = [];

    stack.push(p.start_cell);

    let found = false;


    while(stack.length !== 0 && !found) 
    {
      let current_cell = stack.pop();

      if (!current_cell.visited) 
      {
        const neighbours = get_cell_neighbours(p, current_cell);
        for (const neighbour of neighbours) 
        {
          if (neighbour.visited || neighbour.is_obstacle) 
            continue;

          neighbour.parent = current_cell

          if (neighbour == p.end_cell)
          {
            found = true;
            break;
          }

          stack.push(neighbour);

          anime_push(p, neighbour, set_cell_considering);
        }

        current_cell.visited = true;

        anime_push(p, current_cell, set_cell_visited);
      }
    }

    anime_push_path(p);
    anime_end(p);
  }

  function anime_push_path(p) {
    // reconstruct from the back

    // find the start
    let itr = p.end_cell;  

    // @note: it *should* reach start cell
    while(itr != null)
    {
      anime_push(p, itr, set_cell_path); 
      itr = itr.parent;
    }
  }



  function anime_push(p, element, callback)
  {
    p.animes.push({ e: element, cb: callback });
  }


  function rdivision(p) {
    //anime_complete_everything_now(p);
    clear_board(p);
    anime_begin(p);
    rrdivision(p, 0, 0, p.grid_rows-1, p.grid_cols-1);
    anime_end(p);
  }
  function rrdivision(p, sr, sc, er, ec)
  {
    // @note: the algorithm implementation is a bit scuffed.
    // Currently, walls are ALWAYS on even tiles and holes are on odd tiles.
    // The reason why we do that is that it is an easy way to make sure that
    // the walls will never block a hole.
    // Apparently this is an widely accepted technique online but ew.

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
        const cell = p.cells[i][wall_c];
        anime_push(p, cell, set_cell_obstacle);

      }
      rrdivision(p, sr, sc, er, wall_c - 1);
      rrdivision(p, sr, wall_c + 1, er, ec);

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

        const cell = p.cells[wall_r][i];
        anime_push(p, cell, set_cell_obstacle);

      }
      rrdivision(p, sr, sc, wall_r - 1, ec);
      rrdivision(p, wall_r + 1, sc, er, ec);
    }

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

  window.pathfinder = function() 
  {
    return pathfinder();
  }

})(window);

