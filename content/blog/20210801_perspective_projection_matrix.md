---
title: "Perspective Projection Matrix"
date: 2021-08-01T12:00:00+08:00
authors:
  - Gerald Wong
tags:
  - Math
---

I was searching around internet for a full derivation for the 3D Perspective Projection Matrix to apply to my handmade software renderer and I was surprised by how little information I could find about it. That prompted me to write this post, to document the derivation of the matrix, at least in my own eyes.

<!--more-->

![](/img/blog_img/20210801_perspective_projection_matrix/1.jpg)

I'm not going to go through the whole graphics pipeline here. For those who already understand the graphics pipeline but isn't sure how to derive the perspective projection matrix, essentially what we want is to transform whatever's within the world space's 'frustum box' in the left side into the NDC space's 'box' on the right side. 

The frustum box are defined with $l$, $r$, $t$, $b$, $n$, $f$, which represents left, right, top, bottom, near and far values of a frustum. Note that $l$, $r$, $b$, $t$​​ define the near-clip plane of the frustum to project to. Some tutorials like to use the far-clip plane and I couldn't understand why.

We are also going to assume that both the world space and NDC space are in left-hand coordinates, which means that the higher the z value, the further from origin we are. We are also going to assume that the NDC box in our case is defined with the ranges [-1, 1] for each axis. This means that `$l$` needs to map to -1, $r$ needs to map to 1, $b$​ needs to map to -1, etc. 

If, for whatever reason, your world space and NDC space are in different-handed coordinates from each other (like OpenGL-centric tutorials where world is in right-hand and NDC is in left-hand), you can't plug in my final matrix. If your NDC values are different, you can't plug in my final matrix as well. Instead you have to rederive the matrix using your values. Don't worry, the steps you have to go through is the same.

So here's the problem statement: Given a point in the world space $\dot{w} $​​, find the corresponding point in NDC space $\dot{m}$​​. 

## Find $\dot{p}$, which is $\dot{e}$​ projected onto the near clip plane 

We are start off with a cross section of the world space's frustum below.

![](/img/blog_img/20210801_perspective_projection_matrix/2.jpg)

We first must find the projected point on the near-clip plane $ \dot{p}  = \begin{bmatrix} p_x \\\ p_y \\\ p_z \end{bmatrix}$​​​. 

$ p_z $ is trivial and simply $ n $.

Through the ratio of similar triangles, we can observe that:

$ \dfrac{p_y}{w_y} = \dfrac{n}{w_z} $​​


Thus $ p_y = \dfrac{n \cdot w_y }{w_z}$​

Deriving $ p_x $​ will be similar.  

$ p_x = \dfrac{n \cdot w_x }{w_z}$​

Putting it all together: 

$ \dot{p}  = \begin{bmatrix} \dfrac{n \cdot w_x }{w_z} \\\  \dfrac{n \cdot w_y }{w_z} \\\ n\end{bmatrix}$​​​​​​.

From here, we will focus on trying to get $\dot{m}$, which is $\dot{w}$ in mapped into NDC space. We will first solve for $m_x$ and $m_y$. Doing this is a simple scale and translation. The translation is in case $[l, r]$ or $[t, b]$ are not symmetrical. For example, when $l = -100$ and  $r = 150$. If they are symmetrical, say  $l = -100$ and  $r = 100$, then you can ignore the translation step.

$m_x = \dfrac{1 - (-1)}{r - l} \cdot p_x + A$​​  _(where $A$​​​​ is the translation)_

$m_x = \dfrac{2}{r - l} \cdot p_x + A$​​​ 

Solve for $A$ by substituting $p_x = r$ and $m_x = 1$ (you can do $p_x = l$ and $m_x = -1$). Basically we already know these values at certain points on the plane and since the points are all linearly related, the $A$ for $p_x = r$ and $m_x = 1$ can be used for all $p_x$ and $m_x$.

$1 = \dfrac{2r}{r-l} + A$

$A = 1 - \dfrac{2r}{r-l} $

$A = \dfrac{r-l}{r-1} - \dfrac{2r}{r-l} $

$A = \dfrac{r-l-2r}{r-1}$

$A = \dfrac{-l-r}{r-1}$

$A = -\dfrac{r+l}{r-1}$

Going back to solving $m_x$​​, we substitute $A$​ and $p_x$​​​ to get:

$m_x = \dfrac{2}{r - l} p_x + A$

$m_x = \dfrac{2}{r - l} \cdot \dfrac{n \cdot w_x }{w_z} -\dfrac{r+l}{r-1} $

$m_x = \dfrac{2nw_x}{(r - l)(w_z)} -\dfrac{(r+l)(w_z)}{(r-1)(w_z)} $​​​

$m_x = \dfrac{2n}{(r - l)(w_z)} \cdot w_x -\dfrac{r+l}{(r-1)(w_z)} \cdot w_z $​

