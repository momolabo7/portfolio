---
title: "Circle to Finite Line Collision"
date: 2021-07-04T12:00:00+08:00
authors:
  - Gerald Wong
tags:
  - programming
---

Recently, I had to derive this particular collision detection algorithm for my bullet hell genre game. It's an interesting algorithm that can be expanded to deal with the 'moving circle vs static circle' and 'moving circle vs moving circle' problems.  

<!--more-->

## Scenario
- We are given a line `$ l $` where `$ \dot{l_{min}} $` and `$ \dot{l_{max}} $` represents the start and end point of the line segment respectively. 

- We are also given a circle, defined by its origin at point `$ \dot{c} $` and its radius `$ r $`. 

- The goal is to determine whether the circle is colliding with the line.

![](/img/blog_img/20210428_circle_line_collision/1.jpg)

## General strategy
The general idea is to find the point on the line `$ l $` which will be the shortest distance from the origin of the circle `$ \dot{c} $`. We will call this point `$ \dot{s} $`, and the shortest distance `$ d $`. 

Next, we need to figure out whether this point `$\dot{s}$` exists within our line segment. 

Finally, we figure out if `$ d $` is greater than `$ r $`. If it is not, it means that it is intersecting. For all other cases, it does not intersect. 

In other words:
- Find `$ \dot{s} $` and `$d$`.
- Check if `$ \dot{s} $` exists within our line. If it is not, we are not intersecting.
- Check if `$d$` is greater than `$r$`. If it is not, we are intersecting.

![](/img/blog_img/20210428_circle_line_collision/2.jpg)

There is a small caveat we need to cover before we continue, regarding checking if `$ \dot{s} $` exists within our line. It would not cover the case illustrated below.

![](/img/blog_img/20210428_circle_line_collision/3.jpg)

Thankfully, this is conceptually easy to solve. We extend our line ends, `$ \dot{l_{min}} $` and `$ \dot{l_{max}} $`, by a factor of  `$r$`. We update our list:

- Extend `$ \dot{l_{min}} $` and `$ \dot{l_{max}} $` line segment end points by `$r$`
- Find `$ \dot{s} $` and `$d$`.
- Check if `$ \dot{s} $` exists within our line. If it is not, we are not intersecting
- Check if `$d$` is greater than `$r$`. If it is not, we are intersecting.

## Extend $ \dot{l_{min}} $ and $ \dot{l_{max}} $ by a factor of $ r $

First, we need to find the unit vector to extend `$ \dot{l_{min}} $` and `$ \dot{l_{max}} $`. First, get the vector `$ \vec{e} $` that goes from `$ \dot{l_{min}} $` to `$ \dot{l_{max}} $` by subtracting `$ \dot{l_{min}} $` from `$ \dot{l_{max}} $` :

$ \vec{e} = \dot{l_{max}} - \dot{l_{min}} $  

Then, we normalize it to get the unit vector `$ \hat{v} $`. We get it by dividing `$\vec{e}$` by `$|\vec{e}|$`, where `$|\vec{v}|$` is the magnitude/length of `$ \vec{e} $`:

$ \hat{v} = \dfrac{\vec{e}}{|\vec{e}|} $

Since `$\hat{e}$` is the unit vector of `$ \vec{e} $`, we simply multiply it with `$r$` to get the amount to translate `$ \dot{l_{min}} $` and `$ \dot{l_{max}} $` to 'extend' the line. Thus, our new `$ \dot{l_{min}} $` and `$ \dot{l_{max}} $` (which we will denote as `$ \dot{l_{min}'} $` and `$ \dot{l_{max}'} $`) will be:

