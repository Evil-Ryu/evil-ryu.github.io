---
title: "Mandelbrot Set 的平滑绘制"
categories:
  - Fractal
date:   2018-01-01 17:40:42 +0800
tags:
  - Fractal
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/mandelbrot/mb0.png"></center>
<br/>


## Mandelbrot Set
定义：

对于复平面上任意一点$$c$$，如果在 orbit 从0开始的二次映射 


$$z_{n+1} = {z_{n}}^2 + c$$ 

下 $$z$$ 值永远小于等于$$2$$，那么这个点属于 Mandelbrot Set。

根据定义，我们就可以对平面上所有像素计算这个迭代，从而得到每个像素是否属于Mandelbrot Set.

注：这里定义中所谓的 orbit 表示迭代过程中点的轨迹，每次迭代计算得到的结果，即为 orbit 中的一点。很容易计算得到，Mandelbrot Set 的 orbit 是 


$${ 0, c, c^2 + c, ... }$$

## The Rendering
Mandelbrot Set 的绘制可以非常简单，既然可以判断平面上每个像素是否属于Mandelbrot Set，那么我们把属于的设为黑色，不属于的设为白色，就是最简单的 Boolean/Binay Escape Time Method。


```
bool bet = true;
for(int i=0;i<ITERATION;i++){ 
	 if(dot(z,z)>escape_radius * escape_radius)
	 {
	 		bet = false;
	 		break; 
	 }
	 z=vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + p; 
} 

color = boolean_to_color(bet);
```

<center><img src="/assets/images/mandelbrot/boolean.png"></center>
<br/>

当然从美学角度我们肯定不想止步于此，因为在迭代计算过程中，其实还有不少信息我们可以利用，比如，迭代的次数。
虽然在MandelBrot Set内部的点，无论经过多少次迭代，都不会发散出去，我们可以认为它们的迭代次数都是相同的，但是对于不属于 MandelBrot Set 的点，它们跳出 MandelBrot Set 时所经历的迭代次数则各不相同。我们把这个迭代次数，称之为 Escape Time。

### Escape Time Method
首先我们设$$B$$为 Escape Radius， 也就是对平面上任意一点，经过 N 次迭代之后，此点离坐标原点的距离超过这个 Escape Radius 时，也就是$$|z_n| > B$$, 这个点即被判定为不属于 Mandelbrot Set， 由之前的定义我们知道在数学上这个 Escape Radius = 2， 但是对于绘制而言，我们不想被限制为只在半径为2的区域内填以颜色， 所以我们可以把这个 Radius 设置为更大的值，比如 32， 这样可以为屏幕上更多像素计算出一个有意义的 Escape Time。
于是，我们不再使用一个二元的 Boolean 来 map 到颜色， 而是使用每个像素的迭代次数， 于是我们可以得到这样的结果：

<center><img src="/assets/images/mandelbrot/non_smooth.png"></center>
<br/>


```
float counter = 0.0;
for(int i=0;i<ITERATION;i++){ 
	 if(dot(z,z)>escape_radius * escape_radius)	 		break; 
	 z=vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + p; 
	 counter+=1.;
} 

color = iteration_to_color(counter);
```

可以看到 Mandelbrot Set 的 Boundary 变得更加清晰平滑，但是以外的部分却出现了类似于等势线一样的 Banding Effect。（其实这里的等势线就是 Douady-Hubbard 势函数，可以用作另一种平滑绘制的方法）。

如何消除这样的 Banding Effect 呢，有一个经典的方法，也是数学上正确的方法，叫做 Renormalizing Iteration Count， 这个方法也有很多其他名字，比如 Smooth Iteration Count， Real Escape Time 等等。它的核心思想在于，我们之前所用来 map 到颜色空间的迭代次数，是一个整数， 是一个离散的量，而想要实现连续的颜色，也就是 gradient， 需要一个浮点的迭代次数，那么问题就在于，我们用什么来计算出它的小数部分。

#### Renormalizing Iteration Count
首先给出公式：

$$RIC = \lim_{n\to \infty}(n - \log_2\log_2|z_n|)$$

从公式来看，浮点迭代次数的小数部分就是对迭代 n 次后的半径取了两次 $$log$$，那么这个公式是如何推导而来的呢？
iq在[他的博客][1]中给出了一个详细的推导，相比 Linas 的[推导][2]要更加易懂，虽然两者的公式有微小的差异（可能Linas的推导在数学上更加准确），但背后的原理是相同的。

