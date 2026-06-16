"use strict";(self.webpackChunk_crestapps_bootstrap_select=self.webpackChunk_crestapps_bootstrap_select||[]).push([[708],{8169(e,t,o){o.r(t),o.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"examples","title":"Examples","description":"Live bootstrap-select examples hosted by the Docusaurus docs site.","source":"@site/versioned_docs/version-1.0/examples.mdx","sourceDirName":".","slug":"/examples","permalink":"/docs/1.0/examples","draft":false,"unlisted":false,"editUrl":"https://github.com/CrestApps/bootstrap-select/tree/main/docs/versioned_docs/version-1.0/examples.mdx","tags":[],"version":"1.0","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"title":"Examples","description":"Live bootstrap-select examples hosted by the Docusaurus docs site."},"sidebar":"docs","previous":{"title":"Getting Started","permalink":"/docs/1.0/"},"next":{"title":"Options","permalink":"/docs/1.0/options"}}');var i=o(4848),s=o(8453),l=o(5194);const a={sidebar_position:2,title:"Examples",description:"Live bootstrap-select examples hosted by the Docusaurus docs site."},c="Basic examples",p={},d=[{value:"Standard select boxes",id:"standard-select-boxes",level:2},{value:"Select boxes with optgroups",id:"select-boxes-with-optgroups",level:2},{value:"Multiple select boxes",id:"multiple-select-boxes",level:2},{value:"Live search",id:"live-search-1",level:2},{value:"Key words",id:"key-words",level:2},{value:"Placeholder",id:"placeholder",level:2},{value:"Selected text",id:"selected-text",level:2},{value:"Selected text format",id:"selected-text-format",level:2},{value:"Button classes",id:"button-classes",level:2},{value:"Checkmark on selected option",id:"checkmark-on-selected-option",level:2},{value:"Menu arrow",id:"menu-arrow",level:2},{value:"Style individual options",id:"style-individual-options",level:2},{value:"Width",id:"width",level:2},{value:"Icons",id:"icons",level:2},{value:"Custom content",id:"custom-content",level:2},{value:"Subtext",id:"subtext",level:2},{value:"Menu size",id:"menu-size",level:2},{value:"Select/deselect all options",id:"selectdeselect-all-options",level:2},{value:"Divider",id:"divider",level:2},{value:"Menu header",id:"menu-header",level:2},{value:"Container",id:"container",level:2},{value:"Dropup menu",id:"dropup-menu",level:2},{value:"Disabled select box",id:"disabled-select-box",level:2},{value:"Disabled options",id:"disabled-options",level:2},{value:"Disabled option groups",id:"disabled-option-groups",level:2}];function r(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"basic-examples",children:"Basic examples"})}),"\n",(0,i.jsx)(t.admonition,{title:"CrestApps fork",type:"info",children:(0,i.jsxs)(t.p,{children:["The examples use the vanilla JavaScript / Bootstrap 5+ API: ",(0,i.jsx)(t.code,{children:"new Selectpicker(el)"})," or the ",(0,i.jsx)(t.code,{children:"selectpicker"})," class, which auto-initializes. jQuery is not required."]})}),"\n",(0,i.jsxs)("div",{className:"standaloneExamples",children:[(0,i.jsxs)("div",{className:"standaloneExampleCard",children:[(0,i.jsx)("h3",{children:"Standalone basic"}),(0,i.jsx)("p",{children:"Open the local plugin build on a plain HTML page."}),(0,i.jsx)("a",{className:"button button--primary",href:"../examples/basic.html",children:"Open basic example"})]}),(0,i.jsxs)("div",{className:"standaloneExampleCard",children:[(0,i.jsx)("h3",{children:"Live search"}),(0,i.jsx)("p",{children:"Test search filtering against hosted example markup."}),(0,i.jsx)("a",{className:"button button--primary",href:"../examples/live-search.html",children:"Open live search"})]}),(0,i.jsxs)("div",{className:"standaloneExampleCard",children:[(0,i.jsx)("h3",{children:"Multiple select"}),(0,i.jsx)("p",{children:"Verify multiselect and action-box behavior."}),(0,i.jsx)("a",{className:"button button--primary",href:"../examples/multiple.html",children:"Open multiselect"})]})]}),"\n",(0,i.jsx)(t.h2,{id:"standard-select-boxes",children:"Standard select boxes"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <p>Make this:</p>

<select>
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>

<p>Become this:</p>

<select class="selectpicker">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)("span",{id:"optgroup"}),"\n",(0,i.jsx)(t.h2,{id:"select-boxes-with-optgroups",children:"Select boxes with optgroups"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <optgroup label="Picnic">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </optgroup>
  <optgroup label="Camping">
    <option>Tent</option>
    <option>Flashlight</option>
    <option>Toilet Paper</option>
  </optgroup>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <optgroup label="Picnic">\n    <option>Mustard</option>\n    <option>Ketchup</option>\n    <option>Relish</option>\n  </optgroup>\n  <optgroup label="Camping">\n    <option>Tent</option>\n    <option>Flashlight</option>\n    <option>Toilet Paper</option>\n  </optgroup>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"multiple-select-boxes",children:"Multiple select boxes"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" multiple>
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" multiple>\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"live-search",children:"Live search"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"live-search-1",children:"Live search"}),"\n",(0,i.jsxs)(t.p,{children:["You can add a search input by passing ",(0,i.jsx)(t.code,{children:'data-live-search="true"'})," attribute:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" data-live-search="true" data-width="fit">
  <option>Hot Dog, Fries and a Soda</option>
  <option>Burger, Shake and a Smile</option>
  <option>Sugar, Spice and all things nice</option>
</select>`,className:"no-code"}),"\n",(0,i.jsx)(t.h2,{id:"key-words",children:"Key words"}),"\n",(0,i.jsxs)(t.p,{children:["Add key words to options to improve their searchability using ",(0,i.jsx)(t.code,{children:"data-tokens"}),"."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" data-live-search="true" data-width="fit">
  <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
  <option data-tokens="mustard">Burger, Shake and a Smile</option>
  <option data-tokens="frosting">Sugar, Spice and all things nice</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-live-search="true">\n  <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>\n  <option data-tokens="mustard">Burger, Shake and a Smile</option>\n  <option data-tokens="frosting">Sugar, Spice and all things nice</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"limit-the-number-of-selections",children:"Limit the number of selections"}),"\n",(0,i.jsxs)(t.p,{children:["Limit the number of options that can be selected via the ",(0,i.jsx)(t.code,{children:"data-max-options"})," attribute. It also works for option groups. Customize the message displayed when the limit is reached with ",(0,i.jsx)(t.code,{children:"maxOptionsText"}),"."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="row g-3">
  <div class="col-md-6">
    <label for="max-options-example">Overall limit</label>
    <select id="max-options-example" class="selectpicker" multiple data-max-options="2" data-width="100%">
      <option>Mustard</option>
      <option>Ketchup</option>
      <option>Relish</option>
    </select>
  </div>

  <div class="col-md-6">
    <label for="max-options-groups-example">Per-group limit</label>
    <select id="max-options-groups-example" class="selectpicker" multiple data-width="100%">
      <optgroup label="Condiments" data-max-options="2">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </optgroup>
      <optgroup label="Breads" data-max-options="2">
        <option>Plain</option>
        <option>Steamed</option>
        <option>Toasted</option>
      </optgroup>
    </select>
  </div>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<div class="row g-3">\n  <div class="col-md-6">\n    <label for="max-options-example">Overall limit</label>\n    <select id="max-options-example" class="selectpicker" multiple data-max-options="2" data-width="100%">\n      <option>Mustard</option>\n      <option>Ketchup</option>\n      <option>Relish</option>\n    </select>\n  </div>\n\n  <div class="col-md-6">\n    <label for="max-options-groups-example">Per-group limit</label>\n    <select id="max-options-groups-example" class="selectpicker" multiple data-width="100%">\n      <optgroup label="Condiments" data-max-options="2">\n        <option>Mustard</option>\n        <option>Ketchup</option>\n        <option>Relish</option>\n      </optgroup>\n      <optgroup label="Breads" data-max-options="2">\n        <option>Plain</option>\n        <option>Steamed</option>\n        <option>Toasted</option>\n      </optgroup>\n    </select>\n  </div>\n</div>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"custom-button-text",children:"Custom button text"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"placeholder",children:"Placeholder"}),"\n",(0,i.jsx)("p",{id:"titleMultiples"}),"\n",(0,i.jsxs)(t.p,{children:["Use the ",(0,i.jsx)(t.code,{children:"placeholder"})," attribute to set the default placeholder text when nothing is selected. This works for both multiple and standard select boxes:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="form-group">
  <label>Multiple</label>
  <select class="selectpicker" multiple placeholder="Choose one of the following..." data-width="fit">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>

<div class="form-group">
  <label>Standard</label>
  <select class="selectpicker" placeholder="Choose one of the following..." data-width="fit">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" multiple placeholder="Choose one of the following...">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"selected-text",children:"Selected text"}),"\n",(0,i.jsx)("p",{id:"title"}),"\n",(0,i.jsxs)(t.p,{children:["Set the ",(0,i.jsx)(t.code,{children:"title"})," attribute on individual options to display alternative text when the option is selected:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option title="Combo 1">Hot Dog, Fries and a Soda</option>
  <option title="Combo 2">Burger, Shake and a Smile</option>
  <option title="Combo 3">Sugar, Spice and all things nice</option>
</select>`,className:"no-code"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <option title="Combo 1">Hot Dog, Fries and a Soda</option>\n  <option title="Combo 2">Burger, Shake and a Smile</option>\n  <option title="Combo 3">Sugar, Spice and all things nice</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"selected-text-format",children:"Selected text format"}),"\n",(0,i.jsx)("p",{id:"titleMultiplesFormat"}),"\n",(0,i.jsxs)(t.p,{children:["Specify how the selection is displayed with the ",(0,i.jsx)(t.code,{children:"data-selected-text-format"})," attribute on a multiple select."]}),"\n",(0,i.jsx)(t.p,{children:"The supported values are:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"values"}),": A comma delimited list of selected values (default)"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"count"}),": If one item is selected, then the option value is shown. If more than one is selected then the number of selected items is displayed, e.g. ",(0,i.jsx)(t.code,{children:"2 of 6 selected"})]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"count > x"}),": Where ",(0,i.jsx)(t.code,{children:"x"})," is the number of items selected when the display format changes from ",(0,i.jsx)(t.code,{children:"values"})," to ",(0,i.jsx)(t.code,{children:"count"})]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"static"}),": Always show the placeholder, regardless of selection"]}),"\n"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" multiple data-selected-text-format="count">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" multiple data-selected-text-format="count">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" multiple data-selected-text-format="count > 3">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
  <option>Onions</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" multiple data-selected-text-format="count > 3">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n  <option>Onions</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"styling",children:"Styling"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"button-classes",children:"Button classes"}),"\n",(0,i.jsxs)(t.p,{children:["You can set the button classes via the ",(0,i.jsx)(t.code,{children:"data-style"})," attribute:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="form-group">
  <select class="selectpicker" data-style="btn-primary">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>
<div class="form-group">
  <select class="selectpicker" data-style="btn-info">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>
<div class="form-group">
  <select class="selectpicker" data-style="btn-success">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>
<div class="form-group">
  <select class="selectpicker" data-style="btn-warning">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>
<div class="form-group">
  <select class="selectpicker" data-style="btn-danger">
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </select>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-style="btn-primary">\n  ...\n</select>\n\n<select class="selectpicker" data-style="btn-info">\n  ...\n</select>\n\n<select class="selectpicker" data-style="btn-success">\n  ...\n</select>\n\n<select class="selectpicker" data-style="btn-warning">\n  ...\n</select>\n\n<select class="selectpicker" data-style="btn-danger">\n  ...\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"checkmark-on-selected-option",children:"Checkmark on selected option"}),"\n",(0,i.jsxs)(t.p,{children:["You can also show the checkmark icon on standard select boxes with the ",(0,i.jsx)(t.code,{children:"show-tick"})," class:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker show-tick">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker show-tick">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"menu-arrow",children:"Menu arrow"}),"\n",(0,i.jsxs)(t.p,{children:["The Bootstrap menu arrow can be added with the ",(0,i.jsx)(t.code,{children:"show-menu-arrow"})," class:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker show-menu-arrow">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker show-menu-arrow">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"style-individual-options",children:"Style individual options"}),"\n",(0,i.jsx)("p",{id:"classes"}),"\n",(0,i.jsx)(t.p,{children:"Classes and styles added to options are transferred to the select box:"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option>Mustard</option>
  <option class="special">Ketchup</option>
  <option style="background: #5cb85c; color: #fff;">Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <option>Mustard</option>\n  <option class="special">Ketchup</option>\n  <option style="background: #5cb85c; color: #fff;">Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-css",children:".special {\n  font-weight: bold !important;\n  color: #fff !important;\n  background: #bc0000 !important;\n  text-transform: uppercase;\n}\n"})}),"\n",(0,i.jsx)(t.h2,{id:"width",children:"Width"}),"\n",(0,i.jsx)("p",{id:"grid"}),"\n",(0,i.jsx)(t.p,{children:"Wrap selects in grid columns, or any custom parent element, to easily enforce desired widths."}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="row">
  <div class="col-sm-3">
    <div class="form-group">
      <select class="selectpicker form-control">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
    </div>
  </div>
  <div class="col-sm-9">
    <div class="form-group">
      <select class="selectpicker form-control">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-4">
     <div class="form-group">
      <select class="selectpicker form-control">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
    </div>
  </div>
  <div class="col-sm-8">
     <div class="form-group">
      <select class="selectpicker form-control">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-5">
    <div class="form-group">
      <select class="selectpicker form-control">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
    </div>
  </div>
  <div class="col-sm-7">
    <div class="form-group">
      <select class="selectpicker form-control">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
    </div>
  </div>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<div class="row">\n  <div class="col-sm-3">\n    <div class="form-group">\n      <select class="selectpicker form-control">\n        <option>Mustard</option>\n        <option>Ketchup</option>\n        <option>Relish</option>\n      </select>\n    </div>\n  </div>\n</div>\n'})}),"\n",(0,i.jsx)("div",{id:"data-width"}),"\n",(0,i.jsxs)(t.p,{children:["Alternatively, use the ",(0,i.jsx)(t.code,{children:"data-width"})," attribute to set the width of the select. Set ",(0,i.jsx)(t.code,{children:"data-width"})," to ",(0,i.jsx)(t.code,{children:"'auto'"})," to automatically adjust the width of the select to its widest option. ",(0,i.jsx)(t.code,{children:"'fit'"})," automatically adjusts the width of the select to the width of its currently selected option. An exact value can also be specified, e.g., ",(0,i.jsx)(t.code,{children:"300px"})," or ",(0,i.jsx)(t.code,{children:"50%"}),"."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="row">
  <div class="col-sm-12">
    <div class="form-group">
      <label><code>width: 'auto'</code></label>
      <select class="selectpicker form-control" data-width="auto">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
        <option>All of the above (and much, much more!)</option>
      </select>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-12">
    <div class="form-group">
      <label><code>width: 'fit'</code></label>
      <select class="selectpicker form-control" data-width="fit">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
        <option>All of the above (and much, much more!)</option>
      </select>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-12">
    <div class="form-group">
      <label><code>width: '150px'</code></label>
      <select class="selectpicker form-control" data-width="150px">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
        <option>All of the above (and much, much more!)</option>
      </select>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm-12">
    <div class="form-group">
      <label><code>width: '75%'</code></label>
      <select class="selectpicker form-control" data-width="75%">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
        <option>All of the above (and much, much more!)</option>
      </select>
    </div>
  </div>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-width="auto">\n  ...\n</select>\n<select class="selectpicker" data-width="fit">\n  ...\n</select>\n<select class="selectpicker" data-width="100px">\n  ...\n</select>\n<select class="selectpicker" data-width="75%">\n  ...\n</select>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"customize-options",children:"Customize options"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"icons",children:"Icons"}),"\n",(0,i.jsxs)(t.p,{children:["Add an icon to an option or optgroup with the ",(0,i.jsx)(t.code,{children:"data-icon"})," attribute:"]}),"\n",(0,i.jsx)(t.admonition,{title:"Bootstrap 5 icons",type:"info",children:(0,i.jsxs)(t.p,{children:["Bootstrap 5 does not include an icon font. To use Font Awesome or another icon library, set ",(0,i.jsx)(t.code,{children:"iconBase"})," and ",(0,i.jsx)(t.code,{children:"tickIcon"})," to match that library."]})}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option data-icon="fa-glass">Mustard</option>
  <option data-icon="fa-heart">Ketchup</option>
  <option data-icon="fa-film">Relish</option>
  <option data-icon="fa-home">Mayonnaise</option>
  <option data-icon="fa-print">Barbecue Sauce</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <option data-icon="fa-heart">Ketchup</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"custom-content",children:"Custom content"}),"\n",(0,i.jsxs)(t.p,{children:["Insert custom HTML into the option with the ",(0,i.jsx)(t.code,{children:"data-content"})," attribute:"]}),"\n",(0,i.jsx)(t.admonition,{title:"Custom content is sanitized",type:"warning",children:(0,i.jsxs)(t.p,{children:["This feature inserts HTML into the DOM. By default, it is sanitized using our built-in ",(0,i.jsx)(t.a,{href:"../options#sanitizer",children:"sanitizer"}),"."]})}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option data-content="<span class='badge text-bg-warning'>Mustard</span>">Mustard</option>
  <option data-content="<span class='badge text-bg-danger'>Ketchup</span>">Ketchup</option>
  <option data-content="<span class='badge text-bg-success'>Relish</span>">Relish</option>
  <option data-content="<span class='badge text-bg-info'>Mayonnaise</span>">Mayonnaise</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <option data-content="<span class=\'badge text-bg-success\'>Relish</span>">Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"subtext",children:"Subtext"}),"\n",(0,i.jsxs)(t.p,{children:["Add subtext to an option or optgroup with the ",(0,i.jsx)(t.code,{children:"data-subtext"})," attribute:"]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="form-group">
  <select class="selectpicker">
    <option data-subtext="French's">Mustard</option>
    <option data-subtext="Heinz">Ketchup</option>
    <option data-subtext="Sweet">Relish</option>
    <option data-subtext="Miracle Whip">Mayonnaise</option>
    <option data-divider="true"></option>
    <option data-subtext="Honey">Barbecue Sauce</option>
    <option data-subtext="Ranch">Salad Dressing</option>
    <option data-subtext="Sweet & Spicy">Tabasco</option>
    <option data-subtext="Chunky">Salsa</option>
  </select>
</div>

<div class="form-group">
  <select class="selectpicker" data-show-subtext="true">
    <option data-subtext="French's">Mustard</option>
    <option data-subtext="Heinz">Ketchup</option>
    <option data-subtext="Sweet">Relish</option>
    <option data-subtext="Miracle Whip">Mayonnaise</option>
    <option data-divider="true"></option>
    <option data-subtext="Honey">Barbecue Sauce</option>
    <option data-subtext="Ranch">Salad Dressing</option>
    <option data-subtext="Sweet & Spicy">Tabasco</option>
    <option data-subtext="Chunky">Salsa</option>
  </select>
  <span class="help-block">With <code>showSubtext</code> set to true.</span>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-size="5">\n  <option data-subtext="Heinz">Ketchup</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"customize-menu",children:"Customize menu"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"menu-size",children:"Menu size"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"size"})," option is set to ",(0,i.jsx)(t.code,{children:"'auto'"})," by default. When ",(0,i.jsx)(t.code,{children:"size"})," is set to ",(0,i.jsx)(t.code,{children:"'auto'"}),", the menu always opens up to show as many items as the window will allow without being cut off. Set ",(0,i.jsx)(t.code,{children:"size"})," to ",(0,i.jsx)(t.code,{children:"false"})," to always show all items. The size of the menu can also be specifed using the ",(0,i.jsx)(t.code,{children:"data-size"})," attribute."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
  <option>Mayonnaise</option>
  <option>Barbecue Sauce</option>
  <option>Salad Dressing</option>
  <option>Tabasco</option>
  <option>Salsa</option>
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
  <option>Mayonnaise</option>
  <option>Barbecue Sauce</option>
  <option>Salad Dressing</option>
  <option>Tabasco</option>
  <option>Salsa</option>
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
  <option>Mayonnaise</option>
  <option>Barbecue Sauce</option>
  <option>Salad Dressing</option>
  <option>Tabasco</option>
  <option>Salsa</option>
</select>`}),"\n",(0,i.jsx)("p",{id:"data-size"}),"\n",(0,i.jsxs)(t.p,{children:["Specify a number for ",(0,i.jsx)(t.code,{children:"data-size"})," to choose the maximum number of items to show in the menu."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" data-size="5">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
  <option>Mayonnaise</option>
  <option>Barbecue Sauce</option>
  <option>Salad Dressing</option>
  <option>Tabasco</option>
  <option>Salsa</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-size="5">\n  ...\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"selectdeselect-all-options",children:"Select/deselect all options"}),"\n",(0,i.jsxs)(t.p,{children:["Adds two buttons to the top of the menu - ",(0,i.jsx)(t.strong,{children:"Select All"})," & ",(0,i.jsx)(t.strong,{children:"Deselect All"})," with ",(0,i.jsx)(t.code,{children:'data-actions-box="true"'}),"."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" multiple data-actions-box="true">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" multiple data-actions-box="true">\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"divider",children:"Divider"}),"\n",(0,i.jsxs)(t.p,{children:["Add ",(0,i.jsx)(t.code,{children:'data-divider="true"'})," to an option to turn it into a divider."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
  <option>Mayonnaise</option>
  <option data-divider="true"></option>
  <option>Barbecue Sauce</option>
  <option>Salad Dressing</option>
  <option>Tabasco</option>
  <option>Salsa</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-size="5">\n  <option data-divider="true"></option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"menu-header",children:"Menu header"}),"\n",(0,i.jsxs)(t.p,{children:["Add a header to the dropdown menu, e.g. ",(0,i.jsx)(t.code,{children:"header: 'Select a condiment'"})," or ",(0,i.jsx)(t.code,{children:'data-header="Select a condiment"'})]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="row">
  <div class="col-md-3">
    <select class="selectpicker form-control" data-header="Select a condiment">
      <option data-subtext="French's">Mustard</option>
      <option data-subtext="Heinz">Ketchup</option>
      <option data-subtext="Sweet">Relish</option>
      <option data-subtext="Miracle Whip">Mayonnaise</option>
      <option data-divider="true"></option>
      <option data-subtext="Honey">Barbecue Sauce</option>
      <option data-subtext="Ranch">Salad Dressing</option>
      <option data-subtext="Sweet & Spicy">Tabasco</option>
      <option data-subtext="Chunky">Salsa</option>
    </select>
  </div>
</div>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" data-header="Select a condiment">\n  ...\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"container",children:"Container"}),"\n",(0,i.jsxs)(t.p,{children:["Append the select menu to a specific element, e.g. ",(0,i.jsx)(t.code,{children:"container: 'body'"})," or ",(0,i.jsx)(t.code,{children:'data-container=".main-content"'}),". This is useful if the select element is inside an element with ",(0,i.jsx)(t.code,{children:"overflow: hidden"}),"."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <div class="row">
  <div class="col-md-3">
    <label><code>container: false</code></label>
    <select class="selectpicker form-control">
      <option data-subtext="French's">Mustard</option>
      <option data-subtext="Heinz">Ketchup</option>
      <option data-subtext="Sweet">Relish</option>
      <option data-subtext="Miracle Whip">Mayonnaise</option>
      <option data-divider="true"></option>
      <option data-subtext="Honey">Barbecue Sauce</option>
      <option data-subtext="Ranch">Salad Dressing</option>
      <option data-subtext="Sweet & Spicy">Tabasco</option>
      <option data-subtext="Chunky">Salsa</option>
    </select>
  </div>
  <div class="col-md-3">
  <label><code>container: 'body'</code></label>
    <select class="selectpicker form-control" data-container="body">
      <option data-subtext="French's">Mustard</option>
      <option data-subtext="Heinz">Ketchup</option>
      <option data-subtext="Sweet">Relish</option>
      <option data-subtext="Miracle Whip">Mayonnaise</option>
      <option data-divider="true"></option>
      <option data-subtext="Honey">Barbecue Sauce</option>
      <option data-subtext="Ranch">Salad Dressing</option>
      <option data-subtext="Sweet & Spicy">Tabasco</option>
      <option data-subtext="Chunky">Salsa</option>
    </select>
  </div>
</div>`,style:{overflow:"hidden"}}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<div style="overflow:hidden;">\n  <select class="selectpicker">\n    ...\n  </select>\n  <select class="selectpicker" data-container="body">\n    ...\n  </select>\n</div>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"dropup-menu",children:"Dropup menu"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"dropupAuto"})," is set to true by default, which automatically determines whether or not the menu should display above or below the select box. If ",(0,i.jsx)(t.code,{children:"dropupAuto"})," is set to false, manually make the select a dropup menu by adding the ",(0,i.jsx)(t.code,{children:".dropup"})," class to the select."]}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker dropup" data-dropup-auto="false">
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker dropup" data-dropup-auto="false">\n  ...\n</select>\n'})}),"\n",(0,i.jsx)(t.h1,{id:"disabled",children:"Disabled"}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.h2,{id:"disabled-select-box",children:"Disabled select box"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker" disabled>
  <option>Mustard</option>
  <option>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker" disabled>\n  <option>Mustard</option>\n  <option>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"disabled-options",children:"Disabled options"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker">
  <option>Mustard</option>
  <option disabled>Ketchup</option>
  <option>Relish</option>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker">\n  <option>Mustard</option>\n  <option disabled>Ketchup</option>\n  <option>Relish</option>\n</select>\n'})}),"\n",(0,i.jsx)(t.h2,{id:"disabled-option-groups",children:"Disabled option groups"}),"\n",(0,i.jsx)(l.A,{html:String.raw`  <select class="selectpicker test">
  <optgroup label="Picnic" disabled>
    <option>Mustard</option>
    <option>Ketchup</option>
    <option>Relish</option>
  </optgroup>
  <optgroup label="Camping">
    <option>Tent</option>
    <option>Flashlight</option>
    <option>Toilet Paper</option>
  </optgroup>
