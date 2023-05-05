---
title: "Going from Markdown to Asciidoc"
date: 2023-04-22T14:44:00+08:00
authors:
  - Gerald Wong
tags:
  - programming
---

Here I'll pin down my thought process of changing my work's documentations from Markdown to Asciidoc. 
I have been switching endlessly back and forth between them and it's getting really annoying because I just want to do my work at some point.
Hopefully after writing this, I will never look back until maybe 5 years later.

<!--more-->

Moving to a different tool is always a tricky affair. 
There's never a perfect tool, because needs are always specific.
As a disclaimer, note that these documentations are for:

- Students taking my modules.
- Co-lecturers working with me.

So in this context, I would like a tool that can:

- Seperate content from looks of the document. This is so that I can concentrate on typing what I want without worrying about the looks.
- Easy, straightforward way to customize the look of the document. Preferbly with a single file. 
- Fast live preview when I am concerned about the looks of the document.
- Sensible markup language to write the content that is mostly human-readable.
- Exports to PDF and HTML.
  - PDF must have a sensible way to add page breaks.
  - HTML must be responsive and cater to all kinds of aspect ratio.
  - HTML must be able to support table of contents at the side for widescreen aspects.
  - Both must have automatic table of contents.

(Note that I have already ran away from MS Word for various reasons which I do not want to cover here).

I really want to like Markdown, but at this moment of writing, it's tooling feels disappointing. 
The best software I had so far is undoubtedly Typora, which caters to most of my needs.
The problem with Typora is that it's paid. 
While I did happily pay for it, it can be difficult and boarderline unreasonable for me to convince or force others who are collaborating with me to use Typora.

MarkText is the next best tool I found. 
It is actually really good at this time of writing, as compared to the first time I tried it. 
However, it is full of small annoying bugs, like not being able to highlight cpp snippets well. 
Still, it's great to see MarkText stepping up to keep up with Typora.

Looking through these tools made me realize a serious issue with Markdown.
All the tools I tried: Typora, Markdown, even Obsidian, VSCode and Pandoc, will at some point require some kind of non-standard (aka tool specific) 'macro' to be injected into my content. 
This means that some syntax that works for Typora might not work in say Pandoc. 

The issue that everyone had with Markdown then became clear to me: everyone have their own dialect of Markdown. 
It's probably because Markdown isn't robust enough as a language to achieve the more interesting ways to write documentation. 
This might be okay if we are always sticking to one tool forever, but for this specific kind of documentation where I want to keep my output flexible, it is a dealbreaker. 

Luckily there is Asciidoc and Asciidoctor.
After looking at its syntax and tooling, however, I am both surprised and disappointed that it isn't more popular.
Asciidoc seemed to have it more correct than Markdown: embed and standardize what you need to write documentation within the language itself.

I hope that the documentation writing space improves in the direction of Asciidoc.
We should really move away from Markdown and it's gazillion dialects.












