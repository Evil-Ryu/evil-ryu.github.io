---
title: "Menger Carpet 2D 与 Space Folding"
categories:
  - Fractal
date:   2017-12-10 19:30:42 +0800
tags:
  - Fractal
  - Graphics
---
<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/menger/00.png"></center>
<br/>
Menger Carpet 是属于IFS类型的分形，也就是可以通过无穷次迭代变换来产生的分形,对于这类型的分形，我们可以使用 space-folding 算法来生成，这个方法非常巧妙，而且与我们的剪纸异曲同工，这篇文章就以Menger Carpet为例，详细解释Space-Folding算法的推导过程。

## Distance Field
基于距离场的绘制方法是本文要讲解的算法的基础，这里简单提一下理解 Space-folding 所需要的基本知识。
如果读者接触过基于距离场的绘制的话，其实已经接触过 Space-folding 了，一个最简单的 Space-folding 函数就是:

```cpp
p.x=abs(p.x)
```

这个“abs“将空间沿 y 轴折叠，所有只在 x>=0 下的计算，全部都应用到了 x<0 的部分，比如我们只在 x>=0 下画半个圆，如果在画圆之前应用了”abs“，那么得到的将会是整个圆，想象一下剪纸如果要在纸中间剪出一个圆形，会怎么做，是不是完全相同的办法？

对于剪纸我们实际上可以折叠很多次，而且每次都换着花样折，最后一刀下去，得到的图案可能非常复杂，非常精美，而 Space-folding 同样有这样的性质，也就是，可以多次折叠，例如

```cpp
p.x = abs(p.x)
p.y = abs(p.y)
```

这里我们依次沿y轴和x轴进行了折叠，最后得到的实际上是把第二，三，四象限，全部折叠到了第一象限，那么这时候我们画一个在(1,1)处的圆，将会得到分别在(1,1), (-1,1), (-1,-1), (1,-1)的四个圆。

有了这样的基础以后，如果我们让空间的折叠足够复杂，次数足够多，那么就能够生成非常复杂的图形。

## Space Folding

有了前面的基础，我们来看看，如何通过空间折叠来得到 Menger Carpet.
如下图所示，可以看出，Menger Carpet 的生成方式，可以看做是循环的将每个矩形，切分成边长为原来1/3，等大小的9个矩形，并将中间的抛弃，再接着对每个子矩形做同样的操作，无穷进行下去。
<br/>
<center><img src="/assets/images/menger/0.gif"></center>
<br/>

要研究怎么画出每次迭代的9个矩形，其实不太直观，所以首先，让我们考虑只往一个方向上画的情况，比如:  
<br/>
<center><img src="/assets/images/menger/1.png"></center>  
<br/>

图中子矩形的颜色随迭代次数加深，实际上就是每次边长缩小到原来的1/3，然后平移到上一次迭代的矩形的右上角, 这样简化后就非常容易画了，但是我们需要的，是从这个最简单的 case 中得出 Menger Carpet 的变换规律:

我们定义初始状态为一个半径为1的矩形，也就是一个边长为2的矩形，中心在原点，那么在第0次迭代的时候这个矩形内所有的点，都是属于 Menger Carpet 的点，于是我们可以画一个灰色的矩形，来表示当前的 Menger Carpet。
那么第1次迭代呢，这个矩形边长首先是要缩小到原来的1/3，然后位置挪到原矩形的右上角，还是像上面一样，只画一个子矩形：
<br/>
<center><img src="/assets/images/menger/2.png"></center>
<br/>

很容易算得第0次迭代时，矩形的中心，到第1次迭代是这个子矩形的中心的距离是: 2/3

同样再往下继续迭代，可推知第1次迭代时矩形的中心，到第2次迭代时矩形中心的距离：2/9
这时候，可以归纳得出，在迭代变换过程中，每次矩形缩放和偏移分别为：

$$scale = {1 \over 3}$$

$$offset = {2 \over 3^n}$$

<br/>
<center><img src="/assets/images/menger/3.png"></center>
<br/>

有了这个公式，这时候我们可以迭代画出”只有一个子矩形“的情形了，那其他位置上的矩形怎么办呢，这就该让 Space-folding 出场了，还记得之前提到的”abs()"函数吗，我们将其余三个象限全部折叠到第一象限，之前一直在第一象限画的所有内容，全部被map到所有象限，在使用abs之后，我们惊喜地得到了这样的图形：
<br/>
<center><img src="/assets/images/menger/4.png"></center>
<br/>


