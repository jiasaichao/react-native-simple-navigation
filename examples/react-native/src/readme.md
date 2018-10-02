# 说明
## 为什么不用react navigation或者react native navigation
react navigation 和 react native navigation都是很优秀的的组件，但是我感觉和我的想象中的导航组件不一样，过于复杂，有些功能也不好现实，导航组件是一个关系非常重大的组件，关系到整个应用的体验。
* 导航后退到任意页面，比如这个页面还没有打开过（想打开一个页面但是动画是返回的动画）。
* 缓存与预加载页面，可以很大的提高打开性能。比如一个应用一共10来个页面，直接全部加载出来，然后来回切换就行了，不用每次都重新创建，能很高的提高用户体验，正常情况下，一个普通应用页面就算非常多，常用的页面也没那么多，把常用的页面缓存起来也是比较好的选择。再或者建立一个加载中的页面，先加载这个页面也可以的。
## 为什么写这个组件
想做一个简单的导航组件。
## 思路
导航是由一个打开页面的列表和所有的页面组成。
* 所有页面
```flow
st=>start: 开始
```
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```