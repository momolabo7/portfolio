---
title: "Considering Hash Tables"
date: 2024-05-25T12:00:00+08:00
---

For a while, I've been meaning to write some kind of a hash table from scratch for my own projects. Surprisingly for my game projects so far, I had totally avoided use of hashes and managed to optimise my problems to use simple dense arrays. The closest I came to using hash tables was when I wrote my profiler which identifies entries by hardcoded strings (which I could cheat by using their addresses instead but that's another story).

<!--more-->

Recently, I have been playing around with ideas that require key lookup via strings. One example is a bot which listens to user string commands, where I would ideally store commands using strings as keys. My immediate reason was to use a hash table.

So I looked up hash table implementations. In theory I already knew what I was looking for: open vs close addressing, probing methods for open addressing, etc. My concern is the implementation details and how that compares to other methods.

The string hash by itself is an O(N) implementation (no matter that hash we use I would assume), which means that before we even find the index, we are doing a linear function. For each collision (open addressing or not), we then do a string match, which is additional O(N) per unmatched collision. Theoretically, the best case would be a straight up O(N). The worst case would be O(N^2).

The best alternative I can think of is a sorted dense array. If we use a dense array, we could hardcode the commands in a way that it's sorted, and use binary search to find the command with the key. Best case would still be O(N), but worst case is O(N log N). 

Then again, I realised that if I hash the string key into a unique integer identifier, I would avoid the linear string match for the dense array method, making the worst case O(log N) and the best case O(1). 

I COULD do the same for the hash table method too, which will reduce the complexity to the worst case of O(N) and the best case of O(1), which isn't too far off from the original differences. Oh well. 

There is also the possibility that the  worst case for hash tables might not occur as many times as the sorted array. But there is also the concern of space, and how difficult it is to find a good hash that will distribute entries cleanly...

Software engineering is hard to make simple.

