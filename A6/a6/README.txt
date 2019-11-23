Name: Stella Chen
Student#: 14635700
csid: t9o1b

- main() calls rayCast();
- rayCast() calls: nearestT(), rayCast2(), localShade(), bgColor();
- rayCast() calls: nearestT(), localShade(), bgColor(); (also rayCast3() after adding new bounce)
- localShade() calls: nearestT();
- nearestT() calls: sphere_intersect()
- sphere_intersect return the smallest positive t value of the intersection of the sphere and the ray

Add a third bounce implementation: rayCast3();