$m_x = \dfrac{\dfrac{2n}{r - l} \cdot w_x -\dfrac{r+l}{r-1} \cdot w_z}{w_z} $​​

$m_y$ would be the same, but with $w_y$, $b$ and $t$ instead.

$m_y = \dfrac{\dfrac{2n}{t - b} \cdot w_y -\dfrac{t+b}{t-b} \cdot w_z}{w_z} $​​

We will need it in this form to form the matrix. 

## Bringing out the matrix

At this point, we have to consider putting some of our formula into a matrix, because then, we can concatenate other transforms together. (This means that if you are not using matrices to do your transforms, then you can directly apply the formulas individually and ignore this section). So we want something like this:

$ \begin{bmatrix}? & ? & ? \\\ ? & ? & ? \\\ ? & ? & ? \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \end{bmatrix} = \begin{bmatrix} m_x  \\\ m_y   \\\ m_z \end{bmatrix}$ 

Unfortunately, we can't express our current form of $m_x$ and $m_y$​ into this form. There is no way to represent the division by $w_z$​ in matrix form. What we do to solve this is essentially a _hack_. We will store the $w_z$ somewhere else, then we will divide all values by it **after** we apply the matrix. This step is known as the **perspective divide**. Where do we store $w_z$? Well, we will add a new dimension to $\dot{m}$ and store it under $m_w$. This means that we now have this:

$ \begin{bmatrix}? &?& ?& ? \\\ ?& ?& ?& ? \\\ ? &? &? &? \\\ ? &?& ?& ? \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \begin{bmatrix} m_x  \\\ m_y   \\\ m_z \\\ m_w \end{bmatrix}$ 

Wait, doesn't this mean that $\dot{m}$​ is no longer in NDC space? Good point. To keep things consistent from here on out, we will retain that $\dot{m}$​​​ is still in NDC space, which is the space **after** perspective divide. We will call the space **before** the perspective as 'clip space'. We will call the point $\dot{w}$​ transformed into clip space $\dot{c}$​. We rewrite our equation:

$\begin{bmatrix}? &?& ?& ? \\\ ?& ?& ?& ? \\\ ? &? &? &? \\\ ? &?& ?& ? \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \dot{c} = \begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}$​​ 

and when $\dot{c}$​ is divided by $c_w$​, you will get $\dot{m}$​ .

$\begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}/c_w = \begin{bmatrix} m_x  \\\ m_y   \\\ m_z \\\ 1\end{bmatrix}$

Note that $m_w$ after the perspective divide step is now $1$​.

Also note that this works perfectly with affine transformations (like translation) because it is 4x4. That is, it fits perfectly with our scale/rotation/translation matrices that we do before applying this matrix. Below is an example of scaling, and translating a point before applying our perspective projection matrix.

$ \begin{bmatrix}?& ? &? &? \\\ ?& ? &?& ? \\\ ?& ?& ? &? \\\ ? &? &?& ? \end{bmatrix}\begin{bmatrix}1 &0 &0 & t_x \\\ 0& 1& 0 &t_y \\\ 0& 0& 1& t_z \\\ 0& 0& 0& 1 \end{bmatrix} \begin{bmatrix}s_x &0 &0 & 0 \\\ 0& s_y& 0 &0 \\\ 0& 0& s_z& 0 \\\ 0& 0& 0& 1 \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}$​ 

How lucky can a hack get!

Well, now we have to find our values for our matrix. We will first make it such that we store $w_z$ into $m_w$​

$ \begin{bmatrix}? &?& ?& ? \\\ ?& ?& ?& ? \\\ ? &? &? &? \\\ 0 &0& 1& 0 \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}$​​ 

Since we are going to do **perspective divide**, i.e. $c_x$​​​​​​, $c_y$​​​​​​, $c_z$​​​​​​, is going to be divided by $c_w$​​​​​​ (which is going to be $w_z$​​​​​​), we can ignore all division by $w_z$​​​​​​. Thus, our $c_x$​​​​​​ and $c_y$​​​​​ now looks like this:

$c_x = \dfrac{2n}{r - l} \cdot w_x -\dfrac{r+l}{r-1} \cdot w_z $​​​​

$c_y = \dfrac{2n}{t - b} \cdot w_y -\dfrac{t+b}{t-b} \cdot w_z $​

These can be expressed in our matrix:

$ \begin{bmatrix}\dfrac{2n}{r - l} & 0 & -\dfrac{r+l}{r-1} & 0 \\\ 0& \dfrac{2n}{t - b}& -\dfrac{t+b}{t-b}& 0 \\\ ? &? &? &? \\\ 0 &0& 1& 0 \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}$​​ 

Nice, have 4 more values to go!

## What about $c_z$​​​?

$c_z$​​ is going to be a little different. We can't use the method we used for $c_x$​​ and $c_y$​​ because we are projecting $\dot{w}$​​ onto the near-clip plane. Projecting any $w_z$​​ into the near clip plan results in $n$​​ itself. We kind of want to keep $w_z$​​ so that we can identify the depth value of each point.

