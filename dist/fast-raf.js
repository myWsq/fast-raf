!function(n){"function"==typeof define&&define.amd?define(n):n()}(function(){var n=!1,i="undefined"==typeof window,e=!i&&(window.requestAnimationFrame||window.webkitRequestAnimationFrame);function o(i){for(var e=window.FAST_RAF.count,o=window.FAST_RAF.map,t=0,d=Object.keys(o);t<d.length;t++){var A=Number(d[t]),F=o[A];F&&(F(i),delete o[A])}n=!1,e!==window.FAST_RAF.count&&w()}function w(){if(!e)throw new Error("window.requestAnimationFrame is undefined.");n||(n=!0,e(o))}i||window.FAST_RAF||(window.FAST_RAF={map:{},count:0}),i||(window.requestAnimationFrame=function(n){var i=window.FAST_RAF.count+1;return window.FAST_RAF.map[i]=n,window.FAST_RAF.count=i,w(),i},window.cancelAnimationFrame=function(n){delete window.FAST_RAF.map[n]})});
//# sourceMappingURL=fast-raf.js.map