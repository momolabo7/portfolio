

(function(window) {
  'use strict';

  function make_table_sortable(table)
  {
    // assumes that the element is a well-formed table.
    const headers = table.querySelectorAll('th');
    const body = table.querySelectorAll('tbody')[0]; 

    let currently_sorted_column_index = null;
    let currently_sorted_direction = 0; 

    for (let header_index = 0; header_index < headers.length; ++header_index)
    {
      const header = headers[header_index];
      header.style.cursor = 'pointer';

      header.addEventListener('click', () => {
        if(currently_sorted_column_index == header_index)
        {
          if (currently_sorted_direction == 0)
            currently_sorted_direction = 1;
          else 
            currently_sorted_direction = 0;
        }
        currently_sorted_column_index = header_index;

        // grab all rows
        const rows = Array.from(body.querySelectorAll('tr'));

        const first_row = rows[1];

        let data_type = 0; // 0 is string, 1 is number
        {
          const first_cell = first_row.querySelectorAll('td')[header_index];
          const first_cell_content = first_cell.textContent.trim();
          if (first_cell_content !== '' && !isNaN(parseFloat(first_cell_content)) && isFinite(first_cell_content))
          {
            data_type = 1;
          }
        }

        // sort the rows
        const sorted_rows = rows.sort((lhs_row, rhs_row) => 
          {
            // lhs and rhs are single rows
            // we sort them based on the chosen column we are interested inl
            const lhs_cell = lhs_row.querySelectorAll('td')[header_index].textContent.trim();
            const rhs_cell = rhs_row.querySelectorAll('td')[header_index].textContent.trim();

            let lhs_parsed_value;
            let rhs_parsed_value;
            if (data_type == 0) // string
            {
              lhs_parsed_value = lhs_cell.toLowerCase();
              rhs_parsed_value = rhs_cell.toLowerCase();
            }
            else if (data_type == 1) //number
            {
              lhs_parsed_value = parseFloat(lhs_cell);
              rhs_parsed_value = parseFloat(rhs_cell);
            }

            if (lhs_parsed_value < rhs_parsed_value)
            {
              return currently_sorted_direction == 0 ? 1 : -1;
            }
            else if (lhs_parsed_value > rhs_parsed_value)
            {
              return currently_sorted_direction == 0 ? -1 : 1;
            }
            else 
            {
              return 0;
            }

          });

        // update all headers's up down arrow
        for (let i = 0; i < headers.length; ++i) {
          const h = headers[i];
          let text = h.textContent.replace(/ [▲▼]$/, ''); 
          if (i == header_index) {
            text += (currently_sorted_direction == 0) ? ' ▲' : ' ▼';
          }
          h.textContent = text;
        }
        // remove all row
        while(body.firstChild) 
          body.removeChild(body.firstChild);

        // re-add all rows
        for(let row_index = 0; row_index < sorted_rows.length; ++row_index)
        {
          body.appendChild(sorted_rows[row_index]);
        }
      });


    }
  }
  window.make_table_sortable = make_table_sortable;

})(window);
