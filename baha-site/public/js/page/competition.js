/**
 * 赛事历程页 JS
 * 功能：加载赛事数据、年份筛选、时间线渲染、图集 lightbox
 */
(function () {
  'use strict';

  var currentYear = 'all';
  var allCompetitions = [];
  var allYears = [];

  // ====== 初始化 ======
  function init() {
    loadCompetitions();
    initLightbox();
  }

  // ====== 加载赛事数据 ======
  function loadCompetitions() {
    fetch('/api/competitions')
      .then(function (res) {
        if (!res.ok) throw new Error('网络错误');
        return res.json();
      })
      .then(function (data) {
        allCompetitions = data.items || [];
        allYears = data.years || [];
        renderYearFilter();
        renderTimeline();
      })
      .catch(function () {
        var timeline = document.getElementById('timeline');
        if (timeline) {
          timeline.innerHTML = '<div class="state-msg error">数据加载失败，请稍后重试</div>';
        }
      });
  }

  // ====== 渲染年份筛选器 ======
  function renderYearFilter() {
    var filter = document.getElementById('yearFilter');
    if (!filter) return;

    var html = '<button class="year-btn active" data-year="all">全部</button>';
    allYears.forEach(function (year) {
      html += '<button class="year-btn" data-year="' + year + '">' + year + '</button>';
    });
    filter.innerHTML = html;

    // 绑定事件
    var buttons = filter.querySelectorAll('.year-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var year = btn.getAttribute('data-year');
        if (year === currentYear) return;
        currentYear = year;
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderTimeline();
      });
    });
  }

  // ====== 渲染时间线 ======
  function renderTimeline() {
    var timeline = document.getElementById('timeline');
    if (!timeline) return;

    var items = allCompetitions;
    if (currentYear !== 'all') {
      items = allCompetitions.filter(function (item) {
        return String(item.year) === String(currentYear);
      });
    }

    if (items.length === 0) {
      timeline.innerHTML = '<div class="state-msg">暂无赛事数据</div>';
      return;
    }

    // 按年份倒序 + 按日期倒序分组
    var byYear = {};
    items.forEach(function (item) {
      var y = item.year || '未知';
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(item);
    });

    var years = Object.keys(byYear).sort(function (a, b) {
      return Number(b) - Number(a);
    });

    var html = '';
    years.forEach(function (year) {
      html += '<div class="timeline-year-marker fade-up"><h3>' + year + '</h3></div>';
      html += '<div class="timeline-cards">';

      // 每组内按日期倒序
      var yearItems = byYear[year].sort(function (a, b) {
        return (b.date || '').localeCompare(a.date || '');
      });

      yearItems.forEach(function (item, idx) {
        html += renderCompetitionCard(item, idx);
      });

      html += '</div>';
    });

    timeline.innerHTML = html;

    // 重新触发淡入动画
    if (window.initFadeUp) {
      window.initFadeUp();
    } else {
      // 手动触发
      var fadeEls = timeline.querySelectorAll('.fade-up');
      fadeEls.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('is-visible');
        }, i * 50);
      });
    }
  }

  // ====== 渲染单张赛事卡片 ======
  function renderCompetitionCard(item, idx) {
    var galleryHtml = '';
    var gallery = item.gallery || [];
    if (gallery.length > 0) {
      galleryHtml = '<div class="competition-gallery">';
      gallery.forEach(function (img) {
        galleryHtml += '<div class="gallery-item" data-img="' + (img.url || '') + '" title="查看大图">赛事图集</div>';
      });
      galleryHtml += '</div>';
    }

    return (
      '<div class="competition-card fade-up" style="transition-delay: ' + (idx * 0.05) + 's;">' +
        '<!-- 此处后续上传替换图片 - 赛事封面图 -->' +
        '<div class="competition-cover">赛事封面</div>' +
        '<div class="competition-meta">' +
          '<span>📅 ' + (item.date || '日期待定') + '</span>' +
          '<span>📍 ' + (item.location || '地点待定') + '</span>' +
        '</div>' +
        '<h3 class="competition-title">' + (item.name || '赛事名称') + '</h3>' +
        (item.award ? '<span class="competition-award">🏆 ' + item.award + '</span>' : '') +
        '<p class="competition-desc">' + (item.description || '赛事描述待补充') + '</p>' +
        galleryHtml +
      '</div>'
    );
  }

  // ====== Lightbox 图集查看 ======
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    if (!lightbox) return;

    // 事件委托：点击图集缩略图
    document.addEventListener('click', function (e) {
      var target = e.target;
      if (target.classList && target.classList.contains('gallery-item')) {
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        return false;
      }
    });

    // 点击关闭
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close') || e.target.classList.contains('lightbox-img')) {
        closeLightbox();
      }
    });

    // ESC 关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