但是我们还缺少x和y轴方向上十字形的区域，我们分开解决，先看y轴方向上的区域，第一个想法就是，我们继续利用空间折叠来填充，但是这时候如果沿$$x = -{1 \over 3}$$来折叠，会导致本来不该被画上东西的区域被画上，于是我们考虑另外一种方法：平移，以第二次迭代为例，我们只需要将$$[-1, {-{1 \over 3}}]$$的部分平移到$$[{-{1 \over 3}}, {1 \over 3}]$$即可， 于是我们成功得填充了y方向上的区域（这里故意在子矩形之间留了缝隙以便观察）：
<br/>
<center><img src="/assets/images/menger/5.png"></center>
<br/>
如果继续往下迭代，可知平移的规律为：

$$x=x+{2 \over 3^n} \qquad \text{if} \ \ x \le -{1 \over 3^n}$$
           

最后只剩下x轴上的区域，离成功还差一小步，我们发现x轴上与y轴上的这个十字架形区域实际上是沿$$y=x$$对称的，于是我们再沿$$y=x$$折叠一次：

```cpp
if(p.x > p.y)
	p.xy = p.yx
```

于是我们把x轴上的区域也填充上了：
<br/>
<center><img src="/assets/images/menger/6.png"></center>
<br/>

大功告成，让我们试试增加迭代次数：
<br/>
<center><img src="/assets/images/menger/7.png"></center>
<br/>
要注意的是，折叠的方向和顺序是不能随意颠倒的，这很容易想象，那么我们整个算法的折叠和变换的顺序是怎样的呢：

**Loop：**

```cpp
1. 平移

	if(p.x < -0.5 * scale * (scale - 1.0) 
		p.x += scale * (scale - 1.0);

2. abs 折叠到第一象限

	p = abs(p);

3. 沿 y = x 折叠

	if(p.x > p.y)
		p.xy = p.yx;

4. Scale & Offset
 	p = scale * p - scale * (scale - 1.0);    
```
注意上面的代码中，由于是基于距离场的计算，所以scale不是$$1 \over 3$$ 而是$$3$$。

最有趣的在于，我们在不断迭代变换的循环中，竟然不用真正地去画任何东西，等到迭代完成，在当前点绘制任意的图元，就能得到整个Menger Carpet，比如在之前我们推导的时候每次都画方块表示当前的menger Carpet集合，其实画一个任何其他图形也没有问题，因为迭代到一定次数的时候，图元已经缩小到比一个像素还小了， 所以为了计算量考虑，我们都通常画最简单的图元， 比如圆形。

因为整个算法非常短小简洁，最后附上完整的C code以供参考：

```cpp
#include <stdio.h>
 #include <math.h>
 struct vec3 {
     double x, y, z;
     vec3(double r=0, double g=0, double b=0){ x=r; y=g; z=b; }
 };
 static vec3 menger_carpet(int x, int y){
     vec3 p = vec3((-640.0 + 2.0*x)/480.0 * 3.0, (-480.0 + 2.0*y)/480.0 * 3.0, 0.0);
     double scale = 3.0, k = 1.0;
     for(int i=0;i<5;++i) {
         p.x=fabs(p.x); p.y=fabs(p.y);
         if(p.x>p.y) {double t = p.x; p.x=p.y; p.y=t;}
         p.x=p.x*scale - scale*(scale-1.);
         p.y=p.y*scale - scale*(scale-1.);
         k*=scale;
         if(p.x < -0.5*scale*(scale-1.0)) p.x += scale*(scale-1.0);
     }
     double d = (fmax(fabs(p.x),fabs(p.y)) - 3.)/k;
     if(d < 0.02) d = 0.; else d = 1.0;
     return vec3(d,d,d);
 }
 int main() {
     FILE *f=fopen("image.ppm", "w");
     fprintf(f,"P3\n%d %d\n%d\n",640,480,255);
     for(int i=0;i<480;i++)
         for(int j=0;j<640;++j){
             vec3 col=menger_carpet(j, i);
             fprintf(f,"%d %d %d ",int(col.x*255.0),int(col.y*255.0),int(col.z*255.0));
         }
     fclose(f);
     return 0;
 }
 ```