</select>`}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-html",children:'<select class="selectpicker test">\n  <optgroup label="Picnic" disabled>\n    <option>Mustard</option>\n    <option>Ketchup</option>\n    <option>Relish</option>\n  </optgroup>\n  <optgroup label="Camping">\n    <option>Tent</option>\n    <option>Flashlight</option>\n    <option>Toilet Paper</option>\n  </optgroup>\n</select>\n'})})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(r,{...e})}):r(e)}},5194(e,t,o){o.d(t,{A:()=>a});var n=o(6540),i=o(8478),s=o(4848);function l(e){let t=e.html,o=e.className,i=void 0===o?"":o,l=e.style;const a=(0,n.useRef)(null);return(0,n.useEffect)(function(){let e,t=!1,o=[];const n=[],i=[];let s;function l(e){return!(!e||1!==e.nodeType||!("MARK"===e.tagName||"function"==typeof e.querySelector&&e.querySelector("mark")))}function c(t){window.clearTimeout(e),e=window.setTimeout(d,t)}function p(e,t){window.addEventListener(e,t),i.push(function(){window.removeEventListener(e,t)})}function d(){!t&&a.current&&("undefined"!=typeof window&&window.bootstrap&&window.bootstrap.Dropdown&&window.Selectpicker?(o=Array.from(a.current.querySelectorAll("select.selectpicker")).map(function(e){return window.Selectpicker.getOrCreateInstance(e)}),window.requestAnimationFrame(function(){t||o.forEach(function(e){e&&"function"==typeof e.refresh&&e.refresh()})})):c(100))}if(p("load",d),p("hashchange",function(){c(0),c(100)}),p("resize",function(){c(0)}),Array.from(document.querySelectorAll("script[src]")).forEach(function(e){/bootstrap(?:\.bundle)?(?:\.min)?\.js|bootstrap-select(?:\.min)?\.js/i.test(e.src)&&function(e){const t=function(){c(0)};e.addEventListener("load",t),n.push(function(){e.removeEventListener("load",t)})}(e)}),"undefined"!=typeof MutationObserver){const e=a.current&&a.current.closest("article");e&&(s=new MutationObserver(function(e){e.some(function(e){return Array.from(e.addedNodes||[]).some(l)||Array.from(e.removedNodes||[]).some(l)})&&c(150)}),s.observe(e,{childList:!0,subtree:!0}))}return d(),function(){t=!0,window.clearTimeout(e),s&&s.disconnect(),i.forEach(function(e){e()}),n.forEach(function(e){e()}),o.forEach(function(e){e&&"function"==typeof e.destroy&&e.destroy()}),o=[]}},[t]),(0,s.jsx)("div",{className:"bs-docs-example "+i,dangerouslySetInnerHTML:{__html:t},ref:a,style:l})}function a(e){return(0,s.jsx)(i.A,{fallback:(0,s.jsx)("div",{className:"bs-docs-example "+(e.className||""),style:e.style}),children:function(){return(0,s.jsx)(l,{...e})}})}},8478(e,t,o){o.d(t,{A:()=>s});o(6540);var n=o(2303),i=o(4848);function s(e){let t=e.children,o=e.fallback;return(0,n.A)()?(0,i.jsx)(i.Fragment,{children:null==t?void 0:t()}):null!=o?o:null}},8453(e,t,o){o.d(t,{R:()=>l,x:()=>a});var n=o(6540);const i={},s=n.createContext(i);function l(e){const t=n.useContext(s);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);