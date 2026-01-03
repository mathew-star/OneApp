'use client';

import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export type NavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface UnifiedHeaderProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  socialItems?: { label: string; link: string }[];
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'GitHub', link: 'https://github.com' }
  ]
}) => {
  // PillNav refs and state
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  // StaggeredMenu refs
  const [Menuopen, setMenuOpen] = useState(false);

  const [menuMounted, setMenuMounted] = useState(false);


  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const ease = 'power3.out';

  // PillNav layout effect
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    // Initial load animation
    const logoEl = logoRef.current;
    const navItems = navItemsRef.current;

    if (logoEl) {
      gsap.set(logoEl, { scale: 0 });
      gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
    }

    if (navItems) {
      gsap.set(navItems, { width: 0, overflow: 'hidden' });
      gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  // PillNav handlers
  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  // StaggeredMenu setup

  useLayoutEffect(() => {
  if (!menuMounted) return;

  const ctx = gsap.context(() => {
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const icon = iconRef.current;
    const textInner = textInnerRef.current;

    if (!panel || !plusH || !plusV || !icon || !textInner) return;

    const preLayers = preContainer
      ? (Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[])
      : [];

    preLayerElsRef.current = preLayers;

    gsap.set([panel, ...preLayers], { xPercent: 100 });
    gsap.set(plusH, { rotate: 0, transformOrigin: '50% 50%' });
    gsap.set(plusV, { rotate: 90, transformOrigin: '50% 50%' });
    gsap.set(icon, { rotate: 0 });
    gsap.set(textInner, { yPercent: 0 });
  });

  return () => ctx.revert();
}, [menuMounted]);




  const buildOpenTimeline = useCallback(() => {
  const panel = panelRef.current;
  const layers = preLayerElsRef.current;

  if (!panel) return null;

  openTlRef.current?.kill();
  closeTweenRef.current?.kill();

  const items = Array.from(
    panel.querySelectorAll('.sm-panel-itemLabel')
  ) as HTMLElement[];

  const socialsTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
  const socialsLinks = Array.from(
    panel.querySelectorAll('.sm-socials-link')
  ) as HTMLElement[];

  gsap.set(items, { yPercent: 140, rotate: 10 });
  gsap.set(socialsTitle, { opacity: 0 });
  gsap.set(socialsLinks, { y: 25, opacity: 0 });

  const tl = gsap.timeline({ paused: true });

  layers.forEach((el, i) => {
    tl.to(el, {
      xPercent: 0,
      duration: 0.5,
      ease: 'power4.out',
    }, i * 0.07);
  });

  const panelStart = layers.length * 0.07 + 0.08;

  tl.to(panel, {
    xPercent: 0,
    duration: 0.65,
    ease: 'power4.out',
  }, panelStart);

  tl.to(items, {
    yPercent: 0,
    rotate: 0,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.1,
  }, panelStart + 0.15);

  if (socialsTitle) {
    tl.to(socialsTitle, { opacity: 1, duration: 0.4 }, panelStart + 0.4);
  }

  tl.to(socialsLinks, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.08,
  }, panelStart + 0.45);

  openTlRef.current = tl;
  return tl;
}, []);


  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
        
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
        setMenuMounted(false);
      }
    });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);







  const toggleMenu = useCallback(() => {
  if (!Menuopen) {
    setMenuMounted(true);
    setMenuOpen(true);
    animateIcon(true);
    animateText(true);
  } else {
    closeMenu();
  }
}, [Menuopen]);

const closeMenu = useCallback(() => {
  setMenuOpen(false);
  animateIcon(false);
  animateText(false);

  const panel = panelRef.current;
  if (!panel) {
    setMenuMounted(false);
    return;
  }

  closeTweenRef.current = gsap.to(panel, {
    xPercent: 100,
    duration: 0.6,
    ease: 'power4.inOut',
    onComplete: () => {
      setMenuMounted(false);
    },
  });
}, [animateIcon, animateText]);




  useEffect(() => {
  if (!Menuopen || !menuMounted) return;

  requestAnimationFrame(() => {
    const tl = buildOpenTimeline();
    tl?.play(0);
  });
}, [Menuopen, menuMounted, buildOpenTimeline]);


useEffect(() => {
  document.body.style.overflow = Menuopen ? 'hidden' : '';
  return () => {
    document.body.style.overflow = '';
  };
}, [Menuopen]);


