"use strict";(self.webpackChunk_crestapps_bootstrap_select=self.webpackChunk_crestapps_bootstrap_select||[]).push([[880],{4847(e,t,o){o.r(t),o.d(t,{assets:()=>r,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>l});const d=JSON.parse('{"id":"options","title":"Options","description":"bootstrap-select options, events, and sanitizer settings.","source":"@site/content/options.mdx","sourceDirName":".","slug":"/options","permalink":"/docs/options","draft":false,"unlisted":false,"editUrl":"https://github.com/CrestApps/bootstrap-select/tree/main/docs/content/options.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"title":"Options","description":"bootstrap-select options, events, and sanitizer settings."},"sidebar":"docs","previous":{"title":"Examples","permalink":"/docs/examples"},"next":{"title":"Methods","permalink":"/docs/methods"}}');var n=o(4848),s=o(8453),a=o(9069);const i={sidebar_position:3,title:"Options",description:"bootstrap-select options, events, and sanitizer settings."},c="Core options",r={},l=[{value:"Tags-style live search and open options",id:"tags-style-live-search-and-open-options",level:2},{value:"Sanitizer",id:"sanitizer",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.admonition,{title:"CrestApps fork",type:"info",children:(0,n.jsxs)(t.p,{children:["The options and data attributes documented on this page are part of the current forward-only API. Initialize with ",(0,n.jsx)(t.code,{children:"new Selectpicker('#sel', options)"})," or add the ",(0,n.jsx)(t.code,{children:"selectpicker"})," class for automatic initialization. Global defaults are set with ",(0,n.jsx)(t.code,{children:"Selectpicker.setDefaults({ ... })"}),"."]})}),"\n",(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"core-options",children:"Core options"})}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsxs)(t.p,{children:["Options can be passed via data attributes or JavaScript. For data attributes, append the option name to ",(0,n.jsx)(t.code,{children:"data-"}),", as in\n",(0,n.jsx)(t.code,{children:'data-style=""'})," or ",(0,n.jsx)(t.code,{children:'data-selected-text-format="count"'}),"."]}),"\n",(0,n.jsx)(t.admonition,{title:"Data attributes",type:"warning",children:(0,n.jsxs)(t.p,{children:["For security reasons, the ",(0,n.jsx)(t.code,{children:"sanitize"}),", ",(0,n.jsx)(t.code,{children:"sanitizeFn"}),", and ",(0,n.jsx)(t.code,{children:"whiteList"})," options cannot be supplied using data attributes."]})}),"\n",(0,n.jsx)(a.A,{html:String.raw`<table class="table table-bordered table-striped">
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
  <td>openOptions</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>When set to <code>true</code>, the live-search UI shows a <strong>Create</strong> action whenever the current search text does not exactly match an existing option.</p>
    <p>If <code>options.source.create(callback, searchValue)</code> is supplied, it will be used to resolve the created option. Otherwise the control creates a local option using the search text for both <code>text</code> and <code>value</code>.</p>
  </td>
</tr>
<tr>
  <td>openOptionsText</td>
  <td>string</td>
  <td><code>'Create "{0}"'</code></td>
  <td>
    <p>Sets the label for the open-option create action. <code>{0}</code> is replaced with the current search text.</p>
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
  <td>placeholder</td>
  <td>string | null</td>
  <td><code>null</code></td>
  <td>
    <p>Sets the placeholder text shown in the button when nothing is selected.</p>
    <p>For backward compatibility, a single select's <code>title</code> attribute is also used when <code>placeholder</code> is not set.</p>
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
  <td>showSelectedTags</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>For live-search selects, shows the current selections as removable tags that stay visible on the control, similar to a taxonomy tags editor. The button uses a compact summary instead of repeating the selected values.</p>
  </td>
</tr>
<tr>
  <td>showTick</td>
  <td>boolean</td>
  <td><code>false</code></td>
  <td>
    <p>Shows the default checkmark indicator on single-select menus. Multiselect menus already render a selection indicator by default.</p>
  </td>
</tr>
<tr>
  <td>selectedItemsStyle</td>
  <td><code>'tags'</code> | <code>'list'</code></td>
  <td><code>'tags'</code></td>
  <td>
    <p>Controls how removable selected items are rendered when <code>showSelectedTags</code> is enabled. Use <code>'list'</code> to render them as a Bootstrap list group with a remove button aligned to the right.</p>
  </td>
</tr>
<tr>
  <td>selectedTagRemoveLabel</td>
  <td>string</td>
  <td><code>'Remove'</code></td>
  <td>
    <p>Accessible label prefix used for each removable selected item when <code>showSelectedTags</code> is enabled.</p>
  </td>
</tr>
<tr>
  <td>selectionIndicator</td>
  <td><code>'checkmark'</code> | <code>'checkbox'</code></td>
  <td><code>'checkmark'</code></td>
  <td>
    <p>Controls how selected items are indicated in the dropdown. Use <code>'checkbox'</code> to render a Bootstrap-style checkbox column on multiselects, or radio-style indicators automatically on single selects, instead of the default floating checkmark.</p>
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
  <td><code>'auto'</code> | <code>'fit'</code> | css-width | false</td>
  <td><code>false</code></td>
  <td>
    <p>Controls the rendered width of the picker. Use the <code>data-width</code> attribute in markup or pass <code>width</code> in JavaScript.</p>
    <p><code>'auto'</code> expands to the widest option, <code>'fit'</code> keeps the control compact to the selected option, and a CSS width such as <code>300px</code> or <code>75%</code> is applied inline.</p>
    <p>When set to <code>false</code>, the picker follows the width of its container.</p>
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
    <p>Supply your own sanitize function when you want to keep the built-in zero-dependency default off the critical path and let application code use a dedicated sanitizer library instead.</p>
    <p>The function receives an array of DOM nodes and should sanitize each node in place.</p>
  </td>
</tr>
</tbody>
</table>`}),"\n",(0,n.jsx)(t.admonition,{title:"Bootstrap 5 runtime defaults",type:"info",children:(0,n.jsxs)(t.p,{children:["This Bootstrap 5 build no longer supports the legacy ",(0,n.jsx)(t.code,{children:"container"}),", ",(0,n.jsx)(t.code,{children:"mobile"}),", ",(0,n.jsx)(t.code,{children:"styleBase"}),", or ",(0,n.jsx)(t.code,{children:"windowPadding"})," options. When ",(0,n.jsx)(t.code,{children:"width"})," is not set, the picker follows normal Bootstrap sizing and fills its container by default."]})}),"\n",(0,n.jsx)(t.h2,{id:"tags-style-live-search-and-open-options",children:"Tags-style live search and open options"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"showSelectedTags"})," and ",(0,n.jsx)(t.code,{children:"openOptions"})," settings are intended for taxonomy-style editors where authors need to keep selected values visible while continuing to search."]}),"\n",(0,n.jsx)(t.p,{children:"When both are enabled on a multiple select:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"Selected values stay visible as removable tags on the control while the search UI stays available."}),"\n",(0,n.jsx)(t.li,{children:"Typing a value that does not exactly match an existing option shows a create action."}),"\n",(0,n.jsx)(t.li,{children:"Choosing that action creates and selects the option immediately."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Use data attributes when local in-browser creation is enough:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-html",children:'<select\n  class="selectpicker"\n  multiple\n  data-live-search="true"\n  data-show-selected-tags="true"\n  data-open-options="true"\n  placeholder="Search or create tags">\n  <option selected>Orchard Core</option>\n  <option>Vue</option>\n  <option>Taxonomy</option>\n</select>\n'})}),"\n",(0,n.jsx)(t.p,{children:"Use JavaScript when the picker is backed by a remote source and new terms must be saved first:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"new Selectpicker('#tag-editor', {\n  liveSearch: true,\n  showSelectedTags: true,\n  openOptions: true,\n  openOptionsText: 'Create tag \"{0}\"',\n  selectedTagRemoveLabel: 'Remove tag',\n  selectionIndicator: 'checkbox',\n  source: {\n    data: function (callback) {\n      callback(existingTags);\n    },\n    search: function (callback, page, searchValue) {\n      callback(findMatchingTags(searchValue));\n    },\n    create: function (callback, searchValue) {\n      createTag(searchValue).then(function (tag) {\n        callback({\n          text: tag.displayText,\n          value: tag.id\n        });\n      });\n    }\n  }\n});\n"})}),"\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"source.create"})," can return the created option synchronously, invoke the provided callback later, or resolve a Promise. In each case, the picker adds the returned option and selects it automatically."]}),"\n",(0,n.jsx)(t.h1,{id:"default-settings",children:"Default settings"}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsxs)(t.p,{children:["You can change the default settings for bootstrap-select by modifying its ",(0,n.jsx)(t.code,{children:"DEFAULTS"})," object (or by calling ",(0,n.jsx)(t.code,{children:"Selectpicker.setDefaults({ \u2026 })"}),"):"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"Selectpicker.DEFAULTS.multipleSeparator = ' | ';\n"})}),"\n",(0,n.jsx)(t.h1,{id:"events",children:"Events"}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsxs)(t.p,{children:["bootstrap-select emits native ",(0,n.jsx)(t.code,{children:"CustomEvent"}),"s on the original ",(0,n.jsx)(t.code,{children:"<select>"})," element.\nSee the dedicated ",(0,n.jsx)(t.a,{href:"/docs/events",children:"Events"})," page for the full event reference, event\npayload details, and examples for ",(0,n.jsx)(t.code,{children:"changed.bs.select"}),", ",(0,n.jsx)(t.code,{children:"show.bs.select"}),", and\nthe rest of the public event surface."]}),"\n",(0,n.jsx)(t.h2,{id:"sanitizer",children:"Sanitizer"}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsxs)(t.p,{children:["HTML added via the ",(0,n.jsx)(t.code,{children:"data-content"})," attribute on individual options is sanitized using the built-in zero-dependency sanitizer."]}),"\n",(0,n.jsxs)(t.p,{children:["The default ",(0,n.jsx)(t.code,{children:"whiteList"})," value is the following:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"var ARIA_ATTRIBUTE_PATTERN = /^aria-[\\w-]*$/i;\nvar DefaultWhitelist = {\n  // Global attributes allowed on any supplied element below.\n  '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style', ARIA_ATTRIBUTE_PATTERN],\n  a: ['target', 'href', 'title', 'rel'],\n  area: [],\n  b: [],\n  br: [],\n  col: [],\n  code: [],\n  div: [],\n  em: [],\n  hr: [],\n  h1: [],\n  h2: [],\n  h3: [],\n  h4: [],\n  h5: [],\n  h6: [],\n  i: [],\n  img: ['src', 'alt', 'title', 'width', 'height'],\n  li: [],\n  ol: [],\n  p: [],\n  pre: [],\n  s: [],\n  small: [],\n  span: [],\n  sub: [],\n  sup: [],\n  strong: [],\n  u: [],\n  ul: []\n}\n"})}),"\n",(0,n.jsxs)(t.p,{children:["If you want to add new values to this default ",(0,n.jsx)(t.code,{children:"whiteList"})," you can do the following:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"var myDefaultWhiteList = Selectpicker.DEFAULTS.whiteList;\n\n// To allow table elements\nmyDefaultWhiteList.table = [];\n\n// To allow td elements and data-option attributes on td elements\nmyDefaultWhiteList.td = ['data-option'];\n\n// You can push your custom regex to validate your attributes.\n// Be careful about your regular expressions being too lax\nvar myCustomRegex = /^data-my-app-[\\w-]+/;\nmyDefaultWhiteList['*'].push(myCustomRegex);\n"})}),"\n",(0,n.jsxs)(t.p,{children:["If you prefer to use a dedicated sanitizer library such as DOMPurify, load or install it in your application and wire it through ",(0,n.jsx)(t.code,{children:"sanitizeFn"}),":"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import DOMPurify from 'dompurify';\n\nnew Selectpicker('#yourSelect', {\n  sanitizeFn: function (domNodes) {\n    domNodes.forEach(function (node) {\n      node.innerHTML = DOMPurify.sanitize(node.innerHTML);\n    });\n  }\n});\n"})}),"\n",(0,n.jsxs)(t.p,{children:["For performance reasons, bootstrap-select passes an array of DOM nodes to ",(0,n.jsx)(t.code,{children:"sanitizeFn"}),", not an HTML string. If you use a third-party sanitizer, sanitize each node in place as shown above."]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},9069(e,t,o){o.d(t,{A:()=>n});o(6540);var d=o(4848);function n(e){let t=e.html;return(0,d.jsx)("div",{dangerouslySetInnerHTML:{__html:t}})}},8453(e,t,o){o.d(t,{R:()=>a,x:()=>i});var d=o(6540);const n={},s=d.createContext(n);function a(e){const t=d.useContext(s);return d.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),d.createElement(s.Provider,{value:t},e.children)}}}]);