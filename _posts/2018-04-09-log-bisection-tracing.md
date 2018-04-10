---
title: "Log Bisection Tracing"
categories:
  - Raymarching
date:   2018-04-09 22:34:00 +0800
tags:
  - Graphics
---

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>


## Sphere Tracing 的问题

<figure>
<img src="/assets/images/log_bisection_tracing/01.png" alt="what"/>
<figcaption> 在 SDF 存在 overestimation 的情况下，sphere tracing 得到的距离场出现了扭曲。</figcaption>
</figure>
<br/>

由于并非所有 SDF 都是完美的， 在存在距离估计过大，或者 SDF 有奇点等情况，sphere tracing 会存在穿过表面，甚至穿过了比较薄的物体的情况，这时候一个解决办法就是 Bisection， 保存上一次的距离值，跟最后得到的距离值做 bisection 来得到更精确的距离，但是光这样做仍然无法完全解决上述问题，因为做 bisection 的区间不一定合适，要是这个区间全都穿过了表面，再怎么 bisect 都没用，所以要正确的 bisect，必须保证要求的与表面的交点一定要在这个区间之中。

### 正确的 Bisection
在 raymarching 过程中，加入另一个条件来终止 Marching，也就是当距离值的符号改变时，那么保存的上一个距离值与当前距离值一定是异号，也就是说要求的表面交点一定是在两者之间，在这个区间做 bisection 的话，一定可以保证得到正确的距离值，当然这是在 SDF 连续的条件下。

有了这个 bisection 就够了吗？ 来看另一个例子：

<figure>
<img src="/assets/images/log_bisection_tracing/02.png" alt="what"/>
<figcaption> Twist 后的 Lattice， 可以看到远端的距离场惨不忍睹， 因为 Twisting 操作不是保距的变换，Naive 的解决方法是在 marching 的时候缩短步长。</figcaption>
</figure>
<br/>

我们加上这个 Bisection 试试：

<figure>
<img src="/assets/images/log_bisection_tracing/03.png" alt="what"/>
<figcaption> Bisection 后，近处的距离场略有改善，远端仍然一塌糊涂。</figcaption>
</figure>
<br/>

好吧，没办法， 这是因为远端还是存在整个 bisection 区间直接跨过表面的情况，如果我们用上 Naive 的解决方法，直接缩短步长，比如采用原步长的 0.4 倍，那么要 hit 到同样距离的表面，marching 步数也要相应增加至少一倍：


<figure>
<img src="/assets/images/log_bisection_tracing/05.png" alt="what"/>
<figcaption> Bisection + 0.4 倍步长，基本干净漂亮的距离场，但是性能下降太多，特别是在距离函数非常复杂的情况下 （对于 shadertoy 玩家来说，就是所有情况）。</figcaption>
</figure>
<br/>


那么问题就来了， 我们想要高质量就要小步长，用小步长就丢性能，那么有没有一个两全其美，或者说较为折中的方法呢？


### Log Bisection Tracing

这个算法来自于[nimitz][1]，算法的核心在于，要能够尽量避免越过较薄的物体，特别是一次性越过两个以上，这样的情况光是 Bisection 是解决不了的，所以需要一个 huristic 来控制步长。

Log Bisection Tracing 算法顾名思义，就是每次 marching 的步长为当前距离值 d+1 的对数， 也就是 log(d+1)， 在 d 值较小的时候，log(d+1) 与 d 非常接近，但比 d 值小，d 值越大，log(d+1) 越是一个保守的步长。 可以作图对比一下 log(d+1) 与 0.4*d， 在 d 值较小时，log(d+1) 的收敛速度还是要快不少的，但是当 d 太大的时候， log(d+1) 就会太过保守了，所以可以和普通的 sphere tracing 混合使用，当 d 大于一个阈值的时候，就采用普通的 sphere tracing 来提高收敛速度。

这是采用了 Log Bisection Tracing 之后的结果:

<figure>
<img src="/assets/images/log_bisection_tracing/04.png" alt="what"/>
<figcaption>Log Bisection Tracing，步长为 log(d+1.1)</figcaption>
</figure>
<br/>

可以看到质量非常不错，那么速度相比又如何呢，下面将 marching 的步数可视化出来，颜色越浅的区域代表步数越多：

<figure>
<img src="/assets/images/log_bisection_tracing/06.png" alt="what"/>
<figcaption> Sphere Tracing， 默认步长 </figcaption>
</figure>
<br/>

<figure>
<img src="/assets/images/log_bisection_tracing/07.png" alt="what"/>
<figcaption> Bisection + 0.4 倍步长 </figcaption>
</figure>
<br/>

<figure>
<img src="/assets/images/log_bisection_tracing/08.png" alt="what"/>
<figcaption> Log Bisection Tracing </figcaption>
</figure>
<br/>

可以看到 Sphere Tracing 的整个画面都更暗，说明步数整体更少，但是物体边缘部分较亮，说明光线在经过边缘的时候由于距离太小，白白花了了非常多的步数，边缘对于 sphere tracing 就像一个黑洞一样， 紧紧吸住光线不让你离开。

第二幅图是 0.4 倍步长，整个画面是三者中最亮的，物体边缘也有跟第一幅图中一样的情况，这是性能最差的一个。

第三幅图整体较第一幅稍亮一些，但关键是物体边缘亮度并无太大改变，得益于 log(d+1.1) 在 d 值较小时给出更宽松的步长，让光线得以快速地经过边缘。性能反而比 Sphere Tracing 更好。

Log Bisection Tracing 算法中也有一些经验值需要根据不同场景来设置， 比如上面的 1.1 和下面 sample code 中的宏，来控制不同 d 值下的步长， 但总体来说，仍然比普通的 Sphere Tracing 更 Robust，既可以保证不亚于传统 Sphere Tracing 的速度，又可以保证对复杂距离场得到更高质量的结果，所以这个算法应该仍是目前最好的基于 Sphere Tracing 的优化。


### Sample code

```cpp
#define BASE_STRIDE 1.
#define FAR_STRIDE .56
#define MIN_STEP .1
const float logvl = 1.+MIN_STEP;

float bisect(vec3 ro, vec3 rd, float near, float far)
{
    float mid = 0.;
    float sgn = sign(map(rd*near+ro));
    for (int i = 0; i < 6; i++)
    { 
        mid = (near + far)*.5;
        float d = map(rd*mid+ro);
        if (abs(d) < 0.002)break;
        d*sgn < 0. ? far = mid : near = mid;
    }
    return (near+far) * .5;
}

float intersect(vec3 ro, vec3 rd)
{
    float t = 0.;
    float d = map(rd*t+ro);

    float sgn = sign(d);
    float told = t;
    bool do_bisect = false;
        
    for (int i=0;i<128;i++)
    {
        if (abs(d) < 0.002 || t > 100.) break;            
        if (sign(d) != sgn)
        {
            do_bisect= true;
            break;
        }
        told = t;
        if (d > 1.)t += d*FAR_STRIDE;
        else t += log(abs(d)+logvl)*BASE_STRIDE;
       	d = map(rd*t+ro);
    }
    
    if (do_bisect)
        t = bisect(ro,rd,told,t);
    if(t > 100.)
        t = -1.;
    return t;
}

```

[1]: https://www.shadertoy.com/user/nimitz
