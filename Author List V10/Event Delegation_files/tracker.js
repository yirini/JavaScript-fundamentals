//! TrackJS JavaScript error monitoring agent.
//! COPYRIGHT (c) 2016 ALL RIGHTS RESERVED
//! See License at https://trackjs.com/terms/
(function(l,t,m){"use awesome";if(l.trackJs)l.console&&l.console.warn&&l.console.warn("TrackJS global conflict");else{var n=function(a,b,c,d,e){this.util=a;this.onError=b;this.onFault=c;this.options=e;e.enabled&&this.initialize(d)};n.prototype={initialize:function(a){h.forEach(["EventTarget","Node","XMLHttpRequest"],function(b){h.has(a,b+".prototype.addEventListener")&&(b=a[b].prototype,b.hasOwnProperty("addEventListener")&&(this.wrapAndCatch(b,"addEventListener",1),this.wrapRemoveEventListener(b)))},
this);this.wrapAndCatch(a,"setTimeout",0);this.wrapAndCatch(a,"setInterval",0)},wrapAndCatch:function(a,b,c){var d=this,e=a[b];h.isWrappableFunction(e)&&(a[b]=function(){try{var f=Array.prototype.slice.call(arguments),g=f[c],k,l;if(d.options.bindStack)try{throw Error();}catch(p){l=p.stack,k=d.util.isoNow()}var m=function(){try{if(h.isObject(g))return g.handleEvent.apply(g,arguments);if(h.isFunction(g))return g.apply(this,arguments)}catch(a){throw d.onError("catch",a,{bindTime:k,bindStack:l}),h.wrapError(a);
}};if("addEventListener"===b&&(this._trackJsEvt||(this._trackJsEvt=new q),this._trackJsEvt.get(f[0],g,f[2])))return;try{g&&(h.isWrappableFunction(g)||h.isWrappableFunction(g.handleEvent))&&(f[c]=m,"addEventListener"===b&&this._trackJsEvt.add(f[0],g,f[2],f[c]))}catch(p){return e.apply(this,arguments)}return e.apply(this,f)}catch(p){a[b]=e,d.onFault(p)}})},wrapRemoveEventListener:function(a){if(a&&a.removeEventListener&&this.util.hasFunction(a.removeEventListener,"call")){var b=a.removeEventListener;
a.removeEventListener=function(a,d,e){if(this._trackJsEvt){var f=this._trackJsEvt.get(a,d,e);f&&this._trackJsEvt.remove(a,d,e);return b.call(this,a,f,e)}return b.call(this,a,d,e)}}}};var q=function(){this.events=[]};q.prototype={add:function(a,b,c,d){-1>=this.indexOf(a,b,c)&&(c=this.getEventOptions(c),this.events.push([a,b,c.capture,c.once,c.passive,d]))},get:function(a,b,c){a=this.indexOf(a,b,c);return 0<=a?this.events[a][5]:m},getEventOptions:function(a){var b={capture:!1,once:!1,passive:!1};return h.isBoolean(a)?
h.extend(b,{capture:a}):h.extend(b,a)},indexOf:function(a,b,c){c=this.getEventOptions(c);for(var d=0;d<this.events.length;d++){var e=this.events[d];if(e[0]===a&&e[1]===b&&e[2]===c.capture&&e[3]===c.once&&e[4]===c.passive)return d}return-1},remove:function(a,b,c){a=this.indexOf(a,b,c);0<=a&&this.events.splice(a,1)}};var u=function(a,b){this.util=a;this.initCurrent(b)};u.prototype={current:{},initOnly:{cookie:!0,enabled:!0,token:!0,callback:{enabled:!0},console:{enabled:!0},navigation:{enabled:!0},
network:{enabled:!0},visitor:{enabled:!0},window:{enabled:!0,promise:!0}},defaults:{application:"",cookie:!1,enabled:!0,errorURL:"https://capture.trackjs.com/capture",errorNoSSLURL:"http://capture.trackjs.com/capture",faultURL:"https://usage.trackjs.com/fault.gif",onError:function(){return!0},serialize:function(a){if(a&&"string"===typeof a)return a;if("number"===typeof a&&isNaN(a))return"NaN";if(""===a)return"Empty String";var b;try{b=JSON.stringify(a)}catch(c){b="Unserializable Object"}return b?
b:a===m?"undefined":a&&a.toString?a.toString():"unknown"},sessionId:"",token:"",userId:"",version:"",callback:{enabled:!0,bindStack:!1},console:{enabled:!0,display:!0,error:!0,warn:!1,watch:["log","debug","info","warn","error"]},navigation:{enabled:!0},network:{enabled:!0,error:!0},visitor:{enabled:!0},usageURL:"https://usage.trackjs.com/usage.gif",window:{enabled:!0,promise:!0}},initCurrent:function(a){if(this.validate(a,this.defaults,"config",{}))return this.current=this.util.extend(this.current,
this.defaults,a),!0;this.current=this.util.extend(this.current,this.defaults);return!1},setCurrent:function(a){return this.validate(a,this.defaults,"config",this.initOnly)?(this.current=this.util.extend(this.current,a),!0):!1},validate:function(a,b,c,d){var e=!0;c=c||"";d=d||{};for(var f in a)if(a.hasOwnProperty(f))if(b.hasOwnProperty(f)){var g=typeof b[f];g!==typeof a[f]?(console.warn(c+"."+f+": property must be type "+g+"."),e=!1):"[object Array]"!==Object.prototype.toString.call(a[f])||this.validateArray(a[f],
b[f],c+"."+f)?"[object Object]"===Object.prototype.toString.call(a[f])?e=this.validate(a[f],b[f],c+"."+f,d[f]):d.hasOwnProperty(f)&&(console.warn(c+"."+f+": property cannot be set after load."),e=!1):e=!1}else console.warn(c+"."+f+": property not supported."),e=!1;return e},validateArray:function(a,b,c){var d=!0;c=c||"";for(var e=0;e<a.length;e++)this.util.contains(b,a[e])||(console.warn(c+"["+e+"]: invalid value: "+a[e]+"."),d=!1);return d}};var v=function(a,b,c,d,e,f,g){this.util=a;this.log=b;this.onError=
c;this.onFault=d;this.serialize=e;g.enabled&&(f.console=this.wrapConsoleObject(f.console,g))};v.prototype={wrapConsoleObject:function(a,b){a=a||{};var c=a.log||function(){},d=this,e;for(e=0;e<b.watch.length;e++)(function(e){var g=a[e]||c;a[e]=function(){try{var a=Array.prototype.slice.call(arguments);d.log.add("c",{timestamp:d.util.isoNow(),severity:e,message:d.serialize(1===a.length?a[0]:a)});if(b.error&&"error"===e||b.warn&&"warn"===e)try{throw Error(d.serialize(1===a.length?a[0]:a));}catch(c){d.onError("console",
c)}b.display&&(d.util.hasFunction(g,"apply")?g.apply(this,a):g(a[0],a[1],a[2]))}catch(c){d.onFault(c)}}})(b.watch[e]);return a},report:function(){return this.log.all("c")}};var w=function(a,b,c,d,e){this.config=a;this.util=b;this.log=c;this.window=d;this.document=e;this.correlationId=this.token=null;this.initialize()};w.prototype={initialize:function(){this.token=this.getCustomerToken();this.correlationId=this.getCorrelationId()},getCustomerToken:function(){if(this.config.current.token)return this.config.current.token;
var a=this.document.getElementsByTagName("script");return a[a.length-1].getAttribute("data-token")},getCorrelationId:function(){var a;if(!this.config.current.cookie)return this.util.uuid();try{a=this.document.cookie.replace(/(?:(?:^|.*;\s*)TrackJS\s*\=\s*([^;]*).*$)|^.*$/,"$1"),a||(a=this.util.uuid(),this.document.cookie="TrackJS="+a+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/")}catch(b){a=this.util.uuid()}return a},report:function(){return{application:this.config.current.application,correlationId:this.correlationId,
sessionId:this.config.current.sessionId,token:this.token,userId:this.config.current.userId,version:this.config.current.version}}};var y=function(a){this.loadedOn=(new Date).getTime();this.window=a};y.prototype={discoverDependencies:function(){var a,b={};this.window.jQuery&&this.window.jQuery.fn&&this.window.jQuery.fn.jquery&&(b.jQuery=this.window.jQuery.fn.jquery);this.window.jQuery&&this.window.jQuery.ui&&this.window.jQuery.ui.version&&(b.jQueryUI=this.window.jQuery.ui.version);this.window.angular&&
this.window.angular.version&&this.window.angular.version.full&&(b.angular=this.window.angular.version.full);for(a in this.window)if("_trackJs"!==a&&"_trackJS"!==a&&"_trackjs"!==a&&"webkitStorageInfo"!==a&&"webkitIndexedDB"!==a&&"top"!==a&&"parent"!==a&&"frameElement"!==a)try{if(this.window[a]){var c=this.window[a].version||this.window[a].Version||this.window[a].VERSION;"string"===typeof c&&(b[a]=c)}}catch(d){}return b},report:function(){return{age:(new Date).getTime()-this.loadedOn,dependencies:this.discoverDependencies(),
userAgent:this.window.navigator.userAgent,viewportHeight:this.window.document.documentElement.clientHeight,viewportWidth:this.window.document.documentElement.clientWidth}}};var z=function(a){this.util=a;this.appender=[];this.maxLength=30};z.prototype={all:function(a){var b=[],c,d;for(d=0;d<this.appender.length;d++)(c=this.appender[d])&&c.category===a&&b.push(c.value);return b},clear:function(){this.appender.length=0},truncate:function(){this.appender.length>this.maxLength&&(this.appender=this.appender.slice(Math.max(this.appender.length-
this.maxLength,0)))},add:function(a,b){var c=this.util.uuid();this.appender.push({key:c,category:a,value:b});this.truncate();return c},get:function(a,b){var c,d;for(d=0;d<this.appender.length;d++)if(c=this.appender[d],c.category===a&&c.key===b)return c.value;return!1}};var A=function(a,b){this.log=a;this.options=b;b.enabled&&this.watch()};A.prototype={isCompatible:function(a){a=a||l;return!h.has(a,"chrome.app.runtime")&&h.has(a,"addEventListener")&&h.has(a,"history.pushState")},record:function(a,
b,c){this.log.add("h",{type:a,from:h.truncate(b,250),to:h.truncate(c,250),on:h.isoNow()})},report:function(){return this.log.all("h")},watch:function(){if(this.isCompatible()){var a=this,b=h.getLocationURL().relative;l.addEventListener("popstate",function(){var c=h.getLocationURL().relative;a.record("popState",b,c);b=c},!0);h.forEach(["pushState","replaceState"],function(c){h.patch(history,c,function(d){return function(){b=h.getLocationURL().relative;var e=d.apply(this,arguments),f=h.getLocationURL().relative;
a.record(c,b,f);b=f;return e}})})}}};var B=function(a,b,c,d,e,f){this.util=a;this.log=b;this.onError=c;this.onFault=d;this.window=e;this.options=f;f.enabled&&this.initialize(e)};B.prototype={initialize:function(a){a.XMLHttpRequest&&this.util.hasFunction(a.XMLHttpRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XMLHttpRequest);a.XDomainRequest&&this.util.hasFunction(a.XDomainRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XDomainRequest)},watchNetworkObject:function(a){var b=this,
c=a.prototype.open,d=a.prototype.send;a.prototype.open=function(a,b){var d=(b||"").toString();0>d.indexOf("localhost:0")&&(this._trackJs={method:a,url:d});return c.apply(this,arguments)};a.prototype.send=function(){try{if(!this._trackJs)return d.apply(this,arguments);this._trackJs.logId=b.log.add("n",{startedOn:b.util.isoNow(),method:this._trackJs.method,url:this._trackJs.url});b.listenForNetworkComplete(this)}catch(a){b.onFault(a)}return d.apply(this,arguments)};return a},listenForNetworkComplete:function(a){var b=
this;b.window.ProgressEvent&&a.addEventListener&&a.addEventListener("readystatechange",function(){4===a.readyState&&b.finalizeNetworkEvent(a)},!0);a.addEventListener?a.addEventListener("load",function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a)},!0):setTimeout(function(){try{var c=a.onload;a.onload=function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function"===typeof c&&b.util.hasFunction(c,"apply")&&c.apply(a,arguments)};var d=a.onerror;a.onerror=function(){b.finalizeNetworkEvent(a);
b.checkNetworkFault(a);"function"===typeof oldOnError&&d.apply(a,arguments)}}catch(e){b.onFault(e)}},0)},finalizeNetworkEvent:function(a){if(a._trackJs){var b=this.log.get("n",a._trackJs.logId);b&&(b.completedOn=this.util.isoNow(),b.statusCode=1223==a.status?204:a.status,b.statusText=1223==a.status?"No Content":a.statusText)}},checkNetworkFault:function(a){if(this.options.error&&400<=a.status&&1223!=a.status){var b=a._trackJs||{};this.onError("ajax",a.status+" "+a.statusText+": "+b.method+" "+b.url)}},
report:function(){return this.log.all("n")}};var x=function(a,b){this.util=a;this.config=b;this.disabled=!1;this.throttleStats={attemptCount:0,throttledCount:0,lastAttempt:(new Date).getTime()};l.JSON&&l.JSON.stringify||(this.disabled=!0)};x.prototype={errorEndpoint:function(a){var b=this.config.current.errorURL;this.util.testCrossdomainXhr()||-1!==l.location.protocol.indexOf("https")||(b=this.config.current.errorNoSSLURL);return b+"?token="+a},usageEndpoint:function(a){return this.appendObjectAsQuery(a,
this.config.current.usageURL)},trackerFaultEndpoint:function(a){return this.appendObjectAsQuery(a,this.config.current.faultURL)},appendObjectAsQuery:function(a,b){b+="?";for(var c in a)a.hasOwnProperty(c)&&(b+=encodeURIComponent(c)+"="+encodeURIComponent(a[c])+"&");return b},getCORSRequest:function(a,b){var c;this.util.testCrossdomainXhr()?(c=new l.XMLHttpRequest,c.open(a,b),c.setRequestHeader("Content-Type","text/plain")):"undefined"!==typeof l.XDomainRequest?(c=new l.XDomainRequest,c.open(a,b)):
c=null;return c},sendTrackerFault:function(a){this.throttle(a)||((new Image).src=this.trackerFaultEndpoint(a))},sendUsage:function(a){(new Image).src=this.usageEndpoint(a)},sendError:function(a,b){var c=this;if(!this.disabled&&!this.throttle(a))try{var d=this.getCORSRequest("POST",this.errorEndpoint(b));d.onreadystatechange=function(){4===d.readyState&&200!==d.status&&(c.disabled=!0)};d._trackJs=m;d.send(l.JSON.stringify(a))}catch(e){throw this.disabled=!0,e;}},throttle:function(a){var b=(new Date).getTime();
this.throttleStats.attemptCount++;if(this.throttleStats.lastAttempt+1E3>=b){if(this.throttleStats.lastAttempt=b,10<this.throttleStats.attemptCount)return this.throttleStats.throttledCount++,!0}else a.throttled=this.throttleStats.throttledCount,this.throttleStats.attemptCount=0,this.throttleStats.lastAttempt=b,this.throttleStats.throttledCount=0;return!1}};var h=function(){return{bind:function(a,b){return function(){return a.apply(b,Array.prototype.slice.call(arguments))}},contains:function(a,b){var c;
for(c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},defer:function(a,b){setTimeout(function(){a.apply(b)})},extend:function(a){for(var b,c=Array.prototype.slice.call(arguments,1),d=0;d<c.length;d++)for(b in c[d])null===c[d][b]||c[d][b]===m?a[b]=c[d][b]:"[object Object]"===Object.prototype.toString.call(c[d][b])?(a[b]=a[b]||{},this.extend(a[b],c[d][b])):a[b]=c[d][b];return a},forEach:function(a,b,c){if(a.forEach)return a.forEach(b,c);for(var d=0;d<a.length;)b.call(c,a[d],d,a),d++},getLocation:function(){return l.location.toString().replace(/ /g,
"%20")},getLocationURL:function(){return h.parseURL(h.getLocation())},has:function(a,b){for(var c=b.split("."),d=a,e=0;e<c.length;e++)if(d[c[e]])d=d[c[e]];else return!1;return!0},hasFunction:function(a,b){try{return!!a[b]}catch(c){return!1}},isBoolean:function(a){return!0===a||!1===a},isBrowserIE:function(a){a=a||l.navigator.userAgent;var b=a.match(/Trident\/([\d.]+)/);return b&&"7.0"===b[1]?11:(a=a.match(/MSIE ([\d.]+)/))?parseInt(a[1],10):!1},isBrowserSupported:function(){var a=this.isBrowserIE();
return!a||8<=a},isFunction:function(a){return!(!a||"function"!==typeof a)},isObject:function(a){return!(!a||"object"!==typeof a)},isWrappableFunction:function(a){return this.isFunction(a)&&this.hasFunction(a,"apply")},isoNow:function(){var a=new Date;return a.toISOString?a.toISOString():a.getUTCFullYear()+"-"+this.pad(a.getUTCMonth()+1)+"-"+this.pad(a.getUTCDate())+"T"+this.pad(a.getUTCHours())+":"+this.pad(a.getUTCMinutes())+":"+this.pad(a.getUTCSeconds())+"."+String((a.getUTCMilliseconds()/1E3).toFixed(3)).slice(2,
5)+"Z"},noop:function(){},pad:function(a){a=String(a);1===a.length&&(a="0"+a);return a},parseURL:function(a){var b=a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!b)return{};b={protocol:b[2],host:b[4],path:b[5],query:b[6],hash:b[8]};b.origin=(b.protocol||"")+"://"+(b.host||"");b.relative=(b.path||"")+(b.query||"")+(b.hash||"");b.href=a;return b},patch:function(a,b,c){a[b]=c(a[b]||h.noop)},testCrossdomainXhr:function(){return"withCredentials"in new XMLHttpRequest},truncate:function(a,
b){if(a.length<=b)return a;var c=a.length-b;return a.substr(0,b)+"...{"+c+"}"},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})},wrapError:function(a){if(a.innerError)return a;var b=Error("TrackJS Caught: "+(a.message||a));b.description="TrackJS Caught: "+a.description;b.file=a.file;b.line=a.line||a.lineNumber;b.column=a.column||a.columnNumber;b.stack=a.stack;b.innerError=a;return b}}}(),C=function(a,
b,c,d,e,f){this.util=a;this.log=b;this.onError=c;this.onFault=d;this.options=f;this.document=e;f.enabled&&this.initialize(e)};C.prototype={initialize:function(a){var b=this.util.bind(this.onDocumentClicked,this),c=this.util.bind(this.onInputChanged,this);a.addEventListener?(a.addEventListener("click",b,!0),a.addEventListener("blur",c,!0)):a.attachEvent&&(a.attachEvent("onclick",b),a.attachEvent("onfocusout",c))},onDocumentClicked:function(a){try{var b=this.getElementFromEvent(a);b&&b.tagName&&(this.isDescribedElement(b,
"a")||this.isDescribedElement(b,"button")||this.isDescribedElement(b,"input",["button","submit"])?this.writeVisitorEvent(b,"click"):this.isDescribedElement(b,"input",["checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value,b.checked))}catch(c){this.onFault(c)}},onInputChanged:function(a){try{var b=this.getElementFromEvent(a);if(b&&b.tagName)if(this.isDescribedElement(b,"textarea"))this.writeVisitorEvent(b,"input",b.value);else if(this.isDescribedElement(b,"select")&&b.options&&b.options.length)this.onSelectInputChanged(b);
else this.isDescribedElement(b,"input")&&!this.isDescribedElement(b,"input",["button","submit","hidden","checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value)}catch(c){this.onFault(c)}},onSelectInputChanged:function(a){if(a.multiple)for(var b=0;b<a.options.length;b++)a.options[b].selected&&this.writeVisitorEvent(a,"input",a.options[b].value);else 0<=a.selectedIndex&&a.options[a.selectedIndex]&&this.writeVisitorEvent(a,"input",a.options[a.selectedIndex].value)},writeVisitorEvent:function(a,
b,c,d){"password"===this.getElementType(a)&&(c=m);this.log.add("v",{timestamp:this.util.isoNow(),action:b,element:{tag:a.tagName.toLowerCase(),attributes:this.getElementAttributes(a),value:this.getMetaValue(c,d)}})},getElementFromEvent:function(a){return a.target||t.elementFromPoint(a.clientX,a.clientY)},isDescribedElement:function(a,b,c){if(a.tagName.toLowerCase()!==b.toLowerCase())return!1;if(!c)return!0;a=this.getElementType(a);for(b=0;b<c.length;b++)if(c[b]===a)return!0;return!1},getElementType:function(a){return(a.getAttribute("type")||
"").toLowerCase()},getElementAttributes:function(a){for(var b={},c=0;c<a.attributes.length;c++)"value"!==a.attributes[c].name.toLowerCase()&&(b[a.attributes[c].name]=a.attributes[c].value);return b},getMetaValue:function(a,b){return a===m?m:{length:a.length,pattern:this.matchInputPattern(a),checked:b}},matchInputPattern:function(a){return""===a?"empty":/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(a)?"email":
/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(a)||/^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(a)?"date":/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(a)?"usphone":/^\s*$/.test(a)?"whitespace":/^\d*$/.test(a)?"numeric":/^[a-zA-Z]*$/.test(a)?
"alpha":/^[a-zA-Z0-9]*$/.test(a)?"alphanumeric":"characters"},report:function(){return this.log.all("v")}};var D=function(a,b,c,d,e){this.onError=a;this.onFault=b;this.serialize=c;e.enabled&&this.watchWindowErrors(d);e.promise&&this.watchPromiseErrors(d)};D.prototype={watchPromiseErrors:function(a){if(a.addEventListener){var b=this;a.addEventListener("unhandledrejection",function(a){b.onError("window",(a||{}).reason)})}},watchWindowErrors:function(a){var b=this,c=a.onerror||function(){};a.onerror=
function(d,e,f,g,k){try{k=k||{},k.message=k.message||b.serialize(d),k.line=k.line||parseInt(f,10)||null,k.column=k.column||parseInt(g,10)||null,"[object Event]"!==Object.prototype.toString.call(d)||e?k.file=k.file||b.serialize(e):k.file=(d.target||{}).src,b.onError("window",k)}catch(h){b.onFault(h)}c.call(a,d,e,f,g,k)}}};var E=function(a,b,c,d,e,f,g,k,l,m,p,n,q,x,t,u,v){try{if(this.window=t,this.document=u,this.util=h,this.onError=this.util.bind(this.onError,this),this.onFault=this.util.bind(this.onFault,
this),this.serialize=this.util.bind(this.serialize,this),this.config=new d(this.util,a),this.transmitter=new p(this.util,this.config),this.log=new k(this.util),this.api=new b(this.config,this.util,this.onError,this.serialize),this.metadata=new l(this.serialize),this.environment=new g(this.window),this.customer=new f(this.config,this.util,this.log,this.window,this.document),this.customer.token&&(this.apiConsoleWatcher=new e(this.util,this.log,this.onError,this.onFault,this.serialize,this.api,this.config.defaults.console),
this.config.current.enabled&&(this.windowConsoleWatcher=new e(this.util,this.log,this.onError,this.onFault,this.serialize,this.window,this.config.current.console),this.util.isBrowserSupported()))){this.callbackWatcher=new c(this.util,this.onError,this.onFault,this.window,this.config.current.callback);this.visitorWatcher=new n(this.util,this.log,this.onError,this.onFault,this.document,this.config.current.visitor);this.navigationWatcher=new v(this.log,this.config.current.navigation);this.networkWatcher=
new m(this.util,this.log,this.onError,this.onFault,this.window,this.config.current.network);this.windowWatcher=new q(this.onError,this.onFault,this.serialize,this.window,this.config.current.window);var r=this;setTimeout(function(){r.transmitter.sendUsage({token:r.customer.token,correlationId:r.customer.correlationId,application:r.config.current.application,x:r.util.uuid()})},1E3)}}catch(w){this.onFault(w)}};E.prototype={reveal:function(){if(this.customer.token)return this.api.addMetadata=this.metadata.addMetadata,
this.api.removeMetadata=this.metadata.removeMetadata,this.api;this.window.console&&this.window.console.warn&&this.window.console.warn("TrackJS could not find a token");return m},onError:function(){var a=!1;return function(b,c,d){if(this.util.isBrowserSupported()&&this.config.current.enabled)try{c=c||{};d=d||{bindStack:null,bindTime:null,force:!1};var e=c.message||this.serialize(c,d.force);if(e&&e.indexOf){if(-1!==e.indexOf("TrackJS Caught"))return;if(a&&-1!==e.indexOf("Script error")){a=!1;return}}var f=
this.util.extend({},{bindStack:d.bindStack,bindTime:d.bindTime,column:c.column||c.columnNumber,console:this.windowConsoleWatcher.report(),customer:this.customer.report(),entry:b,environment:this.environment.report(),file:c.file||c.fileName,line:c.line||c.lineNumber,message:e,metadata:this.metadata.report(),nav:this.navigationWatcher.report(),network:this.networkWatcher.report(),url:(l.location||"").toString(),stack:c.stack,timestamp:this.util.isoNow(),visitor:this.visitorWatcher.report(),version:"2.6.1"});
if(!d.force)try{if(!this.config.current.onError(f,c))return}catch(k){f.console.push({timestamp:this.util.isoNow(),severity:"error",message:k.message});var g=this;setTimeout(function(){g.onError("catch",k,{force:!0})},0)}this.log.clear();setTimeout(function(){a=!1});a=!0;this.transmitter.sendError(f,this.customer.token)}catch(k){this.onFault(k)}}}(),onFault:function(a){var b=this.transmitter||new x;a=a||{};a={token:this.customer.token,file:a.file||a.fileName,msg:a.message||"unknown",stack:(a.stack||
"unknown").substr(0,500),url:this.window.location,v:"2.6.1",h:"bfe15be969e93a1eecb7c355c6044295c27e4cb5",x:this.util.uuid()};b.sendTrackerFault(a)},serialize:function(a,b){if(this.config.current.serialize&&!b)try{return this.config.current.serialize(a)}catch(c){this.onError("catch",c,{force:!0})}return this.config.defaults.serialize(a)}};n=new E(l._trackJs||l._trackJS||l._trackjs||{},function(a,b,c,d){return{attempt:function(a,d){try{var g=Array.prototype.slice.call(arguments,2);return a.apply(d||
this,g)}catch(k){throw c("catch",k),b.wrapError(k);}},configure:function(b){return a.setCurrent(b)},track:function(a){var b=d(a);a=a||{};if(!a.stack)try{throw Error(b);}catch(g){a=g}c("direct",a)},watch:function(a,d){return function(){try{var g=Array.prototype.slice.call(arguments,0);return a.apply(d||this,g)}catch(k){throw c("catch",k),b.wrapError(k);}}},watchAll:function(a){var d=Array.prototype.slice.call(arguments,1),g;for(g in a)"function"===typeof a[g]&&(b.contains(d,g)||function(){var d=a[g];
a[g]=function(){try{var a=Array.prototype.slice.call(arguments,0);return d.apply(this,a)}catch(e){throw c("catch",e),b.wrapError(e);}}}());return a},hash:"bfe15be969e93a1eecb7c355c6044295c27e4cb5",version:"2.6.1"}},n,u,v,w,y,z,function(a){var b={};return{addMetadata:function(a,d){b[a]=d},removeMetadata:function(a){delete b[a]},report:function(){var c=[],d;for(d in b)b.hasOwnProperty(d)&&c.push({key:d,value:a(b[d])});return c},store:b}},B,x,C,D,q,l,t,A);l.trackJs=n.reveal()}})(window,document);
