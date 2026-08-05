/**
 * 全站公共 JS
 * 功能：导航栏滚动效果、移动端菜单、滚动淡入动画、加载站点设置和图片
 */

(function () {
  'use strict';

  // 全局存储
  window.SiteData = {
    settings: {},
    images: {},
    pageContent: {}
  };

  // ====== 加载站点设置 ======
  async function loadSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      window.SiteData.settings = data;
      applyLogos();
      applyFooterInfo();
      applyContactInfo();
    } catch (err) {
      console.error('加载站点设置失败:', err);
    }
  }

  // ====== 应用Logo到导航栏 ======
  function applyLogos() {
    const settings = window.SiteData.settings;
    const logoContainer = document.querySelector('.nav-logo');
    if (!logoContainer) return;

    // 找到logo占位元素并替换
    const placeholders = logoContainer.querySelectorAll('.nav-logo-img');
    placeholders.forEach(function (el, index) {
      let logoUrl = '';
      let logoAlt = '';
      let logoClass = '';
      if (index === 0 && settings.schoolLogoUrl) {
        logoUrl = settings.schoolLogoUrl;
        logoAlt = '校徽';
        logoClass = 'school-logo';
      } else if (index === 1 && settings.teamLogoUrl) {
        logoUrl = settings.teamLogoUrl;
        logoAlt = '队徽';
        logoClass = 'team-logo';
      }
      if (logoUrl) {
        const wrapper = document.createElement('div');
        wrapper.className = 'nav-logo-img ' + logoClass;
        const img = document.createElement('img');
        img.src = logoUrl;
        img.alt = logoAlt;
        img.className = 'nav-logo-img-real';
        wrapper.appendChild(img);
        el.replaceWith(wrapper);
      }
    });

    // 应用站点名称
    const logoText = logoContainer.querySelector('.nav-logo-text');
    if (logoText && settings.siteTitle) {
      logoText.textContent = settings.siteTitle;
    }
  }

  // ====== 应用底部信息 ======
  function applyFooterInfo() {
    const settings = window.SiteData.settings;
    
    // 底部关于车队
    const footerAbout = document.querySelector('.footer-col p');
    if (footerAbout && settings.footerAbout) {
      footerAbout.textContent = settings.footerAbout;
    }
    
    // 版权信息
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom && settings.footerCopyright) {
      const yearSpan = footerBottom.querySelector('#year');
      const year = yearSpan ? yearSpan.textContent : new Date().getFullYear();
      footerBottom.innerHTML = settings.footerCopyright.replace('{year}', year);
    }
  }

  // ====== 应用联系信息 ======
  function applyContactInfo() {
    const settings = window.SiteData.settings;
    
    // 地址链接
    const addressCard = document.querySelector('[data-settings-key="addressCard"]');
    if (addressCard && settings.addressUrl) {
      addressCard.href = settings.addressUrl;
    }
    
    // 联系邮箱
    const contactEmail = document.querySelector('[data-content-key="contactEmail"]');
    if (contactEmail && settings.contactEmail) {
      contactEmail.textContent = settings.contactEmail;
    }
    
    // 微信公众号
    const wechatOfficial = document.querySelector('[data-content-key="wechatOfficial"]');
    if (wechatOfficial && settings.wechatOfficial) {
      wechatOfficial.textContent = settings.wechatOfficial;
    }
  }

  // ====== 加载页面图片 ======
  async function loadPageImages(pageName) {
    try {
      const res = await fetch('/api/images/' + pageName);
      const data = await res.json();
      const imageMap = {};
      data.images.forEach(function (img) {
        imageMap[img.key] = img;
      });
      window.SiteData.images[pageName] = imageMap;
      applyImages(pageName);
    } catch (err) {
      console.error('加载页面图片失败:', err);
    }
  }

  // ====== 加载页面文本内容 ======
  async function loadPageContent(pageName) {
    try {
      const res = await fetch('/api/pages/' + pageName);
      const data = await res.json();
      const contentMap = {};
      if (data.sections && Array.isArray(data.sections)) {
        data.sections.forEach(function (sec) {
          contentMap[sec.sectionKey] = sec.content;
        });
      }
      window.SiteData.pageContent[pageName] = contentMap;
      applyPageContent(pageName);
    } catch (err) {
      console.error('加载页面内容失败:', err);
    }
  }

  // ====== 应用页面文本内容到页面 ======
  function applyPageContent(pageName) {
    const content = window.SiteData.pageContent[pageName];
    if (!content) return;

    document.querySelectorAll('[data-content-key]').forEach(function (el) {
      const key = el.getAttribute('data-content-key');
      if (content[key] !== undefined && content[key] !== null && content[key] !== '') {
        const tag = el.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') {
          el.value = content[key];
        } else if (tag === 'img') {
          el.src = content[key];
        } else {
          el.textContent = content[key];
        }
      }
    });
  }

  // ====== 在父容器中查找目标元素（避免全局选中） ======
  function findRelativeTarget(el, selector) {
    let parent = el.parentElement;
    while (parent) {
      const target = parent.querySelector(selector);
      if (target) return target;
      parent = parent.parentElement;
    }
    // 找不到则返回全局查找结果（兼容旧用法）
    return document.querySelector(selector);
  }

  // ====== 应用图片到页面 ======
  function applyImages(pageName) {
    const images = window.SiteData.images[pageName];
    if (!images) return;

    // 查找所有带 data-image-key 的元素
    document.querySelectorAll('[data-image-key]').forEach(function (el) {
      const key = el.getAttribute('data-image-key');
      const imgData = images[key];
      if (!imgData) return;

      // 如果有data-title-target或data-desc-target，说明这是一个元数据元素，只用来传递标题和描述，不显示图片
      const hasTitleTarget = el.hasAttribute('data-title-target');
      const hasDescTarget = el.hasAttribute('data-desc-target');
      
      if (!hasTitleTarget && !hasDescTarget) {
        const tag = el.tagName.toLowerCase();
        // 只给图片容器类元素设置背景图，不给文字元素设置
        const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'strong', 'em'];
        if (tag === 'img') {
          // img标签直接设置src和alt
          el.src = imgData.url;
          el.alt = imgData.altText || imgData.title || '';
        } else if (textTags.indexOf(tag) === -1) {
          // 非文字元素（div, section等）设置背景图
          el.style.backgroundImage = 'url(' + imgData.url + ')';
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
        }
      }

      // 如果有data-title-target，设置标题（在父容器中查找，避免全局选中）
      const titleTarget = el.getAttribute('data-title-target');
      if (titleTarget && imgData.title) {
        const target = findRelativeTarget(el, titleTarget);
        if (target) target.textContent = imgData.title;
      }

      // 如果有data-desc-target，设置描述（在父容器中查找，避免全局选中）
      const descTarget = el.getAttribute('data-desc-target');
      if (descTarget && imgData.description) {
        const target = findRelativeTarget(el, descTarget);
        if (target) target.textContent = imgData.description;
      }
    });
  }

  // ====== 导航栏滚动效果 ======
  function initNavScroll() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;

    function handleScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ====== 移动端汉堡菜单 ======
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu-mobile');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // 点击菜单项关闭
    var links = menu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ====== 滚动淡入动画 ======
  function initFadeUp() {
    var elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // 浏览器不支持时直接显示
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  // ====== 高亮当前导航项 ======
  function initActiveNav() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll('.nav-menu a, .nav-menu-mobile a');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      // 首页特殊处理
      if (href === 'index.html' || href === './index.html') {
        if (currentPath === '/' || currentPath.endsWith('/index.html')) {
          link.classList.add('active');
        }
      } else if (currentPath.endsWith(href)) {
        link.classList.add('active');
      }
    });
  }

  // ====== 自动检测当前页面并加载图片 ======
  function autoLoadPageImages() {
    const path = window.location.pathname;
    let pageName = 'home';
    
    if (path.includes('about.html')) pageName = 'about';
    else if (path.includes('racecar.html')) pageName = 'racecar';
    else if (path.includes('competition.html')) pageName = 'competitions';
    else if (path.includes('member.html')) pageName = 'members';
    else if (path.includes('recruit.html')) pageName = 'recruit';
    else if (path.includes('sponsor.html')) pageName = 'sponsors';
    else if (path.includes('contact.html')) pageName = 'contact';
    
    loadPageImages(pageName);
  }

  // ====== 自动检测当前页面并加载文本内容 ======
  function autoLoadPageContent() {
    const path = window.location.pathname;
    let pageName = 'home';
    
    if (path.includes('about.html')) pageName = 'about';
    else if (path.includes('racecar.html')) pageName = 'racecar';
    else if (path.includes('competition.html')) pageName = 'competitions';
    else if (path.includes('member.html')) pageName = 'members';
    else if (path.includes('recruit.html')) pageName = 'recruit';
    else if (path.includes('sponsor.html')) pageName = 'sponsors';
    else if (path.includes('contact.html')) pageName = 'contact';
    
    loadPageContent(pageName);
  }

  // ====== 回到顶部按钮（小火箭） ======
  function initBackToTop() {
    // 动态创建小火箭按钮
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = `
      <span class="rocket">🚀</span>
      <span class="rocket-flame">🔥</span>
    `;
    btn.style.cssText = `
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, hsl(211 60% 48%) 0%, hsl(211 70% 38%) 100%);
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 24px rgba(30, 100, 200, 0.35);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    `;
    
    // 小火箭图标样式 - 旋转-45度让火箭垂直朝上
    const rocket = btn.querySelector('.rocket');
    rocket.style.cssText = `
      display: block;
      transform: rotate(-45deg);
      transition: transform 0.2s ease;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      font-size: 26px;
      line-height: 1;
    `;
    
    // 火焰样式 - 在火箭正下方
    const flame = btn.querySelector('.rocket-flame');
    flame.style.cssText = `
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%) scale(0);
      font-size: 18px;
      opacity: 0;
      transition: all 0.2s ease;
      filter: blur(1px);
      line-height: 1;
    `;
    
    // hover效果
    btn.onmouseenter = function() {
      btn.style.transform = 'translateY(-4px) scale(1.05)';
      btn.style.boxShadow = '0 12px 32px rgba(30, 100, 200, 0.45)';
      rocket.style.transform = 'rotate(-45deg) translateY(-3px)';
      flame.style.transform = 'translateX(-50%) scale(1.2)';
      flame.style.opacity = '1';
      flame.style.bottom = '-6px';
    };
    btn.onmouseleave = function() {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = '0 8px 24px rgba(30, 100, 200, 0.35)';
      rocket.style.transform = 'rotate(-45deg) translateY(0)';
      flame.style.transform = 'translateX(-50%) scale(0)';
      flame.style.opacity = '0';
      flame.style.bottom = '-10px';
    };
    
    // 点击发射效果
    btn.onclick = function() {
      // 发射动画
      btn.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      btn.style.transform = 'translateY(-100vh) scale(0.5)';
      rocket.style.transform = 'rotate(-45deg) translateY(0)';
      flame.style.transform = 'translateX(-50%) scale(2.5)';
      flame.style.opacity = '1';
      flame.style.bottom = '-4px';
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // 动画结束后重置
      setTimeout(function() {
        btn.style.transition = 'none';
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
        btn.style.transform = 'translateY(0) scale(1)';
        rocket.style.transform = 'rotate(-45deg)';
        flame.style.transform = 'translateX(-50%) scale(0)';
        flame.style.opacity = '0';
        flame.style.bottom = '-10px';
        // 强制重排
        void btn.offsetWidth;
        btn.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, 600);
    };
    
    document.body.appendChild(btn);

    // 滚动显示/隐藏
    function toggleBtn() {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    }
    window.addEventListener('scroll', toggleBtn, { passive: true });
  }

  // ====== 页面初始化 ======
  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initMobileMenu();
    initFadeUp();
    initActiveNav();
    initBackToTop();
    loadSettings();
    autoLoadPageImages();
    autoLoadPageContent();
  });
})();
