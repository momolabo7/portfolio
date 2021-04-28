---
title: "Circle-Finite Line Collision"
date: 2021-04-28T12:00:00+08:00
authors:
  - Gerald Wong
tags:
  - Collision
---

Recently, I had to derive this particular collision detection algorithm for my bullet hell genre game. It's an interesting algorithm that can be expanded to deal with the 'moving circle vs static circle' and 'moving circle vs moving circle' problems.  

<!--more-->

(PS, maybe one day I'll use latex to make the notations easier to read)

Note that this article does not take into account collision responses; its goal is simply to check if the objects involved are colliding (but perhaps it is possible to derive the variables needed for collision response from this algorithm).

Also, a disclaimer here is that, we assume that whoever is reading the article is familiar with Linear Algebra or at least vector-related math. I won't go into details of vector-specific operators such as projection and dot product. That is hopefully for another article for another time.

## Circle-Finite Line Collision Check

We are given a line `l` denoted by points where `m` and `n` represents the start and end point of the line segment respectively. We are also given a circle which an origin at point `c` with radius `r`. Determine whether the circle is colliding with the line.

![](/img/blog_img/20210428_circle_line_collision/1.jpg)

The general idea is to find the point on the line `l` which will be the shortest distance from the line `c`. We will call this point `s`, and the shortest distance `d`. Next, we need to figure out whether this point `s` exists within our line segment. Finally, we figure out if `d` is greater than `r`. If it is not, it means that it is intersecting. For all other cases, it does not intersect. In other words:

- Find `s` and `d`.
- Check if `s` exists within our line. If it is not, we are not intersecting
- Check if `d` is greater than `r`. If it is not, we are intersecting.

![](/img/blog_img/20210428_circle_line_collision/2.jpg)

There is a small caveat we need to cover before we continue, regarding checking if `s` exists within our line. It would not cover the case illustrated below.

![](/img/blog_img/20210428_circle_line_collision/3.jpg)

Thankfully, this is conceptually easy to solve. We extend our line ends (`m` and `n`) by a factor of `r`. We update our list:

- Extend `m` and `n` by `r`
- Find `s` and `d`.
- Check if `s` exists within our line. If it is not, we are not intersecting
- Check if `d` is greater than `r`. If it is not, we are intersecting.

## Extend line segment start and end points by a factor of the circle's radius

First, we need to find the unit vector to extend `m` and `n`. First, get the vector `v` that goes from `m` to `n` by subtracting `m` from `n` :

```
v = n - m  
```

then we normalize it to get the unit vector`w`, where `|v|` is the magnitude/length of `v`:

```
w = v / |v|  
```

Since `w` is the unit vector of `v`, we simply multiply it with `r` to get the amount to translate `m` and `n` to 'extend' the line. Thus, our new `m` and `n` will be:

```
m = m - (w * r)
n = n + (w * r)
```

## Find the point that is the shortest distance from the line to the circle

For those familiar with vector arithmetic, to find the point `s`, it is simply the projection of the vector formed by `(c - m)`, which we will call `f`, onto `v` , which is `(n - m)`. I would suggest those not familiar with projection to give it a look, but the formula is simply:

```
s = (f ・ v)/(v * length(v))  
```

## Check if s is within our line

This is easier than it looks. Imaging that we have a line formed by `m + t(v)`, where `t` represents a scalar value such that if it is 0, we will get `m` and if it is 1, we will get `n`. In other words, `t` is a ratio. Also, since we already know that `s` is definitely on the line, it means that we can safely say that there exists a `t` such that:

```
m + t(v) = s
```

We can then choose any element of `v` to find `t`. Note that the element that you choose of  `s` must not be 0. I.e. if `v.x == 0`, use `v.y` etc. There won't be a case where all elements of `v` is 0 because...that wouldn't form us the line `l` anymore :

```
m.x + t(v.x) = s.x
t(v.x) = s.x - m.x
t = (s.x - m.x)/v.x
```

If `t` is lesser than 0 or greater than 1, we are not colliding. Otherwise, we go to the final section.

## Check the distance between the circle and the line

Finally, we want to find the shortest distance `d` between the circle and the line. With that, we will compare it against the radius of the circle `r`. This is simply finding the distance between `c` and `s` using our favorite Pythagoras Theorem, and comparing it against `r`.

In fact, if you do not like dealing with square roots, we can just compare the `d^2` with `r^2` 

```
cs_vec = (c - s)
d_squared = cs_vec.x * cs_vec.x + cs_vec.y + cs_vec.y
r_squared = r * r

// if d_squared < r_squared, then we have a collision!
```

## Conclusion

Now that we have this, hopefully we can expend it to deal with other problems such as moving circles against moving circles, which will be covered in another article soon.



