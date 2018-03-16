---
title: "More Space Folding，空间折叠进阶"
categories:
  - Fractal
date:   2018-03-14 21:13:00 +0800
tags:
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>


<center><img src="/assets/images/space_folding_advanced/01.png"></center>
<br/>

## 空间折叠回顾

在之前的[post][1]中，已经介绍过基本的 Space Folding，通过迭代这些简单的折叠，我们可以生成极为复杂的分形。涉及到的空间折叠包括沿坐标轴，沿任意线性函数，乃至于圆的反演变换， 而本文将介绍一种基于反射的折叠方法，这种方法能将坐标空间折叠到特定的对称图形中，不仅能依靠这种方法直接绘制一系列几何体，而且可以被应用到各种造型中，创造更灵活的形状，值得一提的是，这个折叠方法再一次来源于伟大的 knighty！诶我为什么要说又。

Anyways，无论是三维空间中的三角形：
<center><img src="/assets/images/space_folding_advanced/04.png"></center>
<br/>

八边形：
<center><img src="/assets/images/space_folding_advanced/05.png"></center>
<br/>

还是五角星：
<center><img src="/assets/images/space_folding_advanced/06.png"></center>
<br/>

都能通过简单几次空间折叠直接绘制出来，而不需要借助通常的方法，譬如求到解析函数的距离，或者基于预定义法向量的方法。

<br>

<figure>
<img src="/assets/images/space_folding_advanced/02.png" alt="what"/>
<figcaption>分形的一部分，在计算前被折叠到了近似三角形的空间中。</figcaption>
</figure>
<br/>

## 基于反射的折叠

对于任何图形学爱好者来说，对光线反射的计算不能更熟悉了。
<center><img src="/assets/images/space_folding_advanced/03.jpg"></center>
<br/>

对入射向量 I，反射向量 R = I - 2.0 * dot(N, I) * N，其中 N 为表面法向量。
那么考虑整个坐标系中，位于原点的单位圆内，在所有的单位向量中，选取一个作为法向量 N， 其余所有向量都根据这个法向量做反射，得到的结果会是怎样？可以想象一下，用以 N 为法向的平面将单位圆分成上下两部分，上半部分的所有向量因为沿法向做了反射计算，效果就等于都沿法向做了折叠，下半部分的所有向量经过反射计算，效果等同于沿这个平面折叠到了上半部分，而这个平面恰好为 I 和 R 的中间向量，而并没有沿法线折叠的效果，可以看到这两半部分的行为并不统一，我们更感兴趣的是，假如我只想沿这个平面将下半部分折叠到上半部分，而不希望上半部分沿法线折叠呢？操作非常简单，只需要排除掉上半部分的计算即可：

```
R = I - 2.0 * min(0.0, dot(N, I)) * N;
```

接下来我们就要利用这个变换，得到类似于本文开头图中的结果，但是我们从一个三角形开始以便理解，多边形是同样的原理。


### 将空间折叠到三角形中
先画个图以便分析：


<figure>
<img src="/assets/images/space_folding_advanced/07.png" alt="what"/>
<figcaption>图中单位圆以白色表示，天蓝色为 y 轴，正向朝上， 粉红色为 x 轴， 正向朝右， 黄色为原点， 四个象限分别用红，绿，蓝，青色表示，颜色的渐变表示了坐标数值的增加，这样的表示可以让我们更容易看明白变换后的空间。</figcaption>
</figure>

<br/>

<figure>
<img src="/assets/images/space_folding_advanced/08.png" alt="what"/>
<figcaption>青色的向量表示法向 N， 蓝色的向量（图中被紫色向量覆盖）表示入射向量 I， 紫色的向量表示反射向量 R， 可以看到当 N 和 I 的夹角小于 90 度的时候，并不进行反射计算，I 和 R 是相等的。</figcaption>
</figure>
<br/>

<figure>
<img src="/assets/images/space_folding_advanced/09.png" alt="what"/>
<figcaption>到当 N 和 I 的夹角大于 90 度的时候，开始计算反射，反射向量 R 开始顺时针往回旋转（当 I 继续逆时针旋转时）。 所以这样就简单地将坐标空间沿与 N 垂直的平面折叠了。</figcaption>
</figure>
<br/>

