(function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"27b8":function(t,e,n){},"28c7":function(t,e,n){"use strict";var r=n("27b8"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);var r=n("8bbf"),o=n.n(r),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.loaded?t._e():n("div",[t._v("Loading ...")]),t._l(t.items,function(t,e){return n("Item",{key:e,attrs:{title:t.title,link:t.link,image:t.image,desc:t.description}})})],2)},s=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"item"},[n("a",{attrs:{href:t.link,target:"_blank",rel:"noopener"}},[n("img",{attrs:{src:t.image}}),n("div",{staticClass:"text"},[n("div",{staticClass:"title"},[t._v(t._s(t.title))]),n("div",{staticClass:"desc"},[t._v(t._s(t.desc))])])])])},c=[],l={name:"Item",props:{link:String,title:String,image:String,desc:String}},u=l;n("28c7");function f(t,e,n,r,o,i,s,a){var c,l="function"===typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),s?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=c):o&&(c=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:l}}var d=f(u,a,c,!1,null,"482d513e",null),p=d.exports,_=n("cebe"),m=n.n(_),v={name:"app",data:function(){return{items:null,loaded:!1}},components:{Item:p},mounted:function(){var t=this;m.a.get("https://flannel-glade.glitch.me",{params:{rss:"http://www.espn.com/blog/feed?blog=afcsouth"}}).then(function(e){t.items=e.data.rss.channel.item,t.loaded=!0}).catch(function(t){console.log(t)})}},g=v,b=(n("034f"),f(g,i,s,!1,null,null,null)),h=b.exports;o.a.config.productionTip=!1,new o.a({render:function(t){return t(h)}}).$mount("#app")},"64a9":function(t,e,n){},"8bbf":function(t,e){t.exports=Vue},cebe:function(t,e){t.exports=axios}});
//# sourceMappingURL=app.83ab45d1.js.map