---
title: 'Doc'
category: 'components'
---

## Props

| Prop name | Description                                                                                                       | Type   | Values | Default |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| name      | Name                                                                                                              | string | -      | null    |
| document  | Prop to pass a nuxt content document<br/><br/>Hover on @example<br/><div class="display-example">`@example`</div> | object | -      | {}      |

<div> <div class="example-content"><pre class="language-js"><code> &#9;&#9; <span class="token punctuation">{</span>&#13;&#10;             <span class="token literal-property property">example</span><span class="token operator">:</span><span class="token punctuation">{</span>&#13;&#10;                 <span class="token comment">// example comment</span>&#13;&#10;                 <span class="token literal-property property">exampleProp</span><span class="token operator">:</span> <span class="token string">"exampleValue"</span>&#13;&#10;             <span class="token punctuation">}</span>&#13;&#10;         <span class="token punctuation">}</span></code></pre></div></div>

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```vue live
<Doc>Default Example Usage</Doc>
```
