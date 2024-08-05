---
title: "[XLS] INDEX/MATCH tl;dr"
date: 2023-04-10T12:00:00+08:00
nav: Blog
authors:
  - Gerald Wong
tags:
  - tech
---

I was playing with Excel recently and for the hundredth time got stumped by how to use the INDEX/MATCH combo.
For the hundredth time in the past years, I open the same damn website and the same damn explanation which took awhile because my brain actually needed to work to understand what's going on. 

<!--more-->

I didn't want to understand. 
I just want it to work.
Yes, brain is smol.

So here I'm just gonna drop how to use it.
Below is table A.  

| name | letter  | score |
|------|----|---|
| ackbar   | A | ? |
| obi-wan  | B | ? |
| han solo | C | ? |

I want to find the corresponding score to the letter.

Below is table B, which holds the mapping of letter to score:

| letter  | score |
--------|--------
| A | 90 |
| B | 80 |
| C | 70 |

tl;dr, the formula to put for each row in the "score" column to get the corresponding score to the letter in the row is:

```cpp
INDEX(
  <the_table_of_mappings_at_B>, 
  MATCH(
    <the_cell_value_to_lookup_at_A>, 
    <the_column_range_to_lookup_at_B>,
    0),
  <index_of_column_from_table_of_mappings>
)
```



Hopefully I won't mess it up again.


