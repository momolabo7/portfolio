---
title: "Overlay Pixel Shader Transforms"
date: 2023-12-12T12:00:00+08:00
---

This post is just to document for my own reference the math that went behind the transformations (scale, rotate, translate) of the overlay pixel shader I wrote for Reshade [here](https://github.com/momohoudai/momo_reshade).
It turns out that it was a little more tricky than I initially expected.

<!--more-->

The main point of this pixel shader is to allow users to freely place a texture on the screen.
The idea is that this shade will eventually expand to allow blend modes, and then hopefully we can start using it like layers in Photoshop. 

(I honestly have no idea if it's worth doing this, but hey, this is mostly for my education too because I have not written pixel shaders and to me it's a lacking part of my experience as a programmer that I want to fill for the longest time).

# Understanding the parameters

The first thing is to understand what parameters I have avaliable to me. 
Since this is the pixel shader, the main things given to me are:

* Screen buffer width in pixels.
* Screen buffer height in pixels.
* Current UV coordinate that indicates the current pixel that is going through the shader.
* A way to sample the overlay texture given a UV. 

The input parameters I have for the users are:

* Width of the overlay in pixels
* Height of the overlay in pixels
* X position of the overlay in pixels
* Y position of the overlay in pixels
* Rotation of the overlay in degrees.

This means that the user can just say "I want the a texture that is 100x100 px, at x = 100, y = 200, and rotated 90 degrees".

Seems like a trivial problem in any frontend work. 
You'd usually apply a scale * rotation * translation matrix on all the vertices of your object (sprite, mesh or otherwise) and it will just work. 

Except that I don't have my object or its vertices. 
Those don't exist anywhere in the pixel shader.

Basically, for each pixel on the screen buffer, I have to find the corresponding UV to sample out a color from the overlay texture.

We'll first define the screen buffer's UV given to us in the pixel shader as follows:

$ \vec{b} = \begin{bmatrix} s_u \\\ s_v \\\ 1 \end{bmatrix} $ 

As a recap, UV coordinates are normalized coordinates of a texture, with it's origin usually at the top left. U represents the value on the X axis going towards the right while V represents the value on the Y going downwards.

```cpp
(0,0)
    -------- 
    |      |
    |      |
    |      |
    |      |
    --------
          (1,1)

```

The aim of the transformation matrices we are doing to form will the current UV coordinates of the screen buffer and some how map it to the corresponding UV coordinates of the overlay texture.


# Scale

Scale is interesting but straightforward. 
The first thing to understand is that if we simply double the screen buffer $ \vec{b} $ and use the resultant UV to sample our overlay's texture, it will cover the upperleft quadrant of the screen. 


```cpp
(0,0)
    -------- 
    |xxx   |
    |xxx   |
    |      |
    |      |
    --------
          (1,1)

// where 'x' is the part covered by the overlay
```

Intuitively you would think that halving would produce this result instead of doubling, but if you consider how UV works, you will realize that the opposite is actually true. 

As an example, let's say we are at the halfway mark of the screen buffer, at 0.5 (It doesn't matter whether we are talking about width or height; the same concept can be applied to both).
At 0.5 of the screen buffer, the parts of the overlay's texture we want to sample are the ends of the overlay. 
That is, when the UV we get from the screen buffer is at:

$ \vec{b} = \begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix}  $ 

Then we want to sample the overlay's texture's UV at:

$ \vec{o} = \begin{bmatrix} 1 \\\  1 \\\ 1 \end{bmatrix} $ 

With that in mind, we can simply derive the the matrix that transform $ \vec{b} $ to $ \vec{o} $.
All we have to do is to figure out the function f() such that:

$ 
S\vec{b} = 
\begin{bmatrix} f(s_x) & 0 & 0 \\\ 0 & f(s_y) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 1 \\\  1 \\\ 1 \end{bmatrix}
$

That is, given 0.5 as input for $ s_x $ and $ s_y $, figure out:

$ 
S\vec{b} = 
\begin{bmatrix} f(0.5) & 0 & 0 \\\ 0 & f(0.5) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 1 \\\  1 \\\ 1 \end{bmatrix}
$

Turn out this is simply:

$ 
S\vec{b} = 
\begin{bmatrix} 1/0.5 & 0 & 0 \\\ 0 & 1/0.5 & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 1 \\\  1 \\\ 1     \end{bmatrix}
$