$ \dot{l_{min}'} = \dot{l_{min}} - (\hat{e} * r) $

$ \dot{l_{max}'} = \dot{l_{max}} + (\hat{e} * r) $

![](/img/blog_img/20210428_circle_line_collision/9.jpg)

## Find the point $ \dot{s} $

For those familiar with vector arithmetic, to find the point `$ \dot{s} $`, it is simply the projection of the vector formed by `$ (\dot{c} - \dot{l_{min}}) $` onto `$ \vec{v} $`. I would suggest those not familiar with projection to give it a look. Anyway, the formula is simply:


$ \dot{s} = \dfrac{((\dot{c} - \dot{l_{min}}) ・\vec{v} }{\vec{|v|}}  *  \hat{v} + \dot{l_{min}} $

## Check if $ \dot{s} $ is between $ \dot{l_{min}} $ and $ \dot{l_{max}} $

This is easier than it looks. Imaging that we have a line formed by `$ \dot{l_{min}} + t(\vec{v}) $`, where `$t$` represents a scalar value such that if it is 0, we will get `$ \dot{l_{min}} $` and if it is 1, we will get `$ \dot{l_{max}} $`. 

In other words, `$t$` is a ratio. Also, since we already know that `$ \dot{s} $` is definitely on the line, it means that we can safely say that there exists a `$t$` such that:


$ \dot{l_{min}} + t(\vec{v}) = \dot{s} $


We can then choose any element of `$\vec{v}$` to find `$t$`. Note that the element that you choose from  `$ \vec{v} $` must not be 0. 

I.e. if `$ v_x = 0 $`, use `$ v_y $` instead, etc. There won't be a case where all elements of `$\vec{v}$` is 0 because...that wouldn't form us the line `$l$` anymore.


$ \dot{l_{min}}_x + t(v_x) = s_x $

$ t(v_x) = s_x - \dot{l_{min}}_x $

$ t = \dfrac{(s_x - \dot{l_{min}}_x)}{v_x} $


If `$t$` is lesser than 0 or greater than 1, we are not colliding. Otherwise, we go to the final section.

## Check the distance between the circle and the line

Finally, we want to find the shortest distance `$d$` between the circle and the line. With that, we will compare it against the radius of the circle `$r$`. This is simply finding the distance between `$\dot{c}$` and `$\dot{s}$` using our favorite Pythagoras Theorem, and comparing it against `$r$`.

In fact, if you do not like dealing with square roots, we can just compare the `$d^2$` with `$r^2$` 

$ d^2 = (\dot{c} - \dot{s})_x * (\dot{c} - \dot{s})_x + (\dot{c} - \dot{s})_y * (\dot{c} - \dot{s})_y $

$ r^2 = r * r $

If `$d^2$` < `$r^2$`, then we have a collision!

## Extra 1: Moving circle vs static circle

Now that we have this, we can expend this concept to deal with moving circle vs static circle. What we have visually is something like the following:

![](/img/blog_img/20210428_circle_line_collision/4.jpg)

As far as collision detection is concerned, we can simply add the moving circle's radius `$r_1$` to the static circle's radius `$r_2$` and get the diagram below:

![](/img/blog_img/20210428_circle_line_collision/5.jpg)

And we can just apply our circle and line algorithm!

## Extra 2: Moving circle vs Moving circle

Now for the last bit: What if we have two moving circles?

![](/img/blog_img/20210428_circle_line_collision/6.jpg)

Just like the algorithm we did for 'moving circle vs static circle', we try to link the problem back to collision between a circle and a line. This means that we have to make one of the circles static. 

In this case, we choose to make `$\dot{c_2}$` static. For this, we simply add the _reverse_ of it's velocity `$\vec{v_2}$` to the moving circle's velocity `$\vec{v_1}$`. It's a little unintuitive to think about especially when the circles can move at all kinds of direction (the diagram is the a simplistic example), but it is related to the idea 'relative motion'. 

![](/img/blog_img/20210428_circle_line_collision/7.jpg)

One way to think about it is to imagine that `$\dot{c_1}$` and `$\dot{c_2}$` are moving trains, and that you are on, in this case, `$\dot{c_2}$`. What you would feel, even though the train is moving, is that you are still, and when you see the train `$\dot{c_1}$` approaching, it is moving with the combined velocity of itself and the reverse of your train (i.e. it's seems to be moving a lot faster than it should).

Now that we have a moving circle and a static circle, we can simply add the moving circle's radius `$r_1$` to the static circle's radius `$r_2$`, just like what we did in 'moving circle vs static circle'!


![](/img/blog_img/20210428_circle_line_collision/8.jpg)
