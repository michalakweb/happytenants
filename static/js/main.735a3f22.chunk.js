(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,a){e.exports=a(186)},112:function(e,t,a){},186:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(72),c=a.n(o),l=(a(112),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function i(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var s=a(21),u=a(8),m=a(106),p=a(15),d=Object(p.b)(function(e){return{isAuthenticated:e.auth}})(function(e){var t=e.isAuthenticated,a=e.component,n=Object(m.a)(e,["isAuthenticated","component"]);return r.a.createElement(s.b,Object.assign({},n,{component:function(e){return"logged"===t?r.a.createElement("div",null,r.a.createElement(a,e)):r.a.createElement(s.a,{to:"/"})}}))}),f=a(50),h=a(51),E=a(54),g=a(52),v=a(55),b=a(76),y=a(14),N=a.n(y);a(167),a(35);N.a.initializeApp({apiKey:"AIzaSyAXq8JEGWNUGEd4ToVNuMgwNj4i6VhMBDI",authDomain:"happy-tenants.firebaseapp.com",databaseURL:"https://happy-tenants.firebaseio.com",projectId:"happy-tenants",storageBucket:"happy-tenants.appspot.com",messagingSenderId:"1044021883702"});var O=N.a.database(),w={signInFlow:"popup",signInOptions:[N.a.auth.GoogleAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(){return!1}}},I=a(23),S=a(98),x=a(105),k=[],A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ITEM":return[].concat(Object(x.a)(e),[t.item]);case"REMOVE_ITEM":return e.filter(function(e){return e.id!==t.id});case"SET_LIST":return t.list;default:return e}},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";switch((arguments.length>1?arguments[1]:void 0).type){case"LOGGED":return"logged";case"NOT_LOGGED":return"not logged";default:return e}},T=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||I.d,C=Object(I.e)(Object(I.c)({todoList:A,auth:j}),T(Object(I.a)(S.a))),D=function(e){return function(t){var a={description:e};return O.ref("todoList").push(a).then(function(e){t(function(e){return{type:"ADD_ITEM",item:e}}(Object(b.a)({id:e.key},a)));var n=JSON.stringify(C.getState());localStorage.setItem("listItems",n)})}},L=function(e){return{type:"SET_LIST",list:e}},_=function(){return function(e){return O.ref("todoList").once("value").then(function(t){var a=[];t.forEach(function(e){a.push(Object(b.a)({id:e.key},e.val()))}),e(L(a));var n=JSON.stringify(a);localStorage.setItem("listItems",n)})}},R=a(187),G=a(100),M=a(188),U=Object(p.b)(function(e){return{state:e}})(function(e){return r.a.createElement("div",null,r.a.createElement(R.a,{className:"py-3 pl-2"},r.a.createElement(G.a,{xs:8,lg:10},r.a.createElement("p",{className:"lead optionText"},e.item.description)),r.a.createElement(G.a,{xs:4,lg:2,className:"text-right"},r.a.createElement(M.a,{disabled:!1===e.isOnline,variant:"outline-primary",className:"button--deleteOption",onClick:function(){e.dispatch(function(e){var t=e.id;return function(e){return O.ref("todoList/".concat(t)).remove().then(function(){e({type:"REMOVE_ITEM",id:t});var a=JSON.stringify(C.getState());localStorage.setItem("listItems",a)})}}({id:e.item.id}))}},"Delete"))))}),z=a(36),W=a(16),J=function(){return r.a.createElement("div",null,r.a.createElement(R.a,{className:"endRow text-center pt-2"},r.a.createElement(G.a,null,r.a.createElement(z.a,{to:"/list"},r.a.createElement("p",{className:"mb-1"},r.a.createElement(W.a,{className:"fontAwesomeIcon",size:"2x",icon:"clipboard-list"})),r.a.createElement("p",{className:"mb-1 p--nav"},"Todo"))),r.a.createElement(G.a,{xs:1},r.a.createElement("div",{className:"vl"})),r.a.createElement(G.a,null,r.a.createElement(z.a,{to:"/chores"},r.a.createElement("p",{className:"mb-1"},r.a.createElement(W.a,{className:"fontAwesomeIcon",size:"2x",icon:"broom"})),r.a.createElement("p",{className:"mb-1 p--nav"},"Chores")))))},V=a(24),P=(a(70),a(189)),B=a(190),K=a(191),X=(a(71),function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(E.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={error:""},a.componentDidMount=function(){var e=localStorage.getItem("listItems");if(e){var t=JSON.parse(e);a.props.dispatch(L(t))}O.ref(".info/connected").on("value",function(e){!0===e.val()?a.props.dispatch(_()).then(function(){a.setState(function(){return{error:""}})}):a.setState(function(){return{error:"Updating the list..."}})}),N.a.auth().onAuthStateChanged(function(e){e?a.setState(function(){return{user:"logged"}}):a.setState(function(){return{user:"not logged"}})})},a.componentDidUpdate=function(){0!==a.state.error.length&&"Updating the list..."!==a.state.error&&setTimeout(function(){a.setState(function(){return{error:""}})},3e3)},a.handleAdd=function(e){e.preventDefault();var t=e.target.elements.todoItem.value.trim();e.target.elements.todoItem.value="",e.target.elements.todoItem.focus(),"string"!==typeof t||""===t||t.length>120?a.setState(function(){return{error:"Submission has more than 120 characters or is blank. Try again."}}):a.props.state.some(function(e){return e.description===t})?a.setState(function(){return{error:"This option already exists. Try again."}}):(a.setState(function(){return{error:""}}),a.props.dispatch(D(t)))},a.handleLogout=function(){N.a.auth().signOut().then(function(){}).catch(function(e){console.log(e)})},a.handleInfo=function(){var e=N.a.auth().currentUser;null!=e&&e.providerData.forEach(function(e){console.log("Sign-in provider: "+e.providerId),console.log(O.ref("users/".concat(e.displayName))),O.ref("users/".concat(e.displayName)).set(e.email)})},a}return Object(v.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(P.a,{className:"container container--main text-center"},r.a.createElement(R.a,null,r.a.createElement(G.a,{className:"px-0 mb-4"},r.a.createElement("h1",{className:"display-4 py-4 header"},"Todo list:"))),r.a.createElement(P.a,{className:"container--list"},r.a.createElement(V.Offline,null,this.props.state.length?this.props.state.map(function(e){return r.a.createElement(U,{key:e.id,item:e})}):r.a.createElement("p",{className:"lead py-4 mb-0"},"Currently nothing on the list")),r.a.createElement(V.Online,null,this.props.state.length?this.props.state.map(function(e){return r.a.createElement(U,{key:e.id,item:e,isOnline:!0})}):r.a.createElement("p",{className:"lead py-4 mb-0"},"Currently nothing on the list")),r.a.createElement("div",{className:"formTodo"},r.a.createElement(B.a,{onSubmit:this.handleAdd},r.a.createElement(R.a,null,r.a.createElement(G.a,{className:"my-2"},r.a.createElement(V.Online,null,r.a.createElement(B.a.Control,{autoComplete:"off",type:"text",name:"todoItem",placeholder:"Type your option here.",disabled:!1})),r.a.createElement(V.Offline,null,r.a.createElement(B.a.Control,{autoComplete:"off",type:"text",name:"todoItem",placeholder:"You're offline. Can't add/delete options",disabled:!0})))),r.a.createElement(R.a,null,r.a.createElement(G.a,{className:"my-2"},r.a.createElement(V.Online,null,r.a.createElement(M.a,{disabled:!1,block:!0,variant:"primary",type:"submit"},"Add task")),r.a.createElement(V.Offline,null,r.a.createElement(M.a,{disabled:!0,block:!0,variant:"primary",type:"submit"},"Add task")))))),0!==this.state.error.length&&r.a.createElement(K.a,{className:"mt-3 mb-2",variant:"warning"},this.state.error),"not logged"===this.state.user&&r.a.createElement("div",null,r.a.createElement(K.a,{className:"mt-3 mb-2",variant:"danger"},"Register to add and delete list items.")),r.a.createElement(M.a,{onClick:function(){return N.a.auth().signOut()}},"Logout")),r.a.createElement(J,null)))}}]),t}(n.Component));C.subscribe(function(){return C.getState()});var q=Object(p.b)(function(e){return{state:e.todoList}})(X),F=a(53),H=a.n(F);a(183);H.a.locale("pl");var Y=[1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52],$=[2,5,8,11,14,17,20,23,26,29,32,35,38,41,44,47,50],Q=[3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51],Z=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(E.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={people:["Kamil","Kasia","Mateusz"],week:Number(H()().format("w"))},a}return Object(v.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(P.a,{className:"container container--main text-center"},r.a.createElement(R.a,null,r.a.createElement(G.a,{className:"px-0 mb-4"},r.a.createElement("h1",{className:"display-4 py-4 header"},"This weeks's cleaning:"))),r.a.createElement(P.a,{className:"container--list"},r.a.createElement(R.a,{className:"py-5"},r.a.createElement(G.a,{xs:6},r.a.createElement(W.a,{className:"fontAwesomeIcon px-2",size:"3x",icon:"utensils"}),r.a.createElement(W.a,{className:"fontAwesomeIcon px-2",size:"3x",icon:"trash-alt"})),r.a.createElement(G.a,{className:"align-self-center"},r.a.createElement("p",{className:"h4"},Y.includes(this.state.week)?this.state.people[0]:Q.includes(this.state.week)?this.state.people[1]:this.state.people[2]))),r.a.createElement(R.a,{className:"py-5"},r.a.createElement(G.a,{xs:6,className:""},r.a.createElement(W.a,{className:"fontAwesomeIcon px-2",size:"3x",icon:"bath"}),r.a.createElement(W.a,{className:"fontAwesomeIcon px-2",size:"3x",icon:"broom"})),r.a.createElement(G.a,{className:"align-self-center"},r.a.createElement("p",{className:"h4"},$.includes(this.state.week)?this.state.people[0]:Y.includes(this.state.week)?this.state.people[1]:this.state.people[2])))),r.a.createElement(J,null)))}}]),t}(r.a.Component),ee=a(104),te=a.n(ee),ae=function(){return r.a.createElement("div",null,r.a.createElement(P.a,{fluid:!0,className:"container--login d-flex align-items-center"},r.a.createElement(R.a,{className:"d-flex mx-auto"},r.a.createElement(G.a,null,r.a.createElement("h1",{className:"align-self-center text-center mb-5 container--login_h1"},"Happy Tenants"),r.a.createElement("div",{className:"d-flex justify-content-center pt-4 mb-3 w-100"},r.a.createElement(te.a,{uiConfig:w,firebaseAuth:N.a.auth()}))))))},ne=a(39),re=a(25);ne.b.add(re.d,re.c,re.b,re.a,re.f,re.e);var oe=Object(u.b)({basename:"/happytenants"}),ce=r.a.createElement(p.a,{store:C},r.a.createElement(s.c,{history:oe},r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"/",component:ae}),r.a.createElement(d,{exact:!0,path:"/chores",component:Z}),r.a.createElement(d,{path:"/list",component:q}),r.a.createElement(s.b,{component:function(){return r.a.createElement("div",null,"404 Not found 1")}})))),le=!1,ie=function(){le||(c.a.render(ce,document.getElementById("root")),le=!0)};N.a.auth().onAuthStateChanged(function(e){e?(ie(),C.dispatch({type:"LOGGED"}),"/"!==oe.location.pathname&&"/#/"!==oe.location.pathname||oe.push("/chores")):(ie(),C.dispatch({type:"NOT_LOGGED"}),oe.push("/"))}),function(e){if("serviceWorker"in navigator){if(new URL("/happytenants",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/happytenants","/service-worker.js");l?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):i(e,t)}).catch(function(){localStorage.setItem("isOffline","true"),console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):i(t,e)})}}()},71:function(e,t,a){}},[[107,1,2]]]);
//# sourceMappingURL=main.735a3f22.chunk.js.map