研究了单个向量的变化规律以后，让我们来看看当整个坐标空间都执行这个变换之后的样子：
<center><img src="/assets/images/space_folding_advanced/10.png"></center>
<br/>
注意上图中绿色和青色区域的不连续处，正好是与 N 夹角为 90 度的方向，反射向量 R 在这个地方开始往回转。右下角同理。可以看到，x 轴和 y 轴变成了两条折线，而我们的第三象限彻底没了。

这个变换到这里已经有些接近三角形了，因为 x 轴始终是和 y 轴垂直的，所以如果我们能够再把一条 y 轴折叠到现在第四象限的中线（不连续）处，也就是下图中第四象限中深绿色向量的部位， 这样一来 x 轴就自然能围成三角形了。

<center><img src="/assets/images/space_folding_advanced/15.png"></center>
<br/>

如何折叠出第三条 y 轴到第四象限呢，我们可以重复利用刚才的反射方法，所以我们需要一个新的法向量，使得垂直于它的平面，要恰好平分竖直的 y 轴和上图中深绿色向量，这样一来，反射计算就能刚好把竖直的 y 轴，反射到深绿色向量处，假设这个新的法向量为 N'， 它的计算方法为：

```
N‘ = normalize( N - vec2(1.0, 0.0) )

```

这里读者可能有一个疑问，要是我并不想折叠出一个标准的三角形，而任意选择 N' 的方向会怎样呢，在某些情况下可能不会有大问题，但是大多数情况下，比如现在的第四象限，深绿色向量两边是镜像的，经过上一次反射折叠而形成的，如果 N' 的方向稍有偏移，第二次折叠会在第四象限中折叠出两条 y 轴（因为第四象限已经处于折叠状态中，如果在一张已经对折的纸中间剪一个孔，必然会导致打开的纸张出现两个孔）, 如下图，N' 的方向沿逆时针稍微旋转了一点，出现了两条 y 轴：

<figure>
<img src="/assets/images/space_folding_advanced/16.png" alt="what"/>
<figcaption>N' 的方向略微偏移， 竖直的 y 轴不再被恰好反射到第四象限中线处，于是出现了两条新的 y 轴。</figcaption>
</figure>
<br/>

这样的后果一方面是生成的形状难以控制，更重要的是，即使结果仍然围成闭合形状，闭合区域内容易出现多个不同象限，导致难以作为距离函数参与计算。后面我会举一个这样的例子说明问题。

### 新法线方向 N' 的推导

设竖直 y 轴上的单位向量为：

 $$ \hat y = (0, 1)$$
 
第四象限中线向量为 $$\hat a$$, 第一次折叠使用的法线方向为:

$$ \hat N = (x, y) $$

根据反射计算公式可知，$$\hat N$$ 垂直于 $$\hat a$$。那么 $$\hat a$$ 的坐标即为：$$\hat a = (y, -x)$$

因为根据欧拉公式，$$\hat a$$ 等于 $$\hat N$$ 顺时针旋转 90 度， 等价于：

$$\hat a = \hat{N}e^{-{\pi\over2}i} = (x+iy) * (\cos{\pi\over2} + i\sin{\pi\over2}) = (y, -x)$$

由于新的法线方向 $$\hat N'$$ 要垂直于 $$\hat y$$ 与 $$\hat a$$ 的中间向量，设为 $$\hat m$$， 那么：

$$\hat m = { (y, -x) + (0, 1) \over 2} = ({y\over2}, {(1-x)\over 2})$$

于是新的法线方向等于将 $$\hat m$$ 逆时针旋转 90 度， 即：

$$\hat N' = \hat{m}e^{ {\pi\over2} i } = ({y\over2}+i{(1-x)\over 2}) * (\cos{\pi\over2} + i\sin{\pi\over2}) = {1\over2}(x-1, yi)$$

最后再将结果 normalize 即可。这就是为什么新的法线方向为：

```
N‘ = normalize( N - vec2(1.0, 0.0) )
```

的原因。

### 继续剩下的折叠

有了新的法线 N'， 那么第二次折叠产生的新反射向量即为：

```
R' = I - 2.0 * min(0.0, dot(N’, I)) * N‘;
```

再一次计算反射之后，并且沿 y 轴折叠（把左侧的第二象限也去除），结果是这样：


<center><img src="/assets/images/space_folding_advanced/11.png"></center>
<br/>

完美，整个坐标空间完全对称，而且都被变换成为了原先的第一象限，三条 y 轴已经就位， 但是等等，x 轴去哪里了? 不如让我把 x 轴加粗十倍瞧瞧？

