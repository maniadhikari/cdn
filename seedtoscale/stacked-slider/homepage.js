"use strict";(()=>{var f=".card-list",c=".card-item",r=".next",m=".prev",h=function(t){let e=t.find(c),s=t.find(c).length-1;if(e.hasClass("activeNow")){let n=e.slice(s).addClass("transformPrev");t.find(f).prepend(n)}},p=function(t){let e=t.find(c);if(e.hasClass("activeNow")){let s=e.slice(0,1).removeClass("transformThis activeNow");t.find(f).append(s)}};function u(t){t.find(c).first().removeClass("transformPrev").addClass("transformThis").next().addClass("activeNow"),setTimeout(function(){p(t),a(t)},200)}function i(t){t.find(c).removeClass("transformPrev").removeClass("activeNow").last().addClass("activeNow"),setTimeout(function(){h(t),a(t)},150)}function v(t){let e=t.find(c),s=0,n=0;function l(){n<s&&u(t),n>s&&i(t)}e.bind("touchstart",o=>{s=o.changedTouches[0].screenX}),e.bind("touchend",o=>{n=o.changedTouches[0].screenX,l()})}var a=t=>{let e=t.find(c);for(let s=0;s<e.length;s++)e[s].style.setProperty("--top-multiplier",`${s}`),e[s].style.zIndex=`${e.length-s}`,e[s].style.setProperty("--scale-multiplier",`${1-s/40}`)};function d(t){v(t),t.find(r).click(function(){u(t)}),t.find(m).click(function(){i(t)}),a(t)}d($("#container1"));d($("#container2"));})();
