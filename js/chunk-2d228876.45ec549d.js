(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228876"],{da25:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),r("h2",{staticClass:"h3 m-3 text-left text-primary"},[t._v("訂單細節")]),r("table",{staticClass:"table table-striped text-primary mt-4 mb-5"},[t._m(0),t._l(t.order.products,(function(e){return r("tbody",{key:e.id},[r("td",[r("div",{staticStyle:{height:"100px",width:"80px","background-position":"center center","background-size":"cover"},style:{backgroundImage:"url("+e.product.imageUrl[0]+")"}})]),r("td",[t._v(t._s(e.product.title))]),r("td",[t._v(t._s(e.product.unit))]),r("td",[t._v(t._s(e.product.origin_price))]),r("td",[t._v(t._s(e.product.price))])])})),r("thead",[r("tr",[r("th",[t._v("總計")]),r("th"),r("th"),r("th"),r("th",[t._v(t._s(t.order.amount))])])])],2),r("h2",{staticClass:"h3 m-3 text-left text-primary"},[t._v("訂購者資料")]),r("table",{staticClass:"table table-striped text-primary mt-4"},[t._m(1),r("tbody",[r("td",[t._v(t._s(t.order.created.datetime))]),r("td",[t._v(t._s(t.order.user.name))]),r("td",[t._v(t._s(t.order.user.tel))]),r("td",[t._v(t._s(t.order.user.address))]),r("td",[t._v(t._s(t.order.payment))])])])],1)},d=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",[t._v("產品縮圖")]),r("th",[t._v("產品名稱")]),r("th",[t._v("數量")]),r("th",[t._v("原價")]),r("th",[t._v("單價")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",{attrs:{width:"235"}},[t._v("訂單日期")]),r("th",[t._v("姓名")]),r("th",[t._v("電話")]),r("th",[t._v("地址")]),r("th",[t._v("付款狀態")])])])}],i=(r("99af"),{name:"Order",data:function(){return{order:{created:[],user:[]},isLoading:!1}},created:function(){var t=this;this.isLoading=!0;var e=this.$route.params.id,r="".concat("https://course-ec-api.hexschool.io/api","/").concat("289038e7-cea7-4a49-afd4-86ec766c3f7f","/admin/ec/orders/").concat(e);this.$http.get(r).then((function(e){t.order=e.data.data,t.isLoading=!1}))}}),s=i,n=r("2877"),c=Object(n["a"])(s,a,d,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d228876.45ec549d.js.map