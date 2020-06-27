# 大笑文档

## 总览

PageLifecycle.js 是一个轻量化的 JavaScript 库（gzip后 < 1Kb），它让开发人员能够轻松观察页面生命周期API（Page Lifecycle API）状态的变化而无需担心浏览器的限制。

## 安装

```bash
npm install --save-dev page-lifecycle
```

## 使用方法

该库有三个生产版本：

[ES5]:https://github.com/GoogleChromeLabs/page-lifecycle/blob/master/dist/lifecycle.es5.js

### 1. ES5 [dist/lifecycle.es5.js][ES5] (UMD)

使用这个版本可以在最大限度地兼容那些(不能运行ES2015+代码)的就浏览器.

UMD 既可以在 CommonJS 或 AMD 环境中使用，也可以在浏览器中以`<script>`标签的形式引入。

```html
<script defer src="/path/to/lifecycle.es5.js"></script>
<script defer>
lifecycle.addEventListener('statechange', function(event) {
  console.log(event.oldState, event.newState);
});
</script>
```

[ES2015]:https://github.com/GoogleChromeLabs/page-lifecycle/blob/master/dist/lifecycle.mjs

### 2. ES2015 [dist/lifecycle.mjs][ES2015] (ESM)

[condition]:https://philipwalton.com/articles/deploying-es2015-code-in-production-today/

如果您仅支持 ES module 浏览器或是正在使用 `<script type="module">` 和 `nomodule` [有条件地支持现代浏览器][condition]，请使用此版本。

```html
<script type="module">
import lifecycle from '/path/to/page-lifecycle.mjs';

lifecycle.addEventListener('statechange', function(event) {
  console.log(event.oldState, event.newState);
});
</script>
```

[native]:https://github.com/GoogleChromeLabs/page-lifecycle/blob/master/dist/lifecycle.native.mjs

### 3. ES2015(native) [dist/lifecycle.native.mjs][native] (ESM 除`EventTarget` 和 `Event`以外的兼容版本) ⚠️

如果您只希望兼容那些支持扩展 `EventTarget` 和 `Event` 构造器的浏览器，请使用此版本。

> 请注意：这个版本是最小的，但也只能在一些浏览器中工作。其它和`ES2015`版本相同。

## API

PageLifecycle.js 库导出的是 `lifecycle`对象，它是`Lifecycle`类的一个单例实例。`Lifecycle`类的属性、方法和事件如下：

### 属性

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| state | string | 返回当前的页面生命周期状态。|
| pageWasDiscarded | boolean | 返回`document.wasDiscarded`的值（若不存在则返回`false`） |

### 方法

<table>
  <tr valign="top">
    <th align="left">名称</th>
    <th align="left">描述</th>
  </tr>
  <tr valign="top">
    <td><code>addEventListener</code></td>
    <td>
      <p><strong>参数：</strong></p>
      <ul>
        <li><em>type</em>: <code>string</code></li>
        <li><em>listener</em>: <code>function(Event)</code></li>
      </ul>
      <p>添加一个回调函数，以便在检测到传入的事件类型时调用<em>(注意：目前只支持<code>statechange</code>。)</em></p>
    </td>
  </tr>
  <tr valign="top">
    <td><code>removeEventListener</code></td>
    <td>
      <p><strong>参数：</strong></p>
      <ul>
        <li><em>type</em>: <code>string</code></li>
        <li><em>listener</em>: <code>function(Event)</code></li>
      </ul>
      <p>从当前侦听器列表中移除传入的事件类型函数<em>(注意：目前只支持<code>statechange</code>。)</em></p>
    </td>
  </tr>
  <tr valign="top">
    <td><code>addUnsavedChanges</code></td>
    <td>
      <p><strong>参数：</strong></p>
      <ul>
        <li><em>id</em>: <code>Object|Symbol</code></li>
      </ul>
      <p>向内部调用栈添加监听项。调用此方法将向<code>window</code>添加一个 <code>beforeunload</code> 侦听器(在尚未添加的情况下).</p>
      <p>传递的参数对该状态也是唯一的，因为只有向<code>removeUnsavedChanges()</code>传递相同的参数才能删除它。
      </p>
    </td>
  </tr>
  <tr valign="top">
    <td><code>removeUnsavedChanges</code></td>
    <td>
      <p><strong>参数：</strong></p>
      <ul>
        <li><em>id</em>: <code>Object|Symbol</code></li>
      </ul>
      <p>移除内部调用栈添加的监听项。如果调用栈为空，则从<code>window</code>移除<code>beforeunload</code> 侦听器</p>
    </td>
  </tr>
</table>


### 事件

<table>
  <tr valign="top">
    <th align="left">名称</th>
    <th align="left">描述</th>
  </tr>
  <tr valign="top">
    <td><code>statechange</code></td>
    <td>
      <p><strong>属性：</strong></p>
      <ul>
        <li><em>newState</em>: <code>string</code> 页面刚刚进入的当前生命周期状态。</li>
        <li><em>oldState</em>: <code>string</code> 前一个页面生命周期状态。</li>
        <li><em>originalEvent</em>: <code>Event</code>触发状态更改的DOM事件</li>
      </ul>
      <p>每当页面的生命周期状态发生变化时，就会触发<code>statechange</code>事件。</p>
    </td>
  </tr>
</table>