useEffect(() => {
  if (!Menuopen) return;

  const handler = (e: MouseEvent) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(e.target as Node) &&
      toggleBtnRef.current &&
      !toggleBtnRef.current.contains(e.target as Node)
    ) {
      closeMenu();
    }
  };

  document.addEventListener('mousedown', handler);
  return () => document.removeEventListener('mousedown', handler);
}, [Menuopen, closeMenu]);


  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:');

  const isHashLink = (href: string) => href.startsWith('#');
  
  const isRouterLink = (href?: string) => href && !isExternalLink(href) && !isHashLink(href);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    closeMenu();

    // Wait for menu unmount + layout reflow
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) {
          console.warn('Target not found:', id);
          return;
        }

        const yOffset = -120; // header height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      });
    });
  };

  return (
    <>
      {/* Desktop PillNav */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] hidden md:block">
        <nav
          className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
          aria-label="Primary"
        >
          {isRouterLink(items?.[0]?.href) ? (
            <Link
              href={items[0].href}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={logoRef}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden bg-black/35"
              style={{ width: '42px', height: '42px' }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || '#'}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden bg-black/25"
              style={{ width: '42px', height: '42px' }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
            </a>
          )}

          <div
            ref={navItemsRef}
            className="relative items-center rounded-full hidden md:flex ml-2 bg-black/35"
            style={{ height: '42px' }}
          >
            <ul role="menubar" className="list-none flex items-stretch m-0 p-[3px] h-full gap-[3px]">
              {items.map((item, i) => {
                const isActive = activeHref === item.href;
                const isHash = isHashLink(item.href);

                return (
                  <li key={item.href} role="none" className="flex h-full">
                    {isRouterLink(item.href) ? (
                      <Link
                        role="menuitem"
                        href={item.href}
                        className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-[18px] bg-gray-950 text-white"
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block bg-white"
                          aria-hidden="true"
                          ref={el => {
                            circleRefs.current[i] = el;
                          }}
                        />
                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                          <span className="pill-label relative z-[2] inline-block leading-[1]">
                            {item.label}
                          </span>
                          <span
                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-gray-950"
                            aria-hidden="true"
                          >
                            {item.label}
                          </span>
                        </span>
                        {isActive && (
                          <span
                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4] bg-white"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        onClick={isHash ? (e) => {
                          e.preventDefault();
                          const el = document.querySelector(item.href);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } : undefined}
                        className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-[18px] bg-gray-950 text-white"
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        <span
                          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block bg-white"
                          aria-hidden="true"
                          ref={el => {
                            circleRefs.current[i] = el;
                          }}
                        />
                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                          <span className="pill-label relative z-[2] inline-block leading-[1]">
                            {item.label}
                          </span>
                          <span
                            className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-gray-950"
                            aria-hidden="true"
                          >
                            {item.label}
                          </span>
                        </span>
                        {isActive && (
                          <span
                            className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4] bg-white"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Header - Always visible */}
      <header
        className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between p-6 bg-transparent z-[1001] pointer-events-none"
        aria-label="Main navigation header"
      >
        <Link href="/" className="flex items-center select-none pointer-events-auto" aria-label="Logo">
          <img
            src={logo}
            alt={logoAlt}
            className="block h-8 w-auto object-contain"
            draggable={false}
          />
        </Link>

        <button
          ref={toggleBtnRef}
          className="relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none text-white pointer-events-auto"
          aria-label={Menuopen ? 'Close menu' : 'Open menu'}
          aria-expanded={Menuopen}
          onClick={toggleMenu}
          type="button"
        >
          <span
            className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap"
            aria-hidden="true"
          >
            <span ref={textInnerRef} className="flex flex-col leading-none">
              {textLines.map((l, i) => (
                <span className="block h-[1em] leading-none" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>

          <span
            ref={iconRef}
            className="relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              ref={plusHRef}
              className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
            />
            <span
              ref={plusVRef}
              className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
            />
          </span>
        </button>
      </header>

      {/* Mobile StaggeredMenu - Only mounts when open */}
      {menuMounted    && (
        <div className="md:hidden fixed top-0 left-0 w-screen h-screen z-[1000]">
          <div className="staggered-menu-wrapper relative w-full h-full">
            <div
              ref={preLayersRef}
              className="sm-prelayers absolute top-0 right-0 bottom-0 z-[5]"
              aria-hidden="true"
            >
              {['#1a1a1f', '#2d2d35'].map((c, i) => (
                <div
                  key={i}
                  className="sm-prelayer absolute top-0 right-0 h-full w-full"
                  style={{ background: c }}
                />
              ))}
            </div>

            <aside
              ref={panelRef}
              className="absolute top-0 right-0 h-full bg-black/30 flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-10 backdrop-blur-[12px] w-full"
              style={{ WebkitBackdropFilter: 'blur(12px)' }}
              aria-hidden={!Menuopen}
            >
              <div className="flex-1 flex flex-col gap-5">
                <ul className="list-none m-0 p-0 flex flex-col gap-2" role="list">
                  {items.map((it, idx) => {
                    const isHash = isHashLink(it.href);
                    
                    return (
                      <li className="relative overflow-hidden leading-none" key={it.label + idx}>
                        <a
                          href={it.href}
                          onClick={(e) => {
                            if (isHash) {
                              e.preventDefault();
                              scrollToSection(it.href);
                            } else {
                              closeMenu();
                            }
                          }}
                          className="relative text-white font-semibold text-[3rem] cursor-pointer leading-none tracking-[-2px] uppercase inline-block no-underline hover:text-purple-600 transition-colors duration-200"
                          aria-label={it.ariaLabel}
                        >
                          <span className="sm-panel-itemLabel inline-block">
                            {it.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {socialItems && socialItems.length > 0 && (
                  <div className="mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                    <h3 className="sm-socials-title m-0 text-base font-medium text-purple-600">Socials</h3>
                    <ul className="list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                      {socialItems.map((s, i) => (
                        <li key={s.label + i}>
                          <a
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm-socials-link text-[1.2rem] font-medium text-white no-underline hover:text-purple-600 transition-colors duration-300"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
};

export default UnifiedHeader;