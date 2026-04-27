/**
 * weavo-runtime — single inline script appended to every generated site.
 *
 * Handles the behaviors the AI-generated HTML needs but can't reliably wire
 * itself: smooth scroll, mobile nav, accordions, and scroll-triggered
 * reveals. Designed as a self-contained ~1.5kb closure that requires zero
 * setup beyond the data-* attributes the AI emits.
 *
 * Convention contract (system prompt instructs the AI to use these):
 *   • a[href^="#"]                         → smooth scroll to id with header offset
 *   • [data-mobile-toggle]                 → button that toggles 'hidden' on the menu
 *   • [data-mobile-menu]                   → the menu container (starts with class="hidden md:flex …")
 *   • [data-accordion-trigger]             → click target inside an accordion item
 *   • [data-accordion-content]             → the panel that toggles 'hidden'
 *   • [data-reveal]                        → element fades + slides up on scroll into view
 *   • [data-reveal-stagger]                → children fade up staggered (80ms each)
 *
 * Multi-page SPA polyfill (preview + published parity with Next.js export):
 * Some AI outputs ship a single HTML with several `<div class="page-section">`
 * blocks toggled by `onclick="showPage('slug')"`. We define a window-level
 * showPage that flips `.active` between page-sections — same id-resolution
 * heuristics as src/lib/export/spa-routes.ts (homePage / page-home / home).
 * Defined only if the AI didn't already provide a working one.
 *
 * Hidden scrollbars (cosmetic, no behavior change):
 * Generated sites get a small CSS block that hides native scrollbars while
 * keeping scroll behavior intact (overflow stays auto). Avoids the iframe
 * preview's double-scrollbar look and matches the polished aesthetic of
 * modern marketing sites. Lives next to the runtime so injection is one
 * pass and one idempotency marker.
 *
 * Idempotency: injected script is wrapped in <!-- WEAVO_RUNTIME --> markers
 * so the post-processor can detect and skip re-injection on chat edits.
 */

export const WEAVO_RUNTIME_MARKER = "WEAVO_RUNTIME";

// Hide native scrollbars (page still scrolls — only the visual indicator goes
// away). Matches the published-site polish of most premium marketing sites
// and removes the double-scrollbar look in the preview iframe.
const HIDE_SCROLLBAR_CSS = `html,body{scrollbar-width:none;-ms-overflow-style:none;}html::-webkit-scrollbar,body::-webkit-scrollbar,*::-webkit-scrollbar{width:0;height:0;display:none;}`;

// Hand-written, ES5-compatible, no deps. Comments stripped at runtime; the
// version we ship inline is the same source — clarity for future you matters
// more than the ~200 bytes you'd save by minifying.
const RUNTIME_SOURCE = `(function(){
if(typeof window.showPage!=='function'){window.showPage=function(slug){if(!slug)return;var pages=document.querySelectorAll('.page-section');if(!pages.length)return;var s=String(slug).toLowerCase();var target=null;for(var i=0;i<pages.length;i++){var id=(pages[i].id||'').toLowerCase();if(id===s||id===s+'page'||id==='page-'+s||id==='page_'+s){target=pages[i];break;}}if(!target)return;for(var j=0;j<pages.length;j++)pages[j].classList.remove('active');target.classList.add('active');try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);}};}
var EASE='cubic-bezier(.22,1,.36,1)';
var inViewport=function(el){var r=el.getBoundingClientRect();return r.top<window.innerHeight&&r.bottom>0;};
var hide=function(el){el.style.willChange='opacity, transform';el.style.opacity='0';el.style.transform='translateY(28px)';el.style.transition='opacity .65s '+EASE+', transform .65s '+EASE;};
var show=function(el,d){el.style.transitionDelay=(d||0)+'ms';el.style.opacity='1';el.style.transform='none';setTimeout(function(){el.style.willChange='auto';},900+(d||0));};
var solos=document.querySelectorAll('[data-reveal]');
var groups=document.querySelectorAll('[data-reveal-stagger]');
// Skip elements already in viewport on initial paint — they should appear instantly without flash.
var hideIfBelow=function(el){if(!inViewport(el))hide(el);};
solos.forEach(hideIfBelow);
groups.forEach(function(g){if(!inViewport(g))Array.prototype.forEach.call(g.children,hide);});
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;requestAnimationFrame(function(){if(el.hasAttribute('data-reveal-stagger')){Array.prototype.forEach.call(el.children,function(c,i){show(c,i*70);});}else{show(el);}});io.unobserve(el);});},{rootMargin:'0px 0px -60px 0px',threshold:0.01});
solos.forEach(function(el){if(!inViewport(el))io.observe(el);});
groups.forEach(function(el){if(!inViewport(el))io.observe(el);});
}
document.addEventListener('click',function(e){
var a=e.target.closest&&e.target.closest('a[href^="#"]');
if(a){var id=a.getAttribute('href').slice(1);if(id){var t=document.getElementById(id);if(t){e.preventDefault();var h=document.querySelector('header,nav');var off=h?h.offsetHeight:0;window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-off-8,behavior:'smooth'});var m=document.querySelector('[data-mobile-menu]');if(m&&!m.classList.contains('hidden'))m.classList.add('hidden');}return;}}
var mt=e.target.closest&&e.target.closest('[data-mobile-toggle]');
if(mt){e.preventDefault();var menu=document.querySelector('[data-mobile-menu]');if(menu)menu.classList.toggle('hidden');return;}
var at=e.target.closest&&e.target.closest('[data-accordion-trigger]');
if(at){var item=at.closest('[data-accordion-item]')||at.parentElement;if(item){var content=item.querySelector('[data-accordion-content]');if(content)content.classList.toggle('hidden');var icon=at.querySelector('[data-accordion-icon]');if(icon){icon.style.transition='transform .3s ease';icon.style.transform=content&&!content.classList.contains('hidden')?'rotate(180deg)':'rotate(0deg)';}}}
});
})();`;

/**
 * Returns the inline <style>+<script> block to inject before </body>.
 */
export function getRuntimeScriptTag(): string {
  return `<!-- ${WEAVO_RUNTIME_MARKER} -->\n<style>${HIDE_SCROLLBAR_CSS}</style>\n<script>${RUNTIME_SOURCE}</script>\n<!-- /${WEAVO_RUNTIME_MARKER} -->`;
}
