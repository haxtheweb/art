(()=>{var X=globalThis,E=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),oe=new WeakMap,S=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(E&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&oe.set(t,e))}return e}toString(){return this.cssText}},le=o=>new S(typeof o=="string"?o:o+"",void 0,Q),D=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,a,l)=>i+(d=>{if(d._$cssResult$===!0)return d.cssText;if(typeof d=="number")return d;throw Error("Value passed to 'css' function must be a 'css' function result: "+d+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+o[l+1],o[0]);return new S(t,o,Q)},de=(o,e)=>{if(E)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),a=X.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,o.appendChild(i)}},R=E?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return le(t)})(o):o;var{is:xe,defineProperty:ne,getOwnPropertyDescriptor:we,getOwnPropertyNames:Ge,getOwnPropertySymbols:Le,getPrototypeOf:ze}=Object,A=globalThis,Ie=A.trustedTypes,Se=Ie?Ie.emptyScript:"",Be=A.reactiveElementPolyfillSupport,B=(o,e)=>o,k={toAttribute(o,e){switch(e){case Boolean:o=o?Se:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ce=(o,e)=>!xe(o,e),me={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol("metadata"),A.litPropertyMetadata??=new WeakMap;var p=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=me){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(e,i,t);a!==void 0&&ne(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){let{get:a,set:l}=we(this.prototype,e)??{get(){return this[t]},set(d){this[t]=d}};return{get:a,set(d){let m=a?.call(this);l?.call(this,d),this.requestUpdate(e,m,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(B("elementProperties")))return;let e=ze(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(B("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(B("properties"))){let t=this.properties,i=[...Ge(t),...Le(t)];for(let a of i)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,a]of t)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let a=this._$Eu(t,i);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let a of i)t.unshift(R(a))}else e!==void 0&&t.push(R(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return de(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){let l=(i.converter?.toAttribute!==void 0?i.converter:k).toAttribute(t,i.type);this._$Em=e,l==null?this.removeAttribute(a):this.setAttribute(a,l),this._$Em=null}}_$AK(e,t){let i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let l=i.getPropertyOptions(a),d=typeof l.converter=="function"?{fromAttribute:l.converter}:l.converter?.fromAttribute!==void 0?l.converter:k;this._$Em=a;let m=d.fromAttribute(t,l.type);this[a]=m??this._$Ej?.get(a)??m,this._$Em=null}}requestUpdate(e,t,i,a=!1,l){if(e!==void 0){let d=this.constructor;if(a===!1&&(l=this[e]),i??=d.getPropertyOptions(e),!((i.hasChanged??ce)(l,t)||i.useDefault&&i.reflect&&l===this._$Ej?.get(e)&&!this.hasAttribute(d._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:l},d){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,d??t??this[e]),l!==!0||d!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,l]of this._$Ep)this[a]=l;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,l]of i){let{wrapped:d}=l,m=this[a];d!==!0||this._$AL.has(a)||m===void 0||this.C(a,void 0,l,m)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};p.elementStyles=[],p.shadowRootOptions={mode:"open"},p[B("elementProperties")]=new Map,p[B("finalized")]=new Map,Be?.({ReactiveElement:p}),(A.reactiveElementVersions??=[]).push("2.1.2");var q=globalThis,Ne=o=>o,v=q.trustedTypes,se=v?v.createPolicy("lit-html",{createHTML:o=>o}):void 0,fe="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,pe="?"+h,ue=`<${pe}>`,b=document,C=()=>b.createComment(""),y=o=>o===null||typeof o!="object"&&typeof o!="function",ee=Array.isArray,Ce=o=>ee(o)||typeof o?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,u=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,Me=/>/g,W=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,Te=/"/g,re=/^(?:script|style|textarea|title)$/i,te=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),r=te(1),he=te(2),Qe=te(3),x=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),De=new WeakMap,Y=b.createTreeWalker(b,129);function je(o,e){if(!ee(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(e):e}var ye=(o,e)=>{let t=o.length-1,i=[],a,l=e===2?"<svg>":e===3?"<math>":"",d=u;for(let m=0;m<t;m++){let I=o[m],N,s,c=-1,T=0;for(;T<I.length&&(d.lastIndex=T,s=d.exec(I),s!==null);)T=d.lastIndex,d===u?s[1]==="!--"?d=ge:s[1]!==void 0?d=Me:s[2]!==void 0?(re.test(s[2])&&(a=RegExp("</"+s[2],"g")),d=W):s[3]!==void 0&&(d=W):d===W?s[0]===">"?(d=a??u,c=-1):s[1]===void 0?c=-2:(c=d.lastIndex-s[2].length,N=s[1],d=s[3]===void 0?W:s[3]==='"'?Te:Ve):d===Te||d===Ve?d=W:d===ge||d===Me?d=u:(d=W,a=void 0);let f=d===W&&o[m+1].startsWith("/>")?" ":"";l+=d===u?I+ue:c>=0?(i.push(N),I.slice(0,c)+fe+I.slice(c)+h+f):I+h+(c===-2?m:f)}return[je(o,l+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},P=class o{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let l=0,d=0,m=e.length-1,I=this.parts,[N,s]=ye(e,t);if(this.el=o.createElement(N,i),Y.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=Y.nextNode())!==null&&I.length<m;){if(a.nodeType===1){if(a.hasAttributes())for(let c of a.getAttributeNames())if(c.endsWith(fe)){let T=s[d++],f=a.getAttribute(c).split(h),n=/([.?@])?(.*)/.exec(T);I.push({type:1,index:l,name:n[2],strings:f,ctor:n[1]==="."?J:n[1]==="?"?$:n[1]==="@"?_:G}),a.removeAttribute(c)}else c.startsWith(h)&&(I.push({type:6,index:l}),a.removeAttribute(c));if(re.test(a.tagName)){let c=a.textContent.split(h),T=c.length-1;if(T>0){a.textContent=v?v.emptyScript:"";for(let f=0;f<T;f++)a.append(c[f],C()),Y.nextNode(),I.push({type:2,index:++l});a.append(c[T],C())}}}else if(a.nodeType===8)if(a.data===pe)I.push({type:2,index:l});else{let c=-1;for(;(c=a.data.indexOf(h,c+1))!==-1;)I.push({type:7,index:l}),c+=h.length-1}l++}}static createElement(e,t){let i=b.createElement("template");return i.innerHTML=e,i}};function w(o,e,t=o,i){if(e===x)return e;let a=i!==void 0?t._$Co?.[i]:t._$Cl,l=y(e)?void 0:e._$litDirective$;return a?.constructor!==l&&(a?._$AO?.(!1),l===void 0?a=void 0:(a=new l(o),a._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=a:t._$Cl=a),a!==void 0&&(e=w(o,a._$AS(o,e.values),a,i)),e}var O=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??b).importNode(t,!0);Y.currentNode=a;let l=Y.nextNode(),d=0,m=0,I=i[0];for(;I!==void 0;){if(d===I.index){let N;I.type===2?N=new Z(l,l.nextSibling,this,e):I.type===1?N=new I.ctor(l,I.name,I.strings,this,e):I.type===6&&(N=new K(l,this,e)),this._$AV.push(N),I=i[++m]}d!==I?.index&&(l=Y.nextNode(),d++)}return Y.currentNode=b,a}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Z=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),y(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ce(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&y(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=P.createElement(je(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{let l=new O(a,this),d=l.u(this.options);l.p(t),this.T(d),this._$AH=l}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new P(e)),t}k(e){ee(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,a=0;for(let l of e)a===t.length?t.push(i=new o(this.O(C()),this.O(C()),this,this.options)):i=t[a],i._$AI(l),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Ne(e).nextSibling;Ne(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,l){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=l,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,a){let l=this.strings,d=!1;if(l===void 0)e=w(this,e,t,0),d=!y(e)||e!==this._$AH&&e!==x,d&&(this._$AH=e);else{let m=e,I,N;for(e=l[0],I=0;I<l.length-1;I++)N=w(this,m[i+I],t,I),N===x&&(N=this._$AH[I]),d||=!y(N)||N!==this._$AH[I],N===g?e=g:e!==g&&(e+=(N??"")+l[I+1]),this._$AH[I]=N}d&&!a&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},J=class extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},$=class extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},_=class extends G{constructor(e,t,i,a,l){super(e,t,i,a,l),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??g)===x)return;let i=this._$AH,a=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,l=e!==g&&(i===g||a);a&&this.element.removeEventListener(this.name,this,i),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},K=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}};var Pe=q.litHtmlPolyfillSupport;Pe?.(P,Z),(q.litHtmlVersions??=[]).push("3.3.3");var We=(o,e,t)=>{let i=t?.renderBefore??e,a=i._$litPart$;if(a===void 0){let l=t?.renderBefore??null;i._$litPart$=a=new Z(e.insertBefore(C(),l),l,void 0,t??{})}return a._$AI(o),a};var ie=globalThis,V=class extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=We(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};V._$litElement$=!0,V.finalized=!0,ie.litElementHydrateSupport?.({LitElement:V});var Ze=ie.litElementPolyfillSupport;Ze?.({LitElement:V});(ie.litElementVersions??=[]).push("4.2.2");globalThis.SimpleColorsSharedStyles={};globalThis.SimpleColorsSharedStyles.instance=null;var L=class extends V{static get styles(){return[D`
        html {
          --simple-colors-default-theme-accent-1: #ffffff;
          --simple-colors-default-theme-accent-2: #eeeeee;
          --simple-colors-default-theme-accent-3: #dddddd;
          --simple-colors-default-theme-accent-4: #cccccc;
          --simple-colors-default-theme-accent-5: #bbbbbb;
          --simple-colors-default-theme-accent-6: #999999;
          --simple-colors-default-theme-accent-7: #666666;
          --simple-colors-default-theme-accent-8: #444444;
          --simple-colors-default-theme-accent-9: #333333;
          --simple-colors-default-theme-accent-10: #222222;
          --simple-colors-default-theme-accent-11: #111111;
          --simple-colors-default-theme-accent-12: #000000;

          --simple-colors-default-theme-grey-1: #ffffff;
          --simple-colors-default-theme-grey-2: #eeeeee;
          --simple-colors-default-theme-grey-3: #dddddd;
          --simple-colors-default-theme-grey-4: #cccccc;
          --simple-colors-default-theme-grey-5: #bbbbbb;
          --simple-colors-default-theme-grey-6: #999999;
          --simple-colors-default-theme-grey-7: #666666;
          --simple-colors-default-theme-grey-8: #444444;
          --simple-colors-default-theme-grey-9: #333333;
          --simple-colors-default-theme-grey-10: #222222;
          --simple-colors-default-theme-grey-11: #111111;
          --simple-colors-default-theme-grey-12: #000000;

          --simple-colors-default-theme-red-1: #ffdddd;
          --simple-colors-default-theme-red-2: #ffaeae;
          --simple-colors-default-theme-red-3: #ff8f8f;
          --simple-colors-default-theme-red-4: #ff7474;
          --simple-colors-default-theme-red-5: #fd5151;
          --simple-colors-default-theme-red-6: #ff2222;
          --simple-colors-default-theme-red-7: #ee0000;
          --simple-colors-default-theme-red-8: #ac0000;
          --simple-colors-default-theme-red-9: #850000;
          --simple-colors-default-theme-red-10: #670000;
          --simple-colors-default-theme-red-11: #520000;
          --simple-colors-default-theme-red-12: #3f0000;

          --simple-colors-default-theme-pink-1: #ffe6f1;
          --simple-colors-default-theme-pink-2: #ffa5cf;
          --simple-colors-default-theme-pink-3: #ff87c0;
          --simple-colors-default-theme-pink-4: #ff73b5;
          --simple-colors-default-theme-pink-5: #fd60aa;
          --simple-colors-default-theme-pink-6: #ff3996;
          --simple-colors-default-theme-pink-7: #da004e;
          --simple-colors-default-theme-pink-8: #b80042;
          --simple-colors-default-theme-pink-9: #980036;
          --simple-colors-default-theme-pink-10: #78002b;
          --simple-colors-default-theme-pink-11: #5a0020;
          --simple-colors-default-theme-pink-12: #440019;

          --simple-colors-default-theme-purple-1: #fce6ff;
          --simple-colors-default-theme-purple-2: #f4affd;
          --simple-colors-default-theme-purple-3: #f394ff;
          --simple-colors-default-theme-purple-4: #f07cff;
          --simple-colors-default-theme-purple-5: #ed61ff;
          --simple-colors-default-theme-purple-6: #e200ff;
          --simple-colors-default-theme-purple-7: #a500ba;
          --simple-colors-default-theme-purple-8: #8a009b;
          --simple-colors-default-theme-purple-9: #6c0079;
          --simple-colors-default-theme-purple-10: #490052;
          --simple-colors-default-theme-purple-11: #33003a;
          --simple-colors-default-theme-purple-12: #200025;

          --simple-colors-default-theme-deep-purple-1: #f3e4ff;
          --simple-colors-default-theme-deep-purple-2: #ddacff;
          --simple-colors-default-theme-deep-purple-3: #c97eff;
          --simple-colors-default-theme-deep-purple-4: #bb63f9;
          --simple-colors-default-theme-deep-purple-5: #b44aff;
          --simple-colors-default-theme-deep-purple-6: #a931ff;
          --simple-colors-default-theme-deep-purple-7: #7e00d8;
          --simple-colors-default-theme-deep-purple-8: #5d009f;
          --simple-colors-default-theme-deep-purple-9: #4c0081;
          --simple-colors-default-theme-deep-purple-10: #3a0063;
          --simple-colors-default-theme-deep-purple-11: #2a0049;
          --simple-colors-default-theme-deep-purple-12: #1d0033;

          --simple-colors-default-theme-indigo-1: #e5ddff;
          --simple-colors-default-theme-indigo-2: #c3b2ff;
          --simple-colors-default-theme-indigo-3: #af97ff;
          --simple-colors-default-theme-indigo-4: #9e82ff;
          --simple-colors-default-theme-indigo-5: #9373ff;
          --simple-colors-default-theme-indigo-6: #835fff;
          --simple-colors-default-theme-indigo-7: #3a00ff;
          --simple-colors-default-theme-indigo-8: #2801b0;
          --simple-colors-default-theme-indigo-9: #20008c;
          --simple-colors-default-theme-indigo-10: #160063;
          --simple-colors-default-theme-indigo-11: #100049;
          --simple-colors-default-theme-indigo-12: #0a0030;

          --simple-colors-default-theme-blue-1: #e2ecff;
          --simple-colors-default-theme-blue-2: #acc9ff;
          --simple-colors-default-theme-blue-3: #95baff;
          --simple-colors-default-theme-blue-4: #74a5ff;
          --simple-colors-default-theme-blue-5: #5892fd;
          --simple-colors-default-theme-blue-6: #4083ff;
          --simple-colors-default-theme-blue-7: #0059ff;
          --simple-colors-default-theme-blue-8: #0041bb;
          --simple-colors-default-theme-blue-9: #003494;
          --simple-colors-default-theme-blue-10: #002569;
          --simple-colors-default-theme-blue-11: #001947;
          --simple-colors-default-theme-blue-12: #001333;

          --simple-colors-default-theme-light-blue-1: #cde8ff;
          --simple-colors-default-theme-light-blue-2: #a1d1ff;
          --simple-colors-default-theme-light-blue-3: #92c9ff;
          --simple-colors-default-theme-light-blue-4: #65b3ff;
          --simple-colors-default-theme-light-blue-5: #58adff;
          --simple-colors-default-theme-light-blue-6: #41a1ff;
          --simple-colors-default-theme-light-blue-7: #007ffc;
          --simple-colors-default-theme-light-blue-8: #0066ca;
          --simple-colors-default-theme-light-blue-9: #0055a8;
          --simple-colors-default-theme-light-blue-10: #003f7d;
          --simple-colors-default-theme-light-blue-11: #002850;
          --simple-colors-default-theme-light-blue-12: #001b36;

          --simple-colors-default-theme-cyan-1: #ccf3fd;
          --simple-colors-default-theme-cyan-2: #9beaff;
          --simple-colors-default-theme-cyan-3: #77e2ff;
          --simple-colors-default-theme-cyan-4: #33d4ff;
          --simple-colors-default-theme-cyan-5: #1ccfff;
          --simple-colors-default-theme-cyan-6: #00c9ff;
          --simple-colors-default-theme-cyan-7: #009dc7;
          --simple-colors-default-theme-cyan-8: #007999;
          --simple-colors-default-theme-cyan-9: #005970;
          --simple-colors-default-theme-cyan-10: #003f50;
          --simple-colors-default-theme-cyan-11: #002c38;
          --simple-colors-default-theme-cyan-12: #001a20;

          --simple-colors-default-theme-teal-1: #d4ffee;
          --simple-colors-default-theme-teal-2: #98ffd7;
          --simple-colors-default-theme-teal-3: #79ffcb;
          --simple-colors-default-theme-teal-4: #56ffbd;
          --simple-colors-default-theme-teal-5: #29ffac;
          --simple-colors-default-theme-teal-6: #00ff9c;
          --simple-colors-default-theme-teal-7: #009d75;
          --simple-colors-default-theme-teal-8: #007658;
          --simple-colors-default-theme-teal-9: #004e3a;
          --simple-colors-default-theme-teal-10: #003829;
          --simple-colors-default-theme-teal-11: #002a20;
          --simple-colors-default-theme-teal-12: #001b14;

          --simple-colors-default-theme-green-1: #e1ffeb;
          --simple-colors-default-theme-green-2: #acffc9;
          --simple-colors-default-theme-green-3: #79ffa7;
          --simple-colors-default-theme-green-4: #49ff88;
          --simple-colors-default-theme-green-5: #24ff70;
          --simple-colors-default-theme-green-6: #00f961;
          --simple-colors-default-theme-green-7: #008c37;
          --simple-colors-default-theme-green-8: #00762e;
          --simple-colors-default-theme-green-9: #005a23;
          --simple-colors-default-theme-green-10: #003d18;
          --simple-colors-default-theme-green-11: #002a11;
          --simple-colors-default-theme-green-12: #001d0c;

          --simple-colors-default-theme-light-green-1: #ebffdb;
          --simple-colors-default-theme-light-green-2: #c7ff9b;
          --simple-colors-default-theme-light-green-3: #b1ff75;
          --simple-colors-default-theme-light-green-4: #a1fd5a;
          --simple-colors-default-theme-light-green-5: #8efd38;
          --simple-colors-default-theme-light-green-6: #6fff00;
          --simple-colors-default-theme-light-green-7: #429d00;
          --simple-colors-default-theme-light-green-8: #357f00;
          --simple-colors-default-theme-light-green-9: #296100;
          --simple-colors-default-theme-light-green-10: #1b3f00;
          --simple-colors-default-theme-light-green-11: #143000;
          --simple-colors-default-theme-light-green-12: #0d2000;

          --simple-colors-default-theme-lime-1: #f1ffd2;
          --simple-colors-default-theme-lime-2: #dfff9b;
          --simple-colors-default-theme-lime-3: #d4ff77;
          --simple-colors-default-theme-lime-4: #caff58;
          --simple-colors-default-theme-lime-5: #bdff2d;
          --simple-colors-default-theme-lime-6: #aeff00;
          --simple-colors-default-theme-lime-7: #649900;
          --simple-colors-default-theme-lime-8: #4d7600;
          --simple-colors-default-theme-lime-9: #3b5a00;
          --simple-colors-default-theme-lime-10: #293f00;
          --simple-colors-default-theme-lime-11: #223400;
          --simple-colors-default-theme-lime-12: #182400;

          --simple-colors-default-theme-yellow-1: #ffffd5;
          --simple-colors-default-theme-yellow-2: #ffffac;
          --simple-colors-default-theme-yellow-3: #ffff90;
          --simple-colors-default-theme-yellow-4: #ffff7c;
          --simple-colors-default-theme-yellow-5: #ffff3a;
          --simple-colors-default-theme-yellow-6: #f6f600;
          --simple-colors-default-theme-yellow-7: #929100;
          --simple-colors-default-theme-yellow-8: #787700;
          --simple-colors-default-theme-yellow-9: #585700;
          --simple-colors-default-theme-yellow-10: #454400;
          --simple-colors-default-theme-yellow-11: #303000;
          --simple-colors-default-theme-yellow-12: #242400;

          --simple-colors-default-theme-amber-1: #fff2d4;
          --simple-colors-default-theme-amber-2: #ffdf92;
          --simple-colors-default-theme-amber-3: #ffd677;
          --simple-colors-default-theme-amber-4: #ffcf5e;
          --simple-colors-default-theme-amber-5: #ffc235;
          --simple-colors-default-theme-amber-6: #ffc500;
          --simple-colors-default-theme-amber-7: #b28900;
          --simple-colors-default-theme-amber-8: #876800;
          --simple-colors-default-theme-amber-9: #614b00;
          --simple-colors-default-theme-amber-10: #413200;
          --simple-colors-default-theme-amber-11: #302500;
          --simple-colors-default-theme-amber-12: #221a00;

          --simple-colors-default-theme-orange-1: #ffebd7;
          --simple-colors-default-theme-orange-2: #ffca92;
          --simple-colors-default-theme-orange-3: #ffbd75;
          --simple-colors-default-theme-orange-4: #ffb05c;
          --simple-colors-default-theme-orange-5: #ff9e36;
          --simple-colors-default-theme-orange-6: #ff9625;
          --simple-colors-default-theme-orange-7: #e56a00;
          --simple-colors-default-theme-orange-8: #ae5100;
          --simple-colors-default-theme-orange-9: #833d00;
          --simple-colors-default-theme-orange-10: #612d00;
          --simple-colors-default-theme-orange-11: #3d1c00;
          --simple-colors-default-theme-orange-12: #2c1400;

          --simple-colors-default-theme-deep-orange-1: #ffe7e0;
          --simple-colors-default-theme-deep-orange-2: #ffb299;
          --simple-colors-default-theme-deep-orange-3: #ffa588;
          --simple-colors-default-theme-deep-orange-4: #ff8a64;
          --simple-colors-default-theme-deep-orange-5: #ff7649;
          --simple-colors-default-theme-deep-orange-6: #ff6c3c;
          --simple-colors-default-theme-deep-orange-7: #f53100;
          --simple-colors-default-theme-deep-orange-8: #b92500;
          --simple-colors-default-theme-deep-orange-9: #8a1c00;
          --simple-colors-default-theme-deep-orange-10: #561100;
          --simple-colors-default-theme-deep-orange-11: #3a0c00;
          --simple-colors-default-theme-deep-orange-12: #240700;

          --simple-colors-default-theme-brown-1: #f0e2de;
          --simple-colors-default-theme-brown-2: #e5b8aa;
          --simple-colors-default-theme-brown-3: #c59485;
          --simple-colors-default-theme-brown-4: #b68373;
          --simple-colors-default-theme-brown-5: #ac7868;
          --simple-colors-default-theme-brown-6: #a47060;
          --simple-colors-default-theme-brown-7: #85574a;
          --simple-colors-default-theme-brown-8: #724539;
          --simple-colors-default-theme-brown-9: #5b3328;
          --simple-colors-default-theme-brown-10: #3b1e15;
          --simple-colors-default-theme-brown-11: #2c140e;
          --simple-colors-default-theme-brown-12: #200e09;

          --simple-colors-default-theme-blue-grey-1: #e7eff1;
          --simple-colors-default-theme-blue-grey-2: #b1c5ce;
          --simple-colors-default-theme-blue-grey-3: #9badb6;
          --simple-colors-default-theme-blue-grey-4: #8d9fa7;
          --simple-colors-default-theme-blue-grey-5: #7a8f98;
          --simple-colors-default-theme-blue-grey-6: #718892;
          --simple-colors-default-theme-blue-grey-7: #56707c;
          --simple-colors-default-theme-blue-grey-8: #40535b;
          --simple-colors-default-theme-blue-grey-9: #2f3e45;
          --simple-colors-default-theme-blue-grey-10: #1e282c;
          --simple-colors-default-theme-blue-grey-11: #182023;
          --simple-colors-default-theme-blue-grey-12: #0f1518;
          --simple-colors-fixed-theme-accent-1: #ffffff;
          --simple-colors-fixed-theme-accent-2: #eeeeee;
          --simple-colors-fixed-theme-accent-3: #dddddd;
          --simple-colors-fixed-theme-accent-4: #cccccc;
          --simple-colors-fixed-theme-accent-5: #bbbbbb;
          --simple-colors-fixed-theme-accent-6: #999999;
          --simple-colors-fixed-theme-accent-7: #666666;
          --simple-colors-fixed-theme-accent-8: #444444;
          --simple-colors-fixed-theme-accent-9: #333333;
          --simple-colors-fixed-theme-accent-10: #222222;
          --simple-colors-fixed-theme-accent-11: #111111;
          --simple-colors-fixed-theme-accent-12: #000000;

          --simple-colors-fixed-theme-grey-1: #ffffff;
          --simple-colors-fixed-theme-grey-2: #eeeeee;
          --simple-colors-fixed-theme-grey-3: #dddddd;
          --simple-colors-fixed-theme-grey-4: #cccccc;
          --simple-colors-fixed-theme-grey-5: #bbbbbb;
          --simple-colors-fixed-theme-grey-6: #999999;
          --simple-colors-fixed-theme-grey-7: #666666;
          --simple-colors-fixed-theme-grey-8: #444444;
          --simple-colors-fixed-theme-grey-9: #333333;
          --simple-colors-fixed-theme-grey-10: #222222;
          --simple-colors-fixed-theme-grey-11: #111111;
          --simple-colors-fixed-theme-grey-12: #000000;

          --simple-colors-fixed-theme-red-1: #ffdddd;
          --simple-colors-fixed-theme-red-2: #ffaeae;
          --simple-colors-fixed-theme-red-3: #ff8f8f;
          --simple-colors-fixed-theme-red-4: #ff7474;
          --simple-colors-fixed-theme-red-5: #fd5151;
          --simple-colors-fixed-theme-red-6: #ff2222;
          --simple-colors-fixed-theme-red-7: #ee0000;
          --simple-colors-fixed-theme-red-8: #ac0000;
          --simple-colors-fixed-theme-red-9: #850000;
          --simple-colors-fixed-theme-red-10: #670000;
          --simple-colors-fixed-theme-red-11: #520000;
          --simple-colors-fixed-theme-red-12: #3f0000;

          --simple-colors-fixed-theme-pink-1: #ffe6f1;
          --simple-colors-fixed-theme-pink-2: #ffa5cf;
          --simple-colors-fixed-theme-pink-3: #ff87c0;
          --simple-colors-fixed-theme-pink-4: #ff73b5;
          --simple-colors-fixed-theme-pink-5: #fd60aa;
          --simple-colors-fixed-theme-pink-6: #ff3996;
          --simple-colors-fixed-theme-pink-7: #da004e;
          --simple-colors-fixed-theme-pink-8: #b80042;
          --simple-colors-fixed-theme-pink-9: #980036;
          --simple-colors-fixed-theme-pink-10: #78002b;
          --simple-colors-fixed-theme-pink-11: #5a0020;
          --simple-colors-fixed-theme-pink-12: #440019;

          --simple-colors-fixed-theme-purple-1: #fce6ff;
          --simple-colors-fixed-theme-purple-2: #f4affd;
          --simple-colors-fixed-theme-purple-3: #f394ff;
          --simple-colors-fixed-theme-purple-4: #f07cff;
          --simple-colors-fixed-theme-purple-5: #ed61ff;
          --simple-colors-fixed-theme-purple-6: #e200ff;
          --simple-colors-fixed-theme-purple-7: #a500ba;
          --simple-colors-fixed-theme-purple-8: #8a009b;
          --simple-colors-fixed-theme-purple-9: #6c0079;
          --simple-colors-fixed-theme-purple-10: #490052;
          --simple-colors-fixed-theme-purple-11: #33003a;
          --simple-colors-fixed-theme-purple-12: #200025;

          --simple-colors-fixed-theme-deep-purple-1: #f3e4ff;
          --simple-colors-fixed-theme-deep-purple-2: #ddacff;
          --simple-colors-fixed-theme-deep-purple-3: #c97eff;
          --simple-colors-fixed-theme-deep-purple-4: #bb63f9;
          --simple-colors-fixed-theme-deep-purple-5: #b44aff;
          --simple-colors-fixed-theme-deep-purple-6: #a931ff;
          --simple-colors-fixed-theme-deep-purple-7: #7e00d8;
          --simple-colors-fixed-theme-deep-purple-8: #5d009f;
          --simple-colors-fixed-theme-deep-purple-9: #4c0081;
          --simple-colors-fixed-theme-deep-purple-10: #3a0063;
          --simple-colors-fixed-theme-deep-purple-11: #2a0049;
          --simple-colors-fixed-theme-deep-purple-12: #1d0033;

          --simple-colors-fixed-theme-indigo-1: #e5ddff;
          --simple-colors-fixed-theme-indigo-2: #c3b2ff;
          --simple-colors-fixed-theme-indigo-3: #af97ff;
          --simple-colors-fixed-theme-indigo-4: #9e82ff;
          --simple-colors-fixed-theme-indigo-5: #9373ff;
          --simple-colors-fixed-theme-indigo-6: #835fff;
          --simple-colors-fixed-theme-indigo-7: #3a00ff;
          --simple-colors-fixed-theme-indigo-8: #2801b0;
          --simple-colors-fixed-theme-indigo-9: #20008c;
          --simple-colors-fixed-theme-indigo-10: #160063;
          --simple-colors-fixed-theme-indigo-11: #100049;
          --simple-colors-fixed-theme-indigo-12: #0a0030;

          --simple-colors-fixed-theme-blue-1: #e2ecff;
          --simple-colors-fixed-theme-blue-2: #acc9ff;
          --simple-colors-fixed-theme-blue-3: #95baff;
          --simple-colors-fixed-theme-blue-4: #74a5ff;
          --simple-colors-fixed-theme-blue-5: #5892fd;
          --simple-colors-fixed-theme-blue-6: #4083ff;
          --simple-colors-fixed-theme-blue-7: #0059ff;
          --simple-colors-fixed-theme-blue-8: #0041bb;
          --simple-colors-fixed-theme-blue-9: #003494;
          --simple-colors-fixed-theme-blue-10: #002569;
          --simple-colors-fixed-theme-blue-11: #001947;
          --simple-colors-fixed-theme-blue-12: #001333;

          --simple-colors-fixed-theme-light-blue-1: #cde8ff;
          --simple-colors-fixed-theme-light-blue-2: #a1d1ff;
          --simple-colors-fixed-theme-light-blue-3: #92c9ff;
          --simple-colors-fixed-theme-light-blue-4: #65b3ff;
          --simple-colors-fixed-theme-light-blue-5: #58adff;
          --simple-colors-fixed-theme-light-blue-6: #41a1ff;
          --simple-colors-fixed-theme-light-blue-7: #007ffc;
          --simple-colors-fixed-theme-light-blue-8: #0066ca;
          --simple-colors-fixed-theme-light-blue-9: #0055a8;
          --simple-colors-fixed-theme-light-blue-10: #003f7d;
          --simple-colors-fixed-theme-light-blue-11: #002850;
          --simple-colors-fixed-theme-light-blue-12: #001b36;

          --simple-colors-fixed-theme-cyan-1: #ccf3fd;
          --simple-colors-fixed-theme-cyan-2: #9beaff;
          --simple-colors-fixed-theme-cyan-3: #77e2ff;
          --simple-colors-fixed-theme-cyan-4: #33d4ff;
          --simple-colors-fixed-theme-cyan-5: #1ccfff;
          --simple-colors-fixed-theme-cyan-6: #00c9ff;
          --simple-colors-fixed-theme-cyan-7: #009dc7;
          --simple-colors-fixed-theme-cyan-8: #007999;
          --simple-colors-fixed-theme-cyan-9: #005970;
          --simple-colors-fixed-theme-cyan-10: #003f50;
          --simple-colors-fixed-theme-cyan-11: #002c38;
          --simple-colors-fixed-theme-cyan-12: #001a20;

          --simple-colors-fixed-theme-teal-1: #d4ffee;
          --simple-colors-fixed-theme-teal-2: #98ffd7;
          --simple-colors-fixed-theme-teal-3: #79ffcb;
          --simple-colors-fixed-theme-teal-4: #56ffbd;
          --simple-colors-fixed-theme-teal-5: #29ffac;
          --simple-colors-fixed-theme-teal-6: #00ff9c;
          --simple-colors-fixed-theme-teal-7: #009d75;
          --simple-colors-fixed-theme-teal-8: #007658;
          --simple-colors-fixed-theme-teal-9: #004e3a;
          --simple-colors-fixed-theme-teal-10: #003829;
          --simple-colors-fixed-theme-teal-11: #002a20;
          --simple-colors-fixed-theme-teal-12: #001b14;

          --simple-colors-fixed-theme-green-1: #e1ffeb;
          --simple-colors-fixed-theme-green-2: #acffc9;
          --simple-colors-fixed-theme-green-3: #79ffa7;
          --simple-colors-fixed-theme-green-4: #49ff88;
          --simple-colors-fixed-theme-green-5: #24ff70;
          --simple-colors-fixed-theme-green-6: #00f961;
          --simple-colors-fixed-theme-green-7: #008c37;
          --simple-colors-fixed-theme-green-8: #00762e;
          --simple-colors-fixed-theme-green-9: #005a23;
          --simple-colors-fixed-theme-green-10: #003d18;
          --simple-colors-fixed-theme-green-11: #002a11;
          --simple-colors-fixed-theme-green-12: #001d0c;

          --simple-colors-fixed-theme-light-green-1: #ebffdb;
          --simple-colors-fixed-theme-light-green-2: #c7ff9b;
          --simple-colors-fixed-theme-light-green-3: #b1ff75;
          --simple-colors-fixed-theme-light-green-4: #a1fd5a;
          --simple-colors-fixed-theme-light-green-5: #8efd38;
          --simple-colors-fixed-theme-light-green-6: #6fff00;
          --simple-colors-fixed-theme-light-green-7: #429d00;
          --simple-colors-fixed-theme-light-green-8: #357f00;
          --simple-colors-fixed-theme-light-green-9: #296100;
          --simple-colors-fixed-theme-light-green-10: #1b3f00;
          --simple-colors-fixed-theme-light-green-11: #143000;
          --simple-colors-fixed-theme-light-green-12: #0d2000;

          --simple-colors-fixed-theme-lime-1: #f1ffd2;
          --simple-colors-fixed-theme-lime-2: #dfff9b;
          --simple-colors-fixed-theme-lime-3: #d4ff77;
          --simple-colors-fixed-theme-lime-4: #caff58;
          --simple-colors-fixed-theme-lime-5: #bdff2d;
          --simple-colors-fixed-theme-lime-6: #aeff00;
          --simple-colors-fixed-theme-lime-7: #649900;
          --simple-colors-fixed-theme-lime-8: #4d7600;
          --simple-colors-fixed-theme-lime-9: #3b5a00;
          --simple-colors-fixed-theme-lime-10: #293f00;
          --simple-colors-fixed-theme-lime-11: #223400;
          --simple-colors-fixed-theme-lime-12: #182400;

          --simple-colors-fixed-theme-yellow-1: #ffffd5;
          --simple-colors-fixed-theme-yellow-2: #ffffac;
          --simple-colors-fixed-theme-yellow-3: #ffff90;
          --simple-colors-fixed-theme-yellow-4: #ffff7c;
          --simple-colors-fixed-theme-yellow-5: #ffff3a;
          --simple-colors-fixed-theme-yellow-6: #f6f600;
          --simple-colors-fixed-theme-yellow-7: #929100;
          --simple-colors-fixed-theme-yellow-8: #787700;
          --simple-colors-fixed-theme-yellow-9: #585700;
          --simple-colors-fixed-theme-yellow-10: #454400;
          --simple-colors-fixed-theme-yellow-11: #303000;
          --simple-colors-fixed-theme-yellow-12: #242400;

          --simple-colors-fixed-theme-amber-1: #fff2d4;
          --simple-colors-fixed-theme-amber-2: #ffdf92;
          --simple-colors-fixed-theme-amber-3: #ffd677;
          --simple-colors-fixed-theme-amber-4: #ffcf5e;
          --simple-colors-fixed-theme-amber-5: #ffc235;
          --simple-colors-fixed-theme-amber-6: #ffc500;
          --simple-colors-fixed-theme-amber-7: #b28900;
          --simple-colors-fixed-theme-amber-8: #876800;
          --simple-colors-fixed-theme-amber-9: #614b00;
          --simple-colors-fixed-theme-amber-10: #413200;
          --simple-colors-fixed-theme-amber-11: #302500;
          --simple-colors-fixed-theme-amber-12: #221a00;

          --simple-colors-fixed-theme-orange-1: #ffebd7;
          --simple-colors-fixed-theme-orange-2: #ffca92;
          --simple-colors-fixed-theme-orange-3: #ffbd75;
          --simple-colors-fixed-theme-orange-4: #ffb05c;
          --simple-colors-fixed-theme-orange-5: #ff9e36;
          --simple-colors-fixed-theme-orange-6: #ff9625;
          --simple-colors-fixed-theme-orange-7: #e56a00;
          --simple-colors-fixed-theme-orange-8: #ae5100;
          --simple-colors-fixed-theme-orange-9: #833d00;
          --simple-colors-fixed-theme-orange-10: #612d00;
          --simple-colors-fixed-theme-orange-11: #3d1c00;
          --simple-colors-fixed-theme-orange-12: #2c1400;

          --simple-colors-fixed-theme-deep-orange-1: #ffe7e0;
          --simple-colors-fixed-theme-deep-orange-2: #ffb299;
          --simple-colors-fixed-theme-deep-orange-3: #ffa588;
          --simple-colors-fixed-theme-deep-orange-4: #ff8a64;
          --simple-colors-fixed-theme-deep-orange-5: #ff7649;
          --simple-colors-fixed-theme-deep-orange-6: #ff6c3c;
          --simple-colors-fixed-theme-deep-orange-7: #f53100;
          --simple-colors-fixed-theme-deep-orange-8: #b92500;
          --simple-colors-fixed-theme-deep-orange-9: #8a1c00;
          --simple-colors-fixed-theme-deep-orange-10: #561100;
          --simple-colors-fixed-theme-deep-orange-11: #3a0c00;
          --simple-colors-fixed-theme-deep-orange-12: #240700;

          --simple-colors-fixed-theme-brown-1: #f0e2de;
          --simple-colors-fixed-theme-brown-2: #e5b8aa;
          --simple-colors-fixed-theme-brown-3: #c59485;
          --simple-colors-fixed-theme-brown-4: #b68373;
          --simple-colors-fixed-theme-brown-5: #ac7868;
          --simple-colors-fixed-theme-brown-6: #a47060;
          --simple-colors-fixed-theme-brown-7: #85574a;
          --simple-colors-fixed-theme-brown-8: #724539;
          --simple-colors-fixed-theme-brown-9: #5b3328;
          --simple-colors-fixed-theme-brown-10: #3b1e15;
          --simple-colors-fixed-theme-brown-11: #2c140e;
          --simple-colors-fixed-theme-brown-12: #200e09;

          --simple-colors-fixed-theme-blue-grey-1: #e7eff1;
          --simple-colors-fixed-theme-blue-grey-2: #b1c5ce;
          --simple-colors-fixed-theme-blue-grey-3: #9badb6;
          --simple-colors-fixed-theme-blue-grey-4: #8d9fa7;
          --simple-colors-fixed-theme-blue-grey-5: #7a8f98;
          --simple-colors-fixed-theme-blue-grey-6: #718892;
          --simple-colors-fixed-theme-blue-grey-7: #56707c;
          --simple-colors-fixed-theme-blue-grey-8: #40535b;
          --simple-colors-fixed-theme-blue-grey-9: #2f3e45;
          --simple-colors-fixed-theme-blue-grey-10: #1e282c;
          --simple-colors-fixed-theme-blue-grey-11: #182023;
          --simple-colors-fixed-theme-blue-grey-12: #0f1518;
        }
      `]}render(){return r``}static get properties(){return{...super.properties,colors:{attribute:"colors",type:Object},contrasts:{attribute:"contrasts",type:Object}}}constructor(){super(),this.colors={grey:["#ffffff","#eeeeee","#dddddd","#cccccc","#bbbbbb","#999999","#666666","#444444","#333333","#222222","#111111","#000000"],red:["#ffdddd","#ffaeae","#ff8f8f","#ff7474","#fd5151","#ff2222","#ee0000","#ac0000","#850000","#670000","#520000","#3f0000"],pink:["#ffe6f1","#ffa5cf","#ff87c0","#ff73b5","#fd60aa","#ff3996","#da004e","#b80042","#980036","#78002b","#5a0020","#440019"],purple:["#fce6ff","#f4affd","#f394ff","#f07cff","#ed61ff","#e200ff","#a500ba","#8a009b","#6c0079","#490052","#33003a","#200025"],"deep-purple":["#f3e4ff","#ddacff","#c97eff","#bb63f9","#b44aff","#a931ff","#7e00d8","#5d009f","#4c0081","#3a0063","#2a0049","#1d0033"],indigo:["#e5ddff","#c3b2ff","#af97ff","#9e82ff","#9373ff","#835fff","#3a00ff","#2801b0","#20008c","#160063","#100049","#0a0030"],blue:["#e2ecff","#acc9ff","#95baff","#74a5ff","#5892fd","#4083ff","#0059ff","#0041bb","#003494","#002569","#001947","#001333"],"light-blue":["#cde8ff","#a1d1ff","#92c9ff","#65b3ff","#58adff","#41a1ff","#007ffc","#0066ca","#0055a8","#003f7d","#002850","#001b36"],cyan:["#ddf8ff","#9beaff","#77e2ff","#33d4ff","#1ccfff","#00c9ff","#009dc7","#007999","#005970","#003f50","#002c38","#001a20"],teal:["#d9fff0","#98ffd7","#79ffcb","#56ffbd","#29ffac","#00ff9c","#009d75","#007658","#004e3a","#003829","#002a20","#001b14"],green:["#e1ffeb","#acffc9","#79ffa7","#49ff88","#24ff70","#00f961","#008c37","#00762e","#005a23","#003d18","#002a11","#001d0c"],"light-green":["#ebffdb","#c7ff9b","#b1ff75","#a1fd5a","#8efd38","#6fff00","#429d00","#357f00","#296100","#1b3f00","#143000","#0d2000"],lime:["#f1ffd2","#dfff9b","#d4ff77","#caff58","#bdff2d","#aeff00","#649900","#4d7600","#3b5a00","#293f00","#223400","#182400"],yellow:["#ffffd5","#ffffac","#ffff90","#ffff7c","#ffff3a","#f6f600","#929100","#787700","#585700","#454400","#303000","#242400"],amber:["#fff2d4","#ffdf92","#ffd677","#ffcf5e","#ffc235","#ffc500","#b28900","#876800","#614b00","#413200","#302500","#221a00"],orange:["#ffebd7","#ffca92","#ffbd75","#ffb05c","#ff9e36","#ff9625","#e56a00","#ae5100","#833d00","#612d00","#3d1c00","#2c1400"],"deep-orange":["#ffe7e0","#ffb299","#ffa588","#ff8a64","#ff7649","#ff6c3c","#f53100","#b92500","#8a1c00","#561100","#3a0c00","#240700"],brown:["#f0e2de","#e5b8aa","#c59485","#b68373","#ac7868","#a47060","#85574a","#724539","#5b3328","#3b1e15","#2c140e","#200e09"],"blue-grey":["#e7eff1","#b1c5ce","#9badb6","#8d9fa7","#7a8f98","#718892","#56707c","#40535b","#2f3e45","#1e282c","#182023","#0f1518"]},this.contrasts={greyColor:{aaLarge:[{min:7,max:12},{min:7,max:12},{min:7,max:12},{min:7,max:12},{min:8,max:12},{min:10,max:12},{min:1,max:3},{min:1,max:5},{min:1,max:6},{min:1,max:6},{min:1,max:6},{min:1,max:6}],aa:[{min:7,max:12},{min:7,max:12},{min:7,max:12},{min:8,max:12},{min:8,max:12},{min:11,max:12},{min:1,max:2},{min:1,max:7},{min:1,max:7},{min:1,max:6},{min:1,max:6},{min:1,max:6}]},colorColor:{aaLarge:[{min:7,max:12},{min:7,max:12},{min:8,max:12},{min:9,max:12},{min:10,max:12},{min:11,max:12},{min:1,max:2},{min:1,max:3},{min:1,max:4},{min:1,max:5},{min:1,max:6},{min:1,max:6}],aa:[{min:8,max:12},{min:8,max:12},{min:9,max:12},{min:9,max:12},{min:11,max:12},{min:12,max:12},{min:1,max:1},{min:1,max:2},{min:1,max:4},{min:1,max:4},{min:1,max:5},{min:1,max:5}]}}}static get tag(){return"simple-colors-shared-styles"}getColorInfo(e){let t=e.replace(/(simple-colors-)?(-text)?(-border)?/g,"").split("-theme-"),i=t.length>0?t[0]:"default",a=t.length>0?t[1].split("-"):t[0].split("-"),l=a.length>1?a.slice(1,a.length-1).join("-"):"grey",d=a.length>1?a[a.length-1]:"1";return{theme:i,color:l,shade:d}}makeVariable(e="grey",t=1,i="default"){return["--simple-colors",i,"theme",e,t].join("-")}getContrastingShades(e,t,i,a){let l=t==="grey"||a==="grey"?"greyColor":"colorColor",d=e?"aaLarge":"aa",m=parseInt(i),I=this.contrasts[l][d][m];return Array(I.max-I.min+1).fill().map((N,s)=>I.min+s)}getContrastingColors(e,t,i){let a={};return Object.keys(this.colors).forEach(l=>{a[l]=this.getContrastingShades(i,e,t,l)}),a}isContrastCompliant(e,t,i,a,l){let d=t==="grey"||a==="grey"?"greyColor":"colorColor",m=e?"aaLarge":"aa",I=parseInt(i)+1,N=this.contrasts[d][m][I];return l>=N.min&&ontrastShade>=N.max}indexToShade(e){return parseInt(e)+1}shadeToIndex(e){return parseInt(e)-1}};globalThis.customElements.define(L.tag,L);globalThis.SimpleColorsSharedStyles.requestAvailability=()=>(globalThis.SimpleColorsSharedStyles.instance==null&&(globalThis.SimpleColorsSharedStyles.instance=globalThis.document.createElement("simple-colors-shared-styles"),globalThis.SimpleColorsSharedStyles.colors=globalThis.SimpleColorsSharedStyles.instance.colors,globalThis.SimpleColorsSharedStyles.contrasts=globalThis.SimpleColorsSharedStyles.instance.contrasts,globalThis.SimpleColorsSharedStyles.stylesheet=globalThis.document.createElement("style"),globalThis.SimpleColorsSharedStyles.stylesheet.innerHTML=`${L.styles[0].cssText}`,globalThis.document.head.appendChild(globalThis.SimpleColorsSharedStyles.stylesheet)),globalThis.SimpleColorsSharedStyles.instance);var j=typeof global<"u"?new L:globalThis.SimpleColorsSharedStyles.requestAvailability();var Xe=function(o){return class extends o{static get styles(){let e=D("");return super.styles&&(e=super.styles),[e,D`
          :host([dark]) {
            --simple-colors-default-theme-accent-1: #000000;
            --simple-colors-default-theme-accent-2: #111111;
            --simple-colors-default-theme-accent-3: #222222;
            --simple-colors-default-theme-accent-4: #333333;
            --simple-colors-default-theme-accent-5: #444444;
            --simple-colors-default-theme-accent-6: #666666;
            --simple-colors-default-theme-accent-7: #999999;
            --simple-colors-default-theme-accent-8: #bbbbbb;
            --simple-colors-default-theme-accent-9: #cccccc;
            --simple-colors-default-theme-accent-10: #dddddd;
            --simple-colors-default-theme-accent-11: #eeeeee;
            --simple-colors-default-theme-accent-12: #ffffff;

            --simple-colors-default-theme-grey-1: #000000;
            --simple-colors-default-theme-grey-2: #111111;
            --simple-colors-default-theme-grey-3: #222222;
            --simple-colors-default-theme-grey-4: #333333;
            --simple-colors-default-theme-grey-5: #444444;
            --simple-colors-default-theme-grey-6: #666666;
            --simple-colors-default-theme-grey-7: #999999;
            --simple-colors-default-theme-grey-8: #bbbbbb;
            --simple-colors-default-theme-grey-9: #cccccc;
            --simple-colors-default-theme-grey-10: #dddddd;
            --simple-colors-default-theme-grey-11: #eeeeee;
            --simple-colors-default-theme-grey-12: #ffffff;

            --simple-colors-default-theme-red-1: #3f0000;
            --simple-colors-default-theme-red-2: #520000;
            --simple-colors-default-theme-red-3: #670000;
            --simple-colors-default-theme-red-4: #850000;
            --simple-colors-default-theme-red-5: #ac0000;
            --simple-colors-default-theme-red-6: #ee0000;
            --simple-colors-default-theme-red-7: #ff2222;
            --simple-colors-default-theme-red-8: #fd5151;
            --simple-colors-default-theme-red-9: #ff7474;
            --simple-colors-default-theme-red-10: #ff8f8f;
            --simple-colors-default-theme-red-11: #ffaeae;
            --simple-colors-default-theme-red-12: #ffdddd;

            --simple-colors-default-theme-pink-1: #440019;
            --simple-colors-default-theme-pink-2: #5a0020;
            --simple-colors-default-theme-pink-3: #78002b;
            --simple-colors-default-theme-pink-4: #980036;
            --simple-colors-default-theme-pink-5: #b80042;
            --simple-colors-default-theme-pink-6: #da004e;
            --simple-colors-default-theme-pink-7: #ff3996;
            --simple-colors-default-theme-pink-8: #fd60aa;
            --simple-colors-default-theme-pink-9: #ff73b5;
            --simple-colors-default-theme-pink-10: #ff87c0;
            --simple-colors-default-theme-pink-11: #ffa5cf;
            --simple-colors-default-theme-pink-12: #ffe6f1;

            --simple-colors-default-theme-purple-1: #200025;
            --simple-colors-default-theme-purple-2: #33003a;
            --simple-colors-default-theme-purple-3: #490052;
            --simple-colors-default-theme-purple-4: #6c0079;
            --simple-colors-default-theme-purple-5: #8a009b;
            --simple-colors-default-theme-purple-6: #a500ba;
            --simple-colors-default-theme-purple-7: #e200ff;
            --simple-colors-default-theme-purple-8: #ed61ff;
            --simple-colors-default-theme-purple-9: #f07cff;
            --simple-colors-default-theme-purple-10: #f394ff;
            --simple-colors-default-theme-purple-11: #f4affd;
            --simple-colors-default-theme-purple-12: #fce6ff;

            --simple-colors-default-theme-deep-purple-1: #1d0033;
            --simple-colors-default-theme-deep-purple-2: #2a0049;
            --simple-colors-default-theme-deep-purple-3: #3a0063;
            --simple-colors-default-theme-deep-purple-4: #4c0081;
            --simple-colors-default-theme-deep-purple-5: #5d009f;
            --simple-colors-default-theme-deep-purple-6: #7e00d8;
            --simple-colors-default-theme-deep-purple-7: #a931ff;
            --simple-colors-default-theme-deep-purple-8: #b44aff;
            --simple-colors-default-theme-deep-purple-9: #bb63f9;
            --simple-colors-default-theme-deep-purple-10: #c97eff;
            --simple-colors-default-theme-deep-purple-11: #ddacff;
            --simple-colors-default-theme-deep-purple-12: #f3e4ff;

            --simple-colors-default-theme-indigo-1: #0a0030;
            --simple-colors-default-theme-indigo-2: #100049;
            --simple-colors-default-theme-indigo-3: #160063;
            --simple-colors-default-theme-indigo-4: #20008c;
            --simple-colors-default-theme-indigo-5: #2801b0;
            --simple-colors-default-theme-indigo-6: #3a00ff;
            --simple-colors-default-theme-indigo-7: #835fff;
            --simple-colors-default-theme-indigo-8: #9373ff;
            --simple-colors-default-theme-indigo-9: #9e82ff;
            --simple-colors-default-theme-indigo-10: #af97ff;
            --simple-colors-default-theme-indigo-11: #c3b2ff;
            --simple-colors-default-theme-indigo-12: #e5ddff;

            --simple-colors-default-theme-blue-1: #001333;
            --simple-colors-default-theme-blue-2: #001947;
            --simple-colors-default-theme-blue-3: #002569;
            --simple-colors-default-theme-blue-4: #003494;
            --simple-colors-default-theme-blue-5: #0041bb;
            --simple-colors-default-theme-blue-6: #0059ff;
            --simple-colors-default-theme-blue-7: #4083ff;
            --simple-colors-default-theme-blue-8: #5892fd;
            --simple-colors-default-theme-blue-9: #74a5ff;
            --simple-colors-default-theme-blue-10: #95baff;
            --simple-colors-default-theme-blue-11: #acc9ff;
            --simple-colors-default-theme-blue-12: #e2ecff;

            --simple-colors-default-theme-light-blue-1: #001b36;
            --simple-colors-default-theme-light-blue-2: #002850;
            --simple-colors-default-theme-light-blue-3: #003f7d;
            --simple-colors-default-theme-light-blue-4: #0055a8;
            --simple-colors-default-theme-light-blue-5: #0066ca;
            --simple-colors-default-theme-light-blue-6: #007ffc;
            --simple-colors-default-theme-light-blue-7: #41a1ff;
            --simple-colors-default-theme-light-blue-8: #58adff;
            --simple-colors-default-theme-light-blue-9: #65b3ff;
            --simple-colors-default-theme-light-blue-10: #92c9ff;
            --simple-colors-default-theme-light-blue-11: #a1d1ff;
            --simple-colors-default-theme-light-blue-12: #cde8ff;

            --simple-colors-default-theme-cyan-1: #001a20;
            --simple-colors-default-theme-cyan-2: #002c38;
            --simple-colors-default-theme-cyan-3: #003f50;
            --simple-colors-default-theme-cyan-4: #005970;
            --simple-colors-default-theme-cyan-5: #007999;
            --simple-colors-default-theme-cyan-6: #009dc7;
            --simple-colors-default-theme-cyan-7: #00c9ff;
            --simple-colors-default-theme-cyan-8: #1ccfff;
            --simple-colors-default-theme-cyan-9: #33d4ff;
            --simple-colors-default-theme-cyan-10: #77e2ff;
            --simple-colors-default-theme-cyan-11: #9beaff;
            --simple-colors-default-theme-cyan-12: #ddf8ff;

            --simple-colors-default-theme-teal-1: #001b14;
            --simple-colors-default-theme-teal-2: #002a20;
            --simple-colors-default-theme-teal-3: #003829;
            --simple-colors-default-theme-teal-4: #004e3a;
            --simple-colors-default-theme-teal-5: #007658;
            --simple-colors-default-theme-teal-6: #009d75;
            --simple-colors-default-theme-teal-7: #00ff9c;
            --simple-colors-default-theme-teal-8: #29ffac;
            --simple-colors-default-theme-teal-9: #56ffbd;
            --simple-colors-default-theme-teal-10: #79ffcb;
            --simple-colors-default-theme-teal-11: #98ffd7;
            --simple-colors-default-theme-teal-12: #d9fff0;

            --simple-colors-default-theme-green-1: #001d0c;
            --simple-colors-default-theme-green-2: #002a11;
            --simple-colors-default-theme-green-3: #003d18;
            --simple-colors-default-theme-green-4: #005a23;
            --simple-colors-default-theme-green-5: #00762e;
            --simple-colors-default-theme-green-6: #008c37;
            --simple-colors-default-theme-green-7: #00f961;
            --simple-colors-default-theme-green-8: #24ff70;
            --simple-colors-default-theme-green-9: #49ff88;
            --simple-colors-default-theme-green-10: #79ffa7;
            --simple-colors-default-theme-green-11: #acffc9;
            --simple-colors-default-theme-green-12: #e1ffeb;

            --simple-colors-default-theme-light-green-1: #0d2000;
            --simple-colors-default-theme-light-green-2: #143000;
            --simple-colors-default-theme-light-green-3: #1b3f00;
            --simple-colors-default-theme-light-green-4: #296100;
            --simple-colors-default-theme-light-green-5: #357f00;
            --simple-colors-default-theme-light-green-6: #429d00;
            --simple-colors-default-theme-light-green-7: #6fff00;
            --simple-colors-default-theme-light-green-8: #8efd38;
            --simple-colors-default-theme-light-green-9: #a1fd5a;
            --simple-colors-default-theme-light-green-10: #b1ff75;
            --simple-colors-default-theme-light-green-11: #c7ff9b;
            --simple-colors-default-theme-light-green-12: #ebffdb;

            --simple-colors-default-theme-lime-1: #182400;
            --simple-colors-default-theme-lime-2: #223400;
            --simple-colors-default-theme-lime-3: #293f00;
            --simple-colors-default-theme-lime-4: #3b5a00;
            --simple-colors-default-theme-lime-5: #4d7600;
            --simple-colors-default-theme-lime-6: #649900;
            --simple-colors-default-theme-lime-7: #aeff00;
            --simple-colors-default-theme-lime-8: #bdff2d;
            --simple-colors-default-theme-lime-9: #caff58;
            --simple-colors-default-theme-lime-10: #d4ff77;
            --simple-colors-default-theme-lime-11: #dfff9b;
            --simple-colors-default-theme-lime-12: #f1ffd2;

            --simple-colors-default-theme-yellow-1: #242400;
            --simple-colors-default-theme-yellow-2: #303000;
            --simple-colors-default-theme-yellow-3: #454400;
            --simple-colors-default-theme-yellow-4: #585700;
            --simple-colors-default-theme-yellow-5: #787700;
            --simple-colors-default-theme-yellow-6: #929100;
            --simple-colors-default-theme-yellow-7: #f6f600;
            --simple-colors-default-theme-yellow-8: #ffff3a;
            --simple-colors-default-theme-yellow-9: #ffff7c;
            --simple-colors-default-theme-yellow-10: #ffff90;
            --simple-colors-default-theme-yellow-11: #ffffac;
            --simple-colors-default-theme-yellow-12: #ffffd5;

            --simple-colors-default-theme-amber-1: #221a00;
            --simple-colors-default-theme-amber-2: #302500;
            --simple-colors-default-theme-amber-3: #413200;
            --simple-colors-default-theme-amber-4: #614b00;
            --simple-colors-default-theme-amber-5: #876800;
            --simple-colors-default-theme-amber-6: #b28900;
            --simple-colors-default-theme-amber-7: #ffc500;
            --simple-colors-default-theme-amber-8: #ffc235;
            --simple-colors-default-theme-amber-9: #ffcf5e;
            --simple-colors-default-theme-amber-10: #ffd677;
            --simple-colors-default-theme-amber-11: #ffdf92;
            --simple-colors-default-theme-amber-12: #fff2d4;

            --simple-colors-default-theme-orange-1: #2c1400;
            --simple-colors-default-theme-orange-2: #3d1c00;
            --simple-colors-default-theme-orange-3: #612d00;
            --simple-colors-default-theme-orange-4: #833d00;
            --simple-colors-default-theme-orange-5: #ae5100;
            --simple-colors-default-theme-orange-6: #e56a00;
            --simple-colors-default-theme-orange-7: #ff9625;
            --simple-colors-default-theme-orange-8: #ff9e36;
            --simple-colors-default-theme-orange-9: #ffb05c;
            --simple-colors-default-theme-orange-10: #ffbd75;
            --simple-colors-default-theme-orange-11: #ffca92;
            --simple-colors-default-theme-orange-12: #ffebd7;

            --simple-colors-default-theme-deep-orange-1: #240700;
            --simple-colors-default-theme-deep-orange-2: #3a0c00;
            --simple-colors-default-theme-deep-orange-3: #561100;
            --simple-colors-default-theme-deep-orange-4: #8a1c00;
            --simple-colors-default-theme-deep-orange-5: #b92500;
            --simple-colors-default-theme-deep-orange-6: #f53100;
            --simple-colors-default-theme-deep-orange-7: #ff6c3c;
            --simple-colors-default-theme-deep-orange-8: #ff7649;
            --simple-colors-default-theme-deep-orange-9: #ff8a64;
            --simple-colors-default-theme-deep-orange-10: #ffa588;
            --simple-colors-default-theme-deep-orange-11: #ffb299;
            --simple-colors-default-theme-deep-orange-12: #ffe7e0;

            --simple-colors-default-theme-brown-1: #200e09;
            --simple-colors-default-theme-brown-2: #2c140e;
            --simple-colors-default-theme-brown-3: #3b1e15;
            --simple-colors-default-theme-brown-4: #5b3328;
            --simple-colors-default-theme-brown-5: #724539;
            --simple-colors-default-theme-brown-6: #85574a;
            --simple-colors-default-theme-brown-7: #a47060;
            --simple-colors-default-theme-brown-8: #ac7868;
            --simple-colors-default-theme-brown-9: #b68373;
            --simple-colors-default-theme-brown-10: #c59485;
            --simple-colors-default-theme-brown-11: #e5b8aa;
            --simple-colors-default-theme-brown-12: #f0e2de;

            --simple-colors-default-theme-blue-grey-1: #0f1518;
            --simple-colors-default-theme-blue-grey-2: #182023;
            --simple-colors-default-theme-blue-grey-3: #1e282c;
            --simple-colors-default-theme-blue-grey-4: #2f3e45;
            --simple-colors-default-theme-blue-grey-5: #40535b;
            --simple-colors-default-theme-blue-grey-6: #56707c;
            --simple-colors-default-theme-blue-grey-7: #718892;
            --simple-colors-default-theme-blue-grey-8: #7a8f98;
            --simple-colors-default-theme-blue-grey-9: #8d9fa7;
            --simple-colors-default-theme-blue-grey-10: #9badb6;
            --simple-colors-default-theme-blue-grey-11: #b1c5ce;
            --simple-colors-default-theme-blue-grey-12: #e7eff1;
          }

          :host {
            accent-color: var(--simple-colors-default-theme-accent-7);
          }

          :host([accent-color="grey"]) {
            --simple-colors-default-theme-accent-1: #ffffff;
            --simple-colors-default-theme-accent-2: #eeeeee;
            --simple-colors-default-theme-accent-3: #dddddd;
            --simple-colors-default-theme-accent-4: #cccccc;
            --simple-colors-default-theme-accent-5: #bbbbbb;
            --simple-colors-default-theme-accent-6: #999999;
            --simple-colors-default-theme-accent-7: #666666;
            --simple-colors-default-theme-accent-8: #444444;
            --simple-colors-default-theme-accent-9: #333333;
            --simple-colors-default-theme-accent-10: #222222;
            --simple-colors-default-theme-accent-11: #111111;
            --simple-colors-default-theme-accent-12: #000000;
            --simple-colors-fixed-theme-accent-1: #ffffff;
            --simple-colors-fixed-theme-accent-2: #eeeeee;
            --simple-colors-fixed-theme-accent-3: #dddddd;
            --simple-colors-fixed-theme-accent-4: #cccccc;
            --simple-colors-fixed-theme-accent-5: #bbbbbb;
            --simple-colors-fixed-theme-accent-6: #999999;
            --simple-colors-fixed-theme-accent-7: #666666;
            --simple-colors-fixed-theme-accent-8: #444444;
            --simple-colors-fixed-theme-accent-9: #333333;
            --simple-colors-fixed-theme-accent-10: #222222;
            --simple-colors-fixed-theme-accent-11: #111111;
            --simple-colors-fixed-theme-accent-12: #000000;
          }

          :host([dark][accent-color="grey"]) {
            --simple-colors-default-theme-accent-1: #000000;
            --simple-colors-default-theme-accent-2: #111111;
            --simple-colors-default-theme-accent-3: #222222;
            --simple-colors-default-theme-accent-4: #333333;
            --simple-colors-default-theme-accent-5: #444444;
            --simple-colors-default-theme-accent-6: #666666;
            --simple-colors-default-theme-accent-7: #999999;
            --simple-colors-default-theme-accent-8: #bbbbbb;
            --simple-colors-default-theme-accent-9: #cccccc;
            --simple-colors-default-theme-accent-10: #dddddd;
            --simple-colors-default-theme-accent-11: #eeeeee;
            --simple-colors-default-theme-accent-12: #ffffff;
          }

          :host([accent-color="red"]) {
            --simple-colors-default-theme-accent-1: #ffdddd;
            --simple-colors-default-theme-accent-2: #ffaeae;
            --simple-colors-default-theme-accent-3: #ff8f8f;
            --simple-colors-default-theme-accent-4: #ff7474;
            --simple-colors-default-theme-accent-5: #fd5151;
            --simple-colors-default-theme-accent-6: #ff2222;
            --simple-colors-default-theme-accent-7: #ee0000;
            --simple-colors-default-theme-accent-8: #ac0000;
            --simple-colors-default-theme-accent-9: #850000;
            --simple-colors-default-theme-accent-10: #670000;
            --simple-colors-default-theme-accent-11: #520000;
            --simple-colors-default-theme-accent-12: #3f0000;
            --simple-colors-fixed-theme-accent-1: #ffdddd;
            --simple-colors-fixed-theme-accent-2: #ffaeae;
            --simple-colors-fixed-theme-accent-3: #ff8f8f;
            --simple-colors-fixed-theme-accent-4: #ff7474;
            --simple-colors-fixed-theme-accent-5: #fd5151;
            --simple-colors-fixed-theme-accent-6: #ff2222;
            --simple-colors-fixed-theme-accent-7: #ee0000;
            --simple-colors-fixed-theme-accent-8: #ac0000;
            --simple-colors-fixed-theme-accent-9: #850000;
            --simple-colors-fixed-theme-accent-10: #670000;
            --simple-colors-fixed-theme-accent-11: #520000;
            --simple-colors-fixed-theme-accent-12: #3f0000;
          }

          :host([dark][accent-color="red"]) {
            --simple-colors-default-theme-accent-1: #3f0000;
            --simple-colors-default-theme-accent-2: #520000;
            --simple-colors-default-theme-accent-3: #670000;
            --simple-colors-default-theme-accent-4: #850000;
            --simple-colors-default-theme-accent-5: #ac0000;
            --simple-colors-default-theme-accent-6: #ee0000;
            --simple-colors-default-theme-accent-7: #ff2222;
            --simple-colors-default-theme-accent-8: #fd5151;
            --simple-colors-default-theme-accent-9: #ff7474;
            --simple-colors-default-theme-accent-10: #ff8f8f;
            --simple-colors-default-theme-accent-11: #ffaeae;
            --simple-colors-default-theme-accent-12: #ffdddd;
          }

          :host([accent-color="pink"]) {
            --simple-colors-default-theme-accent-1: #ffe6f1;
            --simple-colors-default-theme-accent-2: #ffa5cf;
            --simple-colors-default-theme-accent-3: #ff87c0;
            --simple-colors-default-theme-accent-4: #ff73b5;
            --simple-colors-default-theme-accent-5: #fd60aa;
            --simple-colors-default-theme-accent-6: #ff3996;
            --simple-colors-default-theme-accent-7: #da004e;
            --simple-colors-default-theme-accent-8: #b80042;
            --simple-colors-default-theme-accent-9: #980036;
            --simple-colors-default-theme-accent-10: #78002b;
            --simple-colors-default-theme-accent-11: #5a0020;
            --simple-colors-default-theme-accent-12: #440019;
            --simple-colors-fixed-theme-accent-1: #ffe6f1;
            --simple-colors-fixed-theme-accent-2: #ffa5cf;
            --simple-colors-fixed-theme-accent-3: #ff87c0;
            --simple-colors-fixed-theme-accent-4: #ff73b5;
            --simple-colors-fixed-theme-accent-5: #fd60aa;
            --simple-colors-fixed-theme-accent-6: #ff3996;
            --simple-colors-fixed-theme-accent-7: #da004e;
            --simple-colors-fixed-theme-accent-8: #b80042;
            --simple-colors-fixed-theme-accent-9: #980036;
            --simple-colors-fixed-theme-accent-10: #78002b;
            --simple-colors-fixed-theme-accent-11: #5a0020;
            --simple-colors-fixed-theme-accent-12: #440019;
          }

          :host([dark][accent-color="pink"]) {
            --simple-colors-default-theme-accent-1: #440019;
            --simple-colors-default-theme-accent-2: #5a0020;
            --simple-colors-default-theme-accent-3: #78002b;
            --simple-colors-default-theme-accent-4: #980036;
            --simple-colors-default-theme-accent-5: #b80042;
            --simple-colors-default-theme-accent-6: #da004e;
            --simple-colors-default-theme-accent-7: #ff3996;
            --simple-colors-default-theme-accent-8: #fd60aa;
            --simple-colors-default-theme-accent-9: #ff73b5;
            --simple-colors-default-theme-accent-10: #ff87c0;
            --simple-colors-default-theme-accent-11: #ffa5cf;
            --simple-colors-default-theme-accent-12: #ffe6f1;
          }

          :host([accent-color="purple"]) {
            --simple-colors-default-theme-accent-1: #fce6ff;
            --simple-colors-default-theme-accent-2: #f4affd;
            --simple-colors-default-theme-accent-3: #f394ff;
            --simple-colors-default-theme-accent-4: #f07cff;
            --simple-colors-default-theme-accent-5: #ed61ff;
            --simple-colors-default-theme-accent-6: #e200ff;
            --simple-colors-default-theme-accent-7: #a500ba;
            --simple-colors-default-theme-accent-8: #8a009b;
            --simple-colors-default-theme-accent-9: #6c0079;
            --simple-colors-default-theme-accent-10: #490052;
            --simple-colors-default-theme-accent-11: #33003a;
            --simple-colors-default-theme-accent-12: #200025;
            --simple-colors-fixed-theme-accent-1: #fce6ff;
            --simple-colors-fixed-theme-accent-2: #f4affd;
            --simple-colors-fixed-theme-accent-3: #f394ff;
            --simple-colors-fixed-theme-accent-4: #f07cff;
            --simple-colors-fixed-theme-accent-5: #ed61ff;
            --simple-colors-fixed-theme-accent-6: #e200ff;
            --simple-colors-fixed-theme-accent-7: #a500ba;
            --simple-colors-fixed-theme-accent-8: #8a009b;
            --simple-colors-fixed-theme-accent-9: #6c0079;
            --simple-colors-fixed-theme-accent-10: #490052;
            --simple-colors-fixed-theme-accent-11: #33003a;
            --simple-colors-fixed-theme-accent-12: #200025;
          }

          :host([dark][accent-color="purple"]) {
            --simple-colors-default-theme-accent-1: #200025;
            --simple-colors-default-theme-accent-2: #33003a;
            --simple-colors-default-theme-accent-3: #490052;
            --simple-colors-default-theme-accent-4: #6c0079;
            --simple-colors-default-theme-accent-5: #8a009b;
            --simple-colors-default-theme-accent-6: #a500ba;
            --simple-colors-default-theme-accent-7: #e200ff;
            --simple-colors-default-theme-accent-8: #ed61ff;
            --simple-colors-default-theme-accent-9: #f07cff;
            --simple-colors-default-theme-accent-10: #f394ff;
            --simple-colors-default-theme-accent-11: #f4affd;
            --simple-colors-default-theme-accent-12: #fce6ff;
          }

          :host([accent-color="deep-purple"]) {
            --simple-colors-default-theme-accent-1: #f3e4ff;
            --simple-colors-default-theme-accent-2: #ddacff;
            --simple-colors-default-theme-accent-3: #c97eff;
            --simple-colors-default-theme-accent-4: #bb63f9;
            --simple-colors-default-theme-accent-5: #b44aff;
            --simple-colors-default-theme-accent-6: #a931ff;
            --simple-colors-default-theme-accent-7: #7e00d8;
            --simple-colors-default-theme-accent-8: #5d009f;
            --simple-colors-default-theme-accent-9: #4c0081;
            --simple-colors-default-theme-accent-10: #3a0063;
            --simple-colors-default-theme-accent-11: #2a0049;
            --simple-colors-default-theme-accent-12: #1d0033;
            --simple-colors-fixed-theme-accent-1: #f3e4ff;
            --simple-colors-fixed-theme-accent-2: #ddacff;
            --simple-colors-fixed-theme-accent-3: #c97eff;
            --simple-colors-fixed-theme-accent-4: #bb63f9;
            --simple-colors-fixed-theme-accent-5: #b44aff;
            --simple-colors-fixed-theme-accent-6: #a931ff;
            --simple-colors-fixed-theme-accent-7: #7e00d8;
            --simple-colors-fixed-theme-accent-8: #5d009f;
            --simple-colors-fixed-theme-accent-9: #4c0081;
            --simple-colors-fixed-theme-accent-10: #3a0063;
            --simple-colors-fixed-theme-accent-11: #2a0049;
            --simple-colors-fixed-theme-accent-12: #1d0033;
          }

          :host([dark][accent-color="deep-purple"]) {
            --simple-colors-default-theme-accent-1: #1d0033;
            --simple-colors-default-theme-accent-2: #2a0049;
            --simple-colors-default-theme-accent-3: #3a0063;
            --simple-colors-default-theme-accent-4: #4c0081;
            --simple-colors-default-theme-accent-5: #5d009f;
            --simple-colors-default-theme-accent-6: #7e00d8;
            --simple-colors-default-theme-accent-7: #a931ff;
            --simple-colors-default-theme-accent-8: #b44aff;
            --simple-colors-default-theme-accent-9: #bb63f9;
            --simple-colors-default-theme-accent-10: #c97eff;
            --simple-colors-default-theme-accent-11: #ddacff;
            --simple-colors-default-theme-accent-12: #f3e4ff;
          }

          :host([accent-color="indigo"]) {
            --simple-colors-default-theme-accent-1: #e5ddff;
            --simple-colors-default-theme-accent-2: #c3b2ff;
            --simple-colors-default-theme-accent-3: #af97ff;
            --simple-colors-default-theme-accent-4: #9e82ff;
            --simple-colors-default-theme-accent-5: #9373ff;
            --simple-colors-default-theme-accent-6: #835fff;
            --simple-colors-default-theme-accent-7: #3a00ff;
            --simple-colors-default-theme-accent-8: #2801b0;
            --simple-colors-default-theme-accent-9: #20008c;
            --simple-colors-default-theme-accent-10: #160063;
            --simple-colors-default-theme-accent-11: #100049;
            --simple-colors-default-theme-accent-12: #0a0030;
            --simple-colors-fixed-theme-accent-1: #e5ddff;
            --simple-colors-fixed-theme-accent-2: #c3b2ff;
            --simple-colors-fixed-theme-accent-3: #af97ff;
            --simple-colors-fixed-theme-accent-4: #9e82ff;
            --simple-colors-fixed-theme-accent-5: #9373ff;
            --simple-colors-fixed-theme-accent-6: #835fff;
            --simple-colors-fixed-theme-accent-7: #3a00ff;
            --simple-colors-fixed-theme-accent-8: #2801b0;
            --simple-colors-fixed-theme-accent-9: #20008c;
            --simple-colors-fixed-theme-accent-10: #160063;
            --simple-colors-fixed-theme-accent-11: #100049;
            --simple-colors-fixed-theme-accent-12: #0a0030;
          }

          :host([dark][accent-color="indigo"]) {
            --simple-colors-default-theme-accent-1: #0a0030;
            --simple-colors-default-theme-accent-2: #100049;
            --simple-colors-default-theme-accent-3: #160063;
            --simple-colors-default-theme-accent-4: #20008c;
            --simple-colors-default-theme-accent-5: #2801b0;
            --simple-colors-default-theme-accent-6: #3a00ff;
            --simple-colors-default-theme-accent-7: #835fff;
            --simple-colors-default-theme-accent-8: #9373ff;
            --simple-colors-default-theme-accent-9: #9e82ff;
            --simple-colors-default-theme-accent-10: #af97ff;
            --simple-colors-default-theme-accent-11: #c3b2ff;
            --simple-colors-default-theme-accent-12: #e5ddff;
          }

          :host([accent-color="blue"]) {
            --simple-colors-default-theme-accent-1: #e2ecff;
            --simple-colors-default-theme-accent-2: #acc9ff;
            --simple-colors-default-theme-accent-3: #95baff;
            --simple-colors-default-theme-accent-4: #74a5ff;
            --simple-colors-default-theme-accent-5: #5892fd;
            --simple-colors-default-theme-accent-6: #4083ff;
            --simple-colors-default-theme-accent-7: #0059ff;
            --simple-colors-default-theme-accent-8: #0041bb;
            --simple-colors-default-theme-accent-9: #003494;
            --simple-colors-default-theme-accent-10: #002569;
            --simple-colors-default-theme-accent-11: #001947;
            --simple-colors-default-theme-accent-12: #001333;
            --simple-colors-fixed-theme-accent-1: #e2ecff;
            --simple-colors-fixed-theme-accent-2: #acc9ff;
            --simple-colors-fixed-theme-accent-3: #95baff;
            --simple-colors-fixed-theme-accent-4: #74a5ff;
            --simple-colors-fixed-theme-accent-5: #5892fd;
            --simple-colors-fixed-theme-accent-6: #4083ff;
            --simple-colors-fixed-theme-accent-7: #0059ff;
            --simple-colors-fixed-theme-accent-8: #0041bb;
            --simple-colors-fixed-theme-accent-9: #003494;
            --simple-colors-fixed-theme-accent-10: #002569;
            --simple-colors-fixed-theme-accent-11: #001947;
            --simple-colors-fixed-theme-accent-12: #001333;
          }

          :host([dark][accent-color="blue"]) {
            --simple-colors-default-theme-accent-1: #001333;
            --simple-colors-default-theme-accent-2: #001947;
            --simple-colors-default-theme-accent-3: #002569;
            --simple-colors-default-theme-accent-4: #003494;
            --simple-colors-default-theme-accent-5: #0041bb;
            --simple-colors-default-theme-accent-6: #0059ff;
            --simple-colors-default-theme-accent-7: #4083ff;
            --simple-colors-default-theme-accent-8: #5892fd;
            --simple-colors-default-theme-accent-9: #74a5ff;
            --simple-colors-default-theme-accent-10: #95baff;
            --simple-colors-default-theme-accent-11: #acc9ff;
            --simple-colors-default-theme-accent-12: #e2ecff;
          }

          :host([accent-color="light-blue"]) {
            --simple-colors-default-theme-accent-1: #cde8ff;
            --simple-colors-default-theme-accent-2: #a1d1ff;
            --simple-colors-default-theme-accent-3: #92c9ff;
            --simple-colors-default-theme-accent-4: #65b3ff;
            --simple-colors-default-theme-accent-5: #58adff;
            --simple-colors-default-theme-accent-6: #41a1ff;
            --simple-colors-default-theme-accent-7: #007ffc;
            --simple-colors-default-theme-accent-8: #0066ca;
            --simple-colors-default-theme-accent-9: #0055a8;
            --simple-colors-default-theme-accent-10: #003f7d;
            --simple-colors-default-theme-accent-11: #002850;
            --simple-colors-default-theme-accent-12: #001b36;
            --simple-colors-fixed-theme-accent-1: #cde8ff;
            --simple-colors-fixed-theme-accent-2: #a1d1ff;
            --simple-colors-fixed-theme-accent-3: #92c9ff;
            --simple-colors-fixed-theme-accent-4: #65b3ff;
            --simple-colors-fixed-theme-accent-5: #58adff;
            --simple-colors-fixed-theme-accent-6: #41a1ff;
            --simple-colors-fixed-theme-accent-7: #007ffc;
            --simple-colors-fixed-theme-accent-8: #0066ca;
            --simple-colors-fixed-theme-accent-9: #0055a8;
            --simple-colors-fixed-theme-accent-10: #003f7d;
            --simple-colors-fixed-theme-accent-11: #002850;
            --simple-colors-fixed-theme-accent-12: #001b36;
          }

          :host([dark][accent-color="light-blue"]) {
            --simple-colors-default-theme-accent-1: #001b36;
            --simple-colors-default-theme-accent-2: #002850;
            --simple-colors-default-theme-accent-3: #003f7d;
            --simple-colors-default-theme-accent-4: #0055a8;
            --simple-colors-default-theme-accent-5: #0066ca;
            --simple-colors-default-theme-accent-6: #007ffc;
            --simple-colors-default-theme-accent-7: #41a1ff;
            --simple-colors-default-theme-accent-8: #58adff;
            --simple-colors-default-theme-accent-9: #65b3ff;
            --simple-colors-default-theme-accent-10: #92c9ff;
            --simple-colors-default-theme-accent-11: #a1d1ff;
            --simple-colors-default-theme-accent-12: #cde8ff;
          }

          :host([accent-color="cyan"]) {
            --simple-colors-default-theme-accent-1: #ddf8ff;
            --simple-colors-default-theme-accent-2: #9beaff;
            --simple-colors-default-theme-accent-3: #77e2ff;
            --simple-colors-default-theme-accent-4: #33d4ff;
            --simple-colors-default-theme-accent-5: #1ccfff;
            --simple-colors-default-theme-accent-6: #00c9ff;
            --simple-colors-default-theme-accent-7: #009dc7;
            --simple-colors-default-theme-accent-8: #007999;
            --simple-colors-default-theme-accent-9: #005970;
            --simple-colors-default-theme-accent-10: #003f50;
            --simple-colors-default-theme-accent-11: #002c38;
            --simple-colors-default-theme-accent-12: #001a20;
            --simple-colors-fixed-theme-accent-1: #ddf8ff;
            --simple-colors-fixed-theme-accent-2: #9beaff;
            --simple-colors-fixed-theme-accent-3: #77e2ff;
            --simple-colors-fixed-theme-accent-4: #33d4ff;
            --simple-colors-fixed-theme-accent-5: #1ccfff;
            --simple-colors-fixed-theme-accent-6: #00c9ff;
            --simple-colors-fixed-theme-accent-7: #009dc7;
            --simple-colors-fixed-theme-accent-8: #007999;
            --simple-colors-fixed-theme-accent-9: #005970;
            --simple-colors-fixed-theme-accent-10: #003f50;
            --simple-colors-fixed-theme-accent-11: #002c38;
            --simple-colors-fixed-theme-accent-12: #001a20;
          }

          :host([dark][accent-color="cyan"]) {
            --simple-colors-default-theme-accent-1: #001a20;
            --simple-colors-default-theme-accent-2: #002c38;
            --simple-colors-default-theme-accent-3: #003f50;
            --simple-colors-default-theme-accent-4: #005970;
            --simple-colors-default-theme-accent-5: #007999;
            --simple-colors-default-theme-accent-6: #009dc7;
            --simple-colors-default-theme-accent-7: #00c9ff;
            --simple-colors-default-theme-accent-8: #1ccfff;
            --simple-colors-default-theme-accent-9: #33d4ff;
            --simple-colors-default-theme-accent-10: #77e2ff;
            --simple-colors-default-theme-accent-11: #9beaff;
            --simple-colors-default-theme-accent-12: #ddf8ff;
          }

          :host([accent-color="teal"]) {
            --simple-colors-default-theme-accent-1: #d9fff0;
            --simple-colors-default-theme-accent-2: #98ffd7;
            --simple-colors-default-theme-accent-3: #79ffcb;
            --simple-colors-default-theme-accent-4: #56ffbd;
            --simple-colors-default-theme-accent-5: #29ffac;
            --simple-colors-default-theme-accent-6: #00ff9c;
            --simple-colors-default-theme-accent-7: #009d75;
            --simple-colors-default-theme-accent-8: #007658;
            --simple-colors-default-theme-accent-9: #004e3a;
            --simple-colors-default-theme-accent-10: #003829;
            --simple-colors-default-theme-accent-11: #002a20;
            --simple-colors-default-theme-accent-12: #001b14;
            --simple-colors-fixed-theme-accent-1: #d9fff0;
            --simple-colors-fixed-theme-accent-2: #98ffd7;
            --simple-colors-fixed-theme-accent-3: #79ffcb;
            --simple-colors-fixed-theme-accent-4: #56ffbd;
            --simple-colors-fixed-theme-accent-5: #29ffac;
            --simple-colors-fixed-theme-accent-6: #00ff9c;
            --simple-colors-fixed-theme-accent-7: #009d75;
            --simple-colors-fixed-theme-accent-8: #007658;
            --simple-colors-fixed-theme-accent-9: #004e3a;
            --simple-colors-fixed-theme-accent-10: #003829;
            --simple-colors-fixed-theme-accent-11: #002a20;
            --simple-colors-fixed-theme-accent-12: #001b14;
          }

          :host([dark][accent-color="teal"]) {
            --simple-colors-default-theme-accent-1: #001b14;
            --simple-colors-default-theme-accent-2: #002a20;
            --simple-colors-default-theme-accent-3: #003829;
            --simple-colors-default-theme-accent-4: #004e3a;
            --simple-colors-default-theme-accent-5: #007658;
            --simple-colors-default-theme-accent-6: #009d75;
            --simple-colors-default-theme-accent-7: #00ff9c;
            --simple-colors-default-theme-accent-8: #29ffac;
            --simple-colors-default-theme-accent-9: #56ffbd;
            --simple-colors-default-theme-accent-10: #79ffcb;
            --simple-colors-default-theme-accent-11: #98ffd7;
            --simple-colors-default-theme-accent-12: #d9fff0;
          }

          :host([accent-color="green"]) {
            --simple-colors-default-theme-accent-1: #e1ffeb;
            --simple-colors-default-theme-accent-2: #acffc9;
            --simple-colors-default-theme-accent-3: #79ffa7;
            --simple-colors-default-theme-accent-4: #49ff88;
            --simple-colors-default-theme-accent-5: #24ff70;
            --simple-colors-default-theme-accent-6: #00f961;
            --simple-colors-default-theme-accent-7: #008c37;
            --simple-colors-default-theme-accent-8: #00762e;
            --simple-colors-default-theme-accent-9: #005a23;
            --simple-colors-default-theme-accent-10: #003d18;
            --simple-colors-default-theme-accent-11: #002a11;
            --simple-colors-default-theme-accent-12: #001d0c;
            --simple-colors-fixed-theme-accent-1: #e1ffeb;
            --simple-colors-fixed-theme-accent-2: #acffc9;
            --simple-colors-fixed-theme-accent-3: #79ffa7;
            --simple-colors-fixed-theme-accent-4: #49ff88;
            --simple-colors-fixed-theme-accent-5: #24ff70;
            --simple-colors-fixed-theme-accent-6: #00f961;
            --simple-colors-fixed-theme-accent-7: #008c37;
            --simple-colors-fixed-theme-accent-8: #00762e;
            --simple-colors-fixed-theme-accent-9: #005a23;
            --simple-colors-fixed-theme-accent-10: #003d18;
            --simple-colors-fixed-theme-accent-11: #002a11;
            --simple-colors-fixed-theme-accent-12: #001d0c;
          }

          :host([dark][accent-color="green"]) {
            --simple-colors-default-theme-accent-1: #001d0c;
            --simple-colors-default-theme-accent-2: #002a11;
            --simple-colors-default-theme-accent-3: #003d18;
            --simple-colors-default-theme-accent-4: #005a23;
            --simple-colors-default-theme-accent-5: #00762e;
            --simple-colors-default-theme-accent-6: #008c37;
            --simple-colors-default-theme-accent-7: #00f961;
            --simple-colors-default-theme-accent-8: #24ff70;
            --simple-colors-default-theme-accent-9: #49ff88;
            --simple-colors-default-theme-accent-10: #79ffa7;
            --simple-colors-default-theme-accent-11: #acffc9;
            --simple-colors-default-theme-accent-12: #e1ffeb;
          }

          :host([accent-color="light-green"]) {
            --simple-colors-default-theme-accent-1: #ebffdb;
            --simple-colors-default-theme-accent-2: #c7ff9b;
            --simple-colors-default-theme-accent-3: #b1ff75;
            --simple-colors-default-theme-accent-4: #a1fd5a;
            --simple-colors-default-theme-accent-5: #8efd38;
            --simple-colors-default-theme-accent-6: #6fff00;
            --simple-colors-default-theme-accent-7: #429d00;
            --simple-colors-default-theme-accent-8: #357f00;
            --simple-colors-default-theme-accent-9: #296100;
            --simple-colors-default-theme-accent-10: #1b3f00;
            --simple-colors-default-theme-accent-11: #143000;
            --simple-colors-default-theme-accent-12: #0d2000;
            --simple-colors-fixed-theme-accent-1: #ebffdb;
            --simple-colors-fixed-theme-accent-2: #c7ff9b;
            --simple-colors-fixed-theme-accent-3: #b1ff75;
            --simple-colors-fixed-theme-accent-4: #a1fd5a;
            --simple-colors-fixed-theme-accent-5: #8efd38;
            --simple-colors-fixed-theme-accent-6: #6fff00;
            --simple-colors-fixed-theme-accent-7: #429d00;
            --simple-colors-fixed-theme-accent-8: #357f00;
            --simple-colors-fixed-theme-accent-9: #296100;
            --simple-colors-fixed-theme-accent-10: #1b3f00;
            --simple-colors-fixed-theme-accent-11: #143000;
            --simple-colors-fixed-theme-accent-12: #0d2000;
          }

          :host([dark][accent-color="light-green"]) {
            --simple-colors-default-theme-accent-1: #0d2000;
            --simple-colors-default-theme-accent-2: #143000;
            --simple-colors-default-theme-accent-3: #1b3f00;
            --simple-colors-default-theme-accent-4: #296100;
            --simple-colors-default-theme-accent-5: #357f00;
            --simple-colors-default-theme-accent-6: #429d00;
            --simple-colors-default-theme-accent-7: #6fff00;
            --simple-colors-default-theme-accent-8: #8efd38;
            --simple-colors-default-theme-accent-9: #a1fd5a;
            --simple-colors-default-theme-accent-10: #b1ff75;
            --simple-colors-default-theme-accent-11: #c7ff9b;
            --simple-colors-default-theme-accent-12: #ebffdb;
          }

          :host([accent-color="lime"]) {
            --simple-colors-default-theme-accent-1: #f1ffd2;
            --simple-colors-default-theme-accent-2: #dfff9b;
            --simple-colors-default-theme-accent-3: #d4ff77;
            --simple-colors-default-theme-accent-4: #caff58;
            --simple-colors-default-theme-accent-5: #bdff2d;
            --simple-colors-default-theme-accent-6: #aeff00;
            --simple-colors-default-theme-accent-7: #649900;
            --simple-colors-default-theme-accent-8: #4d7600;
            --simple-colors-default-theme-accent-9: #3b5a00;
            --simple-colors-default-theme-accent-10: #293f00;
            --simple-colors-default-theme-accent-11: #223400;
            --simple-colors-default-theme-accent-12: #182400;
            --simple-colors-fixed-theme-accent-1: #f1ffd2;
            --simple-colors-fixed-theme-accent-2: #dfff9b;
            --simple-colors-fixed-theme-accent-3: #d4ff77;
            --simple-colors-fixed-theme-accent-4: #caff58;
            --simple-colors-fixed-theme-accent-5: #bdff2d;
            --simple-colors-fixed-theme-accent-6: #aeff00;
            --simple-colors-fixed-theme-accent-7: #649900;
            --simple-colors-fixed-theme-accent-8: #4d7600;
            --simple-colors-fixed-theme-accent-9: #3b5a00;
            --simple-colors-fixed-theme-accent-10: #293f00;
            --simple-colors-fixed-theme-accent-11: #223400;
            --simple-colors-fixed-theme-accent-12: #182400;
          }

          :host([dark][accent-color="lime"]) {
            --simple-colors-default-theme-accent-1: #182400;
            --simple-colors-default-theme-accent-2: #223400;
            --simple-colors-default-theme-accent-3: #293f00;
            --simple-colors-default-theme-accent-4: #3b5a00;
            --simple-colors-default-theme-accent-5: #4d7600;
            --simple-colors-default-theme-accent-6: #649900;
            --simple-colors-default-theme-accent-7: #aeff00;
            --simple-colors-default-theme-accent-8: #bdff2d;
            --simple-colors-default-theme-accent-9: #caff58;
            --simple-colors-default-theme-accent-10: #d4ff77;
            --simple-colors-default-theme-accent-11: #dfff9b;
            --simple-colors-default-theme-accent-12: #f1ffd2;
          }

          :host([accent-color="yellow"]) {
            --simple-colors-default-theme-accent-1: #ffffd5;
            --simple-colors-default-theme-accent-2: #ffffac;
            --simple-colors-default-theme-accent-3: #ffff90;
            --simple-colors-default-theme-accent-4: #ffff7c;
            --simple-colors-default-theme-accent-5: #ffff3a;
            --simple-colors-default-theme-accent-6: #f6f600;
            --simple-colors-default-theme-accent-7: #929100;
            --simple-colors-default-theme-accent-8: #787700;
            --simple-colors-default-theme-accent-9: #585700;
            --simple-colors-default-theme-accent-10: #454400;
            --simple-colors-default-theme-accent-11: #303000;
            --simple-colors-default-theme-accent-12: #242400;
            --simple-colors-fixed-theme-accent-1: #ffffd5;
            --simple-colors-fixed-theme-accent-2: #ffffac;
            --simple-colors-fixed-theme-accent-3: #ffff90;
            --simple-colors-fixed-theme-accent-4: #ffff7c;
            --simple-colors-fixed-theme-accent-5: #ffff3a;
            --simple-colors-fixed-theme-accent-6: #f6f600;
            --simple-colors-fixed-theme-accent-7: #929100;
            --simple-colors-fixed-theme-accent-8: #787700;
            --simple-colors-fixed-theme-accent-9: #585700;
            --simple-colors-fixed-theme-accent-10: #454400;
            --simple-colors-fixed-theme-accent-11: #303000;
            --simple-colors-fixed-theme-accent-12: #242400;
          }

          :host([dark][accent-color="yellow"]) {
            --simple-colors-default-theme-accent-1: #242400;
            --simple-colors-default-theme-accent-2: #303000;
            --simple-colors-default-theme-accent-3: #454400;
            --simple-colors-default-theme-accent-4: #585700;
            --simple-colors-default-theme-accent-5: #787700;
            --simple-colors-default-theme-accent-6: #929100;
            --simple-colors-default-theme-accent-7: #f6f600;
            --simple-colors-default-theme-accent-8: #ffff3a;
            --simple-colors-default-theme-accent-9: #ffff7c;
            --simple-colors-default-theme-accent-10: #ffff90;
            --simple-colors-default-theme-accent-11: #ffffac;
            --simple-colors-default-theme-accent-12: #ffffd5;
          }

          :host([accent-color="amber"]) {
            --simple-colors-default-theme-accent-1: #fff2d4;
            --simple-colors-default-theme-accent-2: #ffdf92;
            --simple-colors-default-theme-accent-3: #ffd677;
            --simple-colors-default-theme-accent-4: #ffcf5e;
            --simple-colors-default-theme-accent-5: #ffc235;
            --simple-colors-default-theme-accent-6: #ffc500;
            --simple-colors-default-theme-accent-7: #b28900;
            --simple-colors-default-theme-accent-8: #876800;
            --simple-colors-default-theme-accent-9: #614b00;
            --simple-colors-default-theme-accent-10: #413200;
            --simple-colors-default-theme-accent-11: #302500;
            --simple-colors-default-theme-accent-12: #221a00;
            --simple-colors-fixed-theme-accent-1: #fff2d4;
            --simple-colors-fixed-theme-accent-2: #ffdf92;
            --simple-colors-fixed-theme-accent-3: #ffd677;
            --simple-colors-fixed-theme-accent-4: #ffcf5e;
            --simple-colors-fixed-theme-accent-5: #ffc235;
            --simple-colors-fixed-theme-accent-6: #ffc500;
            --simple-colors-fixed-theme-accent-7: #b28900;
            --simple-colors-fixed-theme-accent-8: #876800;
            --simple-colors-fixed-theme-accent-9: #614b00;
            --simple-colors-fixed-theme-accent-10: #413200;
            --simple-colors-fixed-theme-accent-11: #302500;
            --simple-colors-fixed-theme-accent-12: #221a00;
          }

          :host([dark][accent-color="amber"]) {
            --simple-colors-default-theme-accent-1: #221a00;
            --simple-colors-default-theme-accent-2: #302500;
            --simple-colors-default-theme-accent-3: #413200;
            --simple-colors-default-theme-accent-4: #614b00;
            --simple-colors-default-theme-accent-5: #876800;
            --simple-colors-default-theme-accent-6: #b28900;
            --simple-colors-default-theme-accent-7: #ffc500;
            --simple-colors-default-theme-accent-8: #ffc235;
            --simple-colors-default-theme-accent-9: #ffcf5e;
            --simple-colors-default-theme-accent-10: #ffd677;
            --simple-colors-default-theme-accent-11: #ffdf92;
            --simple-colors-default-theme-accent-12: #fff2d4;
          }

          :host([accent-color="orange"]) {
            --simple-colors-default-theme-accent-1: #ffebd7;
            --simple-colors-default-theme-accent-2: #ffca92;
            --simple-colors-default-theme-accent-3: #ffbd75;
            --simple-colors-default-theme-accent-4: #ffb05c;
            --simple-colors-default-theme-accent-5: #ff9e36;
            --simple-colors-default-theme-accent-6: #ff9625;
            --simple-colors-default-theme-accent-7: #e56a00;
            --simple-colors-default-theme-accent-8: #ae5100;
            --simple-colors-default-theme-accent-9: #833d00;
            --simple-colors-default-theme-accent-10: #612d00;
            --simple-colors-default-theme-accent-11: #3d1c00;
            --simple-colors-default-theme-accent-12: #2c1400;
            --simple-colors-fixed-theme-accent-1: #ffebd7;
            --simple-colors-fixed-theme-accent-2: #ffca92;
            --simple-colors-fixed-theme-accent-3: #ffbd75;
            --simple-colors-fixed-theme-accent-4: #ffb05c;
            --simple-colors-fixed-theme-accent-5: #ff9e36;
            --simple-colors-fixed-theme-accent-6: #ff9625;
            --simple-colors-fixed-theme-accent-7: #e56a00;
            --simple-colors-fixed-theme-accent-8: #ae5100;
            --simple-colors-fixed-theme-accent-9: #833d00;
            --simple-colors-fixed-theme-accent-10: #612d00;
            --simple-colors-fixed-theme-accent-11: #3d1c00;
            --simple-colors-fixed-theme-accent-12: #2c1400;
          }

          :host([dark][accent-color="orange"]) {
            --simple-colors-default-theme-accent-1: #2c1400;
            --simple-colors-default-theme-accent-2: #3d1c00;
            --simple-colors-default-theme-accent-3: #612d00;
            --simple-colors-default-theme-accent-4: #833d00;
            --simple-colors-default-theme-accent-5: #ae5100;
            --simple-colors-default-theme-accent-6: #e56a00;
            --simple-colors-default-theme-accent-7: #ff9625;
            --simple-colors-default-theme-accent-8: #ff9e36;
            --simple-colors-default-theme-accent-9: #ffb05c;
            --simple-colors-default-theme-accent-10: #ffbd75;
            --simple-colors-default-theme-accent-11: #ffca92;
            --simple-colors-default-theme-accent-12: #ffebd7;
          }

          :host([accent-color="deep-orange"]) {
            --simple-colors-default-theme-accent-1: #ffe7e0;
            --simple-colors-default-theme-accent-2: #ffb299;
            --simple-colors-default-theme-accent-3: #ffa588;
            --simple-colors-default-theme-accent-4: #ff8a64;
            --simple-colors-default-theme-accent-5: #ff7649;
            --simple-colors-default-theme-accent-6: #ff6c3c;
            --simple-colors-default-theme-accent-7: #f53100;
            --simple-colors-default-theme-accent-8: #b92500;
            --simple-colors-default-theme-accent-9: #8a1c00;
            --simple-colors-default-theme-accent-10: #561100;
            --simple-colors-default-theme-accent-11: #3a0c00;
            --simple-colors-default-theme-accent-12: #240700;
            --simple-colors-fixed-theme-accent-1: #ffe7e0;
            --simple-colors-fixed-theme-accent-2: #ffb299;
            --simple-colors-fixed-theme-accent-3: #ffa588;
            --simple-colors-fixed-theme-accent-4: #ff8a64;
            --simple-colors-fixed-theme-accent-5: #ff7649;
            --simple-colors-fixed-theme-accent-6: #ff6c3c;
            --simple-colors-fixed-theme-accent-7: #f53100;
            --simple-colors-fixed-theme-accent-8: #b92500;
            --simple-colors-fixed-theme-accent-9: #8a1c00;
            --simple-colors-fixed-theme-accent-10: #561100;
            --simple-colors-fixed-theme-accent-11: #3a0c00;
            --simple-colors-fixed-theme-accent-12: #240700;
          }

          :host([dark][accent-color="deep-orange"]) {
            --simple-colors-default-theme-accent-1: #240700;
            --simple-colors-default-theme-accent-2: #3a0c00;
            --simple-colors-default-theme-accent-3: #561100;
            --simple-colors-default-theme-accent-4: #8a1c00;
            --simple-colors-default-theme-accent-5: #b92500;
            --simple-colors-default-theme-accent-6: #f53100;
            --simple-colors-default-theme-accent-7: #ff6c3c;
            --simple-colors-default-theme-accent-8: #ff7649;
            --simple-colors-default-theme-accent-9: #ff8a64;
            --simple-colors-default-theme-accent-10: #ffa588;
            --simple-colors-default-theme-accent-11: #ffb299;
            --simple-colors-default-theme-accent-12: #ffe7e0;
          }

          :host([accent-color="brown"]) {
            --simple-colors-default-theme-accent-1: #f0e2de;
            --simple-colors-default-theme-accent-2: #e5b8aa;
            --simple-colors-default-theme-accent-3: #c59485;
            --simple-colors-default-theme-accent-4: #b68373;
            --simple-colors-default-theme-accent-5: #ac7868;
            --simple-colors-default-theme-accent-6: #a47060;
            --simple-colors-default-theme-accent-7: #85574a;
            --simple-colors-default-theme-accent-8: #724539;
            --simple-colors-default-theme-accent-9: #5b3328;
            --simple-colors-default-theme-accent-10: #3b1e15;
            --simple-colors-default-theme-accent-11: #2c140e;
            --simple-colors-default-theme-accent-12: #200e09;
            --simple-colors-fixed-theme-accent-1: #f0e2de;
            --simple-colors-fixed-theme-accent-2: #e5b8aa;
            --simple-colors-fixed-theme-accent-3: #c59485;
            --simple-colors-fixed-theme-accent-4: #b68373;
            --simple-colors-fixed-theme-accent-5: #ac7868;
            --simple-colors-fixed-theme-accent-6: #a47060;
            --simple-colors-fixed-theme-accent-7: #85574a;
            --simple-colors-fixed-theme-accent-8: #724539;
            --simple-colors-fixed-theme-accent-9: #5b3328;
            --simple-colors-fixed-theme-accent-10: #3b1e15;
            --simple-colors-fixed-theme-accent-11: #2c140e;
            --simple-colors-fixed-theme-accent-12: #200e09;
          }

          :host([dark][accent-color="brown"]) {
            --simple-colors-default-theme-accent-1: #200e09;
            --simple-colors-default-theme-accent-2: #2c140e;
            --simple-colors-default-theme-accent-3: #3b1e15;
            --simple-colors-default-theme-accent-4: #5b3328;
            --simple-colors-default-theme-accent-5: #724539;
            --simple-colors-default-theme-accent-6: #85574a;
            --simple-colors-default-theme-accent-7: #a47060;
            --simple-colors-default-theme-accent-8: #ac7868;
            --simple-colors-default-theme-accent-9: #b68373;
            --simple-colors-default-theme-accent-10: #c59485;
            --simple-colors-default-theme-accent-11: #e5b8aa;
            --simple-colors-default-theme-accent-12: #f0e2de;
          }

          :host([accent-color="blue-grey"]) {
            --simple-colors-default-theme-accent-1: #e7eff1;
            --simple-colors-default-theme-accent-2: #b1c5ce;
            --simple-colors-default-theme-accent-3: #9badb6;
            --simple-colors-default-theme-accent-4: #8d9fa7;
            --simple-colors-default-theme-accent-5: #7a8f98;
            --simple-colors-default-theme-accent-6: #718892;
            --simple-colors-default-theme-accent-7: #56707c;
            --simple-colors-default-theme-accent-8: #40535b;
            --simple-colors-default-theme-accent-9: #2f3e45;
            --simple-colors-default-theme-accent-10: #1e282c;
            --simple-colors-default-theme-accent-11: #182023;
            --simple-colors-default-theme-accent-12: #0f1518;
            --simple-colors-fixed-theme-accent-1: #e7eff1;
            --simple-colors-fixed-theme-accent-2: #b1c5ce;
            --simple-colors-fixed-theme-accent-3: #9badb6;
            --simple-colors-fixed-theme-accent-4: #8d9fa7;
            --simple-colors-fixed-theme-accent-5: #7a8f98;
            --simple-colors-fixed-theme-accent-6: #718892;
            --simple-colors-fixed-theme-accent-7: #56707c;
            --simple-colors-fixed-theme-accent-8: #40535b;
            --simple-colors-fixed-theme-accent-9: #2f3e45;
            --simple-colors-fixed-theme-accent-10: #1e282c;
            --simple-colors-fixed-theme-accent-11: #182023;
            --simple-colors-fixed-theme-accent-12: #0f1518;
          }

          :host([dark][accent-color="blue-grey"]) {
            --simple-colors-default-theme-accent-1: #0f1518;
            --simple-colors-default-theme-accent-2: #182023;
            --simple-colors-default-theme-accent-3: #1e282c;
            --simple-colors-default-theme-accent-4: #2f3e45;
            --simple-colors-default-theme-accent-5: #40535b;
            --simple-colors-default-theme-accent-6: #56707c;
            --simple-colors-default-theme-accent-7: #718892;
            --simple-colors-default-theme-accent-8: #7a8f98;
            --simple-colors-default-theme-accent-9: #8d9fa7;
            --simple-colors-default-theme-accent-10: #9badb6;
            --simple-colors-default-theme-accent-11: #b1c5ce;
            --simple-colors-default-theme-accent-12: #e7eff1;
          }

          /* from a11y-utils */
          .sr-only {
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          }
        `]}render(){return r` <slot></slot>`}static get properties(){return{...super.properties,accentColor:{attribute:"accent-color",type:String,reflect:!0},dark:{name:"dark",type:Boolean,reflect:!0}}}constructor(){super(),this.accentColor="grey",this.dark=!1,this.colors=j.colors}static get tag(){return"simple-colors"}invertShade(e){return j.invertShade(e)}getColorInfo(e){return j.getColorInfo(e)}makeVariable(e="grey",t=1,i="default"){return j.makeVariable(e="grey",t=1,i="default")}getContrastingColors(e,t,i){return j.getContrastingColors(e,t,i)}getContrastingShades(e,t,i,a){return j.getContrastingShades(e,t,i,a)}isContrastCompliant(e,t,i,a,l){return j.isContrastCompliant(e,t,i,a,l)}}},z=class extends Xe(V){};globalThis.customElements.define(z.tag,z);var M={"./lib/accessories/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiIvPg==","./lib/accessories/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ2IDg3djNoMXYxaDF2MWgxdjFoNXYtMWgzdi0xaDJ2LTFoMXYtMyIgc3Ryb2tlPSIjQzhCRTlCIi8+PHBhdGggZD0iTTUxIDk0di0xaDF2MWgtMVoiIHN0cm9rZT0iI0Q1OTNFNiIvPjwvc3ZnPg==","./lib/accessories/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ2IDg5aDV2NWgtNXYtNVptLTUtMmg1djVoLTV2LTVabTAgNWg1djRoLTV2LTRabTEwIDBoNXY0aC01di00Wm0wLTVoNXY1aC01di01WiIgZmlsbD0iI0JCNTk1OSIvPjxwYXRoIGQ9Ik01NiA5Mkg0MXYtNWg1djJoNXYtMmg1djVaIiBmaWxsPSIjOEY0NTQ1Ii8+PC9zdmc+","./lib/accessories/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ2IDg5aDV2NWgtNXYtNVptLTUtMmg1djVoLTV2LTVabTAgNWg1djRoLTV2LTRabTEwIDBoNXY0aC01di00Wm0wLTVoNXY1aC01di01WiIgZmlsbD0iIzRBNEE0QSIvPjxwYXRoIGQ9Ik01NiA5Mkg0MXYtNWg1djJoNXYtMmg1djVaIiBmaWxsPSIjMzIzMjMyIi8+PC9zdmc+","./lib/accessories/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ2IDg5aDV2NWgtNXYtNVptLTUtMmg1djVoLTV2LTVabTAgNWg1djRoLTV2LTRabTEwIDBoNXY0aC01di00Wm0wLTVoNXY1aC01di01WiIgZmlsbD0iIzRENTU5RCIvPjxwYXRoIGQ9Ik01NiA5Mkg0MXYtNWg1djJoNXYtMmg1djVaIiBmaWxsPSIjMzIzQzkyIi8+PC9zdmc+","./lib/accessories/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTUwIDg4LjVoMW0tNCAwaC0xIiBzdHJva2U9IiMyNTJFN0EiLz48cGF0aCBkPSJNNDcgOTB2LTNoM3YzaC0zWm0yIDEyaC0xdi0xaC0uNXYtMkg0N3YtMS41aC0uNVY5Nkg0NnYtNS41aC41VjkwaDR2LjVoLjVWOTZoLS41djEuNUg1MFY5OWgtLjV2Mkg0OXYxWiIgZmlsbD0iIzMyM0M5NiIvPjxwYXRoIGQ9Ik00NyA5MXYtMWgzdjFoLS40Mjl2MWgtLjcxNHYxaC0uNzE0di0xaC0uNzE0di0xSDQ3WiIgZmlsbD0iIzI1MkU3QSIvPjwvc3ZnPg==","./lib/accessories/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTUwIDg4LjVoMW0tNCAwaC0xIiBzdHJva2U9IiM4RjQ1NDUiLz48cGF0aCBkPSJNNDcgOTB2LTNoM3YzaC0zWm0yIDEyaC0xdi0xaC0uNXYtMkg0N3YtMS41aC0uNVY5Nkg0NnYtNS41aC41VjkwaDR2LjVoLjVWOTZoLS41djEuNUg1MFY5OWgtLjV2Mkg0OXYxWiIgZmlsbD0iI0JCNTk1OSIvPjxwYXRoIGQ9Ik00NyA5MXYtMWgzdjFoLS40Mjl2MWgtLjcxNHYxaC0uNzE0di0xaC0uNzE0di0xSDQ3WiIgZmlsbD0iIzhGNDU0NSIvPjwvc3ZnPg==","./lib/accessories/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTUwIDg4LjVoMW0tNCAwaC0xIiBzdHJva2U9IiM2MzIwODMiLz48cGF0aCBkPSJNNDcgOTB2LTNoM3YzaC0zWm0yIDEyaC0xdi0xaC0uNXYtMkg0N3YtMS41aC0uNVY5Nkg0NnYtNS41aC41VjkwaDR2LjVoLjVWOTZoLS41djEuNUg1MFY5OWgtLjV2Mkg0OXYxWiIgZmlsbD0iIzdEM0RBNCIvPjxwYXRoIGQ9Ik00NyA5MXYtMWgzdjFoLS40Mjl2MWgtLjcxNHYxaC0uNzE0di0xaC0uNzE0di0xSDQ3WiIgZmlsbD0iIzYzMjA4MyIvPjwvc3ZnPg==","./lib/accessories/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ2IDg3djNoMXYxaDF2MWgxdjFoNXYtMWgzdi0xaDJ2LTFoMXYtMyIgc3Ryb2tlPSIjQzhCRTlCIi8+PHBhdGggZD0iTTUxIDk0di0xaDF2MWgtMVoiIHN0cm9rZT0iI0U2OTM5MyIvPjwvc3ZnPg==","./lib/accessories/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ2IDg3djNoMXYxaDF2MWgxdjFoNXYtMWgzdi0xaDJ2LTFoMXYtMyIgc3Ryb2tlPSIjQzhCRTlCIi8+PHBhdGggZD0iTTUxIDk0di0xaDF2MWgtMVoiIHN0cm9rZT0iIzkzRDdFNiIvPjwvc3ZnPg==","./lib/base/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMzIDQyaC01VjMyaDV2LTVoNXY1aDV2MTBoLTV2LTVoLTV2NVptMzUgMGgtNVYzMmg1di01aDV2NWg1djEwaC01di01aC01djVaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik03MyAzN3Y1aDV2LTVoLTVaIiBmaWxsPSIjQ0NDIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik04OCA0N0g3OFYzMmgtNXYtNWgtNXY1aC01djE1SDQzVjMyaC01di01aC01djVoLTV2MTVoLTVWMjdoNVYxN2g1NXYxMGg1djIwWiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02MyAyMkg0M3YtNWg0MHYxMGg1djIwSDc4VjMyaC01di01SDYzdi01WiIgZmlsbD0iI0E0QTJBMiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik04OCA1N0gyM3YxNWg1djVoNXY1aDQ1di01aDVWNjdoNVY1N1ptLTYwIDYwdi01aDV2NWgtNVptNTAgMHYtNWgxMHY1SDc4WiIgZmlsbD0iI0RFRERERCIgZmlsbC1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLW9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik00OCA3N3YtNWgxMHY1SDQ4Wm0tMTUgMzVoLTV2NWg1di01Wm01MCAwaC01djVoNXYtNVoiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTM4IDQ3aC01di01aDV2NVptMzUgMGgtNXYtNWg1djVaIiBmaWxsPSIjQUFBIi8+PHBhdGggZD0iTTE4IDI3djIwSDh2MTBoMTB2MjBoNXY1aDV2NWgtNXYzMGg1djVoNXYxMGgxNXYtNWgxMHY1aDIwdi0xMGgxMHYtNWg1di0xMGgtNVY5MmgtNXYtNWgtNXYtNWgxMFY2N2g1VjU3aDEwVjQ3SDkzVjI3aC01VjE3aC01di01SDI4djVoLTV2MTBoLTVabTE1IDE1aC01djVoLTVWMjdoNVYxN2g1NXYxMGg1djIwSDc4di01aC01di01aC01djVoLTV2NUg0M3YtNWgtNXYtNWgtNXY1Wm0wIDBoNXY1aC01di01Wm0zNSAwdjVoNXYtNWgtNVptMjAgMjVWNTdIMjN2MTVoNXY1aDV2NWg0NXYtNWg1VjY3aDVabS01IDI1djE1aDV2MTBINzhWOTJoNVptLTI1IDM1aDE1Vjg3SDM4djQwaDEwdi01aDEwdjVabS0zMC0xMGg1Vjg3aC01djMwWiIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMzggNjdoLTV2LTVoNXY1Wm0zMC01djVoNXYtNWgtNVoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMzMgMTQySDBWMGgxMTN2MTQySDMzWm0xNS0xMEgzM3YtMTBoLTV2LTVoLTVWODdoNXYtNWgtNXYtNWgtNVY1N0g4VjQ3aDEwVjI3aDVWMTdoNXYtNWg1NXY1aDV2MTBoNXYyMGgxMHYxMEg5M3YxMGgtNXYxNUg3OHY1aDV2NWg1djE1aDV2MTBoLTV2NUg3OHYxMEg1OHYtNUg0OHY1WiIgZmlsbD0idHJhbnNwYXJlbnQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+","./lib/base/0L.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMzIDQyaC01VjMyaDV2LTVoNXY1aDV2MTBoLTV2LTVoLTV2NVptMzUgMGgtNVYzMmg1di01aDV2NWg1djEwaC01di01aC01djVaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik03MyAzN3Y1aDV2LTVoLTVaIiBmaWxsPSIjQ0NDIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik04OCA0N0g3OFYzMmgtNXYtNWgtNXY1aC01djE1SDQzVjMyaC01di01aC01djVoLTV2MTVoLTVWMjdoNVYxN2g1NXYxMGg1djIwWiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02MyAyMkg0M3YtNWg0MHYxMGg1djIwSDc4VjMyaC01di01SDYzdi01WiIgZmlsbD0iI0E0QTJBMiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik04OCA1N0gyM3YxNWg1djVoNXY1aDQ1di01aDVWNjdoNVY1N1ptLTYwIDYwdi01aDV2NWgtNVptNTAgMHYtNWgxMHY1SDc4WiIgZmlsbD0iI0RFRERERCIgZmlsbC1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLW9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik00OCA3N3YtNWgxMHY1SDQ4Wm0tMTUgMzVoLTV2NWg1di01Wm01MCAwaC01djVoNXYtNVoiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTM4IDQ3aC01di01aDV2NVptMzUgMGgtNXYtNWg1djVaIiBmaWxsPSIjQUFBIi8+PHBhdGggZD0iTTE4IDI3djIwSDh2MTBoMTB2MjBoNXY1aDV2NWgtNXYzMGg1djVoNXYxMGgxNXYtNWgxMHY1aDIwdi0xMGgxMHYtNWg1di0xMGgtNVY5MmgtNXYtNWgtNXYtNWgxMFY2N2g1VjU3aDEwVjQ3SDkzVjI3aC01VjE3aC01di01SDI4djVoLTV2MTBoLTVabTE1IDE1aC01djVoLTVWMjdoNVYxN2g1NXYxMGg1djIwSDc4di01aC01di01aC01djVoLTV2NUg0M3YtNWgtNXYtNWgtNXY1Wm0wIDBoNXY1aC01di01Wm0zNSAwdjVoNXYtNWgtNVptMjAgMjVWNTdIMjN2MTVoNXY1aDV2NWg0NXYtNWg1VjY3aDVabS01IDI1djE1aDV2MTBINzhWOTJoNVptLTI1IDM1aDE1Vjg3SDM4djQwaDEwdi01aDEwdjVabS0zMC0xMGg1Vjg3aC01djMwWiIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMzggNjdoLTV2LTVoNXY1Wm0zMC01djVoNXYtNWgtNVptLTE1IDUwSDM4djVoMTB2NWg1di0xMFoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMzMgMTQySDBWMGgxMTN2MTQySDMzWm0xNS0xMEgzM3YtMTBoLTV2LTVoLTVWODdoNXYtNWgtNXYtNWgtNVY1N0g4VjQ3aDEwVjI3aDVWMTdoNXYtNWg1NXY1aDV2MTBoNXYyMGgxMHYxMEg5M3YxMGgtNXYxNUg3OHY1aDV2NWg1djE1aDV2MTBoLTV2NUg3OHYxMEg1OHYtNUg0OHY1WiIgZmlsbD0idHJhbnNwYXJlbnQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+","./lib/base/0R.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMzIDQyaC01VjMyaDV2LTVoNXY1aDV2MTBoLTV2LTVoLTV2NVptMzUgMGgtNVYzMmg1di01aDV2NWg1djEwaC01di01aC01djVaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik03MyAzN3Y1aDV2LTVoLTVaIiBmaWxsPSIjQ0NDIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik04OCA0N0g3OFYzMmgtNXYtNWgtNXY1aC01djE1SDQzVjMyaC01di01aC01djVoLTV2MTVoLTVWMjdoNVYxN2g1NXYxMGg1djIwWiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik02MyAyMkg0M3YtNWg0MHYxMGg1djIwSDc4VjMyaC01di01SDYzdi01WiIgZmlsbD0iI0E0QTJBMiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik04OCA1N0gyM3YxNWg1djVoNXY1aDQ1di01aDVWNjdoNVY1N1ptLTYwIDYwdi01aDV2NWgtNVptNTAgMHYtNWgxMHY1SDc4WiIgZmlsbD0iI0RFRERERCIgZmlsbC1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLW9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik00OCA3N3YtNWgxMHY1SDQ4Wm0tMTUgMzVoLTV2NWg1di01Wm01MCAwaC01djVoNXYtNVoiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTM4IDQ3aC01di01aDV2NVptMzUgMGgtNXYtNWg1djVaIiBmaWxsPSIjQUFBIi8+PHBhdGggZD0iTTE4IDI3djIwSDh2MTBoMTB2MjBoNXY1aDV2NWgtNXYzMGg1djVoNXYxMGgxNXYtNWgxMHY1aDIwdi0xMGgxMHYtNWg1di0xMGgtNVY5MmgtNXYtNWgtNXYtNWgxMFY2N2g1VjU3aDEwVjQ3SDkzVjI3aC01VjE3aC01di01SDI4djVoLTV2MTBoLTVabTE1IDE1aC01djVoLTVWMjdoNVYxN2g1NXYxMGg1djIwSDc4di01aC01di01aC01djVoLTV2NUg0M3YtNWgtNXYtNWgtNXY1Wm0wIDBoNXY1aC01di01Wm0zNSAwdjVoNXYtNWgtNVptMjAgMjVWNTdIMjN2MTVoNXY1aDV2NWg0NXYtNWg1VjY3aDVabS01IDI1djE1aDV2MTBINzhWOTJoNVptLTI1IDM1aDE1Vjg3SDM4djQwaDEwdi01aDEwdjVabS0zMC0xMGg1Vjg3aC01djMwWiIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNMzggNjdoLTV2LTVoNXY1Wm0zMC01djVoNXYtNWgtNVptLTEwIDU1djVoLTV2LTEwaDIwdjVINThaIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTMzIDE0MkgwVjBoMTEzdjE0MkgzM1ptMTUtMTBIMzN2LTEwaC01di01aC01Vjg3aDV2LTVoLTV2LTVoLTVWNTdIOFY0N2gxMFYyN2g1VjE3aDV2LTVoNTV2NWg1djEwaDV2MjBoMTB2MTBIOTN2MTBoLTV2MTVINzh2NWg1djVoNXYxNWg1djEwaC01djVINzh2MTBINTh2LTVINDh2NVoiIGZpbGw9InRyYW5zcGFyZW50IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==","./lib/base/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMzIDQyaC01VjMyaDV2LTVoNXY1aDV2MTBoLTV2LTVoLTV2NVptMzUgMGgtNVYzMmg1di01aDV2NWg1djEwaC01di01aC01djVaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik03MyAzN3Y1aDV2LTVoLTVaIiBmaWxsPSIjQ0NDIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTg4IDQ3SDc4VjMyaC01di01aC01djVoLTV2MTVINDNWMzJoLTV2LTVoLTV2NWgtNXYxNWgtNVYyN2g1VjE3aDU1djEwaDV2MjBaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTYzIDIySDQzdi01aDQwdjEwaDV2MjBINzhWMzJoLTV2LTVINjN2LTVaIiBmaWxsPSIjQTRBMkEyIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTgzIDU3SDI4djIwaDV2NWg0NXYtNWg1VjU3Wm0tNTUgNjB2LTVoNXY1aC01Wm01MCAwdi01aDEwdjVINzhaIiBmaWxsPSIjREVEREREIiBmaWxsLW9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik03OCA2MkgyOHYtNWg1NXYyMGgtNXY1SDY4di01aDV2LTVoNVY2MloiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhabS0xNSAzNWgtNXY1aDV2LTVabTUwIDBoLTV2NWg1di01WiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNMzggNDdoLTV2LTVoNXY1Wm0zNSAwaC01di01aDV2NVoiIGZpbGw9IiNBQUEiIGZpbGwtb3BhY2l0eT0iLjc1Ii8+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjOEY4RjhGIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEzIDg3djVoMTB2MjVoNXY1aDV2MTBoMTV2LTVoMTB2NWgyMHYtMTBoMTB2LTVoNXYtMTBoLTVWOTJoMTB2LTVoNVY3N2gtNVY1N2g1VjQ3SDkzVjI3aC01VjE3aC01di01SDI4djVoLTV2MTBoLTV2MjBIOHYxMGg1djIwSDh2MTBoNVptMTUgMHYtNWgtNVY1N2gtNXYyMGgtNXYxMGgxNVptMCAwaDV2MzBoLTVWODdabTUtNDVoLTV2NWgtNVYyN2g1VjE3aDU1djEwaDV2MjBINzh2LTVoLTV2LTVoLTV2NWgtNXY1SDQzdi01aC01di01aC01djVabTAgMGg1djVoLTV2LTVabTM1IDB2NWg1di01aC01Wm0xMCA0MGgxMFY1N2g1djIwaDV2MTBIODh2NWgtNXYtNWgtNXYtNVptMCAwSDMzdi01aC01VjU3aDU1djIwaC01djVabTUgMTB2MTVoNXYxMEg3OFY5Mmg1Wm0tMjUgMzVoMTVWODdIMzh2NDBoMTB2LTVoMTB2NVpNMzMgNjJoNXY1aC01di01Wm0zNSAwdjVoNXYtNWgtNVoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTMzIDE0MkgwVjBoMTEzdjE0MkgzM1ptMTUtMTBIMzN2LTEwaC01di01aC01VjkySDEzdi01SDhWNzdoNVY1N0g4VjQ3aDEwVjI3aDVWMTdoNXYtNWg1NXY1aDV2MTBoNXYyMGgxMHYxMGgtNXYyMGg1djEwaC01djVIODh2MTVoNXYxMGgtNXY1SDc4djEwSDU4di01SDQ4djVaIiBmaWxsPSJ0cmFuc3BhcmVudCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=","./lib/base/1L.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMzIDQyaC01VjMyaDV2LTVoNXY1aDV2MTBoLTV2LTVoLTV2NVptMzUgMGgtNVYzMmg1di01aDV2NWg1djEwaC01di01aC01djVaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik03MyAzN3Y1aDV2LTVoLTVaIiBmaWxsPSIjQ0NDIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTg4IDQ3SDc4VjMyaC01di01aC01djVoLTV2MTVINDNWMzJoLTV2LTVoLTV2NWgtNXYxNWgtNVYyN2g1VjE3aDU1djEwaDV2MjBaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTYzIDIySDQzdi01aDQwdjEwaDV2MjBINzhWMzJoLTV2LTVINjN2LTVaIiBmaWxsPSIjQTRBMkEyIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTgzIDU3SDI4djIwaDV2NWg0NXYtNWg1VjU3Wm0tNTUgNjB2LTVoNXY1aC01Wm01MCAwdi01aDEwdjVINzhaIiBmaWxsPSIjREVEREREIiBmaWxsLW9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik03OCA2MkgyOHYtNWg1NXYyMGgtNXY1SDY4di01aDV2LTVoNVY2MloiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhabS0xNSAzNWgtNXY1aDV2LTVabTUwIDBoLTV2NWg1di01WiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNMzggNDdoLTV2LTVoNXY1Wm0zNSAwaC01di01aDV2NVoiIGZpbGw9IiNBQUEiIGZpbGwtb3BhY2l0eT0iLjc1Ii8+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjOEY4RjhGIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEzIDg3djVoMTB2MjVoNXY1aDV2MTBoMTV2LTVoMTB2NWgyMHYtMTBoMTB2LTVoNXYtMTBoLTVWOTJoMTB2LTVoNVY3N2gtNVY1N2g1VjQ3SDkzVjI3aC01VjE3aC01di01SDI4djVoLTV2MTBoLTV2MjBIOHYxMGg1djIwSDh2MTBoNVptMTUgMHYtNWgtNVY1N2gtNXYyMGgtNXYxMGgxNVptMCAwaDV2MzBoLTVWODdabTUtNDVoLTV2NWgtNVYyN2g1VjE3aDU1djEwaDV2MjBINzh2LTVoLTV2LTVoLTV2NWgtNXY1SDQzdi01aC01di01aC01djVabTAgMGg1djVoLTV2LTVabTM1IDB2NWg1di01aC01Wm0xMCA0MGgxMFY1N2g1djIwaDV2MTBIODh2NWgtNXYtNWgtNXYtNVptMCAwSDMzdi01aC01VjU3aDU1djIwaC01djVabTUgMTB2MTVoNXYxMEg3OFY5Mmg1Wm0tMjUgMzVoMTVWODdIMzh2NDBoMTB2LTVoMTB2NVpNMzMgNjJoNXY1aC01di01Wm0zNSAwdjVoNXYtNWgtNVoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTUzIDEyMmgtNXYtNUgzOHYtNWgxNXYxMFoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMzMgMTQySDBWMGgxMTN2MTQySDMzWm0xNS0xMEgzM3YtMTBoLTV2LTVoLTVWOTJIMTN2LTVIOFY3N2g1VjU3SDhWNDdoMTBWMjdoNVYxN2g1di01aDU1djVoNXYxMGg1djIwaDEwdjEwaC01djIwaDV2MTBoLTV2NUg4OHYxNWg1djEwaC01djVINzh2MTBINTh2LTVINDh2NVoiIGZpbGw9InRyYW5zcGFyZW50IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==","./lib/base/1R.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMzIDQyaC01VjMyaDV2LTVoNXY1aDV2MTBoLTV2LTVoLTV2NVptMzUgMGgtNVYzMmg1di01aDV2NWg1djEwaC01di01aC01djVaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Ik03MyAzN3Y1aDV2LTVoLTVaIiBmaWxsPSIjQ0NDIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTg4IDQ3SDc4VjMyaC01di01aC01djVoLTV2MTVINDNWMzJoLTV2LTVoLTV2NWgtNXYxNWgtNVYyN2g1VjE3aDU1djEwaDV2MjBaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTYzIDIySDQzdi01aDQwdjEwaDV2MjBINzhWMzJoLTV2LTVINjN2LTVaIiBmaWxsPSIjQTRBMkEyIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTgzIDU3SDI4djIwaDV2NWg0NXYtNWg1VjU3Wm0tNTUgNjB2LTVoNXY1aC01Wm01MCAwdi01aDEwdjVINzhaIiBmaWxsPSIjREVEREREIiBmaWxsLW9wYWNpdHk9Ii4yNSIvPjxwYXRoIGQ9Ik03OCA2MkgyOHYtNWg1NXYyMGgtNXY1SDY4di01aDV2LTVoNVY2MloiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhabS0xNSAzNWgtNXY1aDV2LTVabTUwIDBoLTV2NWg1di01WiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNMzggNDdoLTV2LTVoNXY1Wm0zNSAwaC01di01aDV2NVoiIGZpbGw9IiNBQUEiIGZpbGwtb3BhY2l0eT0iLjc1Ii8+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjOEY4RjhGIiBmaWxsLW9wYWNpdHk9Ii41Ii8+PHBhdGggZD0iTTEzIDg3djVoMTB2MjVoNXY1aDV2MTBoMTV2LTVoMTB2NWgyMHYtMTBoMTB2LTVoNXYtMTBoLTVWOTJoMTB2LTVoNVY3N2gtNVY1N2g1VjQ3SDkzVjI3aC01VjE3aC01di01SDI4djVoLTV2MTBoLTV2MjBIOHYxMGg1djIwSDh2MTBoNVptMTUgMHYtNWgtNVY1N2gtNXYyMGgtNXYxMGgxNVptMCAwaDV2MzBoLTVWODdabTUtNDVoLTV2NWgtNVYyN2g1VjE3aDU1djEwaDV2MjBINzh2LTVoLTV2LTVoLTV2NWgtNXY1SDQzdi01aC01di01aC01djVabTAgMGg1djVoLTV2LTVabTM1IDB2NWg1di01aC01Wm0xMCA0MGgxMFY1N2g1djIwaDV2MTBIODh2NWgtNXYtNWgtNXYtNVptMCAwSDMzdi01aC01VjU3aDU1djIwaC01djVabTUgMTB2MTVoNXYxMEg3OFY5Mmg1Wm0tMjUgMzVoMTVWODdIMzh2NDBoMTB2LTVoMTB2NVpNMzMgNjJoNXY1aC01di01Wm0zNSAwdjVoNXYtNWgtNVoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTMzIDE0MkgwVjBoMTEzdjE0MkgzM1ptMTUtMTBIMzN2LTEwaC01di01aC01VjkySDEzdi01SDhWNzdoNVY1N0g4VjQ3aDEwVjI3aDVWMTdoNXYtNWg1NXY1aDV2MTBoNXYyMGgxMHYxMGgtNXYyMGg1djEwaC01djVIODh2MTVoNXYxMGgtNXY1SDc4djEwSDU4di01SDQ4djVaIiBmaWxsPSJ0cmFuc3BhcmVudCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNNTggMTIyaC01di0xMGgyMHY1SDU4djVaIiBmaWxsPSIjMDAwIi8+PC9zdmc+","./lib/base/L.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTM4IDEyN3YtMTBoMTB2MTBIMzhaIiBmaWxsPSIjNTk0OTMwIi8+PHBhdGggZD0iTTM5LjUgMTIwLjV2LTJoN3YybS03IDBoN20tNyAwdjJtNy0ydjJtLTcgMHYzaDd2LTNtLTcgMGg3IiBzdHJva2U9IiM0QjNFMjkiLz48L3N2Zz4=","./lib/base/R.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTczIDEyN0g1OHYtMTBoMTV2MTBaIiBmaWxsPSIjNTk0OTMwIi8+PHBhdGggZD0iTTU5LjUgMTIwLjV2LTJoMTJ2Mm0tMTIgMGgxMm0tMTIgMHYybTEyLTJ2Mm0tMTIgMHYzaDEydi0zbS0xMiAwaDEyIiBzdHJva2U9IiM0QjNFMjkiLz48L3N2Zz4=","./lib/base/fire.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTExLjUgMTIyLjV2NmgzdjNoM3YzaDEydi0zaDN2LTNoM3YtNmgtM3YtNmgzdi0zaC0zdi0zaC0zdi02aDN2LTNoM3YtM2gtM3YtM2gtM3YzaC0zdjNoM3YzaC0zdjZoM3YzaDN2M2gtM3Y2aDN2NmgtM3YzaC0xMnYtM2gtM3YtNmgzdi0zaDN2LTZoLTZ2LTZoNnY2aDZ2M2gtM3YtOWgtM3YtM2gtM3YxNWgtM3YzaC0zWm0xOC0yMXYtM2gzdjNoLTNaIiBmaWxsPSJyZWQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTE3LjUgMTEzLjV2LTNoM3YzaDN2NmgtM3YzaC0zdjZoM3YzaC0zdi0zaC0zdi02aDN2LTNoM3YtNmgtM1ptMTUtMTJoLTN2LTNoM3YzWm0tNiAzMHYtM2gzdi02aC0zdi0zaDN2M2gzdjZoLTN2M2gtM1oiIGZpbGw9IiNGRkE4MDAiLz48cGF0aCBkPSJNMjYuNSAxMjUuNXYtM2gzdjNoLTNabTMtNmgtNnYzaC0zdjNoLTN2LTNoM3YtM2gzdi0zaDN2LTZoM3YzaDN2M2gtM3YzWm0tOS0xMmgtM3YzaDN2LTNaIiBmaWxsPSIjRkZFOTI1Ii8+PHBhdGggZD0iTTIwLjUgMTMxLjV2LTNoLTN2LTNoM3YtM2gzdi0zaDN2NmgzdjNoLTN2M2gtNloiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzYgMTIyaC0zdi01aDN2LTRoLTN2LTNoLTN2LTVoM3YtM2gzdi00aC0zdi0zaC00djNoLTN2NGgzdjJoLTN2OWgtMnYtNmgtM3YtM2gtNHYzaC0zdjdoM3Y1aC0zdjNoLTN2N2gzdjNoM3YzaDEzdi0zaDN2LTNoM3YtN1oiIHN0cm9rZT0iI0I3MDgwOCIvPjxwYXRoIGQ9Ik04NC41IDEyNy41di05aDN2LTNoM3YtM2gzdi02aDN2M2gzdjZoM3Y5aC0zdjNoLTN2M2gtM3YtM2gzdi0zaDN2LTloLTN2LTNoLTN2M2gtM3YzaC0zdjloM3YzaC0zdi0zaC0zWiIgZmlsbD0icmVkIi8+PHBhdGggZD0iTTk5LjUgMTI0LjVoLTN2LTloLTN2M2gtM3YzaC0zdi0zaDN2LTNoM3YtM2gzdjNoM3Y5Wm0tOSA2di0zaDN2M2gtM1oiIGZpbGw9IiNGRkE4MDAiLz48cGF0aCBkPSJNOTAuNSAxMjcuNWgtM3YtNmgzdi0zaDN2LTNoM3Y2aC02djZaIiBmaWxsPSIjRkZFOTI1Ii8+PHBhdGggZD0iTTk2LjUgMTI3LjVoLTN2LTNoM3YzWiIgZmlsbD0iI0ZGRTkyNSIvPjxwYXRoIGQ9Ik05My41IDEyNy41aC0zdi02aDZ2M2gtM3YzWiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMDMgMTI1di0xMGgtM3YtNmgtM3YtM2gtNHY2aC0zdjNoLTN2M2gtM3YxMGgzdjNoMTB2LTNoM3YtM2gzWiIgc3Ryb2tlPSIjQjcwODA4Ii8+PHBhdGggZD0iTTg4LjUgMTI1LjV2NmgtM3YzaC0zdjNoLTEydi0zaC0zdi0zaC0zdi02aDN2LTZoLTN2LTNoM3YtM2gzdi02aC0zdi0zaC0zdi0zaDN2LTNoM3YzaDN2M2gtM3YzaDN2NmgtM3YzaC0zdjNoM3Y2aC0zdjZoM3YzaDEydi0zaDN2LTZoLTN2LTNoLTN2LTZoNnYtNmgtNnY2aC02djNoM3YtOWgzdi0zaDN2MTVoM3YzaDNabS0xOC0yMXYtM2gtM3YzaDNaIiBmaWxsPSJyZWQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTgyLjUgMTE2LjV2LTNoLTN2M2gtM3Y2aDN2M2gzdjZoLTN2M2gzdi0zaDN2LTZoLTN2LTNoLTN2LTZoM1ptLTE1LTEyaDN2LTNoLTN2M1ptNiAzMHYtM2gtM3YtNmgzdi0zaC0zdjNoLTN2NmgzdjNoM1oiIGZpbGw9IiNGRkE4MDAiLz48cGF0aCBkPSJNNzMuNSAxMjguNXYtM2gtM3YzaDNabS0zLTZoNnYzaDN2M2gzdi0zaC0zdi0zaC0zdi0zaC0zdi02aC0zdjNoLTN2M2gzdjNabTktMTJoM3YzaC0zdi0zWiIgZmlsbD0iI0ZGRTkyNSIvPjxwYXRoIGQ9Ik03OS41IDEzNC41di0zaDN2LTNoLTN2LTNoLTN2LTNoLTN2NmgtM3YzaDN2M2g2WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02NCAxMjVoM3YtNWgtM3YtNGgzdi0zaDN2LTVoLTN2LTNoLTN2LTRoM3YtM2g0djNoM3Y0aC0zdjJoM3Y5aDJ2LTZoM3YtM2g0djNoM3Y3aC0zdjVoM3YzaDN2N2gtM3YzaC0zdjNINzB2LTNoLTN2LTNoLTN2LTdaIiBzdHJva2U9IiNCNzA4MDgiLz48cGF0aCBkPSJNNDYuNSAxMzQuNXYtOWgzdi0zaDN2LTNoM3YtNmgzdjNoM3Y2aDN2OWgtM3YzaC0zdjNoLTN2LTNoM3YtM2gzdi05aC0zdi0zaC0zdjNoLTN2M2gtM3Y5aDN2M2gtM3YtM2gtM1oiIGZpbGw9InJlZCIvPjxwYXRoIGQ9Ik02MS41IDEzMS41aC0zdi05aC0zdjNoLTN2M2gtM3YtM2gzdi0zaDN2LTNoM3YzaDN2OVptLTkgNnYtM2gzdjNoLTNaIiBmaWxsPSIjRkZBODAwIi8+PHBhdGggZD0iTTUyLjUgMTM0LjVoLTN2LTZoM3YtM2gzdi0zaDN2NmgtNnY2WiIgZmlsbD0iI0ZGRTkyNSIvPjxwYXRoIGQ9Ik01OC41IDEzNC41aC0zdi0zaDN2M1oiIGZpbGw9IiNGRkU5MjUiLz48cGF0aCBkPSJNNTUuNSAxMzQuNWgtM3YtNmg2djNoLTN2M1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNjUgMTMydi0xMGgtM3YtNmgtM3YtM2gtNHY2aC0zdjNoLTN2M2gtM3YxMGgzdjNoMTB2LTNoM3YtM2gzWiIgc3Ryb2tlPSIjQjcwODA4Ii8+PHBhdGggZD0iTTQ4LjUgMTM1LjV2LTloLTN2LTNoLTN2LTNoLTN2LTZoLTN2M2gtM3Y2aC0zdjloM3YzaDN2M2gzdi0zaC0zdi0zaC0zdi05aDN2LTNoM3YzaDN2M2gzdjloLTN2M2gzdi0zaDNaIiBmaWxsPSJyZWQiLz48cGF0aCBkPSJNMzMuNSAxMzIuNWgzdi05aDN2M2gzdjNoM3YtM2gtM3YtM2gtM3YtM2gtM3YzaC0zdjlabTkgNnYtM2gtM3YzaDNaIiBmaWxsPSIjRkZBODAwIi8+PHBhdGggZD0iTTQyLjUgMTM1LjVoM3YtNmgtM3YtM2gtM3YtM2gtM3Y2aDZ2NloiIGZpbGw9IiNGRkU5MjUiLz48cGF0aCBkPSJNMzYuNSAxMzUuNWgzdi0zaC0zdjNaIiBmaWxsPSIjRkZFOTI1Ii8+PHBhdGggZD0iTTM5LjUgMTM1LjVoM3YtNmgtNnYzaDN2M1oiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMTMzdi0xMGgzdi02aDN2LTNoNHY2aDN2M2gzdjNoM3YxMGgtM3YzSDM2di0zaC0zdi0zaC0zWiIgc3Ryb2tlPSIjQjcwODA4Ii8+PHBhdGggZD0iTTMzIDYyaDEwdjEwSDMzVjYyWm0zMCAwaDEwdjEwSDYzVjYyWiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==","./lib/base-rpg.svg":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTUiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgOTUgMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTUgNTBINzBWNjBIMTVWNTBaIiBmaWxsPSIjRThFOEU4IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTIwIDYwSDY1VjY1SDIwVjYwWiIgZmlsbD0iI0U4RThFOCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yNSA2NUg2MFY3MEgyNVY2NVoiIGZpbGw9IiNFOEU4RTgiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzUgMTAwSDgwVjEwNUg3NVYxMDBaIiBmaWxsPSIjRThFOEU4IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTI1IDExNUgzMFYxMjBIMjVWMTE1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMzAgMTE1SDM1VjEyMEgzMFYxMTVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0zNSAxMTVINDBWMTIwSDM1VjExNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTQwIDExMEg0NVYxMTVINDBWMTEwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNDUgMTEwSDUwVjExNUg0NVYxMTBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik01MCAxMTVINTVWMTIwSDUwVjExNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTU1IDExNUg2MFYxMjBINTVWMTE1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjUgMTE1SDcwVjEyMEg2NVYxMTVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSAxMTBINzBWMTE1SDY1VjExMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTY1IDEwNUg3MFYxMTBINjVWMTA1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjUgMTAwSDcwVjEwNUg2NVYxMDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSA5NUg3MFYxMDBINjVWOTVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSA5MEg3MFY5NUg2NVY5MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTY1IDg1SDcwVjkwSDY1Vjg1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjUgODBINzBWODVINjVWODBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSA3NUg3MFY4MEg2NVY3NVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDExMEgzMFYxMTVIMjVWMTEwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMjUgMTA1SDMwVjExMEgyNVYxMDVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yNSAxMDBIMzBWMTA1SDI1VjEwMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDk1SDMwVjEwMEgyNVY5NVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDkwSDMwVjk1SDI1VjkwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMjUgODVIMzBWOTBIMjVWODVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yNSA4MEgzMFY4NUgyNVY4MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDc1SDMwVjgwSDI1Vjc1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNzAgMTA1SDc1VjExMEg3MFYxMDVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik03MCA3NUg3NVY4MEg3MFY3NVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTcwIDY1SDc1VjcwSDcwVjY1WiIgZmlsInJwZy1jaGFyYWN0ZXIibD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNzUgNjVIODBWNzBINzVWNjVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik03NSA2MEg4MFY2NUg3NVY2MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTc1IDU1SDgwVjYwSDc1VjU1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNODAgNTBIODVWNTVIODBWNTBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik04MCA0NUg4NVY1MEg4MFY0NVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTAgNDBINVY0NUgwVjQwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNOTAgMzVIOTVWNDBIOTBWMzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0wIDM1SDVWNDBIMFYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTUgMzVIMTBWNDBINVYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTEwIDM1SDE1VjQwSDEwVjM1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgMzVIMjBWNDBIMTVWMzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yMCAzNUgyNVY0MEgyMFYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDM1SDMwVjQwSDI1VjM1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMzAgMzVIMzVWNDBIMzBWMzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0zNSAzNUg0MFY0MEgzNVYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTQwIDM1SDQ1VjQwSDQwVjM1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNDUgMzVINTBWNDBINDVWMzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik01MCAzNUg1NVY0MEg1MFYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTU1IDM1SDYwVjQwSDU1VjM1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjAgMzVINjVWNDBINjBWMzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSAzNUg3MFY0MEg2NVYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTcwIDM1SDc1VjQwSDcwVjM1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNzUgMzVIODBWNDBINzVWMzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik04MCAzNUg4NVY0MEg4MFYzNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTg1IDM1SDkwVjQwSDg1VjM1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTAgMzBIMTVWMzVIMTBWMzBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0xMCAyNUgxNVYzMEgxMFYyNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTEwIDIwSDE1VjI1SDEwVjIwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTAgMTVIMTVWMjBIMTBWMTVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik04MCAzMEg4NVYzNUg4MFYzMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTgwIDI1SDg1VjMwSDgwVjI1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNODAgMjBIODVWMjVIODBWMjBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik04MCAxNUg4NVYyMEg4MFYxNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTc1IDEwSDgwVjE1SDc1VjEwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNzUgNUg4MFYxMEg3NVY1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgMTBIMjBWMTVIMTVWMTBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0xNSA1SDIwVjEwSDE1VjVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yMCAwSDI1VjVIMjBWMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDBIMzBWNUgyNVYwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMzAgMEgzNVY1SDMwVjBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0zNSAwSDQwVjVIMzVWMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTQwIDBINDVWNUg0MFYwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMjAgMzBIMjVWMzVIMjBWMzBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yNSAyNUgzMFYzMEgyNVYyNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTMwIDMwSDM1VjM1SDMwVjMwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNTUgMzBINjBWMzVINTVWMzBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02MCAyNUg2NVYzMEg2MFYyNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTY1IDMwSDcwVjM1SDY1VjMwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNDUgMEg1MFY1SDQ1VjBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik01MCAwSDU1VjVINTBWMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTU1IDBINjBWNUg1NVYwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjAgMEg2NVY1SDYwVjBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSAwSDcwVjVINjVWMFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTcwIDBINzVWNUg3MFYwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNOTAgNDBIOTVWNDVIOTBWNDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik04NSA0MEg5MFY0NUg4NVY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTEwIDYwSDE1VjY1SDEwVjYwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTAgNTVIMTVWNjBIMTBWNTVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0xMCA1MEgxNVY1NUgxMFY1MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTEwIDQ1SDE1VjUwSDEwVjQ1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMjUgNTBIMzBWNTVIMjVWNTBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02MCA1MEg2NVY1NUg2MFY1MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTgwIDQwSDg1VjQ1SDgwVjQwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNzUgNDBIODBWNDVINzVWNDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik03MCA0MEg3NVY0NUg3MFY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTY1IDQwSDcwVjQ1SDY1VjQwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjAgNDBINjVWNDVINjBWNDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik01NSA0MEg2MFY0NUg1NVY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTUwIDQwSDU1VjQ1SDUwVjQwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNDUgNDBINTBWNDVINDVWNDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik00MCA0MEg0NVY0NUg0MFY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTM1IDQwSDQwVjQ1SDM1VjQwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMzAgNDBIMzVWNDVIMzBWNDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yNSA0MEgzMFY0NUgyNVY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTIwIDQwSDI1VjQ1SDIwVjQwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgNDBIMjBWNDVIMTVWNDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0xMCA0MEgxNVY0NUgxMFY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTUgNDBIMTBWNDVINVY0MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTc1IDgwSDgwVjg1SDc1VjgwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNzUgODVIODBWOTBINzVWODVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik03NSA5MEg4MFY5NUg3NVY5MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTc1IDEwNUg4MFYxMTBINzVWMTA1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNODAgOTVIODVWMTAwSDgwVjk1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNODAgMTAwSDg1VjEwNUg4MFYxMDBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yMCAxMDVIMjVWMTEwSDIwVjEwNVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTE1IDEwMEgyMFYxMDVIMTVWMTAwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgOTVIMjBWMTAwSDE1Vjk1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgOTBIMjBWOTVIMTVWOTBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0xNSA4NUgyMFY5MEgxNVY4NVoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTE1IDgwSDIwVjg1SDE1VjgwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgNzVIMjBWODBIMTVWNzVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0yMCA3MEgyNVY3NUgyMFY3MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTI1IDcwSDMwVjc1SDI1VjcwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMzAgNzBIMzVWNzVIMzBWNzBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0zNSA3MEg0MFY3NUgzNVY3MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTQwIDcwSDQ1Vjc1SDQwVjcwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNDUgNzBINTBWNzVINDVWNzBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik01MCA3MEg1NVY3NUg1MFY3MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTU1IDcwSDYwVjc1SDU1VjcwWiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNNjAgNzBINjVWNzVINjBWNzBaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik02NSA3MEg3MFY3NUg2NVY3MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTIwIDY1SDI1VjcwSDIwVjY1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMTUgNjVIMjBWNzBIMTVWNjVaIiBmaWxsPSIjMjgyODI4Ii8+CjxwYXRoIGQ9Ik0xNSA2MEgyMFY2NUgxNVY2MFoiIGZpbGw9IiMyODI4MjgiLz4KPHBhdGggZD0iTTYwIDExNUg2NVYxMjBINjBWMTE1WiIgZmlsbD0iIzI4MjgyOCIvPgo8cGF0aCBkPSJNMjAgNUgyNVYxMEgyMFY1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yMCAxMEgyNVYxNUgyMFYxMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMjUgNUgzMFYxMEgyNVY1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zMCA1SDM1VjEwSDMwVjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTM1IDVINDBWMTBIMzVWNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDAgNUg0NVYxMEg0MFY1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00NSA1SDUwVjEwSDQ1VjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTUwIDVINTVWMTBINTBWNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNTUgNUg2MFYxMEg1NVY1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02MCA1SDY1VjEwSDYwVjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDVINzBWMTBINjVWNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzAgNUg3NVYxMEg3MFY1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yNSAxMEgzMFYxNUgyNVYxMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgMTBIMzVWMTVIMzBWMTBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTM1IDEwSDQwVjE1SDM1VjEwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00MCAxMEg0NVYxNUg0MFYxMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDUgMTBINTBWMTVINDVWMTBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTUwIDEwSDU1VjE1SDUwVjEwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01NSAxMEg2MFYxNUg1NVYxMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjAgMTBINjVWMTVINjBWMTBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDEwSDcwVjE1SDY1VjEwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03MCAxMEg3NVYxNUg3MFYxMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMTUgMTVIMjBWMjBIMTVWMTVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTIwIDE1SDI1VjIwSDIwVjE1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yNSAxNUgzMFYyMEgyNVYxNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgMTVIMzVWMjBIMzBWMTVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTM1IDE1SDQwVjIwSDM1VjE1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00MCAxNUg0NVYyMEg0MFYxNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDUgMTVINTBWMjBINDVWMTVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTUwIDE1SDU1VjIwSDUwVjE1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01NSAxNUg2MFYyMEg1NVYxNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjAgMTVINjVWMjBINjBWMTVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDE1SDcwVjIwSDY1VjE1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03MCAxNUg3NVYyMEg3MFYxNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMTUgMjBIMjBWMjVIMTVWMjBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTIwIDIwSDI1VjI1SDIwVjIwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yNSAyMEgzMFYyNUgyNVYyMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgMjBIMzVWMjVIMzBWMjBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTM1IDIwSDQwVjI1SDM1VjIwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00MCAyMEg0NVYyNUg0MFYyMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDUgMjBINTBWMjVINDVWMjBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTUwIDIwSDU1VjI1SDUwVjIwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01NSAyMEg2MFYyNUg1NVYyMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjAgMjBINjVWMjVINjBWMjBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDIwSDcwVjI1SDY1VjIwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03MCAyMEg3NVYyNUg3MFYyMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzUgMjBIODBWMjVINzVWMjBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTc1IDE1SDgwVjIwSDc1VjE1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02NSAyNUg3MFYzMEg2NVYyNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzAgMjVINzVWMzBINzBWMjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTc1IDI1SDgwVjMwSDc1VjI1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03MCAzMEg3NVYzNUg3MFYzMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzUgMzBIODBWMzVINzVWMzBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTMwIDI1SDM1VjMwSDMwVjI1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zNSAyNUg0MFYzMEgzNVYyNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDAgMjVINDVWMzBINDBWMjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTQ1IDI1SDUwVjMwSDQ1VjI1WiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01MCAyNUg1NVYzMEg1MFYyNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNTUgMjVINjBWMzBINTVWMjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTM1IDMwSDQwVjM1SDM1VjMwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00MCAzMEg0NVYzNUg0MFYzMFoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDUgMzBINTBWMzVINDVWMzBaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTUwIDMwSDU1VjM1SDUwVjMwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0xNSAyNUgyMFYzMEgxNVYyNVoiIGZpbGw9IiNDRUNEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMjAgMjVIMjVWMzBIMjBWMjVaIiBmaWxsPSIjQ0VDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTE1IDMwSDIwVjM1SDE1VjMwWiIgZmlsbD0iI0NFQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgyNVYyNUgyMFYyMFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTI1IDE1SDMwVjIwSDI1VjE1WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgMjBIMzVWMjVIMzBWMjBaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zMCAyNUgzNVYzMEgzMFYyNVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTI1IDIwSDMwVjI1SDI1VjIwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNTUgMjVINjBWMzBINTVWMjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02NSAyNUg3MFYzMEg2NVYyNVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTU1IDIwSDYwVjI1SDU1VjIwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjAgMjBINjVWMjVINjBWMjBaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02MCAxNUg2NVYyMEg2MFYxNVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDIwSDcwVjI1SDY1VjIwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMjAgMjVIMjVWMzBIMjBWMjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zMCAxMDBINjVWMTEwSDMwVjEwMFoiIGZpbGw9IiM4NDg0ODQiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgMTEwSDQwVjExNUgzMFYxMTBaIiBmaWxsPSIjODQ4NDg0IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTUwIDExMEg2NVYxMTVINTBWMTEwWiIgZmlsbD0iIzg0ODQ4NCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zNSA3NUg1NVYxMDBIMzVWNzVaIiBmaWxsPSIjRTRFNEU0IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTQwIDc3SDQ1VjgySDQwVjc3WiIgZmlsbD0iIzY4Njg2OCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zNSA3NUg0MFY4MEgzNVY3NVoiIGZpbGw9IiM2ODY4NjgiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzUgODBINDBWODRIMzVWODBaIiBmaWxsPSIjNjg2ODY4IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTQ1IDgwSDUwVjg0SDQ1VjgwWiIgZmlsbD0iIzY4Njg2OCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00NSA3NUg1MFY4MEg0NVY3NVoiIGZpbGw9IiM2ODY4NjgiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgNzVIMzVWMTAwSDMwVjc1WiIgZmlsbD0iIzUxNTE1MSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01NSA3NUg2NVYxMDBINTVWNzVaIiBmaWxsPSIjNTE1MTUxIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTIwIDc1SDI1VjEwMEgyMFY3NVoiIGZpbGw9IiM1MTUxNTEiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzAgODBINzVWMTAwSDcwVjgwWiIgZmlsbD0iIzUxNTE1MSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03NSA5NUg4MFYxMDBINzVWOTVaIiBmaWxsPSIjNTE1MTUxIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTM1IDU1SDU1VjYwSDM1VjU1WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgNjBINDBWNjVIMzBWNjBaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01MCA2MEg2MFY2NUg1MFY2MFoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTQwIDYwSDUwVjY1SDQwVjYwWiIgZmlsbD0iI0NEQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0xNSA0NUg4MFY1MEgxNVY0NVoiIGZpbGw9IiNDRENEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzAgNTBIODBWNTVINzBWNTBaIiBmaWxsPSIjQ0RDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTcwIDU1SDc1VjYwSDcwVjU1WiIgZmlsbD0iI0NEQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03MCA2MEg3NVY2NUg3MFY2MFoiIGZpbGw9IiNDRENEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjUgNjBINzBWNjVINjVWNjBaIiBmaWxsPSIjQ0RDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDY1SDcwVjcwSDY1VjY1WiIgZmlsbD0iI0NEQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02MCA2NUg2NVY3MEg2MFY2NVoiIGZpbGw9IiNDRENEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzAgMTAwSDc1VjEwNUg3MFYxMDBaIiBmaWxsPSIjQ0RDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTIwIDEwMEgyNVYxMDVIMjBWMTAwWiIgZmlsbD0iI0NEQ0RDRCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik00NSA2MEg1MFY2NUg0NVY2MFoiIGZpbGw9IiNDRENEQ0QiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNDAgNjBINDVWNjVINDBWNjBaIiBmaWxsPSIjQ0RDRENEIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTYwIDMwSDY1VjM1SDYwVjMwWiIgZmlsbD0iI0EzQTNBMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yNSAzMEgzMFYzNUgyNVYzMFoiIGZpbGw9IiNBM0EzQTMiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNTUgNTVINjVMNjAgNjBINTVWNTVaIiBmaWxsPSIjQTNBM0EzIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDU1SDcwVjYwSDY1VjU1WiIgZmlsbD0iI0EzQTNBMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02NSA0NUg3MFY1MEg2NVY0NVoiIGZpbGw9IiNBM0EzQTMiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNTUgNDVINjBMNjUgNTBINTVWNDVaIiBmaWxsPSIjQTNBM0EzIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTU1IDUwSDY1VjU1SDU1VjUwWiIgZmlsbD0iI0EzQTNBMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02NSA1NVY2MEg2MEw2NSA1NVoiIGZpbGw9IiNBM0EzQTMiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjUgNTBINzBWNTVINjVWNTBaIiBmaWxsPSIjQTNBM0EzIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTYwIDQ1SDY1VjUwTDYwIDQ1WiIgZmlsbD0iI0EzQTNBMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0yMCA3NUgyNVYxMDBIMjBWNzVaIiBmaWxsPSIjMzczNzM3IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTcwIDgwSDc1VjEwMEg3MFY4MFoiIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjAgNzVINjVWMTAwSDYwVjc1WiIgZmlsbD0iIzM3MzczNyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik01NSA3NUg2MFY4MEg1NVY3NVoiIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNMzAgNzVIMzVWODBIMzBWNzVaIiBmaWxsPSIjMzczNzM3IiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTYwIDEwMEg2NVYxMTVINjBWMTAwWiIgZmlsbD0iIzYwNjA2MCIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zNSAxMTBINDBWMTE1SDM1VjExMFoiIGZpbGw9IiM2MDYwNjAiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6aGFyZC1saWdodCI+CjxwYXRoIGQ9Ik0zNSA3NUg1NVY4MEgzNVY3NVoiIGZpbGw9IiM2MTYxNjEiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8L2c+CjxyZWN0IHg9IjY1IiB5PSIyNSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI0U0RTNFMyIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik03MCAxNUg4MFYzNUg3MFYxNVoiIGZpbGw9IiNBRUFEQUYiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNzAgMTBINzVWMTVINzBWMTBaIiBmaWxsPSIjQUVBREFGIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTY1IDEwSDcwVjE1SDY1VjEwWiIgZmlsbD0iI0FFQURBRiIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02MCAxMEg2NVYxNUg2MFYxMFoiIGZpbGw9IiNBRUFEQUYiIGZpbGwtb3BhY2l0eT0iMC43NSIvPgo8cGF0aCBkPSJNNjUgMTVINzBWMjBINjVWMTVaIiBmaWxsPSIjQUVBREFGIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPHBhdGggZD0iTTU1IDEwSDYwVjE1SDU1VjEwWiIgZmlsbD0iI0FFQURBRiIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0zNSA1SDc1VjEwSDM1VjVaIiBmaWxsPSIjQUVBREFGIiBmaWxsLW9wYWNpdHk9IjAuNzUiLz4KPC9zdmc+","./lib/circle.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj48cGF0aCBkPSJNMTIyLTFILTEwdjE0M2gxMzJWLTFaTTggMzJWMTdoNXYtNWg1VjdoMTVWMmg0NC45ODRMNzggN2gxNXY1aDV2NWg1djE1aDV2NDVoLTV2MTVoLTV2NWgtNXY1SDc4djUuNWwtNDUtLjV2LTVIMTh2LTVoLTV2LTVIOFY3N0gzVjMyaDVaIiBmaWxsPSIjQzRDNEM0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik03LjUgMzEuNXYtMTVoNXYtNWg1di01aDE1di01aDQ2djVoMTV2NWg1djVoNXYxNWg1djQ2aC01djE1aC01djVoLTV2NWgtMTV2NWgtNDZ2LTVoLTE1di01aC01di01aC01di0xNWgtNXYtNDZoNVoiIHN0cm9rZT0iIzAwMCIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGQ9Ik0wIDBoMTEzdjE0MkgweiIgZmlsbD0iI2ZmZiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==","./lib/face/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiIvPg==","./lib/face/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDcydjVIMzh2LTVoNXYtNWgyMHY1aDV2NUg1OHYtNUg0OFoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=","./lib/face/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTY4IDc3SDM4di01aDMwdjVaIiBmaWxsPSIjMDAwIi8+PC9zdmc+","./lib/face/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDcyaDV2LTVoMTB2NWg1djVoLTV2LTVINDh2NWgtNXYtNVoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=","./lib/face/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTUzIDYyLjVoLTV2MTBoMTB2LTVoLTV2LTVabTE1IDE3di01SDM4djVoMzBaIiBmaWxsPSIjMDAwIi8+PC9zdmc+","./lib/face/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDcyaC01di01aDV2NWgxMHYtNWg1djVoLTV2NUg0OHYtNVoiIGZpbGw9IiMwMDAiLz48L3N2Zz4=","./lib/faceItem/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiIvPg==","./lib/faceItem/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTc4IDcySDYzVjU3aDE1djE1WiIgZmlsbD0iI0M0QzRDNCIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==","./lib/faceItem/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTc4IDcySDYzVjU3aDE1djE1WiIgZmlsbD0iI0JDRDdFQSIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==","./lib/faceItem/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDcySDI4VjU3aDE1djE1WiIgZmlsbD0iI0JDRDdFQSIgZmlsbC1vcGFjaXR5PSIuNSIvPjwvc3ZnPg==","./lib/faceItem/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTc4IDcySDYzVjU3aDE1djE1WiIgZmlsbD0iIzY0NTg0MSIvPjxwYXRoIGQ9Ik02MyA2MmgtNXYtMmgtNXYtMmgtNnYtMW0zMSAxMmg1IiBzdHJva2U9IiM2NDU4NDEiLz48L3N2Zz4=","./lib/faceItem/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDcySDI4VjU3aDE1djE1WiIgZmlsbD0iIzY0NTg0MSIvPjxwYXRoIGQ9Ik0yOCA3MGgtNW0yMC04aDV2LTJoNXYtMmg2di0xIiBzdHJva2U9IiM2NDU4NDEiLz48L3N2Zz4=","./lib/faceItem/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDcySDI4VjU3aDE1djE1Wm0zNSAwSDYzVjU3aDE1djE1WiIgZmlsbD0iIzY0NTg0MSIvPjxwYXRoIGQ9Ik0yOCA3MGgtNW0yMC04aDV2LTJoNW0wIDB2LTJtMCAyaDV2Mmg1bS0xMC00aDZ2LTFtLTYgMWgtNnYtMW0zMSAxMmg1IiBzdHJva2U9IiM2NDU4NDEiLz48L3N2Zz4=","./lib/faceItem/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTc4IDcySDYzVjU3aDE1djE1Wm0tMzUgMEgyOFY1N2gxNXYxNVoiIGZpbGw9IiNCQ0Q3RUEiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNNDMgNjRoMjAiIHN0cm9rZT0iI0M4QkU5QiIvPjwvc3ZnPg==","./lib/faceItem/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTc4IDcySDYzVjU3aDE1djE1Wm0tMzUgMEgyOFY1N2gxNXYxNVoiIGZpbGw9IiNCQ0Q3RUEiIGZpbGwtb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNNDMgNjRoMjBtMC0uNVY3MmgxNXYtOG0tMzUtLjVWNzJIMjh2LTgiIHN0cm9rZT0iI0M4QkU5QiIvPjwvc3ZnPg==","./lib/faceItem/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTc4IDcySDYzVjU3aDE1djE1Wm0tMzUgMEgyOFY1N2gxNXYxNVoiIGZpbGw9IiMwQzBDMEMiLz48cGF0aCBkPSJNNDMgNjRoMjAiIHN0cm9rZT0iIzAwMCIvPjwvc3ZnPg==","./lib/hair/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjRjhGOEY4Ii8+PC9zdmc+","./lib/hair/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjMjgyODI4Ii8+PC9zdmc+","./lib/hair/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjQTQyNDI0Ii8+PC9zdmc+","./lib/hair/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjQzQ3MzI4Ii8+PC9zdmc+","./lib/hair/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjRDVFRjM4Ii8+PC9zdmc+","./lib/hair/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjMzI5MjNCIi8+PC9zdmc+","./lib/hair/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjM0RBQUIxIi8+PC9zdmc+","./lib/hair/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjNDYyOTlCIi8+PC9zdmc+","./lib/hair/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjNzQ1MzM2Ii8+PC9zdmc+","./lib/hair/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTIzIDU3aC01djIwaC01djEwaDE1di01aC01VjU3Wm03MCAwaC01djI1SDc4djVoNXY1aDV2LTVoMTBWNzdoLTVWNTdaIiBmaWxsPSIjRTNDRTk2Ii8+PC9zdmc+","./lib/hat/bunny.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTMyIDM3VjIyaC01djI1aC01djEwSDdWMzdoNVYyMmg1VjEyaDVWN2gxMHY1aDEwdjVoNXYyMEgzMloiIGZpbGw9IiNFN0U3RTciLz48cGF0aCBkPSJNMjIgMnY1aDIwdjEwaDEwdjIwSDMyVjIyaDV2LTVoLTV2NWgtNXYzNUg3djVoMTVWNDdoMTB2LTVoMTVWMTJIMzJWMkgyMloiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMTcgN2g1djVIMTJ2MjVIN3YyMEgyVjM3aDVWMjJoMTBWN1oiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMzcgMjd2LTVoLTV2MTVoMTBWMjdoLTVaIiBmaWxsPSIjRDhBQUFBIi8+PHBhdGggZD0iTTc4IDM3VjIyaDV2MjVoNXYxMGgxNVYzN2gtNVYyMmgtNVYxMmgtNVY3SDc4djVINjh2NWgtNXYyMGgxNVoiIGZpbGw9IiNFN0U3RTciLz48cGF0aCBkPSJNODggMnY1SDY4djEwSDU4djIwaDIwVjIyaC01di01aDV2NWg1djM1aDIwdjVIODhWNDdINzh2LTVINjNWMTJoMTVWMmgxMFoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNOTMgN2gtNXY1aDEwdjI1aDV2MjBoNVYzN2gtNVYyMkg5M1Y3WiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik03MyAyN3YtNWg1djE1SDY4VjI3aDVaIiBmaWxsPSIjRDhBQUFBIi8+PHBhdGggZD0iTTE3IDQ3aDVWMjJoNXYyNWgtNXYxMGgtNVY0N1ptMjAtMjBWMTJoNXY1aDV2MjBoLTVWMjdoLTVabTM2IDBWMTJoLTV2NWgtNXYyMGg1VjI3aDVabTIwIDEwVjIyaDV2MTVoNXYyMGgtNVYzN2gtNVoiIGZpbGw9IiNENUQ1RDUiLz48cGF0aCBkPSJNMTIgMzd2MjBIN1YzN2g1VjIyaDV2MTVoLTVabTEwLTI1aC01djVoNXYtNVptNjEgMTBoNXYyNWg1djEwaC01VjQ3aC01VjIyWiIgZmlsbD0iI0VCRUJFQiIvPjwvc3ZnPg==","./lib/hat/coffee.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTExIDExMGgxM3YxNEgxMXYtMTRabTEzIDJoMnYyaC0ydi0yWm0yIDJoMnY2aC0ydi02Wm0tMiA2aDJ2MmgtMnYtMloiIGZpbGw9IiNFOUU0RDgiLz48cGF0aCBkPSJNMjIgMTA1aDF2MWgtMXYtMVptMS0yaDF2MmgtMXYtMlptLTEtMWgxdjFoLTF2LTFabTEtMWgxdjFoLTF2LTFaIiBmaWxsPSIjQzRDNEM0Ii8+PHBhdGggZD0iTTIyIDEwM2gxdjJoLTF2LTJabTIgMGgxdjJoLTF2LTJabS0zIDJoMXYxaC0xdi0xWm0yIDBoMXYxaC0xdi0xWm0tMSAxaDF2MWgtMXYtMVptLTEtNGgxdjFoLTF2LTFabTIgMGgxdjFoLTF2LTFabS0xLTFoMXYxaC0xdi0xWm0yIDBoMXYxaC0xdi0xWm0tMS0xaDF2MWgtMXYtMVoiIGZpbGw9IiM1OTU5NTkiLz48cGF0aCBkPSJNMTcgMTAzaDF2MWgtMXYtMVptMS0yaDF2MmgtMXYtMlptLTEtMWgxdjFoLTF2LTFabTEtMWgxdjFoLTF2LTFaIiBmaWxsPSIjQzRDNEM0Ii8+PHBhdGggZD0iTTE3IDEwMWgxdjJoLTF2LTJabTIgMGgxdjJoLTF2LTJabS0zIDJoMXYxaC0xdi0xWm0yIDBoMXYxaC0xdi0xWm0tMSAxaDF2MWgtMXYtMVptLTEtNGgxdjFoLTF2LTFabTIgMGgxdjFoLTF2LTFabS0xLTFoMXYxaC0xdi0xWm0yIDBoMXYxaC0xdi0xWm0tMS0xaDF2MWgtMXYtMVoiIGZpbGw9IiM1OTU5NTkiLz48cGF0aCBkPSJNMTIgMTA1aDF2MWgtMXYtMVptMS0yaDF2MmgtMXYtMlptLTEtMWgxdjFoLTF2LTFabTEtMWgxdjFoLTF2LTFaIiBmaWxsPSIjQzRDNEM0Ii8+PHBhdGggZD0iTTEyIDEwM2gxdjJoLTF2LTJabTIgMGgxdjJoLTF2LTJabS0zIDJoMXYxaC0xdi0xWm0yIDBoMXYxaC0xdi0xWm0tMSAxaDF2MWgtMXYtMVptLTEtNGgxdjFoLTF2LTFabTIgMGgxdjFoLTF2LTFabS0xLTFoMXYxaC0xdi0xWm0yIDBoMXYxaC0xdi0xWm0tMS0xaDF2MWgtMXYtMVoiIGZpbGw9IiM1OTU5NTkiLz48cGF0aCBkPSJNMTEgMTE3aDJ2MmgtMnYtMlptMi0yaDJ2MmgtMnYtMlptMiAyaDJ2MmgtMnYtMlptMi0yaDJ2MmgtMnYtMlptMiAyaDJ2MmgtMnYtMlptMi0yaDJ2MmgtMnYtMlptMiAyaDF2MmgtMXYtMloiIGZpbGw9IiNBNzhENEEiLz48cGF0aCBkPSJNMTEgMTEwSDl2MTMuOTJsMiAuMDh2MmgxM3YtMmgydi0yaDJ2LTJoMnYtNmgtMnYtMmgtMnYtMmgtMnYtMkgxMXYyWm0wIDBoMTN2MmgydjJoMnY2aC0ydjJoLTJ2MkgxMXYtMTRaIiBmaWxsPSIjMzUyNDAzIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0yNSAxMTR2NiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNTYgNzdoMXY0aC0xdi00Wm0tMiAwaDF2MmgtMXYtMloiIGZpbGw9IiM2NTQxMEIiLz48L3N2Zz4=","./lib/hat/construction.svg":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEzIiBoZWlnaHQ9IjE0MiIgdmlld0JveD0iMCAwIDExMyAxNDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MyA2MlY1N0g4VjQ3SDE4VjI3SDIzVjE3SDI4VjEySDQzVjdINTBWMTJINTNINTZWN0g2M1YxMkg4M1YxN0g4OFYyN0g5M1Y0N0gxMDNWNTdINjNWNjJINDNaIiBmaWxsPSIjRThCQTQ2Ii8+CjxwYXRoIGQ9Ik01MCAyMlYxMkg1NlYyMkg1MFoiIGZpbGw9IiNEODkyMEIiLz4KPHBhdGggZD0iTTYzIDI3VjEySDY4VjI3SDYzWiIgZmlsbD0iI0Q4OTIwQiIvPgo8cGF0aCBkPSJNNDMgMjdWMTJIMzhWMjdINDNaIiBmaWxsPSIjRDg5MjBCIi8+CjxwYXRoIGQ9Ik0xMyA1MlY0N0g0M1Y1Mkg2M1Y0N0g4OFYyN0g4M1YxN0g3OFYxMkg4M1YxN0g4OFYyN0g5M1Y0N0g5OFY1Mkg2M1Y1N0g0M1Y1MkgxM1oiIGZpbGw9IiNEODkyMEIiLz4KPHBhdGggZD0iTTggNDdIMTNWMjdIMThWMTdIMjNWMTJIMjhWN0g0M1YySDUwVjdINTZWMkg2M1Y3SDgzVjEySDg4VjE3SDkzVjI3SDk4VjQ3SDEwM1Y1N0g2M1Y1Mkg5OFY0N0g5M1YyN0g4OFYxN0g4M1YxMkg2M1Y3SDU2VjEySDUwVjdINDNWMTJIMjhWMTdIMjNWMjdIMThWNDdIMTNWNTJINDNWNTdIOFY0N1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik00MyA2MlY1N0g2M1Y2Mkg0M1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yMyA0N0gxOFYyN0gyM1YxN0gyOFYxMkgzOFYxN0gyOFYyN0gyM1Y0N1oiIGZpbGw9IiNGM0NDNjUiLz4KPHBhdGggZD0iTTU2IDI5SDUwVjMxSDQ3VjM0SDQ1VjQwSDQ3VjQzSDUwVjQ1SDU2VjQzSDU5VjQwSDYxVjM0SDU5VjMxSDU2VjI5WiIgZmlsbD0iI0ZERkJGNCIvPgo8cGF0aCBkPSJNNTAgMzRWMzdNNTAgNDBWMzdNNTAgMzdINTZWMzRWNDAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K","./lib/hat/cowboy.svg":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEzIiBoZWlnaHQ9IjE0MiIgdmlld0JveD0iMCAwIDExMyAxNDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik04IDM3SDEzVjQ3SDE4VjI3SDIzVjQ3SDI4VjUySDc4VjQ3SDg4VjI3SDkzVjQ3SDk4VjM3SDEwM1Y1N0g4VjM3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTg4IDI3SDgzVjE3SDc4VjdINjhWMTJINjNWMTdINDhWMTJINDNWN0gzM1YxN0gyOFYyN0gyM1YxN0gyOFY3SDMzVjNINDNWN0g0OFYxMkg2M1Y3SDY4VjJINzhWN0g4M1YxN0g4OFYyN1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yMyA0Ny4wMzg3VjI3SDI4VjE3SDMzVjdINDNWMTJINDhWMTdINjNWMTJINjhWN0g3OFYxN0g4M1YyN0g4OFY0N0g3OFY1MkgyOFY0Ny4wMzg3SDIzWiIgZmlsbD0iIzREMkQxQyIvPgo8cGF0aCBkPSJNNjIuOTk5OSAyN1YxN0g0OFYxMkg0M1YyN0g0NlYzMkg1OS45OTk5VjI3SDYyLjk5OTlaIiBmaWxsPSIjMzMxQjBFIi8+CjxwYXRoIGQ9Ik02MyA0N0g3OFY0Mkg4M1YyN0g3OFYxN0g4M1YyN0g4OFY0N0g3OFY1Mkg2M1Y0N1oiIGZpbGw9IiMzMzFCMEUiLz4KPHBhdGggZD0iTTI4IDQ3SDIzVjI3SDI4VjE3SDMzVjdIMzhWMTdIMzNWMjdIMjhWNDdaIiBmaWxsPSIjNzY1MjNGIi8+CjxwYXRoIGQ9Ik02OCAxMlYyN0g2M1YzMkg2MFYyN0g2M1YxMkg2OFY3SDczVjEySDY4WiIgZmlsbD0iIzc2NTIzRiIvPgo8L3N2Zz4K","./lib/hat/edit.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDYydi01SDhWNDdoMTBWMjdoNVYxN2g1di01aDE1VjdoN3Y1aDZWN2g3djVoMjB2NWg1djEwaDV2MjBoMTB2MTBINjN2NUg0M1oiIGZpbGw9IiNENUQ1RDUiLz48cGF0aCBkPSJNNTAgMjJWMTJoNnYxMGgtNlptMTMgNVYxMmg1djE1aC01Wm0tMjAgMFYxMmgtNXYxNWg1WiIgZmlsbD0iI0E1QTVBNSIvPjxwYXRoIGQ9Ik0xMyA1MnYtNWgzMHY1aDIwdi01aDI1VjI3aC01VjE3aC01di01aDV2NWg1djEwaDV2MjBoNXY1SDYzdjVINDN2LTVIMTNaIiBmaWxsPSIjQTVBNUE1Ii8+PHBhdGggZD0iTTggNDdoNVYyN2g1VjE3aDV2LTVoNVY3aDE1VjJoN3Y1aDZWMmg3djVoMjB2NWg1djVoNXYxMGg1djIwaDV2MTBINjN2LTVoMzV2LTVoLTVWMjdoLTVWMTdoLTV2LTVINjNWN2gtN3Y1aC02VjdoLTd2NUgyOHY1aC01djEwaC01djIwaC01djVoMzB2NUg4VjQ3Wm0zNSAxNXYtNWgyMHY1SDQzWiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yMyA0N2gtNVYyN2g1VjE3aDV2LTVoMTB2NUgyOHYxMGgtNXYyMFoiIGZpbGw9IiNFREVERUQiLz48cGF0aCBkPSJNNTAgMjYuNWgtLjV2MWgtM1YyOUg0NXYxLjVoLTEuNXYzaC0xdjdoMXYzSDQ1VjQ1aDEuNXYxLjVoM3YxaDd2LTFoM1Y0NUg2MXYtMS41aDEuNXYtM2gxdi03aC0xdi0zSDYxVjI5aC0xLjV2LTEuNWgtM3YtMUg1MFoiIGZpbGw9IiNGREZCRjQiIHN0cm9rZT0iIzk4OTg5OCIvPjxwYXRoIGQ9Im01OS42NDcgMzIuMzAzLTIuMTUzLTIuMDktOS4wNTIgOS4zMzEgMS4wNzYgMS4wNDUgMS4wNzcgMS4wNDQgOS4wNTItOS4zM1oiIGZpbGw9IiNEMEI0NEYiIHN0cm9rZT0iI0M1QTg0MyIvPjxwYXRoIGQ9Im00OC4xMDQgNDAuNjEtLjY3NSAyLjEzMiAyLjExLS43NC0xLjQzNS0xLjM5MloiIGZpbGw9IiMwMDAiIHN0cm9rZT0iIzAwMCIvPjxwYXRoIGQ9Im01Ni40NSAzMS4yOSAxLjA0NC0xLjA3NiAyLjE1MyAyLjA4OS0xLjA0NCAxLjA3Ni0yLjE1NC0yLjA4OVoiIHN0cm9rZT0iI0RFOTg5OCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3N2Zz4=","./lib/hat/education.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTE4IDI3aDV2LTFIOHYtNWgxMHYtNWgxMHYtNWgxNVY2aDI1djVoMTV2NWgxMHY1aDEwdjVIODh2MWg1djIwSDY4djYuNWgtNVY1N2gtNXYzSDQ4di0zaC01di01aC01di01SDE4VjI3WiIgZmlsbD0iIzJGMkQ5NyIvPjxwYXRoIGQ9Ik0zMyAyNkg4di01aDEwdi01aDEwdi01aDE1VjZoMjV2NWgxNXY1aDEwdjVoMTB2NUg3OHYtNUg2M3YtNUg0OHY1SDMzdjVaIiBmaWxsPSIjMUIxQTc0Ii8+PHBhdGggZD0iTTM4IDU3di01aDV2NWg1djNoMTB2LTNoNXYtMy41aDVWNDdoMjVWMjdoLTV2LTFoMTV2LTVIOTN2LTVIODN2LTVINjhWNkg0M3Y1SDI4djVIMTh2NUg4djVoMTV2MWgtNXYyMGgtNVYzMUg4di01SDN2LTVoNXYtNWgxMHYtNWgxMFY2aDE1VjFoMjV2NWgxNXY1aDEwdjVoMTB2NWg1djVoLTV2NWgtNXYxNmgtNXY2LjVINjhWNTdoLTV2M2gtNXY1SDQ4di01aC01di0zaC01WiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0zOCA1MnYtNUgxOHY1aDIwWiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik03NC41IDMxLjVWMjRoNHY3LjVoLTRaIiBmaWxsPSIjRDdEM0QzIi8+PHBhdGggZD0iTTc5IDE5aC01djVoNXYtNVoiIGZpbGw9IiNFOEUzRTMiLz48cGF0aCBkPSJNNzQuMjUgMjR2OG0xLjUtOHY5bTEuNS05djltMS41LTl2OCIgc3Ryb2tlPSIjRThFM0UzIi8+PHBhdGggZD0iTTc0IDI0aDVtLTMuNS01aDIiIHN0cm9rZT0iI0RCQjgzQiIvPjxwYXRoIGQ9Ik03Mi41IDUuNVY4aDF2MmgxdjIuNWgxdjRoMVYxOSIgc3Ryb2tlPSIjNjY1RjQ3Ii8+PC9zdmc+","./lib/hat/error.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDYydi01SDhWNDdoMTBWMjdoNVYxN2g1di01aDE1VjdoN3Y1aDZWN2g3djVoMjB2NWg1djEwaDV2MjBoMTB2MTBINjN2NUg0M1oiIGZpbGw9IiNCRDM0MkIiLz48cGF0aCBkPSJNNTAgMjJWMTJoNnYxMGgtNlptMTMgNVYxMmg1djE1aC01Wm0tMjAgMFYxMmgtNXYxNWg1WiIgZmlsbD0iI0EwMTgwRiIvPjxwYXRoIGQ9Ik0xMyA1MnYtNWgzMHY1aDIwdi01aDI1VjI3aC01VjE3aC01di01aDV2NWg1djEwaDV2MjBoNXY1SDYzdjVINDN2LTVIMTNaIiBmaWxsPSIjQTAxODBGIi8+PHBhdGggZD0iTTggNDdoNVYyN2g1VjE3aDV2LTVoNVY3aDE1VjJoN3Y1aDZWMmg3djVoMjB2NWg1djVoNXYxMGg1djIwaDV2MTBINjN2LTVoMzV2LTVoLTVWMjdoLTVWMTdoLTV2LTVINjNWN2gtN3Y1aC02VjdoLTd2NUgyOHY1aC01djEwaC01djIwaC01djVoMzB2NUg4VjQ3Wm0zNSAxNXYtNWgyMHY1SDQzWiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yMyA0N2gtNVYyN2g1VjE3aDV2LTVoMTB2NUgyOHYxMGgtNXYyMFoiIGZpbGw9IiNFQTcyNkEiLz48cGF0aCBkPSJNNTYgMjloLTZ2MmgtM3YzaC0ydjZoMnYzaDN2Mmg2di0yaDN2LTNoMnYtNmgtMnYtM2gtM3YtMloiIGZpbGw9IiNGREZCRjQiLz48cGF0aCBkPSJNNTEuNSAzOS41aDN2M2gtM3YtM1ptMC03LjVoM3Y2LjVoLTNWMzJaIiBmaWxsPSIjMDAwIi8+PC9zdmc+","./lib/hat/good.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDYydi01SDhWNDdoMTBWMjdoNVYxN2g1di01aDE1VjdoN3Y1aDZWN2g3djVoMjB2NWg1djEwaDV2MjBoMTB2MTBINjN2NUg0M1oiIGZpbGw9IiMyRUJEMkIiLz48cGF0aCBkPSJNNTAgMjJWMTJoNnYxMGgtNlptMTMgNVYxMmg1djE1aC01Wm0tMjAgMFYxMmgtNXYxNWg1WiIgZmlsbD0iIzBGQTAxNSIvPjxwYXRoIGQ9Ik0xMyA1MnYtNWgzMHY1aDIwdi01aDI1VjI3aC01VjE3aC01di01aDV2NWg1djEwaDV2MjBoNXY1SDYzdjVINDN2LTVIMTNaIiBmaWxsPSIjMEZBMDE1Ii8+PHBhdGggZD0iTTggNDdoNVYyN2g1VjE3aDV2LTVoNVY3aDE1VjJoN3Y1aDZWMmg3djVoMjB2NWg1djVoNXYxMGg1djIwaDV2MTBINjN2LTVoMzV2LTVoLTVWMjdoLTVWMTdoLTV2LTVINjNWN2gtN3Y1aC02VjdoLTd2NUgyOHY1aC01djEwaC01djIwaC01djVoMzB2NUg4VjQ3Wm0zNSAxNXYtNWgyMHY1SDQzWiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yMyA0N2gtNVYyN2g1VjE3aDV2LTVoMTB2NUgyOHYxMGgtNXYyMFoiIGZpbGw9IiM2REVBNkEiLz48cGF0aCBkPSJNNTAgMjYuNWgtLjV2MWgtM1YyOUg0NXYxLjVoLTEuNXYzaC0xdjdoMXYzSDQ1VjQ1aDEuNXYxLjVoM3YxaDd2LTFoM1Y0NUg2MXYtMS41aDEuNXYtM2gxdi03aC0xdi0zSDYxVjI5aC0xLjV2LTEuNWgtM3YtMUg1MFoiIGZpbGw9IiNGREZCRjQiIHN0cm9rZT0iIzk4OTg5OCIvPjxwYXRoIGQ9Im01OSAzMi03LjYxNSA5TDQ4IDM3LjcyNyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=","./lib/hat/knight.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTEzIDYyVjQyaDVWMzJoNVYyMmg1di01aDU1djVoNXYxMGg1djEwaDV2MjBoLTV2MTBoLTV2NUg3OHY1SDYzdjVINDN2LTVIMjh2LTVIMThWNjJoLTVaIiBmaWxsPSIjNTU1NzY2Ii8+PHBhdGggZD0iTTggNDJ2MjBoNXYxNWg1djVoMTB2NWgxNXY1aDIwdi01aDE1di01aDEwdi01aDV2LTVoNVY2Mmg1VjQyaC01VjMyaC01VjIyaC01di01aC01di01SDI4djVoLTV2NWgtNXYxMGgtNXYxMEg4Wm01IDB2MjBoNXYxNWgxMHY1aDE1djVoMjB2LTVoMTV2LTVoMTB2LTVoNVY2Mmg1VjQyaC01VjMyaC01VjIyaC01di01SDI4djVoLTV2MTBoLTV2MTBoLTVaIiBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGQ9Ik0xMyA0N3YtNWgxNXYtNWg1MHY1aDIwdjVINzh2LTVIMjh2NUgxM1ptMzAtMzBoMjB2NUg0M3oiIGZpbGw9IiM3MTc0ODkiLz48cGF0aCBkPSJNMTggNDd2MTVoLTVWNDdoNVptMTAgMzBIMThWNjdoNXY1aDV2NWgxNXY1aDIwdi01aDE1di01aDEwVjU3aDVWNDdoNXYxNWgtNXYxMGgtNXY1SDc4djVINjN2NUg0M3YtNUgyOHYtNVptNjAtNDB2LTVoNXY1aC01Wm0tNS0xNWg1djVoLTV2LTVINzN2LTVoMTB2NVpNMjMgMzJoLTV2NWg1di01Wm0wLTV2LTVoNXY1aC01WiIgZmlsbD0iIzNFNDE1OSIvPjxwYXRoIGQ9Ik00MS41IDQyaDV2MjVoLTVWNDJabS05IDBoNXYyMGgtNVY0MlptMjcgMGg1djI1aC01VjQyWm05IDBoNXYyMGgtNVY0MlptLTE4IDBoNXYzMGgtNVY0MloiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNDMgMjJWNGgyLjVWMi41SDQ4VjFoMTB2MS41aDIuNVY0SDYzdjE4aC01djVINDh2LTVoLTVaIiBmaWxsPSIjQUY0NDQ0Ii8+PHBhdGggZD0iTTQzIDI3di01aDV2NWgxMHYtNWg1di01aDV2MTBoLTV2NUg0OHYtNWgtNVoiIGZpbGw9IiMzRTQxNTkiLz48cGF0aCBkPSJNNDUuNSAyLjVINDhWMWgxMHYxLjVoMi41VjRINjN2MThoLTVWMUg0OHYyMWgtNVY0aDIuNVYyLjVaIiBmaWxsPSIjOEUyQjJCIi8+PHBhdGggZD0iTTQ5LjUgMjd2LTdtMyA3VjE2LjVtMyAxMC41di00bTIgNFYxNC41TTQ5IDF2MTMuNU01MiAxdjkuNU01NC41IDF2MTQuNU01NyAxdjciIHN0cm9rZT0iI0E1MzYzNiIvPjxwYXRoIGQ9Ik01OC41IDIuNVYyMm0tMTEtMTkuNVYyMm0tMiAwdi03TTQ0IDR2OW0xNy05djEwbS0xIDh2LTUiIHN0cm9rZT0iIzcwMTYxNiIvPjxwYXRoIGQ9Ik01MC41IDkuNVYyMG0xLjUtNC41VjEybTIgNHY3bTEuNS0ydi00bS41LTcuNVYxNCIgc3Ryb2tlPSIjQzc1NjU2Ii8+PC9zdmc+","./lib/hat/ninja.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTEzIDQydjIwaDV2MTVoMTB2NWgxNXY1aDIwdi01aDE1di01aDEwdi01aDVWNjJoNVY0MmgtNVYzMmgtNVYyMmgtNXYtNUgyOHY1aC01djEwaC01djEwaC01Wm0xNyAxOC41aDEuNVY1OWg0M3YxLjVINzZ2OGgtMS41VjcwaC00M3YtMS41SDMwdi04WiIgZmlsbD0iIzJDMkMyQyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNOCA0MnYyMGg1djE1aDV2NWgxMHY1aDE1djVoMjB2LTVoMTV2LTVoMTB2LTVoNXYtNWg1VjYyaDVWNDJoLTVWMzJoLTVWMjJoLTV2LTVoLTV2LTVIMjh2NWgtNXY1aC01djEwaC01djEwSDhabTUgMHYyMGg1djE1aDEwdjVoMTV2NWgyMHYtNWgxNXYtNWgxMHYtNWg1VjYyaDVWNDJoLTVWMzJoLTVWMjJoLTV2LTVIMjh2NWgtNXYxMGgtNXYxMGgtNVoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTE4IDQ3djE1aC01VjQ3aDVabTEwIDMwSDE4VjY3aDV2NWg1djVoMTV2NWgyMHYtNWgxNXYtNWgxMFY1N2g1VjQ3aC01VjM3aC01VjI3aC01di01SDYzdi01aDIwdjVoNXYxMGg1djE1aDV2MTVoLTV2MTBoLTV2NUg3OHY1SDYzdjVINDN2LTVIMjh2LTVabS01LTQ1aC01djVoNXYtNVptMC01di01aDV2NWgtNVoiIGZpbGw9IiMxQjFCMUMiLz48cGF0aCBkPSJNMjMgNDJoLTVWMzJoNVYyMmg1di01aDE1djVIMzN2NWgtNXY1aC01djEwWk0xMyA2MlY1Mmg1djEwaDV2MTVoLTVWNjJoLTVaIiBmaWxsPSIjNTI1MjUyIi8+PHBhdGggZD0iTTEzIDUyVjQyaDg1djEwSDEzWm04OC41IDIyaDEuNXYtMWgxdi02aC0xdi01aC01djhoMXY2aDF2LTFoMS41di0xWm0tNSAxNEg5OHYtMWgxdi02aC0xdi05aC01djEyaDF2Nmgxdi0xaDEuNXYtMVoiIGZpbGw9IiNBNDAwMDAiLz48cGF0aCBkPSJNOTkgODRoLTV2Nmgxdi0xaDEuNXYtMUg5OHYtMWgxdi0zWm0tMS0ydi0xaDF2MWgtMVptNS0xNHYtMWgxdjFoLTFabS00IDJ2Nmgxdi0xaDEuNXYtMWgxLjV2LTFoMXYtM2gtNVptLTQgN2gtMnYtNWg1djJoLTJ2MWgtMXYyWm04LTEzdi0yaC01djVoMnYtMmgxdi0xaDJabS01LTIySDc1djJoMTh2NGgtNnYyaC00djJoMTVWNDJaIiBmaWxsPSIjODYwQjBCIi8+PHBhdGggZD0iTTEzIDUyVjQyaDV2Nmg1djJoMTB2MkgxM1oiIGZpbGw9IiNBNzJEMkQiLz48cGF0aCBkPSJNOTIgNzd2OGgxdjZoMXYxaDF2LTFoMXYtMWgxLjV2LTFIOTl2LTFoMXYtOGgtMXYtM2gydi0xaDEuNXYtMWgxLjV2LTFoMXYtOGgtMXYtNWgtMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNOTguNSA3MHY2IiBzdHJva2U9IiMwMDAiLz48L3N2Zz4=","./lib/hat/none.svg":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEzIiBoZWlnaHQ9IjE0MiIgdmlld0JveD0iMCAwIDExMyAxNDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cjwvc3ZnPgo=","./lib/hat/party.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTk0IDMydjVoLTh2LTJoLTV2LTNoLTN2LTIuNWgtMi41VjI3SDczdi0zaC0zdi01aC0ydi04aDVWOWgxMFY3aDE1djE1aC0ydjEwaC0yWiIgZmlsbD0iIzVEQjlFQyIvPjxwYXRoIGQ9Ik03MyA5djIuNU04MyA5VjciIHN0cm9rZT0iIzNDNERBNSIvPjxwYXRoIGQ9Ik03Mi41IDExdjRoMXYzaDF2Mi41aDF2Mkg3N3YyaDEuNVYyNkg4MHYxLjVoMS41VjI5aDJ2MS41aDN2MUg4OXYxaDMuNXYxSDk0TTgyLjUgOXYyaDF2Mi41aDF2MmgxVjE3SDg3djJoMnYxLjVoMnYxaDJ2MWgydjFoMS41TTkyLjUgN3YxaDF2Mkg5NXYyaDJ2MS41aDEiIHN0cm9rZT0iIzNDNERBNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTY2IDExaDJWOWg1VjdoMTBWNWgxNXYyaDJ2MTVoLTJ2MTBoLTJ2NWgtMnYyaC04di0yaC01di0yaC0zdi0zaC0yLjV2LTIuNUg3M1YyN2gtM3YtM2gzdjNoMi41djIuNUg3OFYzMmgzdjNoNXYyaDh2LTVoMlYyMmgyVjdIODN2Mkg3M3YyaC01djhoLTJ2LThaIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTcwIDE5aC0ydjVoMnYtNVoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNODMgMzN2LTMuNWgtNVYzMmgzdjNoNXYyaDh2LTVoMlYyMmgyVjloLTN2MTBoLTJ2MTBoLTJ2NGgtOFoiIGZpbGw9IiMzNjEzNTEiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpzb2Z0LWxpZ2h0Ii8+PHBhdGggZD0iTTc2IDExdjJoLTZ2NWgydjVoMXYxaC0zdi01aC0ydi04aDVWOWgxMFY3aDE1djJIODZ2Mkg3NloiIGZpbGw9IiNGRUIzNUMiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpsdW1pbm9zaXR5Ii8+PC9zdmc+","./lib/hat/pirate.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDQ3aC01VjI3aDVWMTdoNy41di01aDM1djVIODN2MTBoNXYyMEg3OHY1SDI4di01WiIgZmlsbD0iIzM4MzgzOCIvPjxwYXRoIGQ9Ik0yOCA1MnYtNWg1MHY1SDI4WiIgZmlsbD0iIzg5MDAwMCIvPjxwYXRoIGQ9Ik0zNS41IDI3SDMydjQuMTJoLTRWNDdoLTVWMjdoNVYxN2g3LjV2LTVoMTB2NWgtNnY0aC00djZaIiBmaWxsPSIjNEY0RjRGIi8+PHBhdGggZD0iTTYzIDUydi01aDEwdi01aDVWMjdoLTcuNXYtNWgtMjBWMTJoMjB2NUg4M3YxMGg1djIwSDc4djVINjNaIiBmaWxsPSIjMjYyNTI2Ii8+PHBhdGggZD0iTTIzIDQ3VjI3aDVWMTdoNy41di01aDEwdjEwaDV2NWg1di01aDVWMTJoMTB2NUg4M3YxMGg1djIwaC0yVjI5aC0zdi0yaC0ydi04SDcwLjV2LTJoLTJ2LTNoLTZ2OGgtMnYyaC0zdjNoLTJ2MmgtNXYtMmgtMnYtM2gtM3YtMmgtMnYtOGgtNnYzaC0ydjJIMzB2OGgtMnYyaC0zdjE4aC0yWiIgZmlsbD0iI0I2OUIxMSIvPjxwYXRoIGQ9Ik02MyA1MmgxNXYtNUg2M3Y1WiIgZmlsbD0iIzY4MDUwNSIvPjxwYXRoIGQ9Ik02Mi41IDIyaC0yVjEyaDEwdjVIODN2MTBoNXYyMGgtMlYyOWgtM3YtMmgtMnYtOEg3MC41di0yaC0ydi0zaC02djhaIiBmaWxsPSIjOTg3MjBGIi8+PHBhdGggZD0iTTI1IDI5djE4aC0yVjI3aDVWMTdoNy41di01aDEwdjVoLTJ2LTNoLTZ2M2gtMnYySDMwdjhoLTJ2MmgtM1oiIGZpbGw9IiNFMEMzMkUiLz48cGF0aCBkPSJNOCA1MnY1aDk1di01aDVWNDJIOTh2NWgtNVYyN2gtNVYxN2gtNXYtNUg3MC41VjdoLTE1djE1aC01VjdoLTE1djVIMjh2NWgtNXYxMGgtNXYyMGgtNXYtNUgzdjEwaDVabTE1LTI1djIwaDV2NWg1MHYtNWgxMFYyN2gtNVYxN0g3MC41di01aC0xMHYxMGgtNXY1aC01di01aC01VjEyaC0xMHY1SDI4djEwaC01WiIgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBkPSJNNDUuNSAzMy41di0zaC0zdjNoNnYtM2g5djNoNnYtM2gtM3Y5aC0zdi0zaC0zdjNoM3Y2aDN2LTNoLTZ2M2gtM3YtM2gtNnYzaDN2LTZoM3YtM2gtM3YzaC0zdi02WiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik02MC41IDM5Ljc1aC4yNXYtNmgzdi0zLjVoLTMuNXYzaC0yLjV2LTNoLTkuNXYzaC0yLjV2LTNoLTMuNXYzLjVoM3Y2aDN2Mi41aC0zdjMuNWgzLjV2LTNoMi41djNoMy41di0zaDIuNXYzaDMuNXYtMy41aC0zdi0yLjVoMi43NVptLTMuMjUtM3YyLjVoLTIuNXYtMi41aDIuNVptLTguNSAyLjV2LTIuNWgyLjV2Mi41aC0yLjVaIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIuMTUiIHN0cm9rZS13aWR0aD0iLjUiLz48L3N2Zz4=","./lib/hat/warning.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQzIDYydi01SDhWNDdoMTBWMjdoNVYxN2g1di01aDE1VjdoN3Y1aDZWN2g3djVoMjB2NWg1djEwaDV2MjBoMTB2MTBINjN2NUg0M1oiIGZpbGw9IiNEOEQwMEUiLz48cGF0aCBkPSJNNTAgMjJWMTJoNnYxMGgtNlptMTMgNVYxMmg1djE1aC01Wm0tMjAgMFYxMmgtNXYxNWg1WiIgZmlsbD0iI0FFOUYxNyIvPjxwYXRoIGQ9Ik0xMyA1MnYtNWgzMHY1aDIwdi01aDI1VjI3aC01VjE3aC01di01aDV2NWg1djEwaDV2MjBoNXY1SDYzdjVINDN2LTVIMTNaIiBmaWxsPSIjQUU5RjE3Ii8+PHBhdGggZD0iTTggNDdoNVYyN2g1VjE3aDV2LTVoNVY3aDE1VjJoN3Y1aDZWMmg3djVoMjB2NWg1djVoNXYxMGg1djIwaDV2MTBINjN2LTVoMzV2LTVoLTVWMjdoLTVWMTdoLTV2LTVINjNWN2gtN3Y1aC02VjdoLTd2NUgyOHY1aC01djEwaC01djIwaC01djVoMzB2NUg4VjQ3Wm0zNSAxNXYtNWgyMHY1SDQzWiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yMyA0N2gtNVYyN2g1VjE3aDV2LTVoMTB2NUgyOHYxMGgtNXYyMFoiIGZpbGw9IiNFN0VBNkEiLz48cGF0aCBkPSJNNTAgMjYuNWgtLjV2MWgtM1YyOUg0NXYxLjVoLTEuNXYzaC0xdjdoMXYzSDQ1VjQ1aDEuNXYxLjVoM3YxaDd2LTFoM1Y0NUg2MXYtMS41aDEuNXYtM2gxdi03aC0xdi0zSDYxVjI5aC0xLjV2LTEuNWgtM3YtMUg1MFoiIGZpbGw9IiNGREZCRjQiIHN0cm9rZT0iIzk4OTg5OCIvPjxwYXRoIGQ9Ik01My43NSAzNy45MjloLTEuNVYzOS41aDEuNXYtMS41NzFabTAtMy45MjloLTEuNXYzLjQwNWgxLjVWMzRaIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTQ2LjUgNDEgNTMgMzBsNi41IDExaC0xM1oiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+","./lib/hat/watermelon.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTEzIDMySDh2NDBoNXY1aDEwVjU3aDY1djIwaDEwdi01aDVWMzJoLTVWMjJoLTVWMTJIODNWN0g3M1YySDM4djVIMjh2NUgxOHYxMGgtNXYxMFptMCAwaDVWMjJoNXYtNWg1di01aDEwVjdoMzV2NWgxMHY1aDV2NWg1djEwaDV2NDBoLTVWNTdoLTV2LTVIMjN2NWgtNXYxNWgtNVYzMloiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTEzIDMyaDVWMjJoNXYtNWg1di01aDEwVjdoMzV2NWgxMHY1aDV2NWg1djEwaDV2NDBoLTVWNTdoLTV2LTVIMjN2NWgtNXYxNWgtNVYzMloiIGZpbGw9IiMyRkFGNUIiLz48cGF0aCBkPSJNMTggNzJoLTVWMzJoNVYyMmg1di01aDV2LTVoNXY1aC01djE1aC01djI1aC01djE1WiIgZmlsbD0iIzEwODAzNyIvPjxwYXRoIGQ9Ik0xOCA3MmgtNVYzMmg1VjIyaDV2LTVoNXYtNWg1djVoLTV2MTVoLTV2MjVoLTV2MTVaIiBmaWxsPSIjMTA4MDM3Ii8+PHBhdGggZD0iTTE4IDcyaC01VjMyaDVWMjJoNXYtNWg1di01aDV2NWgtNXYxNWgtNXYyNWgtNXYxNVptNzUgMGg1VjMyaC01VjIyaC01di01aC01di01aC01djVoNXYxNWg1djI1aDV2MTVaIiBmaWxsPSIjMTA4MDM3Ii8+PHBhdGggZD0iTTkzIDcyaDVWMzJoLTVWMjJoLTV2LTVoLTV2LTVoLTV2NWg1djE1aDV2MjVoNXYxNVoiIGZpbGw9IiMxMDgwMzciLz48cGF0aCBkPSJNOTMgNzJoNVYzMmgtNVYyMmgtNXYtNWgtNXYtNWgtNXY1aDV2MTVoNXYyNWg1djE1Wk0zMyA1MmgxMFY0Mmg1VjEyaDVWN2gtNXY1aC01djEwaC01djE1aC01djE1WiIgZmlsbD0iIzEwODAzNyIvPjxwYXRoIGQ9Ik0zMyA1MmgxMFY0Mmg1VjEyaDVWN2gtNXY1aC01djEwaC01djE1aC01djE1WiIgZmlsbD0iIzEwODAzNyIvPjxwYXRoIGQ9Ik0zMyA1MmgxMFY0Mmg1VjEyaDVWN2gtNXY1aC01djEwaC01djE1aC01djE1Wm00NSAwVjM3aC01VjIyaC01VjEyaC01VjdoLTV2NWg1djMwaDV2MTBoMTBaIiBmaWxsPSIjMTA4MDM3Ii8+PHBhdGggZD0iTTc4IDUyVjM3aC01VjIyaC01VjEyaC01VjdoLTV2NWg1djMwaDV2MTBoMTBaIiBmaWxsPSIjMTA4MDM3Ii8+PHBhdGggZD0iTTc4IDUyVjM3aC01VjIyaC01VjEyaC01VjdoLTV2NWg1djMwaDV2MTBoMTBaIiBmaWxsPSIjMTA4MDM3Ii8+PHBhdGggZD0iTTczIDMyaDV2NWgtNXYtNVptMTUgOWgtNXY1aDV2LTVabS0zNS05di01aC01djVoNVptMCAxMGg1di01aC01djVaTTMzIDMydjVoNXYtNWgtNVptLTUgMTVoLTV2LTVoNXY1WiIgZmlsbD0iIzRDQzc3NiIvPjxwYXRoIGQ9Ik00MyA3djVoLTV2NWgtNXY1aC01djVoNXYtNWg1di01aDV2LTVoNXY1aDV2NWg1djVoNXYtNWgtNXYtNWg1di01aDV2NWg1djVoNXY1aDV2LTVoLTV2LTVoLTV2LTVoLTVWN2gtNXY1aC01VjdoLTV2NWgtNVY3aC01Wm0xMCA1aDV2NWgtNXYtNVoiIGZpbGw9IiM0Q0M3NzYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTQ4IDE3aC01djVoNXYtNVptLTE1LTV2NWgtNXY1aC01di01aDV2LTVoNVpNMTggMzJoNXYtNWgtNXY1Wm01MC0xNWgtNXY1aDV2LTVabTEwIDB2LTVoNXY1aDV2NWg1djVoLTV2NWg1djVoLTV2LTVoLTV2LTVoNXYtNWgtNXYtNWgtNVptMTUgMjl2LTVoNXY1aC01Wm0tNSAxMXYtNWg1djVoLTVaTTYzIDMydi01aDV2NWgtNVptNSAxMHYtNWg1djVoLTVaTTQzIDMyaC01di01aDV2NVptLTI1IDV2NWgtNXYtNWg1Wm0wIDE1aDV2NWgtNXYtNVptLTUgMTV2NWg1di01aC01Wm0yNS0yNWg1di01aC01djVabTAgNWgtNXY1aDV2LTVabTM1IDV2LTVoNXY1aC01Wk01MyAxMmgtNVY3aDV2NVoiIGZpbGw9IiMxMTY0MkUiLz48L3N2Zz4=","./lib/hatColor/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjOTc5Nzk3Ii8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM2NzY2NjgiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjRTQwMTAxIi8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM1QjMwN0QiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjMTM5MEVCIi8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM3MzYwODMiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjNDg0ODQ4Ii8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM2NzY2NjgiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjODlFREQ1Ii8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM2NzY2NjgiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjRTZFQjEzIi8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM3MzYwODMiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjOEMxM0VCIi8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM1ODMxNzciIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjMTNFQjFCIi8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM3MzYwODMiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjRTQ2MDAxIi8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM2OTNBOEUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/hatColor/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDE3aDV2NWgtNXYtNVptMCA1aDV2NWgtNXYtNVptNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1IDVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNTUgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS01NSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptMC01aDV2NWgtNXYtNVpNNzMgMzdoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tNSA1aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTQ1LTVoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm01IDBoNXY1aC01di01Wm0tMjAgNWg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabTUgMGg1djVoLTV2LTVabS0zNS01aDV2NWgtNXYtNVptNSAwaDV2NWgtNXYtNVptLTUgNWg1djVoLTV2LTVaIiBmaWxsPSIjRUIxMzg3Ii8+PHBhdGggZD0iTTc4IDI3aDEwdjIwSDc4VjI3Wm0wLTVoNXY1aC01di01Wm0tNSAwaDV2NWgtNXYtNVptLTUgMGg1djVoLTV2LTVabTUgNWg1djVoLTV2LTVabS0xMC01aDV2NWgtNXYtNVptLTIwLTVoNDB2NUg0M3YtNVoiIGZpbGw9IiM1ODMxNzciIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpoYXJkLWxpZ2h0Ii8+PC9zdmc+","./lib/pants/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiM0QTRBNEEiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiMzMjMyMzIiLz48cGF0aCBkPSJNNDguNSAxMjJ2LTUuNW0wIDBoLTJWMTA3bTIgOS41aDIiIHN0cm9rZT0iIzMyMzIzMiIvPjxwYXRoIGQ9Ik00OCAxMDhoMXYxaC0xdi0xWiIgc3Ryb2tlPSIjQ0RDNEEzIi8+PC9zdmc+","./lib/pants/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiM2MTZFOUQiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiM0QjU5OEEiLz48L3N2Zz4=","./lib/pants/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiM0QTRBNEEiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiMzMjMyMzIiLz48L3N2Zz4=","./lib/pants/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiNFOEU4RTgiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiNEMkQyRDIiLz48L3N2Zz4=","./lib/pants/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyMkgzOHYtMTVoMzV2MTVINDhaIiBmaWxsPSIjRThFOEU4Ii8+PHBhdGggZD0iTTY4IDEyMmg1di0xNWgtNXYxNVoiIGZpbGw9IiNEMkQyRDIiLz48cGF0aCBkPSJNMzggMTIwdjJoMTB2LTJIMzhabTIwIDJ2LTJoMTV2Mkg1OFoiIGZpbGw9IiNGMUYxRjEiLz48cGF0aCBkPSJNNjggMTIydi0yaDV2MmgtNVoiIGZpbGw9IiNERURFREUiLz48cGF0aCBkPSJNNDguNSAxMjJ2LTUuNW0wIDBoLTJWMTA3bTIgOS41aDIiIHN0cm9rZT0iI0QyRDJEMiIvPjxwYXRoIGQ9Ik00OCAxMDhoMXYxaC0xdi0xWiIgc3Ryb2tlPSIjQ0RDNEEzIi8+PC9zdmc+","./lib/pants/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyMkgzOHYtMTVoMzV2MTVINDhaIiBmaWxsPSIjNEE0QTRBIi8+PHBhdGggZD0iTTY4IDEyMmg1di0xNWgtNXYxNVoiIGZpbGw9IiMzMjMyMzIiLz48cGF0aCBkPSJNMzggMTIwdjJoMTB2LTJIMzhabTIwIDJ2LTJoMTV2Mkg1OFoiIGZpbGw9IiM5QzlDOUMiLz48cGF0aCBkPSJNNjggMTIydi0yaDV2MmgtNVoiIGZpbGw9IiM1QzVDNUMiLz48cGF0aCBkPSJNNDguNSAxMjJ2LTUuNW0wIDBoLTJWMTA3bTIgOS41aDIiIHN0cm9rZT0iIzMyMzIzMiIvPjxwYXRoIGQ9Ik00OCAxMDhoMXYxaC0xdi0xWiIgc3Ryb2tlPSIjQ0RDNEEzIi8+PC9zdmc+","./lib/pants/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyMkgzOHYtMTVoMzV2MTVINDhaIiBmaWxsPSIjNjE2RTlEIi8+PHBhdGggZD0iTTY4IDEyMmg1di0xNWgtNXYxNVoiIGZpbGw9IiM0QjU5OEEiLz48cGF0aCBkPSJNMzggMTIwdjJoMTB2LTJIMzhabTIwIDJ2LTJoMTV2Mkg1OFoiIGZpbGw9IiM3RThEQzEiLz48cGF0aCBkPSJNNjggMTIydi0yaDV2MmgtNVoiIGZpbGw9IiM1QTY3OTQiLz48cGF0aCBkPSJNNDguNSAxMjJ2LTUuNW0wIDBoLTJWMTA3bTIgOS41aDIiIHN0cm9rZT0iIzRCNTk4QSIvPjxwYXRoIGQ9Ik00OCAxMDhoMXYxaC0xdi0xWiIgc3Ryb2tlPSIjQ0RDNEEzIi8+PC9zdmc+","./lib/pants/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiM2MTZFOUQiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiM0QjU5OEEiLz48cGF0aCBkPSJNMzggMTI1djJoMTB2LTJIMzhabTIwIDJ2LTJoMTV2Mkg1OFoiIGZpbGw9IiM3RThEQzEiLz48cGF0aCBkPSJNNjggMTI3di0yaDV2MmgtNVptLTI1IDB2LTJoNXYyaC01WiIgZmlsbD0iIzVBNjc5NCIvPjxwYXRoIGQ9Ik00OC41IDEyMnYtNS41bTAgMGgtMlYxMDdtMiA5LjVoMiIgc3Ryb2tlPSIjNEI1OThBIi8+PHBhdGggZD0iTTQ4IDEwOGgxdjFoLTF2LTFaIiBzdHJva2U9IiNDREM0QTMiLz48L3N2Zz4=","./lib/pants/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiM0QTRBNEEiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiMzMjMyMzIiLz48cGF0aCBkPSJNMzggMTI1djJoMTB2LTJIMzhabTIwIDJ2LTJoMTV2Mkg1OFoiIGZpbGw9IiM5QzlDOUMiLz48cGF0aCBkPSJNNjggMTI3di0yaDV2MmgtNVptLTI1IDB2LTJoNXYyaC01WiIgZmlsbD0iIzVDNUM1QyIvPjxwYXRoIGQ9Ik00OC41IDEyMnYtNS41bTAgMGgtMlYxMDdtMiA5LjVoMiIgc3Ryb2tlPSIjMzIzMjMyIi8+PHBhdGggZD0iTTQ4IDEwOGgxdjFoLTF2LTFaIiBzdHJva2U9IiNDREM0QTMiLz48L3N2Zz4=","./lib/pants/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTQ4IDEyN0gzOHYtMjBoMzV2MjBINTh2LTVINDh2NVoiIGZpbGw9IiNFOEU4RTgiLz48cGF0aCBkPSJNNDggMTI3di01aC01djVoNVptMjAgMGg1di0yMGgtNXYyMFoiIGZpbGw9IiNEMkQyRDIiLz48cGF0aCBkPSJNMzggMTI1djJoMTB2LTJIMzhabTIwIDJ2LTJoMTV2Mkg1OFoiIGZpbGw9IiNGMUYxRjEiLz48cGF0aCBkPSJNNjggMTI3di0yaDV2MmgtNVptLTI1IDB2LTJoNXYyaC01WiIgZmlsbD0iI0RFREVERSIvPjxwYXRoIGQ9Ik00OC41IDEyMnYtNS41bTAgMGgtMlYxMDdtMiA5LjVoMiIgc3Ryb2tlPSIjRDJEMkQyIi8+PHBhdGggZD0iTTQ4IDEwOGgxdjFoLTF2LTFaIiBzdHJva2U9IiNDREM0QTMiLz48L3N2Zz4=","./lib/shirt/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDk3Vjg3aDV2MTBoLTVabTEwIDE1aDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm00NS0xNWgtNXYtNWg1djVaIiBmaWxsPSIjM0QzRDNEIi8+PHBhdGggZD0iTTY4IDg3aDV2MjVoLTVWODhoLTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFoNXYyaDJ2MmgzdjFoNXYtMWgzdi0yaDJ2LTJoMTBabTEwIDEwdi01aDV2NWgtNVptLTUwIDBWODdoNXYxMGgtNVoiIGZpbGw9IiMyRTJFMkUiLz48L3N2Zz4=","./lib/shirt/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDk3Vjg3aDV2MTBoLTVabTEwLTEwdjI3aDV2LTFoMXYtMWgzdjFoMXYxaDV2LTFoMXYtMWgzdjFoMXYxaDV2LTFoMXYtMWgzdjFoMXYxaDVWODdoLTl2NGgtMXYxaC0zdjJoLTJ2Mkg0OHYtMmgtMnYtMmgtMnYtMWgtMXYtNGgtNVptNDUgMTBoLTV2LTVoNXY1WiIgZmlsbD0iI0YzRjdGOSIvPjxwYXRoIGQ9Ik00MiAxMDl2M2gxdi0xaDV2MWgxdi0zaC0xdi0zaC01djNoLTFabTExIDNoLTF2LTNoMXYtM2g1djNoMXYzaC0xdi0xaC01djFabTEwIDBoLTF2LTNoMXYtM2g1djNoMVY4OGg0djI1aC00di0xaC0xdi0xaC01djFaIiBmaWxsPSIjRUZGM0Y0Ii8+PHBhdGggZD0iTTQyIDg4aC00di0xaDV2NGgxdjFoMnYyaDJ2MmgxMHYtMmgydi0yaDN2LTFoMXYtNGg5djFoLTh2NGgtMXYxaC0zdjJoLTJ2Mkg0N3YtMmgtMnYtMmgtMnYtMWgtMXYtNFptMzYgOHYxaDV2LTFoLTVabS01MCAwdjFoNXYtMWgtNVptMTAgMTdoNHYtMWgxdi0xaDV2MWgxdjFoM3YtMWgxdi0xaDV2MWgxdjFoM3YtMWgxdi0xaDV2MWgxdjFoNHYxaC01di0xaC0xdi0xaC0zdjFoLTF2MWgtNXYtMWgtMXYtMWgtM3YxaC0xdjFoLTV2LTFoLTF2LTFoLTN2MWgtMXYxaC01di0xWiIgZmlsbD0iI0Q3RTJFMiIvPjxwYXRoIGQ9Ik00NiA4N3YzaDF2MWgxdjFoMXYxaDV2LTFoM3YtMWgydi0xaDF2LTMiIHN0cm9rZT0iI0M4QkU5QiIvPjxwYXRoIGQ9Ik01MSA5NHYtMWgxdjFoLTFaIiBzdHJva2U9IiNBN0Q3QUMiLz48L3N2Zz4=","./lib/shirt/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDExMlY4N2g1djI1aC01Wm0xMCAwaDM1Vjg3SDM4djI1Wm01MCAwSDc4VjkyaDV2MTVoNXY1WiIgZmlsbD0iI0YwRjBGMCIvPjxwYXRoIGQ9Ik00MC41IDg3djI1bTMtMjV2MjVtMy0yNXYyNW0zLTI1djI1bTMtMjV2MjVtMy0yNXYyNW0zLTI1djI1bTMtMjV2MjVtMy0yNXYyNW0zLTI1djI1bTMtMjV2MjVtOC0yMHYyMG0zLTIwdjIwbTMgMHYtNW0zIDV2LTVtLTU1LTIwdjI1bS0zLTI1djI1IiBzdHJva2U9IiNFQUVBRTkiLz48cGF0aCBkPSJNMzMgMTEyaC01di0yaDV2MlptNDUtMnYyaDEwdi0ySDc4Wk00MyA4OXYtMmgxMXYyaC0xdjFoLTF2LTFoLTF2LTFoLTV2MWgtMXYxaC0xdi0xaC0xWiIgZmlsbD0iI0ZCRkJGQiIvPjxwYXRoIGQ9Ik00OCA5MGgxdjFoLTF2LTFabTAgNWgxdjFoLTF2LTFabTAgNWgxdjFoLTF2LTFabTAgNWgxdjFoLTF2LTFabTAgNnYtMWgxdjFoLTFaIiBzdHJva2U9IiNDREM0QTMiLz48cGF0aCBkPSJNNjggODdoNXYyNWgtNVY4N1ptMTUgMjVWOTJoLTV2MjBoNVptLTUwIDBWODdoLTV2MjVoNVoiIGZpbGw9IiNDNEM0QzQiIGZpbGwtb3BhY2l0eT0iLjI1Ii8+PC9zdmc+","./lib/shirt/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDk3Vjg3aDV2MTBoLTVabTEwIDE1aDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm00NS0xNWgtNXYtNWg1djVaIiBmaWxsPSIjRDA3MDcwIi8+PHBhdGggZD0iTTY4IDg3aDV2MjVoLTVWODhoLTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFoNXYyaDJ2MmgzdjFoNXYtMWgzdi0yaDJ2LTJoMTBabTEwIDEwdi01aDV2NWgtNVptLTUwIDBWODdoNXYxMGgtNVoiIGZpbGw9IiNDNDY2NjYiLz48L3N2Zz4=","./lib/shirt/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDExMlY4N2g1djI1aC01Wm0xMCAwaDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm01MCAwSDc4VjkyaDV2MTVoNXY1WiIgZmlsbD0iI0QwNzA3MCIvPjxwYXRoIGQ9Ik0zOCA4N2g1djJoMnYyaDN2MWg1di0xaDN2LTJoMnYtMmgxNXYyNWgtNS4wNDdWODhINTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFabTQ1IDVoLTV2MjBoNVY5MlptLTU1IDIwaDVWODdoLTV2MjVaIiBmaWxsPSIjQzM2NjY2Ii8+PC9zdmc+","./lib/shirt/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDExMlY4N2g1djI1aC01Wm0xMCAwaDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm01MCAwSDc4VjkyaDV2MTVoNXY1WiIgZmlsbD0iIzcwOTFEMCIvPjxwYXRoIGQ9Ik0zOCA4N2g1djJoMnYyaDN2MWg1di0xaDN2LTJoMnYtMmgxNXYyNWgtNS4wNDdWODhINTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFabTQ1IDVoLTV2MjBoNVY5MlptLTU1IDIwaDVWODdoLTV2MjVaIiBmaWxsPSIjNkE4RENFIi8+PC9zdmc+","./lib/shirt/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDExMlY4N2g1djI1aC01Wm0xMCAwaDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm01MCAwSDc4VjkyaDV2MTVoNXY1WiIgZmlsbD0iI0Y4RjhGOCIvPjxwYXRoIGQ9Ik0zOCA4N2g1djJoMnYyaDN2MWg1di0xaDN2LTJoMnYtMmgxNXYyNWgtNS4wNDdWODhINTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFabTQ1IDVoLTV2MjBoNVY5MlptLTU1IDIwaDVWODdoLTV2MjVaIiBmaWxsPSIjRjBGMEYwIi8+PC9zdmc+","./lib/shirt/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDk3Vjg3aDV2MTBoLTVabTEwIDE1aDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm00NS0xNWgtNXYtNWg1djVaIiBmaWxsPSIjNzA5MUQwIi8+PHBhdGggZD0iTTY4IDg3aDV2MjVoLTVWODhoLTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFoNXYyaDJ2MmgzdjFoNXYtMWgzdi0yaDJ2LTJoMTBabTEwIDEwdi01aDV2NWgtNVptLTUwIDBWODdoNXYxMGgtNVoiIGZpbGw9IiM2QThEQ0UiLz48L3N2Zz4=","./lib/shirt/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDk3Vjg3aDV2MTBoLTVabTEwIDE1aDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm00NS0xNWgtNXYtNWg1djVaIiBmaWxsPSIjRjhGOEY4Ii8+PHBhdGggZD0iTTY4IDg3aDV2MjVoLTVWODhoLTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFoNXYyaDJ2MmgzdjFoNXYtMWgzdi0yaDJ2LTJoMTBabTEwIDEwdi01aDV2NWgtNVptLTUwIDBWODdoNXYxMGgtNVoiIGZpbGw9IiNGMEYwRjAiLz48L3N2Zz4=","./lib/shirt/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTI4IDExMlY4N2g1djI1aC01Wm0xMCAwaDM1Vjg3SDU4djJoLTJ2MmgtM3YxaC01di0xaC0zdi0yaC0ydi0yaC01djI1Wm01MCAwSDc4VjkyaDV2MTVoNXY1WiIgZmlsbD0iIzNEM0QzRCIvPjxwYXRoIGQ9Ik0zOCA4N2g1djJoMnYyaDN2MWg1di0xaDN2LTJoMnYtMmgxNXYyNWgtNS4wNDdWODhINTl2MmgtMnYyaC0zdjFoLTd2LTFoLTN2LTJoLTJ2LTJoLTR2LTFabTQ1IDVoLTV2MjBoNVY5MlptLTU1IDIwaDVWODdoLTV2MjVaIiBmaWxsPSIjMkUyRTJFIi8+PC9zdmc+","./lib/skin/0.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0Y3REVDRSIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjRjdERUNFIi8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/1.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0YzRDJBMiIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjRjNEMkEyIi8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/2.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0E3QTdBNyIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjQTdBN0E3Ii8+PGcgZmlsbD0iIzg3ODc4NyIgZmlsbC1vcGFjaXR5PSIuMSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/3.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0Q1QUI4OCIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjRDVBQjg4Ii8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/4.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0FGN0U1NyIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjQUY3RTU3Ii8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/5.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iIzdDNTMzRSIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjN0M1MzNFIi8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMyIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/6.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0ZGREM1RCIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjRkZEQzVEIi8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMTUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTptdWx0aXBseSI+PHBhdGggZD0iTTc4IDYySDIzdi01aDY1djEwaC01djEwaC01djVINjh2LTVoNXYtNWg1VjYyWiIvPjxwYXRoIGQ9Ik00OCA3N3YtNWgxMHY1SDQ4Wk0zMyA4N2gtNXYzMGg1Vjg3Wm01MCA1aC01djI1aDVWOTJaIi8+PC9nPjwvc3ZnPg==","./lib/skin/7.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iIzVEQjFGRiIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjNURCMUZGIi8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/8.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iIzY2REU1MiIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjNjZERTUyIi8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+","./lib/skin/9.svg":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIxMTMiIGhlaWdodD0iMTQyIiB2aWV3Qm94PSIwIDAgMTEzIDE0MiI+PHBhdGggZD0iTTgzIDU3SDIzdjE1aDV2NWg1djVoMTB2MjVoMjBWODJoMTV2LTVoNVY2N2g1VjU3aC01WiIgZmlsbD0iI0Q3NzJDNyIvPjxwYXRoIGQ9Ik0yOCAxMTdWODdoNXYzMGgtNVptNTAgMFY5Mmg1djE1aDV2MTBINzhaIiBmaWxsPSIjRDc3MkM3Ii8+PGcgZmlsbD0iI0I0ODlENyIgZmlsbC1vcGFjaXR5PSIuMiIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm11bHRpcGx5Ij48cGF0aCBkPSJNNzggNjJIMjN2LTVoNjV2MTBoLTV2MTBoLTV2NUg2OHYtNWg1di01aDVWNjJaIi8+PHBhdGggZD0iTTQ4IDc3di01aDEwdjVINDhaTTMzIDg3aC01djMwaDVWODdabTUwIDVoLTV2MjVoNVY5MloiLz48L2c+PC9zdmc+"};var Ee=500,Ye=["bunny","coffee","construction","cowboy","education","knight","ninja","party","pirate","watermelon"],ae={accessories:9,base:1,leg:["","R","L"],face:5,faceItem:9,hair:9,pants:9,shirt:9,skin:9,hatColor:9},U=class extends z{static get tag(){return"rpg-character"}constructor(){super(),this.literalseed=!1,this.height=142,this.width=113,this.accessories=0,this.base=0,this.face=0,this.faceItem=0,this.hair=0,this.pants=0,this.shirt=0,this.skin=0,this.accentColor="orange",this.seed=null,this.walking=!1,this.leg="",this.speed=500,this.__walkingTimeout=null,this.circle=!1,this.hat="none",this.hatColor=0,this.demo=!1,this.fire=!1,globalThis.matchMedia&&(this.reduceMotion=globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches)}randomColor(e=null){return e===null&&(e=""+Math.floor(Math.random()*Object.keys(this.colors).length)),Object.keys(this.colors)[e]}static get properties(){return{...super.properties,literalseed:{type:Boolean},accessories:{type:Number},height:{type:Number},width:{type:Number},base:{type:Number},face:{type:Number},faceItem:{type:Number},hair:{type:Number},pants:{type:Number},shirt:{type:Number},skin:{type:Number},hatColor:{type:Number},hat:{type:String},walking:{type:Boolean,reflect:!0},leg:{type:String},seed:{type:String,reflect:!0},speed:{type:Number},circle:{type:Boolean,reflect:!0},fire:{type:Boolean,reflect:!0},demo:{type:Boolean},reduceMotion:{type:Boolean}}}static get styles(){let e=[];return super.styles&&(e=super.styles),[e,D`
        :host {
          display: inline-block;
          margin: 0;
          padding: 0;
          text-align: initial;
          position: relative;
        }
        svg,
        img {
          position: absolute;
          margin: 0;
          padding: 0;
          text-align: initial;
        }
        div {
          transition: 0.3s ease-in-out background-color;
          margin: 0;
          padding: 0;
          text-align: initial;
        }
        #demo {
          height: 30px;
          padding-top: 10px;
          text-align: center;
          background-color: black;
          color: white;
          font-weight: bold;
        }
      `]}firstUpdated(e){super.firstUpdated&&super.firstUpdated(e),this.seed===null&&(this.seed=Math.random().toString(36).substring(2,12))}render(){let e={href:M[`./lib/accessories/${this.accessories}.svg`]||""}.href,t={href:M[`./lib/base/${this.base}${this.leg}.svg`]||""}.href,i={href:M[`./lib/base/${this.leg}.svg`]||""}.href,a={href:M[`./lib/face/${this.face}.svg`]||""}.href,l={href:M[`./lib/faceItem/${this.faceItem}.svg`]||""}.href,d={href:M[`./lib/hair/${this.hair}.svg`]||""}.href,m={href:M[`./lib/pants/${this.pants}.svg`]||""}.href,I={href:M[`./lib/shirt/${this.shirt}.svg`]||""}.href,N={href:M[`./lib/skin/${this.skin}.svg`]||""}.href,s=this.hat;this.fire&&this.hat==="none"?s="coffee":this.hat==="random"&&(s=Ye[Math.floor(Math.random()*Ye.length)]);let c={href:M[`./lib/hat/${s}.svg`]||""}.href,T={href:M[`./lib/hatColor/${this.hatColor}.svg`]||""}.href,f={href:M["./lib/base/fire.svg"]||""}.href,n={href:M["./lib/circle.svg"]||""}.href;return r`
      <div class="wrapper">
        ${this.renderPiece(N)}
        ${this.base===1?this.renderPiece(d):""}
        ${this.renderPiece(a)} ${this.renderPiece(l)}
        ${this.renderPiece(I)} ${this.renderPiece(m)}
        ${this.renderPiece(e)} ${this.renderPiece(t)}
        ${this.leg!==""?this.renderPiece(i):""}
        ${this.renderPiece(T)} ${this.fire?this.renderPiece(f):""}
        ${s!=="none"?this.renderPiece(c):""}
        ${this.circle?this.renderPiece(n):""}
      </div>
      ${this.demo?r`<div id="demo">${this.seed}</div>`:""}
      <style>
        #cardcircle {
          fill: var(
            --simple-colors-default-theme-${this.accentColor}-8,
            var(--simple-colors-default-theme-accent-8, yellow)
          );
        }
        div {
          width: ${this.width+"px"};
        }
        .wrapper {
          height: ${this.height+"px"};
        }
      </style>
    `}renderPiece(e){return he`
    <svg xmlns="http://www.w3.org/2000/svg" part="rpg-character-item" viewBox="0 0 ${this.width} ${this.height}" preserveAspectRatio="xMidYMid meet">
      <image
        href="${e}"
        width="${this.width}px"
        height="${this.height}px"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
      ></image>
    </svg>`}updated(e){super.updated&&super.updated(e),e.forEach((t,i)=>{if(i==="fire"&&(this.speed=this[i]?100:Ee),i==="demo"&&(this[i]?this.shadowRoot.querySelector(".wrapper").addEventListener("click",a=>{this.seed=Math.random().toString(36).substring(2,12)}):this.shadowRoot.querySelector(".wrapper").removeEventListener("click",a=>{a.target.seed=Math.random().toString(36).substring(2,12)})),(i==="leg"||i==="walking")&&this.walking&&!this.reduceMotion&&(clearTimeout(this.__walkingTimeout),this.__walkingTimeout=setTimeout(()=>{switch(this.leg){case"":this.leg="R";break;case"R":this.leg="L";break;case"L":this.leg="";break}},this.speed)),i==="seed"&&this[i]){let a=54;for(let d=0;d<this.seed.length;d++)d<64&&(a*=this.seed.charCodeAt(d));let l={zpg:"7501517984378880262144",edtechjoker:"712215550",btopro:"7122155501"};a=BigInt(a).toString(),Object.keys(l).includes(this[i])&&(a=l[this[i]]),this.literalseed&&(a=BigInt(this.seed).toString()),Object.keys(ae).forEach((d,m)=>{a[m]!==void 0?d==="leg"?this[d]=ae[d][Math.floor(Math.random()*Object.keys(ae[d]).length)]:d==="base"?this[d]=a[m]>=5?1:0:d==="face"?this[d]=a[m]>5?1:a[m]:this[d]=a[m]:this[d]=0})}})}static get haxProperties(){return new URL(`./lib/${this.tag}.haxProperties.json`,document.baseURI).href}};globalThis.customElements.define(U.tag,U);var be=function(o){return class extends o{constructor(){super(),this.red=!1,this.fadein=!1,this.glitch=!1,this.glitchMax=5,this.glitchDuration=50}async _doGlitch(){if(!globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches){let i=this.innerHTML,a=Math.floor(Math.floor(Math.random()*i.length/10)+i.length/20)+1,l=Math.floor(Math.random()*this.glitchMax)+10;for(let d=0;d<l;d++){let m=i;for(let I=0;I<a;I++)m=this._scramble(m);this.innerHTML=m,await this._wait(this.glitchDuration)}this.innerHTML=i}}_scramble(e){let t=Math.floor(Math.random()*Math.floor(e.length-1)),i=Math.floor(Math.random()*100);return e.substring(0,t)+String.fromCharCode(i)+e.substring(t+1)}_wait(e){return new Promise(t=>setTimeout(t,e))}}};var H=class extends be(V){static get styles(){let e=D``;return super.styles&&(e=super.styles),[e,D`
        :host {
          font-weight: bold;
          display: inline-flex;
          --flicker-easing: cubic-bezier(0.32, 0.32, 0, 0.92);
          --flicker-duration: 300ms;
          --fade-in-duration: 500ms;
        }
        span {
          color: var(--future-terminal-text-color, #5fa4a5);
          text-shadow: 0 0 4px var(--future-terminal-text-color, #5fa4a5);
          animation: flicker var(--flicker-duration) var(--flicker-easing);
        }
        :host([red]) span {
          color: #b35b5a;
          text-shadow: 0 0 4px #b35b5a;
        }
        :host([fadein]) span {
          animation:
            fade-in var(--fade-in-duration),
            flicker 300ms var(--flicker-easing)
              calc(var(--fade-in-duration) * 0.8);
          transform: translate(0, 0);
          opacity: 1;
        }
        @keyframes flicker {
          0% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.45;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            transform: translate(-30px, 0px);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `]}updated(e){super.updated&&super.updated(e),e.forEach((t,i)=>{i==="glitch"&&this[i]&&typeof t<"u"&&this._doGlitch()})}render(){return r`<span part="text"><slot></slot></span>`}static get properties(){return{...super.properties,glitch:{type:Boolean},red:{type:Boolean,reflect:!0},fadein:{type:Boolean,reflect:!0},glitchMax:{type:Number,attribute:"glitch-max"},glitchDuration:{type:Number,attribute:"glitch-duration"}}}static get tag(){return"future-terminal-text-lite"}};globalThis.customElements.define(H.tag,H);})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@haxtheweb/simple-colors-shared-styles/simple-colors-shared-styles.js:
  (**
   * Copyright 2018 The Pennsylvania State University
   * @license Apache-2.0, see License.md for full text.
   *
   * `simple-colors-shared-styles`
   * @element simple-colors-shared-styles
   * a shared set of styles for `simple-colors`
   *
   *
  
   * @demo ./demo/index.html
   *)

@haxtheweb/simple-colors/simple-colors.js:
  (**
   * Copyright 2018 The Pennsylvania State University
   * @license Apache-2.0, see License.md for full text.
   *)

@haxtheweb/rpg-character/rpg-character.js:
  (**
   * Copyright 2022 The Pennsylvania State University
   * @license Apache-2.0, see License.md for full text.
   *)

@haxtheweb/future-terminal-text/lib/future-terminal-text-lite.js:
  (**
   * Copyright 2020 The Pennsylvania State University
   * @license Apache-2.0, see License.md for full text.
   *)
*/
