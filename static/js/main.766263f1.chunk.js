(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{157:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(81),o=a.n(c),s=(a(94),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function l(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var i=a(19),m=a(8),u=a(42),p=a(43),d=a(46),f=a(44),h=a(47),E=a(18),b=a(23),v=a(62),g=a(33),y=a.n(g);a(145),a(148);y.a.initializeApp({apiKey:"AIzaSyAXq8JEGWNUGEd4ToVNuMgwNj4i6VhMBDI",authDomain:"happy-tenants.firebaseapp.com",databaseURL:"https://happy-tenants.firebaseio.com",projectId:"happy-tenants",storageBucket:"happy-tenants.appspot.com",messagingSenderId:"1044021883702"});var N=y.a.database(),w=(new y.a.auth.GoogleAuthProvider,function(e){return function(t){var a={description:e};return N.ref("todoList").push(a).then(function(e){t(function(e){return{type:"ADD_ITEM",item:e}}(Object(v.a)({id:e.key},a)))})}}),x=function(){return function(e){return N.ref("todoList").once("value").then(function(t){var a=[];t.forEach(function(e){a.push(Object(v.a)({id:e.key},e.val()))}),e({type:"SET_LIST",list:a})})}},O=a(158),k=a(84),T=a(161),j=Object(b.b)(function(e){return{state:e}})(function(e){return r.a.createElement("div",null,r.a.createElement(O.a,{className:"py-3 pl-2"},r.a.createElement(k.a,{xs:8,lg:10},r.a.createElement("p",{className:"lead optionText"},e.item.description)),r.a.createElement(k.a,{xs:4,lg:2,className:"text-right"},r.a.createElement(T.a,{variant:"outline-primary",className:"button--deleteOption",onClick:function(){e.dispatch(function(e){var t=e.id;return function(e){return N.ref("todoList/".concat(t)).remove().then(function(){e({type:"REMOVE_ITEM",id:t})})}}({id:e.item.id}))}},"Delete"))))}),S=(a(78),a(159)),I=a(160),A=(a(79),a(24)),_=a(85),C=a(88),D=[],L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ITEM":return[].concat(Object(C.a)(e),[t.item]);case"REMOVE_ITEM":return e.filter(function(e){return e.id!==t.id});case"SET_LIST":return t.list;default:return e}},M=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||A.c,R=Object(A.d)(L,M(Object(A.a)(_.a))),W=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={error:""},a.componentDidMount=function(){N.ref(".info/connected").on("value",function(e){!0===e.val()?a.props.dispatch(x()):console.log("not connected")})},a.componentDidUpdate=function(){0!==a.state.error.length&&setTimeout(function(){a.setState(function(){return{error:""}})},2e3)},a.handleAdd=function(e){e.preventDefault();var t=e.target.elements.todoItem.value.trim();e.target.elements.todoItem.value="",e.target.elements.todoItem.focus(),"string"!==typeof t||""===t||t.length>120?a.setState(function(){return{error:"Invalid type of submission. Try again."}}):a.props.state.includes(t)?a.setState(function(){return{error:"This option already exists. Try again."}}):(a.setState(function(){return{error:""}}),a.props.dispatch(w(t)))},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(S.a,{className:"container container--main text-center"},r.a.createElement(O.a,null,r.a.createElement(k.a,{className:"px-0 mb-4"},r.a.createElement("h1",{className:"display-4 py-4 header"},"Todo list:"))),r.a.createElement(S.a,{className:"container--list"},r.a.createElement("div",{className:"test"},this.props.state.length?this.props.state.map(function(e){return r.a.createElement(j,{key:e.id,item:e})}):r.a.createElement("p",{className:"lead py-4 mb-0"},"Currently nothing on the list")),r.a.createElement("div",{className:"formTodo"},r.a.createElement(I.a,{onSubmit:this.handleAdd},r.a.createElement(O.a,null,r.a.createElement(k.a,{className:"my-2"},r.a.createElement(I.a.Control,{autoComplete:"off",type:"text",name:"todoItem",placeholder:"Type your option here"}))),r.a.createElement(O.a,null,r.a.createElement(k.a,{className:"my-2"},r.a.createElement(T.a,{block:!0,variant:"primary",type:"submit"},"Add task"))))),0!==this.state.error.length&&r.a.createElement("p",{className:"mt-3 mb-2"},this.state.error)),r.a.createElement(O.a,{className:"endRow text-center pt-2"},r.a.createElement(k.a,null,r.a.createElement(E.a,{to:"/buyingList"},r.a.createElement("p",{className:"mb-1"},r.a.createElement("i",{className:"fas fa-clipboard-list fa-2x"})),r.a.createElement("p",{className:"mb-1 p--nav"},"Todo"))),r.a.createElement(k.a,{xs:1},r.a.createElement("div",{className:"vl"})),r.a.createElement(k.a,null,r.a.createElement(E.a,{to:"/"},r.a.createElement("p",{className:"mb-1"},r.a.createElement("i",{className:"fas fa-broom fa-2x"})),r.a.createElement("p",{className:"mb-1 p--nav"},"Chores"))))))}}]),t}(n.Component);R.subscribe(function(){return console.log(R.getState())});var U=Object(b.b)(function(e){return{state:e}})(W),V=a(45),B=a.n(V);a(156);B.a.locale("pl");var P=[1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52],z=[2,5,8,11,14,17,20,23,26,29,32,35,38,41,44,47,50],G=[3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51],J=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={people:["Kamil","Kasia","Mateusz"],week:Number(B()().format("w"))},a}return Object(h.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(S.a,{className:"container container--main text-center"},r.a.createElement(O.a,null,r.a.createElement(k.a,{className:"px-0 mb-4"},r.a.createElement("h1",{className:"display-4 py-4 header"},"This weeks's cleaning:"))),r.a.createElement(S.a,{className:"container--list"},r.a.createElement(O.a,{className:"py-5"},r.a.createElement(k.a,{xs:5},r.a.createElement("i",{className:"fas fa-utensils fa-3x"})),r.a.createElement(k.a,{className:"align-self-center"},r.a.createElement("p",{className:"h2"},P.includes(this.state.week)?this.state.people[0]:G.includes(this.state.week)?this.state.people[1]:this.state.people[2]))),r.a.createElement(O.a,{className:"py-5"},r.a.createElement(k.a,{xs:5,className:""},r.a.createElement("i",{className:"fas fa-bath fa-2x px-2"}),r.a.createElement("i",{className:"fas fa-broom fa-2x px-2"})),r.a.createElement(k.a,{className:"align-self-center"},r.a.createElement("p",{className:"h2"},z.includes(this.state.week)?this.state.people[0]:P.includes(this.state.week)?this.state.people[1]:this.state.people[2])))),r.a.createElement(O.a,{className:"endRow text-center pt-2"},r.a.createElement(k.a,null,r.a.createElement(E.a,{to:"/buyingList"},r.a.createElement("p",{className:"mb-1"},r.a.createElement("i",{className:"fas fa-clipboard-list fa-2x"})),r.a.createElement("p",{className:"mb-1 p--nav"},"Todo"))),r.a.createElement(k.a,{xs:1},r.a.createElement("div",{className:"vl"})),r.a.createElement(k.a,null,r.a.createElement(E.a,{to:"/"},r.a.createElement("p",{className:"mb-1"},r.a.createElement("i",{className:"fas fa-broom fa-2x"})),r.a.createElement("p",{className:"mb-1 p--nav"},"Chores"))))))}}]),t}(r.a.Component),K=Object(m.b)({basename:"/happytenants"}),X=r.a.createElement(b.a,{store:R},r.a.createElement(i.b,{history:K},r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/",component:J}),r.a.createElement(i.a,{path:"/buyingList",component:U}),r.a.createElement(i.a,{component:function(){return r.a.createElement("div",null,"404 Not found 1")}}))));o.a.render(X,document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/happytenants",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/happytenants","/service-worker.js");s?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):l(e,t)}).catch(function(){localStorage.setItem("isOffline","true"),console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}}()},79:function(e,t,a){},89:function(e,t,a){e.exports=a(157)},94:function(e,t,a){}},[[89,1,2]]]);
//# sourceMappingURL=main.766263f1.chunk.js.map