<center><img src="/assets/images/space_folding_advanced/12.png"></center>
<br/>

啊哈，x 轴当然是跟 y 轴垂直啦， 毫无疑问 x 轴已经围成了我们想要的三角形，只不过已经聚到一点了，这时候如果可视化出到 x 轴的距离，可以看到距离场已经是三角形了，现在我们还需要一个操作，不过这里从这一步来看这个操作不太直观（读者有兴趣的话可以调换前面的变换顺序来观察坐标轴的变化），那就是:

```
 abs(p.y) - 1.0
```
 
熟悉 Distance Field 的小伙伴们知道，这个操作的效果就是将整个空间沿 y 轴正方向平移 1.0 然后沿 x 轴折叠，那么我们现在有三个 y 轴，正向都朝外，结果不就是：

<center><img src="/assets/images/space_folding_advanced/13.png"></center>
<br/>


这时候请允许我说：嗒哒！

有趣的是，之前被做掉的第四象限，又复活了，于是坐标平面被变换成三份，其中三个 x 轴围城三角形，三角形外全是第一象限，三角形内部全是第四象限，**在这个坐标系下，要判断一个点是否在三角形内，只需要判断点的 y 坐标是否小于 0**。

### 一致的变换更好用

其实如果只想要得到三个 x 轴围成三角形，甚至不需要第二次折叠，我们只需要取第一折叠的法向量 N 为： $$({-1\over2},{\sqrt3\over 2})$$，就能得到下面的结果：

<center><img src="/assets/images/space_folding_advanced/17.png"></center>
<br/>

这时候，三角形内外都有两个象限，这使得距离场有严重的 discontinuity，也会增加计算的复杂性。

## 实现与应用

通用的 Folding 代码， 不同的折叠次数和初始法向量的方向决定了折叠后的形状。

```
vec2 fold(in vec2 p, in float a)
{
    p.x = abs(p.x);
    vec2 N = vec2(cos(a), sin(a));
	for(int i = 0; i < ITER; ++i)
   	{
   		// Folding by reflection calculation
   		// it has the effect of folding by the plane which perpendicular to N
    	p -= 2.0 * min(0.0, dot(p, N)) * N;
    	
    	// The next normal for reflection foldig
    	// This calculation makes it perpendicular to the 
    	// half vector between the vector perpendicular 
    	// to the previous N, and the vertical y axis
    	N = normalize(vec2(N.x - 1.0, N.y));
    }
 	return p;    
}

// ITER=2, a = PI/3. 即为上文变换到三角形空间。
// 增加 ITER 和角度，就可以变换到多边形中。
// Quad: ITER = 2,  A = PI/2.0
// Pentagon: ITER = 3, a = PI / 5.0
// Hexagon: ITER = 3, a = PI / 3.0
// Octagon: ITER= 3, a = PI / 2.0
   
// 当然也可以自定义每次变换的法向量 N，来获得不同形状，并且由于本文介绍的变换是二维平面的变换，所以三维空间中不同平面的变换还可以结合起来生成特殊的形状，比如本文中的五角星，这些组合非常灵活，所以有兴趣就自己试验去吧。
```

前文中利用这个空间折叠直接画出三角形的 code：

```
float triangle(in vec3 p)
{  
    p.xy = fold2(p.xy, PI / 3.);  // ITER=2 version
    p.y -= 1.0;
    return (p.y > 0.0) ? length(p.yz) : abs(p.z) - 0.001;
}

```

五角星的：

```
float star(in vec3 p)
{
    p.xy = fold3(p.xy,  PI /5.0); // 这是五边形
    p.y -= 1.0; // 平移 x 轴
    p.y -= p.x*0.5;  // x 轴 逆时针旋转一点角度
    p.z = abs(p.z) + p.y*0.8; // z 方向上的突起
    
    // 0.5 is compensation for the scaling.
    return 0.5 * ((p.y > 0.0) ? length(p.yz) : (abs(p.z) - 0.001)); 
}
```

五角星的距离场：

<center><img src="/assets/images/space_folding_advanced/14.png"></center>
<br/>

可以看到，在折叠中对坐标轴进行一些偏移，错切，能得到很多有趣的形状。


[1]: https://evil-ryu.github.io/fractal/menger-spone-introduction/