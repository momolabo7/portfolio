---
title: "Triangle to Triangle transformation"
date: 2022-04-25T23:00:00+08:00
authors:
  - Gerald Wong
tags:
  - Documentation
---

Here's how I derive the transformation matrix for getting from triangle A to triangle B to do shadows in my 2D engine.

<!--more-->

## Introduction

Firstly, a disclaimer: I do not actually think this is the best way, but if there's a better way computationally, please let me know!

This problem came up in my recent project when I was trying to get dynamic 2D shadows into my game, which are made up of many triangles. 
Since I'm using the GPU for this, the most naive way to accomplish this is to continuously create and delete VBOs and VAOs (aka 'meshes') on the fly each frame which, by any programmer's standards, is probably not the best idea outside of prototyping.

Ideally, we want to have 1 triangle 'mesh' and simply apply a transformation to it that will, potentially, transform it to any other triangle.

## The problem in 2D
Let's first look at the problem in 2D, since this was supposed to start out out that way in the first place. 
We would basically want to find some matrix $A$ that would take 3 source points ($\dot{s0}, \dot{s1}, \dot{s2}$) that represents the source triangle $S$ into 3 destination points ($\dot{d0}, \dot{d1}, \dot{d2}$) that represents the destination triangle $ D $.
Also note that in our context, our source triangle is predefined. 
This will prove to be surprisingly useful later on.

Now that we defined our variables, let's find the transformation matrix $ A $. 
We know that $ A $ will need to fulfill the following statements:

$ A\dot{s0} = \dot{d0}$ 

$ A\dot{s1} = \dot{d1}$ 

$ A\dot{s2} = \dot{d2}$ 

It might be possible to solve this using good old simultenous equations but we can actually use matrices to figure this out. 

First, we will redefine $ S $ into a 3x3 matrix like so:

$ S = \begin{bmatrix}\dot{s0} & \dot{s1} & \dot{s2} \end{bmatrix} = \begin{bmatrix}{s0_{x}} & {s1_{x}} & {s2_{x}} \\\ {s0_{y}} & {s1_{y}} & {s2_{y}} \\\ 1 & 1 & 1 \end{bmatrix} $

Then we do the same for $ D $: 

$ D = \begin{bmatrix}\dot{d0} & \dot{d1} & \dot{d2} \end{bmatrix} = \begin{bmatrix}{d0_{x}} & {d1_{x}} & {d2_{x}} \\\ {d0_{y}} & {d1_{y}} & {d2_{y}} \\\ 1 & 1 & 1 \end{bmatrix} $

Now that we simply need to figure out $ A $:

$ AS = D $

$ ASS^{-1} = DS^{-1} $

$ A = DS^{-1} $

At the end of the day, we simply need to figure out $ S^{-1} $ (the inverse of $ S $). 
Since $ S $ is predefined, we can also precompute $ S^{-1} $! 

$ A = \begin{bmatrix}{d0_{x}} & {d1_{x}} & {d2_{x}} \\\ {d0_{y}} & {d1_{y}} & {d2_{y}} \\\ 1 & 1 & 1 \end{bmatrix} \begin{bmatrix}{s0_{x}} & {s1_{x}} & {s2_{x}} \\\ {s0_{y}} & {s1_{y}} & {s2_{y}} \\\ 1 & 1 & 1 \end{bmatrix}^{-1} $

One thing to note is that since we need to find  $ S^{-1} $, we must choose a set of points for $ S $ such that there an inverse actually exists.

## The problem in 3D

Now since most GPUs run in 3D space, we have to do the same thing but in 3D. 
This means that $ A $, $S$ and $D$ need to be 4x4 matrices instead.
That's okay for $A$, but it becomes an issue for $S$ and $D$. 

$ S = \begin{bmatrix}\dot{s0} & \dot{s1} & \dot{s2} & \dot{s3} \end{bmatrix} $

$ D = \begin{bmatrix}\dot{d0} & \dot{d1} & \dot{d2} & \dot{d3} \end{bmatrix} $

What is $\dot{s3}$ and $\dot{d3}$?
A triangle is normally defined by only 3 points.

Well, turns out that it doesn't matter as long as you choose a $\dot{s3}$ such that there exists $S^{-1}$! 
This is because all we care about is getting $A$. 
Once we do that, we can then set $\dot{d3}$ as $\dot{s3}$ and find $A$ via the same formula in 2D:

$ A = DS^{-1} $
