How about we keep the $w_z$ value and set it to $c_z$? 

The problem with that is the **perspective divide**. When we set $c_z$​​ = $w_z$​​, after the perspective divide, we are going to end up with $w_z/w_z = 1$​​! 

So the question is: is there a way to set $c_z$​​ such that after perspective divide, we will still retain some information of the z-values of each point in $\dot{m}$​​? It's even better if we can reverse the perspective divide from $\dot{m}$​ to get back $\dot{c}$​​​, in order to do clipping. 

Consider that $m_z$ can be written like this:

$ m_z = \dfrac{c_z}{w_z}$​​  

We can write this in terms of $c_z$, since that's the variable we are interested in:

$ c_z = m_z w_z  $​

We look at our matrix again:

$ \begin{bmatrix}\dfrac{2n}{r - l} & 0 & -\dfrac{r+l}{r-1} & 0 \\\ 0& \dfrac{2n}{t - b}& -\dfrac{t+b}{t-b}& 0 \\\ A & B & C & D \\\ 0 &0& 1& 0 \end{bmatrix} \begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}$​​​​   

Combining the equations above, this means that:

$ Aw_x + Bw_y + Cw_z + D = c_z = m_z w_z$

We can set $A$​​​ and $B$​​​ to $0$​ because we can determine that $w_x$​ and $w_y$​ should not have any effect on $m_z$​​​​. 

This means that we only need to find $C$​ and $D$​ such that:

$m_z w_z = c_z = Cw_z + D$​​

We can then plug in our known values $n$​ and $f$​ into $w_z$​. 

We also know that when $w_z = n$, $m_z = w_z^2 = -1$.  Likewise for $w_z = f$, $m_z = w_z^2 = 1$. This is similar to us trying to map $l$ to -1, $r$ to 1, $b$ to -1, etc. This is simply adding constraints to the quadratic equation, in order for the curve will line up such that $C$ and $D$ the same when $w_z = n$ and $w_z = f$.

We then get the following two equations, and we then solve for $C$​​​ and $D$​​​​. 

$Cn + D = (-1)(n)$​​​​​​

$Cf + D = (1)(f)$​​​​​​​ 

Express $C$ in terms of $n$

$Cn = -n - D$​​

$C = \dfrac{-n - D}{n}$​​ 

Substitute the $C$​​ in terms of $n$​​ into the formula for expressed in $f$​​ and find $D$​

$ \dfrac{-n - D}{n}f + D = f $​

$ \dfrac{-fn - fD}{n} + \dfrac{Dn}{n} = f $

$ -fn - fD + Dn = fn $

$ -fD + Dn = fn + fn$​

$ D(-f + n) = 2fn$

$ D = \dfrac{2fn}{-f + n}$

$ D = \dfrac{2fn}{-f + n}$

$ D = -\dfrac{2fn}{f - n}$

Then substitute this back into the formula expressed in $n$ to find $C$

$Cn -\dfrac{2fn}{f - n} = -n$​

$Cn = -n + \dfrac{2fn}{f-n}$​​

$C = -1 + \dfrac{2f}{f - n}$​

$C = -\dfrac{f-n}{f-n} + \dfrac{2f}{f-n}$​​​

$C = \dfrac{-f+n}{f-n} + \dfrac{2f}{f-n}$

$C = \dfrac{-f+n + 2f}{f-n}$​

$C = \dfrac{f+n}{f-n}$​

Plus $C$ and $D$ into our matrix and we are done!

$ \begin{bmatrix}\dfrac{2n}{r - l} & 0 & -\dfrac{r+l}{r-1} & 0 \\\ 0& \dfrac{2n}{t - b}& -\dfrac{t+b}{t-b}& 0 \\\ 0 & 0 & \dfrac{f+n}{f-n} & -\dfrac{2fn}{f - n} \\\ 0 &0& 1& 0 \end{bmatrix}\begin{bmatrix} w_x  \\\ w_y   \\\ w_z \\\ 1 \end{bmatrix} = \begin{bmatrix} c_x  \\\ c_y   \\\ c_z \\\ c_w \end{bmatrix}$

One thing to note is that there is an interesting side effect when $w_z$​​​ is mapped to $c_z$​​. The mapping itself is non-linear, unlike what we did with $w_x$​​ and $w_y$​​​. If you plug in values for $w_z$​, you will notice that the corresponding $c_z$​ would look something like this:

![](/img/blog_img/20210801_perspective_projection_matrix/3.jpg)

Notice that it's a curve. This has an interesting effect. It means that points nearer to the near-clip-plane will have better precision than pointers nearer to the far clip plane. This is important to note only because of floating point precision issues: faces nearer to the far-clip plane will end up with a higher chance of z-fighting. 

