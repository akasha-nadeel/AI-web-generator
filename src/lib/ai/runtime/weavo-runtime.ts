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
 * Idempotency: injected script is wrapped in <!-- WEAVO_RUNTIME --> markers
 * so the post-processor can detect and skip re-injection on chat edits.
 */

export const WEAVO_RUNTIME_MARKER = "WEAVO_RUNTIME";

// Hand-written, ES5-compatible, no deps. Comments stripped at runtime; the
// version we ship inline is the same source — clarity for future you matters
// more than the ~200 bytes you'd save by minifying.
const RUNTIME_SOURCE = `(function(){
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
 * Returns the inline <script> block to inject before </body>.
 */
export function getRuntimeScriptTag(): string {
  return `<!-- ${WEAVO_RUNTIME_MARKER} -->\n<script>${RUNTIME_SOURCE}</script>\n<!-- /${WEAVO_RUNTIME_MARKER} -->`;
}