简单来说，我们假设 Escape Radius 为 $$B$$, 对于 Orbit 中的点，当它 Escape 的时候，要么刚好超过$$B$$, 要么超过$$B$$ 一大截，我们可以把“超过B的程度” map 到$$[0,1]$$来作为浮点迭代次数的小数部分。

那么我们就需要定义“超过B的程度”的范围，很明显，这个范围的下界即是$$|z_n|$$刚好在B上，这时我们把$$|z_n|$$ map 到$$0$$， 那么对于上界，则是在上一次迭代的时候，$$|z_{n-1}|$$就**几乎**超过了B， 于是$$|z_n|$$超过B的长度，就接近这一次迭代所增加的长度，这个长度即为上界。这一次迭代所增加的长度为多少呢，在迭代次数足够多时，我们可以用$$f(z)=z^d$$（对于Mandelbrot Set来说 d = 2 ）来代替原公式作为近似，那么这次迭代所增加的长度可以近似为 $$B^d$$。
由此我们就得到了“超过B的程度”的范围，也就是$$[B, B^d]$$，我们直接对它取两次对数，第一次以$$B$$为底，第二次以$$d$$为底，即可将它 map 到$$[0,1]$$， 所以：

$$RIC = \lim_{n \to \infty}(n - { {\log { { \log|z_n| } \over { log B } } } \over { log d } } )$$

注意，这次如果只去以 $$ B $$ 为底的第一次对数，变换到 $$ [1,d] $$，再通过线性变换到 $$ [0,1] $$，得到的结果是不对的，你可以看到虽然出现了 Gradient，但是仍然有 Banding Effect 在,
这是因为对$$|z_n|$$取一次对数之后，$$log_B |z_n|$$ 的增长依然是以 $$ d $$ 为指数的，为什么呢，还记得前面我们提到的 Orbit， 我们忽略掉常数部分，那么 Orbit 即为：

$$ z, z^2, z^4, z^8, z^{16}, ... $$

取一次对数之后变成：

$$1, 2, 4, 8, 16, ...$$

再去一次对数才会成为：

$$0, 1, 2, 3, 4, ...$$

这就是对为什么会有两次$$log$$的推导，有了理论基础以后，我们就能轻松得到下面这个完全平滑的结果：
<center><img src="/assets/images/mandelbrot/smooth.png"></center>
<br/>

### Distance Estimation
跟绘制其他任何函数图形一样，我们也可以为 Mandelbrot Set 找到一个距离函数，这就要利用到之前提到的 Douady-Hubbard 势函数， 假如我们把 Mandelbrot Set 看做一个磁铁，那么它创造的磁场就像下图这样：

<center><img src="/assets/images/mandelbrot/force.gif"></center>
<br/>

围绕在 Mandelbrot Set 周围的 Contours 就是等势线，而垂直于这些 Contours 的曲线就表示向量场。

Douady 和 Hubbard 在他们的[论文][3]中，给出了这个势函数：

$$G(c) = \lim_{n \to \infty} {1 \over 2^n} \log |z_n|$$

我们即可利用这个势函数，来求得平面上任意一点到 Mandelbrot Set 的边界的距离，对到任意等值面的距离的估计方法可以参见[这里][4]，于是我们可以得到距离的估计值：

$$d = { G(c) \over |G'(c)| }$$

其中$$G'(c)$$ 为：

$$|G'(c)| = \lim_{n \to \infty} {1 \over 2^n} {|z_n'| \over |z_n|} $$

于是$$d$$展开即为：

$$d = \lim_{n \to \infty} {|z_n| log|z_n| \over |z_n'|}$$

在迭代计算的时候，我们只需要同时计算每次迭代的$$z_n$$的导数，最后即可求得距离$$d$$

绘制得到的结果与 RIC 类似，这里不再重复。


[1]: http://www.iquilezles.org/www/articles/mset_smooth/mset_smooth.htm
[2]: http://linas.org/art-gallery/escape/escape.html
[3]: http://www.math.cornell.edu/~hubbard/OrsayEnglish.pdf
[4]: http://www.iquilezles.org/www/articles/distance/distance.htm