---
title: "Dots and Circles Dev Postmorterm"
date: 2021-12-01T23:00:00+08:00
nav: Blog
authors:
  - Gerald Wong
tags:
  - tech
---

Alright, the game is [out on itch.io](https://momohoudai.itch.io/dots-and-circles) for free! Now that some time has passed and a handful of people have played the game, I felt that there is no better time then to jot down my experiences developing this small arcade game, lest I forget (again).

<!--more-->

Before I talk about the game, I'll share some context about the philosophy I had making this game, what this game really is about to me and why did I do this.

I had been studying and doing game development for over a decade, with 6 years in professional capacity. After releasing a few games ranging from web to console titles, I got bored of using ready-made technologies to drive my products. I became more interested in learning how the technologies themselves work, than learning how to use them. I wanted to learn how not to rely on them too much, because the lifespan and efficacy of a product can be very volatile.  On top of that, learning the fundamentals that a technology is built on also allows me to move between similar technologies and use them more effectively. 

With that understanding in my, I came across [Handmade Hero](https://handmadehero.org/). There, I saw a movement of projects that are 'handmade', meaning they use as little libraries as they can reasonably afford. Upon seeing so many inspirational projects, some of which I now use, I decided that I'll go back to my roots and code an engine and a game, with the game being the main driving force that will shape the engine. 

As you can tell by now, this is going to be a bit rant-y, but hopefully a good read for whoever is bored enough to read it. I'll go by chronological order, as much as I can remember them.

## Platform Layer

At first, I decided to use SDL2 for portability. It was working fine, but I wanted to have the hot reloading figure that Casey did in Handmade Hero for development. It's a system where the game code could be reloaded while the whole application is running. I wanted the same system where the application would be able to detect that the game's DLL is modified and reload the code, which will be really useful for iteration.

That's when I found that SDL's file IO API did not allow me to check for a file's last modified timing. I would have to use the OS's  API instead. At that point, I figured that even if I did everything using SDL, there is a good chance that it's going to be riddled with `#if` macros containing specific OS code anyway, which might end up difficult to read. That's when I decided that, in the name of education, I'm going to write the platform layer using straight Windows API. Perhaps I will use SDL for Linux systems when there are so many different components. 

Writing the platform layer straight from the OS' API was incredibly educational. I learnt the true nature of file systems, memory allocation, performance counters, windows/context management, input management and audio management that were usually hidden away from cross-platform libraries like SDL, SFML and STL. 

For example, for memory management, I previously had no idea about the concept of 'allocate' and 'commit'. It's actually insane how much these libraries hide from us.

## Graphics Programming

One of the things I quickly decided was to use OpenGL. Graphics programming was something that I really missed out in my time as a game developer. Considering what I was good at and the people I usually interact with at work, I would probably never learn it in a professional capacity. 

I initially had hopes of writing and hand-rolling a software renderer. Even though I managed to handroll one in a separate project, I decided against it because I wasn't willing to put hours in to optimize the processes. 

In OpenGL, I went straight to using Direct State Access and implementing instancing. Things turned out really well in my stress tests, where I found that I was being bottlenecked by multiple texture bindings. Although I did my best to limit the amount of binds, it did not hit my standards.

Admittedly though, my standards at that time was a little high. I think I tested for 10000 entities rendering at same time, which was way more than the 500 or so maximum objects I ended up having in the game. I was so excited by the fact that I was able to actually feel the lag time decrease that I kind of decided to deal with having either texture arrays or a spritesheets.

Since my game is 2D with no mipmapping, and because I'm more familiar with spritesheets, it was a bit of a no brainer for me to go for that. Perhaps next time, I'll take a closer look at texture arrays and their implications. 

This lead to writing a texture packer, and also dealing with the game's assets system.

## Assets System

This is the part of the game which I flip-flopped many times. It was really hard to decide on an asset system that scales, because the more you try to make it scalable, the more you might lose. For example, I could go into an asset system that loads assets on a separate thread on demand but do I really want player to play games with a missing sound or texture? 

At some point, it seems to me that the best asset system for a game would be an asset system that's really catered for the game. This was when I figured that I had to decide what game to make. Otherwise I would be stuck in this loop forever. 

### Sidetrack: Selecting the game to make

I have went through several cycles of game development and lead teams before, so trying to keep my expectations realistic wasn't too hard. I started off by having a direction, which was to have a simple game. I understand that this was a dangerous statement to make. Before veteran game developers rise their pitchforks against me, hear me out. When I said 'simple game', the emphasis was mostly on the word 'game'. This means that it must have

- A way to start 
- A way to play something repeatedly
- A way to quit

In other words, my minimum requirement was to have some kind of gameplay loop. For the actual game itself, I tried to think of the least I needed to do. 

I started a prototype a bit, and managed to get WASD working, mouse working (window-space to game space conversion), and enemies spawning. At that point, it became obvious what to make as a small proof of concept for the engine: a bullet hell game.

That's when I thought about a game I made with a friend during my freshmen years in university, a game called Dots and Circles which you could still find  in the [DigiPen Game Gallery](https://games.digipen.edu/games/dots-n-circles). It's also one of the reasons why this game is free; it's because I was too lazy to repackage the IP into something different.

Despite having a game to reference, there was still much work to be done. I wanted to draw my own sprites, compose my own music and generate my own sound effects. The direction of the game would be different too, especially since I don't have requirements to follow other than my own.

But the logic would be simple to implement. It's just processing arrays of bullets, array of particles and even array of numbers to show big scores.

### Back to the Assets System

The assets system is straightforward. What I essentially do is to have a single asset file in binary containing all the data my game needs. This asset file is generated outside the game, which means that my PNG files, WAV files, etc are all processed and translated into something that could be easily understood by my game. 

Within the game, I simple store them into a really dumb array. 

Yes. An array of textures. An array of sounds. An array of messages. All loaded when the game starts. All easily indexed by their respective enums. Yes. Enums. `IMAGE_SPLASH`, `SOUND_EXPLOSION`, `FONT_DEFAULT`...that kind of stuff. 

The problem I had was the fact that I decided to use texture atlas. Packing all the art assets into a single atlas wasn't the problem; I just wrote a tool that works like Texture Packer (which I refuse to pay a second time), which honestly wasn't that difficult once you get the algorithm down. 

The main issue I had was figuring out how to express pushing images and text when I'm programming on the game layer. It can be really unintuitive as a person programming on the game layer to pass an Image's data (which minimally contains UV) and the texture atlas that that it targets. This seems easy to solve; I just need the Image to store the handle to it's texture atlas. 

But what happens when the texture is not there?

Well, I didn't solve it in the end. I just assumed that the texture is always there. Trust me, I tried to solve it, but one hypothetical problem always lead to even more hypothetical problem and...the problems to solve just increases exponentially. After writing and deleting much code, I decided to focus on reality, and the reality is that my game will ALWAYS assume that all assets are loaded. If any of the assets fail to load, it would fail to launch anyway. 

Dealing with fonts had a similar issue.  Font Glyphs (which are the font 'Images') will have a handle to a texture atlas and a handle to the overall Font data, both of which are assumed to be loaded already. 

*By the way, font was really annoying to figure out. God bless the person who wrote this [guide](https://simoncozens.github.io/fonts-and-layout/).*

"But what happens if I want to load the game differently at some point?"

Then I'll change the system. Simple as that, really. If I had continued to solve hypothetical non-existent problems, I would not be able to complete any project. Trust me, I've been there. So I stopped, decided that it's not a problem until it's a problem, and moved on. 

Ah, the beauty of having a target game.

## Sound and Audio

I had to talk about audio because I made a few decisions that seemed harmless but was a little annoying to deal with. I decided that it would be cool that the game would 'pulse' to the beat of the background music. I also made the decision to allow users to change devices. I managed to make both work, until I found that there is a way for users to have the animations not syncing with the music. You see, the problem was that my audio was not updating when there is no device. This is because audio systems (at least, my audio system) updates differently from the rest of the game. 

The game updates based on frames, or rather, time between frames. This means that even if the CPU is fast or slow, the game will move according to what we humans know as time. 

Audio doesn't work like that, at least, my current understanding of it. All you have is a buffer to push your sound, and when the device is able, it will consume the buffer and vibrate the speakers. Without an audio device, the buffer I gave the game was (correctly) 0 in size, so it would not push anything, as if I have paused the sound. The solution I had was to just have a buffer regardless of the existence of an audio device. It's not the best fix, but it works for most cases. 

Thinking about it now, I should really look even closer into audio systems in the future for a better solution. There HAS to be a way to do time-based audio. Maybe I do not fully understand how an audio renderer work yet. It really is one of my weak points when it comes to developing games. That's what happens when you use too much of OpenAL and FMOD.

I learnt a lot from writing one myself though!

We'll definitely do better next time.

## Conclusion

The game took two years to complete. It sounds like a long time, but considering everything I learnt, I felt that it was definitely worth every minute. 

A lot of code were written. A lot of code were deleted. A lot of code was refactored, un-refactored and refactored again. Each time I refactor though, I learn enough to refine an opinion on whatever I was refactoring. This should (hopefully) make it such that that I would not refactor as much in the future. For example, I would mostly likely never refactor my vector math library again, and I would most likely never change my naming conventions again. 

And I completed a game!!! Yay!

Completing the game was the most important part of this project because it made me realize which decisions I made ultimately mattered and which doesn't. Decisions, of course, not just in the final product, but also in the development process. Hopefully, this improves my decision making for the next project, as I tackle something more ambitious. 

Also now I have *working code* that I can reference! :)

Stay tuned!

