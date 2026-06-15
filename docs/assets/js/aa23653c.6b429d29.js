"use strict";(self.webpackChunk_crestapps_bootstrap_select=self.webpackChunk_crestapps_bootstrap_select||[]).push([[533],{8933(t,e,d){d.r(e),d.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"options","title":"Options","description":"bootstrap-select options, events, and sanitizer settings.","source":"@site/versioned_docs/version-1.0/options.mdx","sourceDirName":".","slug":"/options","permalink":"/docs/1.0/options","draft":false,"unlisted":false,"editUrl":"https://github.com/CrestApps/crestapps-bootstrap-select/tree/main/docs/versioned_docs/version-1.0/options.mdx","tags":[],"version":"1.0","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Options","description":"bootstrap-select options, events, and sanitizer settings."},"sidebar":"docs","previous":{"title":"Examples","permalink":"/docs/1.0/examples"},"next":{"title":"Methods","permalink":"/docs/1.0/methods"}}');var n=d(4848),s=d(8453),i=d(9069);const a={sidebar_position:3,title:"Options",description:"bootstrap-select options, events, and sanitizer settings."},r="Core options",c={},l=[{value:"Sanitizer",id:"sanitizer",level:2}];function h(t){const e={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",p:"p",pre:"pre",...(0,s.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.admonition,{title:"CrestApps fork",type:"info",children:(0,n.jsxs)(e.p,{children:["The options and data attributes documented on this page are part of the current forward-only API. Initialize with ",(0,n.jsx)(e.code,{children:"new Selectpicker('#sel', options)"})," or add the ",(0,n.jsx)(e.code,{children:"selectpicker"})," class for automatic initialization. Global defaults are set with ",(0,n.jsx)(e.code,{children:"Selectpicker.setDefaults({ ... })"}),"."]})}),"\n",(0,n.jsx)(e.header,{children:(0,n.jsx)(e.h1,{id:"core-options",children:"Core options"})}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsxs)(e.p,{children:["Options can be passed via data attributes or JavaScript. For data attributes, append the option name to ",(0,n.jsx)(e.code,{children:"data-"}),", as in\n",(0,n.jsx)(e.code,{children:'data-style=""'})," or ",(0,n.jsx)(e.code,{children:'data-selected-text-format="count"'}),"."]}),"\n",(0,n.jsx)(e.admonition,{title:"Data attributes",type:"warning",children:(0,n.jsxs)(e.p,{children:["For security reasons, the ",(0,n.jsx)(e.code,{children:"sanitize"}),", ",(0,n.jsx)(e.code,{children:"sanitizeFn"}),", and ",(0,n.jsx)(e.code,{children:"whiteList"})," options cannot be supplied using data attributes."]})}),"\n",(0,n.jsx)(i.A,{html:String.raw`<table class="table table-bordered table-striped">
<thead>
<tr>
  <th style="width: 15%;">Name</th>
  <th style="width: 22%;">Type</th>
  <th style="width: 20%;">Default</th>
  <th style="width: 43%;">Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td>actionsBox</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>true</code>, adds two buttons to the top of the dropdown menu (<strong>Select All</strong> &amp; <strong>Deselect All</strong>).</p>
  </td>
</tr>
<tr>
  <td>container</td>
  <td>string | false</td>
  <td><code>false</code></td>
  <td>
      <p>When set to a string, appends the select to a specific element or selector, e.g., <code>container: 'body' | '.main-body'</code></p>
  </td>
</tr>
<tr>
  <td>countSelectedText</td>
  <td>string | function</td>
  <td><code>function</code></td>
  <td>
    <p>Sets the format for the text displayed when selectedTextFormat is <code>count</code> or <code>count > #</code>. {0} is the selected amount. {1} is total available for selection.</p>
    <p>When set to a function, the first parameter is the number of selected options, and the second is the total number of 
    options. The function must return a string.</p>
  </td>
</tr>
<tr>
  <td>deselectAllText</td>
  <td>string</td>
  <td><code>'Deselect All'</code></td>
  <td>
    <p>The text on the button that deselects all options when <code>actionsBox</code> is enabled.</p>
  </td>
</tr>
<tr>
  <td>dropdownAlignRight</td>
  <td>boolean | <code>'auto'</code></td>
  <td><code>false</code></td>
  <td>
    <p>Align the menu to the right instead of the left. If set to <code>'auto'</code>, the menu will automatically align right if there isn't room for the menu's full width when aligned to the left.</p>
  </td>
</tr>
<tr>
  <td>dropupAuto</td>
  <td>boolean</td>
  <td><code>true</code></td>
  <td>
    <p>checks to see which has more room, above or below. If the dropup has enough room to fully open normally, but
    there is more room above, the dropup still opens normally. Otherwise, it becomes a dropup. If dropupAuto is
    set to false, dropups must be called manually.</p>
  </td>
</tr>
<tr>
  <td>header</td>
  <td>string</td>
  <td><code>false</code></td>
  <td>
    <p>adds a header to the top of the menu; includes a close button by default</p>
  </td>
</tr>
<tr>
  <td>hideDisabled</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>removes disabled options and optgroups from the menu <code>data-hide-disabled: true</code></p>
  </td>
</tr>
<tr>
  <td>iconBase</td>
  <td>string</td>
  <td><code>''</code></td>
  <td>
    <p>Set the base class for an icon font such as Font Awesome. If changing <code>iconBase</code>, you might also want to change <code>tickIcon</code>, in case the icon font uses a different naming scheme.</p>
  </td>
</tr>
<tr>
  <td>liveSearch</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>true</code>, adds a search box to the top of the selectpicker dropdown.</p>
  </td>
</tr>
<tr>
  <td>liveSearchNormalize</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>Setting liveSearchNormalize to <code>true</code> allows for accent-insensitive searching.</p>
  </td>
</tr>
<tr>
  <td>liveSearchPlaceholder</td>
  <td>string</td>
  <td><code>null</code></td>
  <td>
    <p>When set to a string, a placeholder attribute equal to the string will be added to the liveSearch input.</p>
  </td>
</tr>
<tr>
  <td>liveSearchStyle</td>
  <td>string | function</td>
  <td><code>'contains'</code></td>
  <td>
    <p>When set to <code>'contains'</code>, searching will reveal options that contain the searched text. For example, searching for pl with return both Ap<b>pl</b>e, <b>Pl</b>um, and <b>Pl</b>antain. When set to <code>'startsWith'</code>, searching for pl will return only <b>Pl</b>um and <b>Pl</b>antain. If a function is used, the arguments are the option string and the searched text and it must return <code>true</code> if the option matches or <code>false<code>.</p>
  </td>
</tr>
<tr>
  <td>maxOptions</td>
  <td>integer | false</td>
  <td><code>false</code></td>
  <td>
    <p>When set to an integer and in a multi-select, the number of selected options cannot exceed the given value.</p>
    <p>This option can also exist as a data-attribute for an <code>&lt;optgroup&gt;</code>, in which case it only applies to that <code>&lt;optgroup&gt;</code>.</p>
  </td>
</tr>
<tr>
  <td>maxOptionsText</td>
  <td>string | array | function</td>
  <td><code>function</code></td>
  <td>
    <p>The text that is displayed when maxOptions is enabled and the maximum number of options for the given scenario have been selected.</p>
    <p>If a function is used, it must return an array. array[0] is the text used when maxOptions is applied to the entire select element. array[1] is the text used when maxOptions is used on an optgroup. If a string is used, the same text is used for both the element and the optgroup.</p>
  </td>
</tr>
<tr>
  <td>mobile</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>true</code>, enables the device's native menu for select menus.</p>
  </td>
</tr>
<tr>
  <td>multipleSeparator</td>
  <td>string</td>
  <td><code>', '</code></td>
  <td>
    <p>Set the character displayed in the button that separates selected options.</p>
  </td>
</tr>
<tr>
  <td>noneSelectedText</td>
  <td>string</td>
  <td><code>'Nothing selected'</code></td>
  <td>
    <p>The text that is displayed when a multiple select has no selected options.</p>
  </td>
</tr>
<tr>
  <td>noneResultsText</td>
  <td>string</td>
  <td><code>'No results matched {0}'</code></td>
  <td>
    <p>The text displayed when a search doesn't return any results.</p>
  </td>
</tr>
<tr>
  <td>selectAllText</td>
  <td>string</td>
  <td><code>'Select All'</code></td>
  <td>
    <p>The text on the button that selects all options when <code>actionsBox</code> is enabled.</p>
  </td>
</tr>
<tr>
  <td>selectedTextFormat</td>
  <td><code>'values'</code> | <code>'static'</code> | <code>'count'</code> | <code>'count > x'</code> (where x is an integer)</td>
  <td><code>'values'</code></td>
  <td>
    <p>Specifies how the selection is displayed with a multiple select.</p>
    <p>
      <code>'values'</code> displays a list of the selected options (separated by <code>multipleSeparator</code>).
      <br>
      <code>'static'</code> displays the configured placeholder text.
      <br>
      <code>'count > x'</code> behaves like <code>'values'</code> until the number of selected options is greater than x; after that, it displays the total number of selected options.
      <br>
      <code>'count'</code> is an alias for <code>'count > 1'</code>.
    </p>
  </td>
</tr>
<tr>
  <td>selectOnTab</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>true</code>, treats the tab character like the enter or space characters within the selectpicker dropdown.</p>
  </td>
</tr>
<tr>
  <td>showContent</td>
  <td>boolean</td>
  <td><code>true</code></td>
  <td>
    <p>When set to <code>true</code>, display custom HTML associated with selected option(s) in the button. When set to <code>false</code>, the option value will be displayed instead.</p>
  </td>
</tr>
<tr>
  <td>showIcon</td>
  <td>boolean</td>
  <td><code>true</code></td>
  <td>
    <p>When set to <code>true</code>, display icon(s) associated with selected option(s) in the button.</p>
  </td>
</tr>
<tr>
  <td>showSubtext</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>true</code>, display subtext associated with a selected option in the button.</p>
  </td>
</tr>
<tr>
  <td>showTick</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>Show checkmark on selected option (for items without <code>multiple</code> attribute).</p>
  </td>
</tr>
<tr>
  <td>size</td>
  <td><code>'auto'</code> | integer | false</td>
  <td><code>'auto'</code></td>
  <td>
    <p>When set to <code>'auto'</code>, the menu always opens up to show as many items as the window will allow
    without being cut off.</p>
    <p>When set to an integer, the menu will show the given number of items, even if the dropdown is cut off.</p>
    <p>When set to <code>false</code>, the menu will always show all items.</p>
  </td>
</tr>
<tr>
  <td>style</td>
  <td>string | null</td>
  <td>
    <code>'btn-light'</code>
  </td>
  <td>
    <p>When set to a string, add the value to the button's style.</p>
  </td>
</tr>
<tr>
  <td>styleBase</td>
  <td>string | null</td>
  <td><code>'btn'</code></td>
  <td>
    <p>The default class applied to the button. When using the <code>setStyle</code> method, this class will always remain.</p>
    <p>Hint: If you want to style the element as a form control, set style to <code>''</code> and styleBase to <code>'form-control'</code>.</p>
  </td>
</tr>
<tr>
  <td>tickIcon</td>
  <td>string</td>
  <td><code>'bs-ok-default'</code></td>
  <td>
    <p>Set which icon to use to display as the "tick" next to selected options.</p>
  </td>
</tr>
<tr>
  <td>virtualScroll</td>
  <td>boolean | integer</td>
  <td><code>600</code></td>
  <td>
    <p>If enabled, the items in the dropdown will be rendered using virtualization (i.e. only the items that are within the viewport will be rendered). This drastically improves performance for selects with a large number of options. Set to an integer to only use virtualization if the select has at least that number of options.</p>
  </td>
</tr>
<tr>
  <td>width</td>
  <td><code>'auto'</code> | <code>'fit'</code> | css-width | false (where <code>css-width</code> is a CSS width with units, e.g. <code>100px</code>)</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>auto</code>, the width of the selectpicker is automatically adjusted to accommodate the widest option.</p>
    <p>When set to a css-width, the width of the selectpicker is forced inline to the given value.</p>
    <p>When set to <code>false</code>, all width information is removed.</p>
  </td>
</tr>
<tr>
  <td>windowPadding</td>
  <td>integer | array</td>
  <td><code>0</code></td>
  <td>
    <p>This is useful in cases where the window has areas that the dropdown menu should not cover - for instance a fixed header. When set to an integer, the same padding will be added to all sides. Alternatively, an array of integers can be used in the format <code>[top, right, bottom, left]</code>.</p>
  </td>
</tr>
<tr>
  <td>sanitize</td>
  <td>boolean</td>
  <td><code>true</code></td>
  <td>
    <p>Enable or disable the sanitization. If activated, <code>'data-content'</code> on individual options will be sanitized.</p>
  </td>
</tr>
<tr>
  <td>whiteList</td>
  <td>object</td>
  <td><a href="#sanitizer">Default value</a></td>
  <td>
    <p>Object which contains allowed attributes and tags</p>
  </td>
</tr>
<tr>
  <td>sanitizeFn</td>
  <td>null | function</td>
  <td><code>null</code></td>
  <td>
    <p>Here you can supply your own sanitize function. This can be useful if you prefer to use a dedicated library to perform sanitization.</p>
  </td>
</tr>
</tbody>
</table>`}),"\n",(0,n.jsx)(e.h1,{id:"default-settings",children:"Default settings"}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsxs)(e.p,{children:["You can change the default settings for bootstrap-select by modifying its ",(0,n.jsx)(e.code,{children:"DEFAULTS"})," object (or by calling ",(0,n.jsx)(e.code,{children:"Selectpicker.setDefaults({ \u2026 })"}),"):"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:"Selectpicker.DEFAULTS.multipleSeparator = ' | ';\n"})}),"\n",(0,n.jsx)(e.h1,{id:"events",children:"Events"}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsx)(e.p,{children:"Bootstrap-select exposes a few events for hooking into select functionality."}),"\n",(0,n.jsxs)(e.p,{children:["hide.bs.select, hidden.bs.select, show.bs.select, and shown.bs.select all have a ",(0,n.jsx)(e.code,{children:"relatedTarget"})," property, whose value is the toggling anchor element."]}),"\n",(0,n.jsx)(i.A,{html:String.raw`<table class="table table-bordered table-striped">
<thead>
  <tr>
    <th>Event Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>show.bs.select</td>
    <td>This event fires immediately when the show instance method is called.</td>
  </tr>
  <tr>
    <td>shown.bs.select</td>
    <td>This event is fired when the dropdown has been made visible to the user (will wait for CSS transitions, to complete).</td>
  </tr>
  <tr>
    <td>hide.bs.select</td>
    <td>This event is fired immediately when the hide instance method has been called.</td>
  </tr>
  <tr>
    <td>hidden.bs.select</td>
    <td>This event is fired when the dropdown has finished being hidden from the user (will wait for CSS transitions, to complete).</td>
  </tr>
  <tr>
    <td>loaded.bs.select</td>
    <td>This event fires after the select has been initialized.</td>
  </tr>
  <tr>
    <td>rendered.bs.select</td>
    <td>This event fires after the render instance has been called.</td>
  </tr>
  <tr>
    <td>refreshed.bs.select</td>
    <td>This event fires after the refresh instance has been called.</td>
  </tr>
  <tr>
    <td>changed.bs.select</td>
    <td>
      <p>This event fires after the select's value has been changed. The detail object passes <code>clickedIndex</code>, <code>isSelected</code>, and <code>previousValue</code> via <code>event.detail</code>.</p>
      <p><code>previousValue</code> is the value of the select prior to being changed. If the select's value has been changed either via the <code>val()</code>, <code>selectAll()</code>, or <code>deselectAll()</code> methods, clickedIndex and isSelected will be <code>null</code>.</p>
    </td>
  </tr>
</tbody>
</table>`}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:"document.querySelector('#mySelect').addEventListener('changed.bs.select', function (e) {\n  const { clickedIndex, isSelected, previousValue } = e.detail;\n  // do something...\n});\n"})}),"\n",(0,n.jsx)(e.h2,{id:"sanitizer",children:"Sanitizer"}),"\n",(0,n.jsx)(e.hr,{}),"\n",(0,n.jsxs)(e.p,{children:["HTML added via the ",(0,n.jsx)(e.code,{children:"data-content"})," attribute on individual options is sanitized using our built-in sanitizer."]}),"\n",(0,n.jsxs)(e.p,{children:["The default ",(0,n.jsx)(e.code,{children:"whiteList"})," value is the following:"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:"var ARIA_ATTRIBUTE_PATTERN = /^aria-[\\w-]*$/i;\nvar DefaultWhitelist = {\n  // Global attributes allowed on any supplied element below.\n  '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style', ARIA_ATTRIBUTE_PATTERN],\n  a: ['target', 'href', 'title', 'rel'],\n  area: [],\n  b: [],\n  br: [],\n  col: [],\n  code: [],\n  div: [],\n  em: [],\n  hr: [],\n  h1: [],\n  h2: [],\n  h3: [],\n  h4: [],\n  h5: [],\n  h6: [],\n  i: [],\n  img: ['src', 'alt', 'title', 'width', 'height'],\n  li: [],\n  ol: [],\n  p: [],\n  pre: [],\n  s: [],\n  small: [],\n  span: [],\n  sub: [],\n  sup: [],\n  strong: [],\n  u: [],\n  ul: []\n}\n"})}),"\n",(0,n.jsxs)(e.p,{children:["If you want to add new values to this default ",(0,n.jsx)(e.code,{children:"whiteList"})," you can do the following:"]}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:"var myDefaultWhiteList = Selectpicker.DEFAULTS.whiteList;\n\n// To allow table elements\nmyDefaultWhiteList.table = [];\n\n// To allow td elements and data-option attributes on td elements\nmyDefaultWhiteList.td = ['data-option'];\n\n// You can push your custom regex to validate your attributes.\n// Be careful about your regular expressions being too lax\nvar myCustomRegex = /^data-my-app-[\\w-]+/;\nmyDefaultWhiteList['*'].push(myCustomRegex);\n"})}),"\n",(0,n.jsx)(e.p,{children:"If you want to bypass our sanitizer because you prefer to use a dedicated library, you should do the following:"}),"\n",(0,n.jsx)(e.pre,{children:(0,n.jsx)(e.code,{className:"language-js",children:"new Selectpicker('#yourSelect', {\n  sanitizeFn: function (domNodes) {\n    return DOMPurify.sanitize(domNodes)\n  }\n});\n"})}),"\n",(0,n.jsxs)(e.p,{children:["For performance reasons, our built-in sanitizer accepts an array of DOM nodes as its first argument, rather than an HTML string. Keep that in mind if deciding to use your own ",(0,n.jsx)(e.code,{children:"sanitizeFn"}),"."]})]})}function p(t={}){const{wrapper:e}={...(0,s.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(h,{...t})}):h(t)}},9069(t,e,d){d.d(e,{A:()=>n});d(6540);var o=d(4848);function n(t){let e=t.html;return(0,o.jsx)("div",{dangerouslySetInnerHTML:{__html:e}})}},8453(t,e,d){d.d(e,{R:()=>i,x:()=>a});var o=d(6540);const n={},s=o.createContext(n);function i(t){const e=o.useContext(s);return o.useMemo(function(){return"function"==typeof t?t(e):{...e,...t}},[e,t])}function a(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(n):t.components||n:i(t.components),o.createElement(s.Provider,{value:e},t.children)}}}]);