And thus our final scale matrix is:

$ 
S\vec{b} = 
\begin{bmatrix} 1/s_x & 0 & 0 \\\ 0 & 1/s_y & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 1 \\\  1 \\\ 1 \end{bmatrix}
$


Thus if we want the overlay to be half the screen's width and height such that it's covering a quarter of the screen, both $ s_x $ and $ s_y $  would need to be 0.5 (representing half), which will in turn evaluate to 2, which is what we want!
Kind of counter intuitive since suddenly this looks like an inverse scale matrix instead of the normal scale matrix, but the math does check out!

# Translation

The next matrix is one that 'moves' the overlay.
Assuming that the overlay start from origin like so: 


```cpp
(0,0)
    -------- 
    |xxx   |
    |xxx   |
    |      |
    |      |
    --------
          (1,1)
```

Let's say we want to shift the overlay such that it start from the center, which would give us this:

```cpp
(0,0)
    -------- 
    |      |
    |      |
    |   xxx|
    |   xxx|
    --------
          (1,1)
```

This means that when the given screen buffer UV is: 

$ \vec{b} = \begin{bmatrix} 0.5 \\\ 0.5 \\\  1 \end{bmatrix} $

we want to sample the overlay's UV at:

$ \vec{o} = \begin{bmatrix} 0 \\\ 0 \\\  1 \end{bmatrix} $

This is looks like just a trival translation, but what's interesting is that, like the scale matrix, we end up needing to do a reverse translation matrix.

Similar to the scale matrix example above, we want to find the translation matrix that does this:

$ 
T\vec{b} = 
\begin{bmatrix} 1 & 0 & f(t_x) \\\ 0 & 1 & f(t_y) \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 0 \\\  0 \\\ 1 \end{bmatrix}
$

Let's try by substituting the values we have for $ t_x $ and $ t_y $:

$ 
T\vec{b} = 
\begin{bmatrix} 1 & 0 & f(0.5) \\\ 0 & 1 & f(0.5) \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 0 \\\  0 \\\ 1 \end{bmatrix}
$

We can then figure out f() and find our translation matrix:

$ 
T\vec{b} = 
\begin{bmatrix} 0 & 0 & -0.5 \\\ 0 & 0 & -0.5 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 0 \\\  0 \\\ 1     \end{bmatrix}
$

Which bring us to our final matrix:

$ 
T\vec{b} = 
\begin{bmatrix} 0 & 0 & -t_x \\\ 0 & 0 & -t_y \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} 0.5 \\\ 0.5 \\\ 1  \end{bmatrix} =
\begin{bmatrix} 0 \\\  0 \\\ 1     \end{bmatrix}
$

# Rotation

Rotation was really weird to figure out.
Let's think about rotation for a bit.
When we rotate, say, an image regularly 90 degrees, the aspect ratio actually changes. 

So say we want to rotate and objects that's 4:2 like this:

```cpp
xxxx
yyyy
```

Once rotated, the aspect ratio will naturally change because...well it rotated!

```cpp
xy
xy
xy
xy
```

This is happens when we apply our standard rotation matrix onto our overlay as if it's a quad:

$
R(\theta) = \begin{bmatrix} cos(\theta) & -sin(\theta) & 0 \\\ sin(\theta) & cos(\theta) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
$

This rotational behaviour, however, does not apply to UVs. 
If you have a 3:2 texture with it's UV rotated, it will still be 3:2!
So basically if we rotate a texture's UV by 90 degrees, we will get something like this:

```cpp
xxyy
xxyy
```

Okay the ascii drawing above doesn't paint the full picture.
Imagine that after rotating, not only is the image rotated, it is squished and stretched to fill the original image's width and height!

This means that not only do we have to rotate, we have to do some kind of scaling as well. 
At 0, and 180 degrees, we want to maintain the original aspect ratio, but at 90 and 270, it should be the scaled such that the aspect ratio reverses! 
That is, at 0 degrees, if we were at 4:2 ratio, then at 90 degrees, we need to apply a scale such that it becomes 2:4.
(In between degrees will need to scale accordingly too of course).

First, let's solve the rotation part.
Thankfully, we could make use of how the rotation matrix work. 
Remember how cosine and sine works. 
For our example, we need to know that:

$ cos(0) $ -> 1, $ cos(90) $ -> 0

$ sin(0) $ -> 0, $ sin(90) $ -> 1

