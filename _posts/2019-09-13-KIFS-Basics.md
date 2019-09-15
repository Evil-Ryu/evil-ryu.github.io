---
title: "KIFS 基础"
categories:
  - Fractal
date:   2019-09-13 17:05:42 +0800
tags:
  - Fractal
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>

<center><img src="/assets/images/KIFSBasics/kifs3.png"></center>
<br/>

# KIFS
之前关于 Menger Spone 的文章虽然说到 KIFS, 但是也没有给 KIFS 做一个比较全面的介绍.
因为这个是目前 Shader Coding, Demoscene 等等非常常用的算法, 所以还是有必要在这里详细介绍一下.

KIFS 是 Kaleidoscopic Iterated Function System 的缩写, Kaleidoscopic 是万花筒的意思, IFS 如果读者有了解过基本的分形应该知道这是通过迭代来生成一系列分形的基本方法之一.
在 IFS 之前加上 "万花筒" 这个前缀就是说这个算法能生成的分形千奇百怪令人眼花缭乱吧 :P

他的核心思想很简单, 叫做 "Scale-Folding", 每次迭代都将坐标系缩放并且平移, 缩放和平移的量是有讲究的, 这里就直接先 show you the code 了:

```cpp
vec3 kifs(vec3 p)
{
    // 可以试试不同的 scale 和 offset 的效果
    float scale = 2.;
    vec3 offset = vec3(0.1,0.2,0.3);

    float s=1.;

    for(int i = 0; i < ITERATION; ++i)
    {
        // scale folding, abs 是折叠, scale 是缩放, (scale-1.) 是平移的量, offset 是一个常量
        p = scale * abs(p) - (scale - 1.0) * offset;

        s*=scale;

        // 可以在这里加上一个旋转变换,让生成的分形更加奇特
        // some_rotation(p);
    }
    
    p/=s;  

    return p;
}
```

上面就是 KIFS 的核心公式, 通过调整 scale, offset 等参数, 可以生成我们耳熟能详的一系列分形: menger spone, sierpinski 等等, 更有趣的部分是在添加了一些例如旋转等变换之后, 它生成的各种奇特的形状. 不过在这之前, 让我们先来看看标准的 kifs 能有什么样的威力.

## Example 1
我们设 scale = 1.0, offset = vec3(1.0,1.0,1.0), ITERATION=4 来变换坐标系, 然后在变换后的坐标系中画一个小球, 会怎么样呢, 如下图:

<center><img src="/assets/images/KIFSBasics/k0.png"></center>

可以看到, 明明只画了一个小球, 却变成了很多个小球组成的正方体, 如果我们在同样参数下增大 ITERATION, 比如增加到 12, 那么我们可以得到一个光滑表面的正方体, 因为小球的数量急剧增多,再也看不出来单个的小球了, 但是画一个正方体搞这么复杂是不是有点 overkill 了, 稍安勿躁, 让我们在每次 iteration 最后增加一点点旋转变换:

```cpp
p=scale*abs(p)-(scale-1.);

// 新加的 code 
p.xy*=rotate(0.4);
p.yz*=rotate(-0.2);
p.xz*=rotate(0.2);

s*=scale;

// 其中 rotate 返回一个 mat2 的旋转变换矩阵
mat2 rotate(float t)
{
    float c=cos(t);
    float s=sin(t);
    return mat2(c,-s,s,c);
}

```
我们一口气延三个轴都进行了一定的旋转变换, 这时候我们得到了这样一幅图像:


<center><img src="/assets/images/KIFSBasics/k1.png"></center>

这比正方体有意思多了吧, 更好玩的是可以将旋转的量用当前的时间作为参数, 让这个几何体动起来, 于是你能看到它从一个正方体变换到非常复杂的形状最后又变换回正方体的过程.


## Example 2
然后我们再来看看文章顶部的 Image 是怎么生成的, 其实在图中, 除了漂浮在空中的小方块和几根柱子之外, 就只画了一个小正方体和一个平面.
如下图:

<center><img src="/assets/images/KIFSBasics/k2.png"></center>

正中的小正方体由于太小比较看不清了, 不过没关系, 我们将这个小正方体和平面都进行 KIFS 变换:

<center><img src="/assets/images/KIFSBasics/k3.png"></center>

直接就得到了一个挺科幻的场景, 具体使用的变换可以参考源码: https://www.shadertoy.com/view/Wsc3W4, 这里就不再重复贴 code 了.


## Example 3
由于 KIFS 可以生成非常复杂的几何结构, 它在 demo 中也是非常适合玩 Volumetric 的, 常常能生成非常炫的图像, 比如:

<center><img src="/assets/images/KIFSBasics/k4.png"></center>

这是来自于 19 年 Revision Shader Live Coding 冠军 Nusan 的一个作品, 他很喜欢用这个技巧, 图像中其实就是一系列 kifs 变形后的几何体, 然后全部都由 Volumetric 的方法绘制.


## Example 4
前面说到可以在变换间加上旋转, 其实还可以更加有想象力, 比如常用的加上折叠的方法, 比如在生成 sierpinski 分形的时候, 就用到这个算法:

```cpp
vec3 sierpinski_kifs(vec3 z)
{
    float scale = 2.;
	  for (int n = 0; n < 5; n++) 
    {
        // 沿三条线的空间折叠
		    if(z.x+z.y<0.){z.xy = -z.yx;}
      	if(z.x+z.z<0.){z.xz = -z.zx;}
      	if(z.y+z.z<0.){z.yz = -z.zy;}

        // Scale-Folding
		    z = z*2.-1.;
    }
    return z*pow(2.,-5.);	
}
```
得到的结果:

<center><img src="/assets/images/KIFSBasics/k5.png"></center>


# 总结
KIFS 还有很多可以探索的地方, 不仅只是生成抽象的几何图形, 也可以和现实中比较像的事物结合起来进行创作.
虽然算法很简单, 但是由于它只需要很少的计算量就能生成具有大量细节的几何体, 还是在各种 demoparty 中相当常见.
TDF2018 也能看到几乎排名前几的 GLSL/PC demo 中全部都有使用 KIFS.



