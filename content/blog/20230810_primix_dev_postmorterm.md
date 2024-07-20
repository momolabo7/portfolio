
---
title: "Lit Dev Postmorterm"
date: 2023-08-29T23:00:00+08:00
nav: Blog
authors:
  - Gerald Wong
tags:
  - design
---

Alright, the game is [out on itch.io](https://momolabo.itch.io/lit) for free. 
This is the 2nd game I have made using a rewrite of the engine I used in [dots and circles](https://momolabo.itch.io/dots_and_circles).

<!--more-->

I didn't really 'market' the game much, mostly because I kind of got burnt out trying to finish the game. 
I might re-release the game once I do some changes to how the game looks, but for now, I am willing to close this project and put it behind me.

To recap what the game is about, the general idea about  is to have players shine light on sensors while matching their colors.
Light can be added and mixed to output different colors, and players can move and rotate light sources. 
At the end of the day, the players just need place the light sources and face them the right way.

Here, I'm just going to loosely go over some stuff that I have learnt in the process of making the game.

## Colors were the selling point but a big issue

In theory, you would think that I have the entire spectrum of colors at my disposal and thus it wouldn't be that much of a problem. 
I wasn't *that* foolish to think that; I knew it would pose as a problem early on.
I knew that I won't be able to play with that many colors. 
After all, players won't be able to figure out the difference between RGB(255,255,255) and RGB(254,254,254). 

What I didn't expect was how few colors I was actually comfortable putting into one level.
The colors I felt reasonable to use in one scene is: red, blue, green, yellow, magenta, cyan, grey...a total of 7. 

Of course, I can use different shades of each color but it was more limited than I initially hoped, or perhaps it is my lack of experience with colors. 
I'm generally really bad with colors.

## Just having one code naming convention is good enough 

I always had problems juggling between different naming conventions for different programming objects.
After trying every document and styles out there, I'm pretty convinced that some form of snake_case or Snake_Case is the best.
PascalCase and camelCase uses up too much of my brain juice trying to clear chains of acronyms, like WAV + ID. 
Do I do WAVID, WavId, WaveIndex...I don't know man. 
It has annoyed me for too long so I'm just going to stick to snake_case for variables and use prefixes and suffixes to identify between types, interfaces, etc. 
After changing, it has sped up my programming a lot, so I'm glad I finally found way to put naming conventions behind me.

Forever.

## Maybe I like making tools more than games?

This is the second game I have released that fully done by myself and I think I have a better idea of what I just don't like doing in the games development process.
It's odd to know that whatever I felt I would like/dislikes doing 10 years ago is still the same today. 
I would've thought that maybe because of new experiences, my perspective and likes/dislikes would change but it turns out that it is more similar that I would've expected.

That being said though, I probably need to be more specific over my likes and dislikes, because I believe that everything can be gamified; it just depends on perspective.
It is probably not fair to say that I like making websites/tools and hate making games. 
In both cases, I am still creating an experience for the user.

Maybe the problem with games is that I am creating problems for users to trudge through...and usually things are supposed to get harder and harder as I develop the game. Classically anyway.
In tools, I'm removing problems from users and things are supposed to get easier and easier for the users as I develop the tool. 
Maybe that's the difference.

Maybe I just need to make a game where things get easier and easier for users?

...Oh god suddenly I'm thinking about cookie clicker.

We'll see -_-