Next, observe what happens when we multiply the standard counter-clockwise rotation matrix to a UV point:

$ 
R(\theta)\vec{b} = 
\begin{bmatrix} cos(\theta) & -sin(\theta) & 0 \\\ sin(\theta) & cos(\theta) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} x \\\ y \\\ 1 \end{bmatrix} =
\begin{bmatrix} x cos(\theta) - y sin(\theta) \\\ x sin(\theta) + y cos(\theta) \\\ 1 \end{bmatrix}
$

At 0 degrees, this would be:

$ 
R(0)\vec{b} = 
\begin{bmatrix} x cos(0) - y sin(0) \\\ x sin(0) + y cos(0) \\\ 1 \end{bmatrix} = 
\begin{bmatrix} x \\\ y \\\ 1 \end{bmatrix}
$

Obviously nothing changed. 
How about 180 degrees?

$ 
R(180)\vec{b} = 
\begin{bmatrix} x cos(180) - y sin(180) \\\ x sin(180) + y cos(180) \\\ 1 \end{bmatrix} = 
\begin{bmatrix} -x \\\ -y \\\ 1 \end{bmatrix}
$

This is correct; the UV will be flipped only on the x and y axis.
Note that we are rotating about the origin so it does go offscreen, so we would need to do some translation to get to back onscreen. 
That part's trivial; we simply concatenate a translation matrix after this rotation matrix.
For now, we focus on the **direction** the UVs are traversing for the overlay.

Next, let's look at 90 degrees:

$ 
R(90)\vec{b} = 
\begin{bmatrix} x cos(90) - y sin(90) \\\ x sin(90) + y cos(90) \\\ 1 \end{bmatrix} = 
\begin{bmatrix} -y \\\ x \\\ 1 \end{bmatrix}
$

This means that as we move along top-left to the bottom-right of the screen, we sample the overlay starting from the top-right to the bottom-left.

This is correct in the sense that we managed to rotate the overlay. 
However, we still have the issue of scaling.
It is bound to the original aspect ratio, so what we end up is the overlay being squished on the y-axis and stretched on the x-axis (at least, in the case where the width is greater than the height).

Remember that when we rotate the overlay

The solution is simple in concept: We need to scale such that we flip the aspect ratio when we rotate 90 degrees (and 270 degrees), and not flip when it's 0 degrees (and 180 degrees).
In a way, if we can solve the matrix to work for both 0 and 90 degrees, it should work for any other intermediary angle (spoiler: it does, can you varify with all other degrees of rotation).

Basically, what we want is that when it's 0 or 180 degree, we don't want it scaled in any particular way:

$
R(0)\vec{b} = 
\begin{bmatrix} ?cos(0) & -?sin(0) & 0 \\\ ?sin(0) & ?cos(0) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} x \\\ y \\\ 1 \end{bmatrix} =
\begin{bmatrix} x \\\ y \\\ 1 \end{bmatrix}
$

But when it's 90 degrees it needs to be:

$
R(90)\vec{b} = 
\begin{bmatrix} ?cos(90) & -?sin(90) & 0 \\\ ?sin(90) & ?cos(90) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} x \\\ y \\\ 1 \end{bmatrix} =
\begin{bmatrix} -yb_h / b_w \\\ xb_w/b_h  \\\ 1 \end{bmatrix}
$

Note that we are scaling by the screen buffer's aspect ratio, NOT the overlay's! 
This is because we are transforming the screen buffer's UV.

Because of how sine and cosine work, we can actually use their properties to create some sort of a conditional effect! 
For example, let's say we multiple $ x $ by $ cos(\theta) $ and $ y $ by $ sin(\theta) $, when $\theta$ is 0, we get $ x $ and when $\theta$ is 1, we get $ y $!

With that in mind, we can solve for our new matrix $ R(\theta) $:

$
R(\theta)\vec{b} = 
\begin{bmatrix} cos(\theta) & -b_hsin(\theta)/b_w & 0 \\\ b_wsin(\theta)/b_h & cos(\theta) & 0 \\\ 0 & 0 & 1 \end{bmatrix} 
\begin{bmatrix} x \\\ y \\\ 1 \end{bmatrix} =
\begin{bmatrix} x cos(\theta) - yb_hsin(\theta)/b_w \\\ xb_wsin(\theta)/b_h + y cos(\theta) \\\ 1 \end{bmatrix}
$

And that's it! 











