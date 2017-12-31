---
title: "利用 Circle Inversion 实现 Apollonian Fractal"
categories:
  - Fractal
date:   2017-12-31 19:30:42 +0800
tags:
  - Fractal
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/apollonian/apollonian0.png"></center>
<br/>

## Circle Inversion (圆的反演变换）

反演变换是生成一类 Kleinian Group 分形的关键方法，所以这里首先简单回顾它的数学定义：

假设以$$O$$为圆心的圆半径为$$r$$， 对任意点$$P$$, 如果$$P$$不在圆心$$O$$， $$P$$的对这个圆的反演$$P'$$落在射线$$OP$$上，并且有$$(OP)(OP')=r^2$$。这个圆就称作反演圆，圆心$$O$$称作反演中心。

<center><img src="/assets/images/apollonian/invers_def.gif"></center>
<br/>

圆的反演变换又以下六个性质：

 * **一个不穿过反演中心的圆的反演是一个圆**

<center><img src="/assets/images/apollonian/c_c.gif"></center>
<br/>


 * **一个穿过反演中心的圆的反演是一条直线**


<center><img src="/assets/images/apollonian/c_l.gif"></center>
<br/>


 * **一条不穿过反演中心的直线的反演是一个穿过反演中心的圆**

<center><img src="/assets/images/apollonian/cl.png"></center>
<br/>

 * **一个垂直于反演圆的反演是它本身**

<center><img src="/assets/images/apollonian/orth.gif"></center>
<br/>

 * **一条穿过反演中心的直线的反演是它本身**

图略

 * **反演变换是保角变换**

## Apollonian Gasket

<center><img src="/assets/images/apollonian/gasket0.png"></center>
<br/>

本文利用Circle Inversion生成的 Apollonian Gasket 实际上是一个变种，Apollonian Gasket 本来的定义是从三个互相相切的圆开始，不断填入与任意三个圆相切的圆形， 但对于任何具有自相似结构，切都为相切圆的不断填充，都可以认为是属于 Apollonian 特征的一类分形。

为什么不从最经典的定义开始， 而是先尝试这个变种呢？ 是因为上图的绘制就是只利用纯粹的 Circle Inversion 迭代生成的。
从下图可以清晰地看到前3次迭代的过程：

<center><img src="/assets/images/apollonian/gasket1.png"></center>
<br/>

<center><img src="/assets/images/apollonian/gasket2.png"></center>
<br/>

<center><img src="/assets/images/apollonian/gasket3.png"></center>
<br/>

迭代的过程可以简单描述为：

1. 将任意一点$$P$$变换到$$[-1, 1]$$区间
2. 以半径为1，圆心在原点的反演圆，对点$$P$$做反演变换
3. 对变换后的点$$P'$$重复过程1，2

同样我们可以把这个过程推广到 3D 空间中， 算法不需要任何调整， 我们即可得到本文开头的 3D Apollonian 分形。

关键Code:

```
for(int i = 0; i < ITERATION; ++i)
{
   p = -1.0 + 2.0 * fract(p * 0.5 + 0.5);
   float k = 1. / dot(p,p);
   p*=k;
   scale*=k;
}
float d=0.25*abs(p.y)/scale;

```
 
 
从 3D 形式的 formation 中可能更容易看出 Circle Inversion 的过程：

<center><img src="/assets/images/apollonian/apollonian2.png"></center>
<br/>

<center><img src="/assets/images/apollonian/apollonian3.png"></center>
<br/>

<center><img src="/assets/images/apollonian/apollonian4.png"></center>
<br/>

<center><img src="/assets/images/apollonian/apollonian1.png"></center>
<br/>