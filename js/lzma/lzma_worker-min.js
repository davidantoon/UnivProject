var e=function(){"use strict";function r(e,r){postMessage({action:xt,cbn:r,result:e})}function t(e){var r=[];return r[e-1]=void 0,r}function o(e,r){return i(e[0]+r[0],e[1]+r[1])}function n(e,r){return u(~~Math.max(Math.min(e[1]/Ot,2147483647),-2147483648)&~~Math.max(Math.min(r[1]/Ot,2147483647),-2147483648),c(e)&c(r))}function s(e,r){var t,o;return e[0]==r[0]&&e[1]==r[1]?0:(t=0>e[1],o=0>r[1],t&&!o?-1:!t&&o?1:h(e,r)[1]<0?-1:1)}function i(e,r){var t,o;for(r%=0x10000000000000000,e%=0x10000000000000000,t=r%Ot,o=Math.floor(e/Ot)*Ot,r=r-t+o,e=e-o+t;0>e;)e+=Ot,r-=Ot;for(;e>4294967295;)e-=Ot,r+=Ot;for(r%=0x10000000000000000;r>0x7fffffff00000000;)r-=0x10000000000000000;for(;-0x8000000000000000>r;)r+=0x10000000000000000;return[e,r]}function _(e,r){return e[0]==r[0]&&e[1]==r[1]}function a(e){return e>=0?[e,0]:[e+Ot,-Ot]}function c(e){return e[0]>=2147483648?~~Math.max(Math.min(e[0]-Ot,2147483647),-2147483648):~~Math.max(Math.min(e[0],2147483647),-2147483648)}function u(e,r){var t,o;return t=e*Ot,o=r,0>r&&(o+=Ot),[o,t]}function f(e){return 30>=e?1<<e:f(30)*f(e-30)}function m(e,r){var t,o,n,s;if(r&=63,_(e,Ht))return r?Gt:e;if(0>e[1])throw Error("Neg");return s=f(r),o=e[1]*s%0x10000000000000000,n=e[0]*s,t=n-n%Ot,o+=t,n-=t,o>=0x8000000000000000&&(o-=0x10000000000000000),[n,o]}function d(e,r){var t;return r&=63,t=f(r),i(Math.floor(e[0]/t),e[1]/t)}function p(e,r){var t;return r&=63,t=d(e,r),0>e[1]&&(t=o(t,m([2,0],63-r))),t}function h(e,r){return i(e[0]-r[0],e[1]-r[1])}function P(e,r){return e.Mc=r,e.Lc=0,e.Vb=r.length,e}function l(e){return e.Lc>=e.Vb?-1:255&e.Mc[e.Lc++]}function v(e,r,t,o){return e.Lc>=e.Vb?-1:(o=Math.min(o,e.Vb-e.Lc),M(e.Mc,e.Lc,r,t,o),e.Lc+=o,o)}function B(e){return e.Mc=t(32),e.Vb=0,e}function S(e){var r=e.Mc;return r.length=e.Vb,r}function g(e,r){e.Mc[e.Vb++]=r<<24>>24}function k(e,r,t,o){M(r,t,e.Mc,e.Vb,o),e.Vb+=o}function R(e,r,t,o,n){var s;for(s=r;t>s;++s)o[n++]=e.charCodeAt(s)}function M(e,r,t,o,n){for(var s=0;n>s;++s)t[o+s]=e[r+s]}function D(e,r){Ar(r,1<<e.s),r.n=e.f,Hr(r,e.m),r.eb=0,r.fb=3,r.Y=2,r.y=3}function b(e,r,t,o,n){var i,_;if(s(o,At)<0)throw Error("invalid length "+o);for(e.Nb=o,i=Dr({}),D(n,i),i.Gc=1,Gr(i,t),_=0;64>_;_+=8)g(t,255&c(d(o,_)));e.ac=(i.S=0,i.kc=r,i.lc=0,Mr(i),i.d.zb=t,Fr(i),wr(i),br(i),i._.pb=i.n+1-2,Qr(i._,1<<i.Y),i.i.pb=i.n+1-2,Qr(i.i,1<<i.Y),void(i.g=Gt),X({},i))}function w(e,r,t){return e.rc=B({}),b(e,P({},r),e.rc,a(r.length),t),e}function E(e,r,t){var o,n,s,i,_="",c=[];for(n=0;5>n;++n){if(s=l(r),-1==s)throw Error("truncated input");c[n]=s<<24>>24}if(o=ir({}),!ar(o,c))throw Error("corrupted input");for(n=0;64>n;n+=8){if(s=l(r),-1==s)throw Error("truncated input");s=s.toString(16),1==s.length&&(s="0"+s),_=s+""+_}/^0+$|^f+$/i.test(_)?e.Nb=At:(i=parseInt(_,16),e.Nb=i>4294967295?At:a(i)),e.ac=nr(o,r,t,e.Nb)}function L(e,r){return e.rc=B({}),E(e,P({},r),e.rc),e}function C(e,r,o,n){var s;e.Bc=r,e._b=o,s=r+o+n,(null==e.c||e.Jb!=s)&&(e.c=null,e.Jb=s,e.c=t(e.Jb)),e.H=e.Jb-o}function y(e,r){return e.c[e.f+e.o+r]}function z(e,r,t,o){var n,s;for(e.X&&e.o+r+o>e.h&&(o=e.h-(e.o+r)),++t,s=e.f+e.o+r,n=0;o>n&&e.c[s+n]==e.c[s+n-t];++n);return n}function F(e){return e.h-e.o}function I(e){var r,t,o;for(o=e.f+e.o-e.Bc,o>0&&--o,t=e.f+e.h-o,r=0;t>r;++r)e.c[r]=e.c[o+r];e.f-=o}function x(e){var r;++e.o,e.o>e.yb&&(r=e.f+e.o,r>e.H&&I(e),N(e))}function N(e){var r,t,o;if(!e.X)for(;;){if(o=-e.f+e.Jb-e.h,!o)return;if(r=v(e.bc,e.c,e.f+e.h,o),-1==r)return e.yb=e.h,t=e.f+e.yb,t>e.H&&(e.yb=e.H-e.f),void(e.X=1);e.h+=r,e.h>=e.o+e._b&&(e.yb=e.h-e._b)}}function O(e,r){e.f+=r,e.yb-=r,e.o-=r,e.h-=r}function A(e,r,o,n,s){var i,_,a;1073741567>r&&(e.Ec=16+(n>>1),a=~~((r+o+n+s)/2)+256,C(e,r+o,n+s,a),e.ub=n,i=r+1,e.p!=i&&(e.M=t(2*(e.p=i))),_=65536,e.rb&&(_=r-1,_|=_>>1,_|=_>>2,_|=_>>4,_|=_>>8,_>>=1,_|=65535,_>16777216&&(_>>=1),e.Fc=_,++_,_+=e.N),_!=e.sc&&(e.qb=t(e.sc=_)))}function H(e,r){var t,o,n,s,i,_,a,c,u,f,m,d,p,h,P,l,v,B,S,g,k;if(e.h>=e.o+e.ub)h=e.ub;else if(h=e.h-e.o,e.xb>h)return W(e),0;for(v=0,P=e.o>e.p?e.o-e.p:0,o=e.f+e.o,l=1,c=0,u=0,e.rb?(k=Tt[255&e.c[o]]^255&e.c[o+1],c=1023&k,k^=(255&e.c[o+2])<<8,u=65535&k,f=(k^Tt[255&e.c[o+3]]<<5)&e.Fc):f=255&e.c[o]^(255&e.c[o+1])<<8,n=e.qb[e.N+f]||0,e.rb&&(s=e.qb[c]||0,i=e.qb[1024+u]||0,e.qb[c]=e.o,e.qb[1024+u]=e.o,s>P&&e.c[e.f+s]==e.c[o]&&(r[v++]=l=2,r[v++]=e.o-s-1),i>P&&e.c[e.f+i]==e.c[o]&&(i==s&&(v-=2),r[v++]=l=3,r[v++]=e.o-i-1,s=i),0!=v&&s==n&&(v-=2,l=1)),e.qb[e.N+f]=e.o,S=(e.k<<1)+1,g=e.k<<1,d=p=e.w,0!=e.w&&n>P&&e.c[e.f+n+e.w]!=e.c[o+e.w]&&(r[v++]=l=e.w,r[v++]=e.o-n-1),t=e.Ec;;){if(P>=n||0==t--){e.M[S]=e.M[g]=0;break}if(a=e.o-n,_=(e.k>=a?e.k-a:e.k-a+e.p)<<1,B=e.f+n,m=p>d?d:p,e.c[B+m]==e.c[o+m]){for(;++m!=h&&e.c[B+m]==e.c[o+m];);if(m>l&&(r[v++]=l=m,r[v++]=a-1,m==h)){e.M[g]=e.M[_],e.M[S]=e.M[_+1];break}}(255&e.c[o+m])>(255&e.c[B+m])?(e.M[g]=n,g=_+1,n=e.M[g],p=m):(e.M[S]=n,S=_,n=e.M[S],d=m)}return W(e),v}function G(e){e.f=0,e.o=0,e.h=0,e.X=0,N(e),e.k=0,O(e,-1)}function W(e){var r;++e.k>=e.p&&(e.k=0),x(e),1073741823==e.o&&(r=e.o-e.p,T(e.M,2*e.p,r),T(e.qb,e.sc,r),O(e,r))}function T(e,r,t){var o,n;for(o=0;r>o;++o)n=e[o]||0,t>=n?n=0:n-=t,e[o]=n}function Y(e,r){e.rb=r>2,e.rb?(e.w=0,e.xb=4,e.N=66560):(e.w=2,e.xb=3,e.N=0)}function Z(e,r){var t,o,n,s,i,_,a,c,u,f,m,d,p,h,P,l,v;do{if(e.h>=e.o+e.ub)d=e.ub;else if(d=e.h-e.o,e.xb>d){W(e);continue}for(p=e.o>e.p?e.o-e.p:0,o=e.f+e.o,e.rb?(v=Tt[255&e.c[o]]^255&e.c[o+1],_=1023&v,e.qb[_]=e.o,v^=(255&e.c[o+2])<<8,a=65535&v,e.qb[1024+a]=e.o,c=(v^Tt[255&e.c[o+3]]<<5)&e.Fc):c=255&e.c[o]^(255&e.c[o+1])<<8,n=e.qb[e.N+c],e.qb[e.N+c]=e.o,P=(e.k<<1)+1,l=e.k<<1,f=m=e.w,t=e.Ec;;){if(p>=n||0==t--){e.M[P]=e.M[l]=0;break}if(i=e.o-n,s=(e.k>=i?e.k-i:e.k-i+e.p)<<1,h=e.f+n,u=m>f?f:m,e.c[h+u]==e.c[o+u]){for(;++u!=d&&e.c[h+u]==e.c[o+u];);if(u==d){e.M[l]=e.M[s],e.M[P]=e.M[s+1];break}}(255&e.c[o+u])>(255&e.c[h+u])?(e.M[l]=n,l=s+1,n=e.M[l],m=u):(e.M[P]=n,P=s,n=e.M[P],f=u)}W(e)}while(0!=--r)}function V(e,r,t){var o=e.o-r-1;for(0>o&&(o+=e.L);0!=t;--t)o>=e.L&&(o=0),e.Kb[e.o++]=e.Kb[o++],e.o>=e.L&&$(e)}function j(e,r){(null==e.Kb||e.L!=r)&&(e.Kb=t(r)),e.L=r,e.o=0,e.h=0}function $(e){var r=e.o-e.h;r&&(k(e.bc,e.Kb,e.h,r),e.o>=e.L&&(e.o=0),e.h=e.o)}function K(e,r){var t=e.o-r-1;return 0>t&&(t+=e.L),e.Kb[t]}function q(e,r){e.Kb[e.o++]=r,e.o>=e.L&&$(e)}function J(e){$(e),e.bc=null}function Q(e){return e-=2,4>e?e:3}function U(e){return 4>e?0:10>e?e-3:e-6}function X(e,r){return e.cb=r,e.$=null,e.zc=1,e}function er(e,r){return e.$=r,e.cb=null,e.zc=1,e}function rr(e){if(!e.zc)throw Error("bad state");return e.cb?or(e):tr(e),e.zc}function tr(e){var r=sr(e.$);if(-1==r)throw Error("corrupted input");e.Sb=At,e.Pc=e.$.g,(r||s(e.$.Nc,Gt)>=0&&s(e.$.g,e.$.Nc)>=0)&&($(e.$.B),J(e.$.B),e.$.e.zb=null,e.zc=0)}function or(e){Rr(e.cb,e.cb.Ub,e.cb.vc,e.cb.Kc),e.Sb=e.cb.Ub[0],e.cb.Kc[0]&&(Or(e.cb),e.zc=0)}function nr(e,r,t,o){return e.e.zb=r,J(e.B),e.B.bc=t,_r(e),e.W=0,e.ib=0,e.Jc=0,e.Ic=0,e.Qc=0,e.Nc=o,e.g=Gt,e.gc=0,er({},e)}function sr(e){var r,t,n,i,_,u;if(u=c(e.g)&e.Dc,vt(e.e,e.Gb,(e.W<<4)+u)){if(vt(e.e,e.Wb,e.W))n=0,vt(e.e,e.Cb,e.W)?(vt(e.e,e.Db,e.W)?(vt(e.e,e.Eb,e.W)?(t=e.Qc,e.Qc=e.Ic):t=e.Ic,e.Ic=e.Jc):t=e.Jc,e.Jc=e.ib,e.ib=t):vt(e.e,e.tb,(e.W<<4)+u)||(e.W=7>e.W?9:11,n=1),n||(n=mr(e.sb,e.e,u)+2,e.W=7>e.W?8:11);else if(e.Qc=e.Ic,e.Ic=e.Jc,e.Jc=e.ib,n=2+mr(e.Mb,e.e,u),e.W=7>e.W?7:10,_=at(e.kb[Q(n)],e.e),_>=4){if(i=(_>>1)-1,e.ib=(2|1&_)<<i,14>_)e.ib+=ut(e.jc,e.ib-_-1,e.e,i);else if(e.ib+=Bt(e.e,i-4)<<4,e.ib+=ct(e.Bb,e.e),0>e.ib)return-1==e.ib?1:-1}else e.ib=_;if(s(a(e.ib),e.g)>=0||e.ib>=e.mb)return-1;V(e.B,e.ib,n),e.g=o(e.g,a(n)),e.gc=K(e.B,0)}else r=Pr(e.jb,c(e.g),e.gc),e.gc=7>e.W?vr(r,e.e):Br(r,e.e,K(e.B,e.ib)),q(e.B,e.gc),e.W=U(e.W),e.g=o(e.g,Wt);return 0}function ir(e){e.B={},e.e={},e.Gb=t(192),e.Wb=t(12),e.Cb=t(12),e.Db=t(12),e.Eb=t(12),e.tb=t(192),e.kb=t(4),e.jc=t(114),e.Bb=_t({},4),e.Mb=dr({}),e.sb=dr({}),e.jb={};for(var r=0;4>r;++r)e.kb[r]=_t({},6);return e}function _r(e){e.B.h=0,e.B.o=0,gt(e.Gb),gt(e.tb),gt(e.Wb),gt(e.Cb),gt(e.Db),gt(e.Eb),gt(e.jc),lr(e.jb);for(var r=0;4>r;++r)gt(e.kb[r].G);pr(e.Mb),pr(e.sb),gt(e.Bb.G),St(e.e)}function ar(e,r){var t,o,n,s,i,_,a;if(5>r.length)return 0;for(a=255&r[0],n=a%9,_=~~(a/9),s=_%5,i=~~(_/5),t=0,o=0;4>o;++o)t+=(255&r[1+o])<<8*o;return t>99999999||!ur(e,n,s,i)?0:cr(e,t)}function cr(e,r){return 0>r?0:(e.Pb!=r&&(e.Pb=r,e.mb=Math.max(e.Pb,1),j(e.B,Math.max(e.mb,4096))),1)}function ur(e,r,t,o){if(r>8||t>4||o>4)return 0;hr(e.jb,t,r);var n=1<<o;return fr(e.Mb,n),fr(e.sb,n),e.Dc=n-1,1}function fr(e,r){for(;r>e.P;++e.P)e.ec[e.P]=_t({},3),e.hc[e.P]=_t({},3)}function mr(e,r,t){if(!vt(r,e.uc,0))return at(e.ec[t],r);var o=8;return o+=vt(r,e.uc,1)?8+at(e.tc,r):at(e.hc[t],r)}function dr(e){return e.uc=t(2),e.ec=t(16),e.hc=t(16),e.tc=_t({},8),e.P=0,e}function pr(e){gt(e.uc);for(var r=0;e.P>r;++r)gt(e.ec[r].G),gt(e.hc[r].G);gt(e.tc.G)}function hr(e,r,o){var n,s;if(null==e.V||e.u!=o||e.I!=r)for(e.I=r,e.oc=(1<<r)-1,e.u=o,s=1<<e.u+e.I,e.V=t(s),n=0;s>n;++n)e.V[n]=Sr({})}function Pr(e,r,t){return e.V[((r&e.oc)<<e.u)+((255&t)>>>8-e.u)]}function lr(e){var r,t;for(t=1<<e.u+e.I,r=0;t>r;++r)gt(e.V[r].Hb)}function vr(e,r){var t=1;do t=t<<1|vt(r,e.Hb,t);while(256>t);return t<<24>>24}function Br(e,r,t){var o,n,s=1;do if(n=t>>7&1,t<<=1,o=vt(r,e.Hb,(1+n<<8)+s),s=s<<1|o,n!=o){for(;256>s;)s=s<<1|vt(r,e.Hb,s);break}while(256>s);return s<<24>>24}function Sr(e){return e.Hb=t(768),e}function gr(e,r){var t,o,n,s;e.lb=r,n=e.a[r].r,o=e.a[r].j;do e.a[r].t&&(st(e.a[n]),e.a[n].r=n-1,e.a[r].yc&&(e.a[n-1].t=0,e.a[n-1].r=e.a[r].r2,e.a[n-1].j=e.a[r].j2)),s=n,t=o,o=e.a[s].j,n=e.a[s].r,e.a[s].j=t,e.a[s].r=r,r=s;while(r>0);return e.nb=e.a[0].j,e.q=e.a[0].r}function kr(e){e.l=0,e.J=0;for(var r=0;4>r;++r)e.v[r]=0}function Rr(e,r,t,n){var i,u,f,m,d,p,P,l,v,B,S,g,k,R,M;if(r[0]=Gt,t[0]=Gt,n[0]=1,e.kc&&(e.b.bc=e.kc,G(e.b),e.S=1,e.kc=null),!e.lc){if(e.lc=1,R=e.g,_(e.g,Gt)){if(!F(e.b))return void Er(e,c(e.g));xr(e),k=c(e.g)&e.y,kt(e.d,e.C,(e.l<<4)+k,0),e.l=U(e.l),f=y(e.b,-e.s),rt(Xr(e.A,c(e.g),e.J),e.d,f),e.J=f,--e.s,e.g=o(e.g,Wt)}if(!F(e.b))return void Er(e,c(e.g));for(;;){if(P=Lr(e,c(e.g)),B=e.nb,k=c(e.g)&e.y,u=(e.l<<4)+k,1==P&&-1==B)kt(e.d,e.C,u,0),f=y(e.b,-e.s),M=Xr(e.A,c(e.g),e.J),7>e.l?rt(M,e.d,f):(v=y(e.b,-e.v[0]-1-e.s),tt(M,e.d,v,f)),e.J=f,e.l=U(e.l);else{if(kt(e.d,e.C,u,1),4>B){if(kt(e.d,e.bb,e.l,1),B?(kt(e.d,e.gb,e.l,1),1==B?kt(e.d,e.Ob,e.l,0):(kt(e.d,e.Ob,e.l,1),kt(e.d,e.wc,e.l,B-2))):(kt(e.d,e.gb,e.l,0),1==P?kt(e.d,e.Z,u,0):kt(e.d,e.Z,u,1)),1==P?e.l=7>e.l?9:11:(Kr(e.i,e.d,P-2,k),e.l=7>e.l?8:11),m=e.v[B],0!=B){for(p=B;p>=1;--p)e.v[p]=e.v[p-1];e.v[0]=m}}else{for(kt(e.d,e.bb,e.l,0),e.l=7>e.l?7:10,Kr(e._,e.d,P-2,k),B-=4,g=Tr(B),l=Q(P),mt(e.K[l],e.d,g),g>=4&&(d=(g>>1)-1,i=(2|1&g)<<d,S=B-i,14>g?Pt(e.Lb,i-g-1,e.d,d,S):(Rt(e.d,S>>4,d-4),pt(e.U,e.d,15&S),++e.Qb)),m=B,p=3;p>=1;--p)e.v[p]=e.v[p-1];e.v[0]=m,++e.Rb}e.J=y(e.b,P-1-e.s)}if(e.s-=P,e.g=o(e.g,a(P)),!e.s){if(e.Rb>=128&&wr(e),e.Qb>=16&&br(e),r[0]=e.g,t[0]=Mt(e.d),!F(e.b))return void Er(e,c(e.g));if(s(h(e.g,R),[4096,0])>=0)return e.lc=0,void(n[0]=0)}}}}function Mr(e){var r,t;e.b||(r={},t=4,e.T||(t=2),Y(r,t),e.b=r),Ur(e.A,e.eb,e.fb),(e.ab!=e.wb||e.Fb!=e.n)&&(A(e.b,e.ab,4096,e.n,274),e.wb=e.ab,e.Fb=e.n)}function Dr(e){var r;for(e.v=t(4),e.a=[],e.d={},e.C=t(192),e.bb=t(12),e.gb=t(12),e.Ob=t(12),e.wc=t(12),e.Z=t(192),e.K=[],e.Lb=t(114),e.U=ft({},4),e._=qr({}),e.i=qr({}),e.A={},e.m=[],e.R=[],e.hb=[],e.mc=t(16),e.x=t(4),e.O=t(4),e.Ub=[Gt],e.vc=[Gt],e.Kc=[0],e.fc=t(5),e.xc=t(128),e.vb=0,e.T=1,e.D=0,e.Fb=-1,e.nb=0,r=0;4096>r;++r)e.a[r]={};for(r=0;4>r;++r)e.K[r]=ft({},6);return e}function br(e){for(var r=0;16>r;++r)e.mc[r]=ht(e.U,r);e.Qb=0}function wr(e){var r,t,o,n,s,i,_,a;for(n=4;128>n;++n)i=Tr(n),o=(i>>1)-1,r=(2|1&i)<<o,e.xc[n]=lt(e.Lb,r-i-1,o,n-r);for(s=0;4>s;++s){for(t=e.K[s],_=s<<6,i=0;e.cc>i;++i)e.R[_+i]=dt(t,i);for(i=14;e.cc>i;++i)e.R[_+i]+=(i>>1)-1-4<<6;for(a=128*s,n=0;4>n;++n)e.hb[a+n]=e.R[_+n];for(;128>n;++n)e.hb[a+n]=e.R[_+Tr(n)]+e.xc[n]}e.Rb=0}function Er(e,r){Nr(e),Wr(e,r&e.y);for(var t=0;5>t;++t)bt(e.d)}function Lr(e,r){var t,o,n,s,i,_,a,c,u,f,m,d,p,h,P,l,v,B,S,g,k,R,M,D,b,w,E,L,C,I,x,N,O,A,H,G,W,T,Y,Z,V,j,$,K,q,J,Q,X,er,rr;if(e.lb!=e.q)return p=e.a[e.q].r-e.q,e.nb=e.a[e.q].j,e.q=e.a[e.q].r,p;if(e.q=e.lb=0,e.Q?(d=e.vb,e.Q=0):d=xr(e),E=e.D,b=F(e.b)+1,2>b)return e.nb=-1,1;for(b>273&&(b=273),Z=0,u=0;4>u;++u)e.x[u]=e.v[u],e.O[u]=z(e.b,-1,e.x[u],273),e.O[u]>e.O[Z]&&(Z=u);if(e.O[Z]>=e.n)return e.nb=Z,p=e.O[Z],Ir(e,p-1),p;if(d>=e.n)return e.nb=e.m[E-1]+4,Ir(e,d-1),d;if(a=y(e.b,-1),v=y(e.b,-e.v[0]-1-1),2>d&&a!=v&&2>e.O[Z])return e.nb=-1,1;if(e.a[0].Hc=e.l,A=r&e.y,e.a[1].z=Zt[e.C[(e.l<<4)+A]>>>2]+nt(Xr(e.A,r,e.J),e.l>=7,v,a),st(e.a[1]),B=Zt[2048-e.C[(e.l<<4)+A]>>>2],Y=B+Zt[2048-e.bb[e.l]>>>2],v==a&&(V=Y+zr(e,e.l,A),e.a[1].z>V&&(e.a[1].z=V,it(e.a[1]))),m=d>=e.O[Z]?d:e.O[Z],2>m)return e.nb=e.a[1].j,1;e.a[1].r=0,e.a[0].Yb=e.x[0],e.a[0].Zb=e.x[1],e.a[0].$b=e.x[2],e.a[0].pc=e.x[3],f=m;do e.a[f--].z=268435455;while(f>=2);for(u=0;4>u;++u)if(T=e.O[u],!(2>T)){G=Y+yr(e,u,e.l,A);do s=G+Jr(e.i,T-2,A),x=e.a[T],x.z>s&&(x.z=s,x.r=0,x.j=u,x.t=0);while(--T>=2)}if(D=B+Zt[e.bb[e.l]>>>2],f=e.O[0]>=2?e.O[0]+1:2,d>=f){for(L=0;f>e.m[L];)L+=2;for(;c=e.m[L+1],s=D+Cr(e,c,f,A),x=e.a[f],x.z>s&&(x.z=s,x.r=0,x.j=c+4,x.t=0),f!=e.m[L]||(L+=2,L!=E);++f);}for(t=0;;){if(++t,t==m)return gr(e,t);if(S=xr(e),E=e.D,S>=e.n)return e.vb=S,e.Q=1,gr(e,t);if(++r,O=e.a[t].r,e.a[t].t?(--O,e.a[t].yc?($=e.a[e.a[t].r2].Hc,$=4>e.a[t].j2?7>$?8:11:7>$?7:10):$=e.a[O].Hc,$=U($)):$=e.a[O].Hc,O==t-1?$=e.a[t].j?U($):7>$?9:11:(e.a[t].t&&e.a[t].yc?(O=e.a[t].r2,N=e.a[t].j2,$=7>$?8:11):(N=e.a[t].j,$=4>N?7>$?8:11:7>$?7:10),I=e.a[O],4>N?N?1==N?(e.x[0]=I.Zb,e.x[1]=I.Yb,e.x[2]=I.$b,e.x[3]=I.pc):2==N?(e.x[0]=I.$b,e.x[1]=I.Yb,e.x[2]=I.Zb,e.x[3]=I.pc):(e.x[0]=I.pc,e.x[1]=I.Yb,e.x[2]=I.Zb,e.x[3]=I.$b):(e.x[0]=I.Yb,e.x[1]=I.Zb,e.x[2]=I.$b,e.x[3]=I.pc):(e.x[0]=N-4,e.x[1]=I.Yb,e.x[2]=I.Zb,e.x[3]=I.$b)),e.a[t].Hc=$,e.a[t].Yb=e.x[0],e.a[t].Zb=e.x[1],e.a[t].$b=e.x[2],e.a[t].pc=e.x[3],_=e.a[t].z,a=y(e.b,-1),v=y(e.b,-e.x[0]-1-1),A=r&e.y,o=_+Zt[e.C[($<<4)+A]>>>2]+nt(Xr(e.A,r,y(e.b,-2)),$>=7,v,a),R=e.a[t+1],g=0,R.z>o&&(R.z=o,R.r=t,R.j=-1,R.t=0,g=1),B=_+Zt[2048-e.C[($<<4)+A]>>>2],Y=B+Zt[2048-e.bb[$]>>>2],v!=a||t>R.r&&!R.j||(V=Y+(Zt[e.gb[$]>>>2]+Zt[e.Z[($<<4)+A]>>>2]),R.z>=V&&(R.z=V,R.r=t,R.j=0,R.t=0,g=1)),w=F(e.b)+1,w=w>4095-t?4095-t:w,b=w,!(2>b)){if(b>e.n&&(b=e.n),!g&&v!=a&&(q=Math.min(w-1,e.n),P=z(e.b,0,e.x[0],q),P>=2)){for(K=U($),H=r+1&e.y,M=o+Zt[2048-e.C[(K<<4)+H]>>>2]+Zt[2048-e.bb[K]>>>2],C=t+1+P;C>m;)e.a[++m].z=268435455;s=M+(J=Jr(e.i,P-2,H),J+yr(e,0,K,H)),x=e.a[C],x.z>s&&(x.z=s,x.r=t+1,x.j=0,x.t=1,x.yc=0)}for(j=2,W=0;4>W;++W)if(h=z(e.b,-1,e.x[W],b),!(2>h)){l=h;do{for(;t+h>m;)e.a[++m].z=268435455;s=Y+(Q=Jr(e.i,h-2,A),Q+yr(e,W,$,A)),x=e.a[t+h],x.z>s&&(x.z=s,x.r=t,x.j=W,x.t=0)}while(--h>=2);if(h=l,W||(j=h+1),w>h&&(q=Math.min(w-1-h,e.n),P=z(e.b,h,e.x[W],q),P>=2)){for(K=7>$?8:11,H=r+h&e.y,n=Y+(X=Jr(e.i,h-2,A),X+yr(e,W,$,A))+Zt[e.C[(K<<4)+H]>>>2]+nt(Xr(e.A,r+h,y(e.b,h-1-1)),1,y(e.b,h-1-(e.x[W]+1)),y(e.b,h-1)),K=U(K),H=r+h+1&e.y,k=n+Zt[2048-e.C[(K<<4)+H]>>>2],M=k+Zt[2048-e.bb[K]>>>2],C=h+1+P;t+C>m;)e.a[++m].z=268435455;s=M+(er=Jr(e.i,P-2,H),er+yr(e,0,K,H)),x=e.a[t+C],x.z>s&&(x.z=s,x.r=t+h+1,x.j=0,x.t=1,x.yc=1,x.r2=t,x.j2=W)}}if(S>b){for(S=b,E=0;S>e.m[E];E+=2);e.m[E]=S,E+=2}if(S>=j){for(D=B+Zt[e.bb[$]>>>2];t+S>m;)e.a[++m].z=268435455;for(L=0;j>e.m[L];)L+=2;for(h=j;;++h)if(i=e.m[L+1],s=D+Cr(e,i,h,A),x=e.a[t+h],x.z>s&&(x.z=s,x.r=t,x.j=i+4,x.t=0),h==e.m[L]){if(w>h&&(q=Math.min(w-1-h,e.n),P=z(e.b,h,i,q),P>=2)){for(K=7>$?7:10,H=r+h&e.y,n=s+Zt[e.C[(K<<4)+H]>>>2]+nt(Xr(e.A,r+h,y(e.b,h-1-1)),1,y(e.b,h-(i+1)-1),y(e.b,h-1)),K=U(K),H=r+h+1&e.y,k=n+Zt[2048-e.C[(K<<4)+H]>>>2],M=k+Zt[2048-e.bb[K]>>>2],C=h+1+P;t+C>m;)e.a[++m].z=268435455;s=M+(rr=Jr(e.i,P-2,H),rr+yr(e,0,K,H)),x=e.a[t+C],x.z>s&&(x.z=s,x.r=t+h+1,x.j=0,x.t=1,x.yc=1,x.r2=t,x.j2=i+4)}if(L+=2,L==E)break}}}}}function Cr(e,r,t,o){var n,s=Q(t);return n=128>r?e.hb[128*s+r]:e.R[(s<<6)+Yr(r)]+e.mc[15&r],n+Jr(e._,t-2,o)}function yr(e,r,t,o){var n;return r?(n=Zt[2048-e.gb[t]>>>2],1==r?n+=Zt[e.Ob[t]>>>2]:(n+=Zt[2048-e.Ob[t]>>>2],n+=wt(e.wc[t],r-2))):(n=Zt[e.gb[t]>>>2],n+=Zt[2048-e.Z[(t<<4)+o]>>>2]),n}function zr(e,r,t){return Zt[e.gb[r]>>>2]+Zt[e.Z[(r<<4)+t]>>>2]}function Fr(e){kr(e),Dt(e.d),gt(e.C),gt(e.Z),gt(e.bb),gt(e.gb),gt(e.Ob),gt(e.wc),gt(e.Lb),et(e.A);for(var r=0;4>r;++r)gt(e.K[r].G);jr(e._,1<<e.Y),jr(e.i,1<<e.Y),gt(e.U.G),e.Q=0,e.lb=0,e.q=0,e.s=0}function Ir(e,r){r>0&&(Z(e.b,r),e.s+=r)}function xr(e){var r=0;return e.D=H(e.b,e.m),e.D>0&&(r=e.m[e.D-2],r==e.n&&(r+=z(e.b,r-1,e.m[e.D-1],273-r))),++e.s,r}function Nr(e){e.b&&e.S&&(e.b.bc=null,e.S=0)}function Or(e){Nr(e),e.d.zb=null}function Ar(e,r){e.ab=r;for(var t=0;r>1<<t;++t);e.cc=2*t}function Hr(e,r){var t=e.T;e.T=r,e.b&&t!=e.T&&(e.wb=-1,e.b=null)}function Gr(e,r){e.fc[0]=9*(5*e.Y+e.eb)+e.fb<<24>>24;for(var t=0;4>t;++t)e.fc[1+t]=e.ab>>8*t<<24>>24;k(r,e.fc,0,5)}function Wr(e,r){if(e.Gc){kt(e.d,e.C,(e.l<<4)+r,1),kt(e.d,e.bb,e.l,0),e.l=7>e.l?7:10,Kr(e._,e.d,0,r);var t=Q(2);mt(e.K[t],e.d,63),Rt(e.d,67108863,26),pt(e.U,e.d,15)}}function Tr(e){return 2048>e?Yt[e]:2097152>e?Yt[e>>10]+20:Yt[e>>20]+40}function Yr(e){return 131072>e?Yt[e>>6]+12:134217728>e?Yt[e>>16]+32:Yt[e>>26]+52}function Zr(e,r,t,o){8>t?(kt(r,e.db,0,0),mt(e.Tb[o],r,t)):(t-=8,kt(r,e.db,0,1),8>t?(kt(r,e.db,1,0),mt(e.Xb[o],r,t)):(kt(r,e.db,1,1),mt(e.dc,r,t-8)))}function Vr(e){e.db=t(2),e.Tb=t(16),e.Xb=t(16),e.dc=ft({},8);for(var r=0;16>r;++r)e.Tb[r]=ft({},3),e.Xb[r]=ft({},3);return e}function jr(e,r){gt(e.db);for(var t=0;r>t;++t)gt(e.Tb[t].G),gt(e.Xb[t].G);gt(e.dc.G)}function $r(e,r,t,o,n){var s,i,_,a,c;for(s=Zt[e.db[0]>>>2],i=Zt[2048-e.db[0]>>>2],_=i+Zt[e.db[1]>>>2],a=i+Zt[2048-e.db[1]>>>2],c=0,c=0;8>c;++c){if(c>=t)return;o[n+c]=s+dt(e.Tb[r],c)}for(;16>c;++c){if(c>=t)return;o[n+c]=_+dt(e.Xb[r],c-8)}for(;t>c;++c)o[n+c]=a+dt(e.dc,c-8-8)}function Kr(e,r,t,o){Zr(e,r,t,o),0==--e.nc[o]&&($r(e,o,e.pb,e.Cc,272*o),e.nc[o]=e.pb)}function qr(e){return Vr(e),e.Cc=[],e.nc=[],e}function Jr(e,r,t){return e.Cc[272*t+r]}function Qr(e,r){for(var t=0;r>t;++t)$r(e,t,e.pb,e.Cc,272*t),e.nc[t]=e.pb}function Ur(e,r,o){var n,s;if(null==e.V||e.u!=o||e.I!=r)for(e.I=r,e.oc=(1<<r)-1,e.u=o,s=1<<e.u+e.I,e.V=t(s),n=0;s>n;++n)e.V[n]=ot({})}function Xr(e,r,t){return e.V[((r&e.oc)<<e.u)+((255&t)>>>8-e.u)]}function et(e){var r,t=1<<e.u+e.I;for(r=0;t>r;++r)gt(e.V[r].ob)}function rt(e,r,t){var o,n,s=1;for(n=7;n>=0;--n)o=t>>n&1,kt(r,e.ob,s,o),s=s<<1|o}function tt(e,r,t,o){var n,s,i,_,a=1,c=1;for(s=7;s>=0;--s)n=o>>s&1,_=c,a&&(i=t>>s&1,_+=1+i<<8,a=i==n),kt(r,e.ob,_,n),c=c<<1|n}function ot(e){return e.ob=t(768),e}function nt(e,r,t,o){var n,s,i=1,_=7,a=0;if(r)for(;_>=0;--_)if(s=t>>_&1,n=o>>_&1,a+=wt(e.ob[(1+s<<8)+i],n),i=i<<1|n,s!=n){--_;break}for(;_>=0;--_)n=o>>_&1,a+=wt(e.ob[i],n),i=i<<1|n;return a}function st(e){e.j=-1,e.t=0}function it(e){e.j=0,e.t=0}function _t(e,r){return e.F=r,e.G=t(1<<r),e}function at(e,r){var t,o=1;for(t=e.F;0!=t;--t)o=(o<<1)+vt(r,e.G,o);return o-(1<<e.F)}function ct(e,r){var t,o,n=1,s=0;for(o=0;e.F>o;++o)t=vt(r,e.G,n),n<<=1,n+=t,s|=t<<o;return s}function ut(e,r,t,o){var n,s,i=1,_=0;for(s=0;o>s;++s)n=vt(t,e,r+i),i<<=1,i+=n,_|=n<<s;return _}function ft(e,r){return e.F=r,e.G=t(1<<r),e}function mt(e,r,t){var o,n,s=1;for(n=e.F;0!=n;)--n,o=t>>>n&1,kt(r,e.G,s,o),s=s<<1|o}function dt(e,r){var t,o,n=1,s=0;for(o=e.F;0!=o;)--o,t=r>>>o&1,s+=wt(e.G[n],t),n=(n<<1)+t;return s}function pt(e,r,t){var o,n,s=1;for(n=0;e.F>n;++n)o=1&t,kt(r,e.G,s,o),s=s<<1|o,t>>=1}function ht(e,r){var t,o,n=1,s=0;for(o=e.F;0!=o;--o)t=1&r,r>>>=1,s+=wt(e.G[n],t),n=n<<1|t;return s}function Pt(e,r,t,o,n){var s,i,_=1;for(i=0;o>i;++i)s=1&n,kt(t,e,r+_,s),_=_<<1|s,n>>=1}function lt(e,r,t,o){var n,s,i=1,_=0;for(s=t;0!=s;--s)n=1&o,o>>>=1,_+=Zt[(2047&(e[r+i]-n^-n))>>>2],i=i<<1|n;return _}function vt(e,r,t){var o,n=r[t];return o=(e.E>>>11)*n,(-2147483648^o)>(-2147483648^e.Ab)?(e.E=o,r[t]=n+(2048-n>>>5)<<16>>16,-16777216&e.E||(e.Ab=e.Ab<<8|l(e.zb),e.E<<=8),0):(e.E-=o,e.Ab-=o,r[t]=n-(n>>>5)<<16>>16,-16777216&e.E||(e.Ab=e.Ab<<8|l(e.zb),e.E<<=8),1)}function Bt(e,r){var t,o,n=0;for(t=r;0!=t;--t)e.E>>>=1,o=e.Ab-e.E>>>31,e.Ab-=e.E&o-1,n=n<<1|1-o,-16777216&e.E||(e.Ab=e.Ab<<8|l(e.zb),e.E<<=8);return n}function St(e){e.Ab=0,e.E=-1;for(var r=0;5>r;++r)e.Ab=e.Ab<<8|l(e.zb)}function gt(e){for(var r=e.length-1;r>=0;--r)e[r]=1024}function kt(e,r,t,s){var i,_=r[t];i=(e.E>>>11)*_,s?(e.Ac=o(e.Ac,n(a(i),[4294967295,0])),e.E-=i,r[t]=_-(_>>>5)<<16>>16):(e.E=i,r[t]=_+(2048-_>>>5)<<16>>16),-16777216&e.E||(e.E<<=8,bt(e))}function Rt(e,r,t){for(var n=t-1;n>=0;--n)e.E>>>=1,1==(r>>>n&1)&&(e.Ac=o(e.Ac,a(e.E))),-16777216&e.E||(e.E<<=8,bt(e))}function Mt(e){return o(o(a(e.Ib),e.qc),[4,0])}function Dt(e){e.qc=Gt,e.Ac=Gt,e.E=-1,e.Ib=1,e.Oc=0}function bt(e){var r,t=c(p(e.Ac,32));if(0!=t||s(e.Ac,[4278190080,0])<0){e.qc=o(e.qc,a(e.Ib)),r=e.Oc;do g(e.zb,r+t),r=255;while(0!=--e.Ib);e.Oc=c(e.Ac)>>>24}++e.Ib,e.Ac=m(n(e.Ac,[16777215,0]),8)}function wt(e,r){return Zt[(2047&(e-r^-r))>>>2]}function Et(e){for(var r,t,o,n=0,s=0,i=e.length,_=[],a=[];i>n;++n,++s){if(r=255&e[n],128&r)if(192==(224&r)){if(n+1>=i)return e;if(t=255&e[++n],128!=(192&t))return e;a[s]=(31&r)<<6|63&t}else{if(224!=(240&r))return e;
if(n+2>=i)return e;if(t=255&e[++n],128!=(192&t))return e;if(o=255&e[++n],128!=(192&o))return e;a[s]=(15&r)<<12|(63&t)<<6|63&o}else{if(!r)return e;a[s]=r}65535==s&&(_.push(String.fromCharCode.apply(String,a)),s=-1)}return s>0&&(a.length=s,_.push(String.fromCharCode.apply(String,a))),_.join("")}function Lt(e){var r,t,o,n=[],s=0,i=e.length;if("object"==typeof e)return e;for(R(e,0,i,n,0),o=0;i>o;++o)r=n[o],r>=1&&127>=r?++s:s+=!r||r>=128&&2047>=r?2:3;for(t=[],s=0,o=0;i>o;++o)r=n[o],r>=1&&127>=r?t[s++]=r<<24>>24:!r||r>=128&&2047>=r?(t[s++]=(192|r>>6&31)<<24>>24,t[s++]=(128|63&r)<<24>>24):(t[s++]=(224|r>>12&15)<<24>>24,t[s++]=(128|r>>6&63)<<24>>24,t[s++]=(128|63&r)<<24>>24);return t}function Ct(e){return e[1]+e[0]}function yt(e,t,o,n){function s(){for(var e,t=(new Date).getTime();rr(a.c.ac);)if(i=Ct(a.c.ac.Sb)/Ct(a.c.Nb),(new Date).getTime()-t>200)return n?n(i):void 0!==_&&r(i,_),Nt(s,0),0;n?n(1):void 0!==_&&r(1,_),e=S(a.c.rc),o?o(e):void 0!==_&&postMessage({action:Ft,cbn:_,result:e})}var i,_,a={};"function"!=typeof o&&(_=o,o=n=0),a.c=w({},Lt(e),Vt(t)),n?n(0):void 0!==_&&r(0,_),Nt(s,0)}function zt(e,t,o){function n(){for(var e,u=0,f=(new Date).getTime();rr(c.d.ac);)if(++u%1e3==0&&(new Date).getTime()-f>200)return _&&(s=Ct(c.d.ac.$.g)/a,o?o(s):void 0!==i&&r(s,i)),Nt(n,0),0;_&&(o?o(1):void 0!==i&&r(1,i)),e=Et(S(c.d.rc)),t?t(e):void 0!==i&&postMessage({action:It,cbn:i,result:e})}var s,i,_,a,c={};"function"!=typeof t&&(i=t,t=o=0),c.d=L({},e),a=Ct(c.d.Nb),_=a>-1,o?o(_?0:-1):void 0!==i&&r(_?0:-1,i),Nt(n,0)}var Ft=1,It=2,xt=3,Nt="function"==typeof setImmediate?setImmediate:setTimeout,Ot=4294967296,At=[4294967295,-Ot],Ht=[0,-0x8000000000000000],Gt=[0,0],Wt=[1,0],Tt=function(){var e,r,t,o=[];for(e=0;256>e;++e){for(t=e,r=0;8>r;++r)0!=(1&t)?t=t>>>1^-306674912:t>>>=1;o[e]=t}return o}(),Yt=function(){var e,r,t,o=2,n=[0,1];for(t=2;22>t;++t)for(r=1<<(t>>1)-1,e=0;r>e;++e,++o)n[o]=t<<24>>24;return n}(),Zt=function(){var e,r,t,o,n=[];for(r=8;r>=0;--r)for(o=1<<9-r-1,e=1<<9-r,t=o;e>t;++t)n[t]=(r<<6)+(e-t<<6>>>9-r-1);return n}(),Vt=function(){var e=[{s:16,f:64,m:0},{s:20,f:64,m:0},{s:19,f:64,m:1},{s:20,f:64,m:1},{s:21,f:128,m:1},{s:22,f:128,m:1},{s:23,f:128,m:1},{s:24,f:255,m:1},{s:25,f:255,m:1}];return function(r){return e[r-1]||e[6]}}();return"undefined"==typeof onmessage||"undefined"!=typeof window&&void 0!==window.document||!function(){onmessage=function(r){r&&r.ic&&(r.ic.action==It?e.decompress(r.ic.ic,r.ic.cbn):r.ic.action==Ft&&e.compress(r.ic.ic,r.ic.Rc,r.ic.cbn))}}(),{compress:yt,decompress:zt}}();this.LZMA=this.LZMA_WORKER=e;