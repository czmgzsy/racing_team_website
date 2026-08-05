/**
 * 赞助商合作页 JS
 * 功能：加载赞助商数据、按 level 分组渲染
 */
(function () {
  'use strict';

  var LEVEL_ORDER = ['gold', 'silver', 'bronze', 'partner'];
  var LEVEL_LABELS = {
    gold: '金牌赞助商',
    silver: '银牌赞助商',
    bronze: '铜牌赞助商',
    partner: '合作伙伴'
  };

  // ====== 初始化 ======
  function init() {
    loadSponsors();
  }

  // ====== 加载赞助商数据 ======
  function loadSponsors() {
    fetch('/api/sponsors')
      .then(function (res) {
        if (!res.ok) throw new Error('网络错误');
        return res.json();
      })
      .then(function (data) {
        var items = data.items || [];
        renderSponsors(items);
      })
      .catch(function () {
        var container = document.getElementById('sponsorsContainer');
        if (container) {
          container.innerHTML = '<div class="state-msg error">数据加载失败，请稍后重试</div>';
        }
      });
  }

  // ====== 渲染赞助商（按 level 分组） ======
  function renderSponsors(items) {
    var container = document.getElementById('sponsorsContainer');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = '<div class="state-msg">暂无赞助商数据</div>';
      return;
    }

    // 按 level 分组
    var byLevel = {};
    items.forEach(function (item) {
      var level = item.level || 'partner';
      if (!byLevel[level]) byLevel[level] = [];
      byLevel[level].push(item);
    });

    var html = '';
    var hasContent = false;

    LEVEL_ORDER.forEach(function (level) {
      var list = byLevel[level];
      if (!list || list.length === 0) return;
      hasContent = true;
      html += renderLevelSection(level, list);
    });

    // 处理未定义 level 的
    Object.keys(byLevel).forEach(function (level) {
      if (LEVEL_ORDER.indexOf(level) === -1) {
        hasContent = true;
        html += renderLevelSection(level, byLevel[level]);
      }
    });

    if (!hasContent) {
      container.innerHTML = '<div class="state-msg">暂无赞助商数据</div>';
      return;
    }

    container.innerHTML = html;

    // 触发淡入动画
    var fadeEls = container.querySelectorAll('.fade-up');
    fadeEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, i * 30);
    });
  }

  // ====== 渲染单个赞助级别区块 ======
  function renderLevelSection(level, list) {
    var label = LEVEL_LABELS[level] || level;
    var badgeClass = LEVEL_ORDER.indexOf(level) !== -1 ? level : 'partner';

    var cardsHtml = '';
    list.forEach(function (item, idx) {
      cardsHtml += renderSponsorCard(item, idx);
    });

    return (
      '<div class="sponsor-level fade-up">' +
        '<div class="level-header">' +
          '<h2 class="level-title">' + label + '</h2>' +
          '<span class="level-badge ' + badgeClass + '">' + list.length + ' 家</span>' +
        '</div>' +
        '<div class="sponsors-grid">' + cardsHtml + '</div>' +
      '</div>'
    );
  }

  // ====== 渲染单个赞助商卡片 ======
  function renderSponsorCard(item, idx) {
    return (
      '<div class="sponsor-card fade-up" style="transition-delay: ' + (idx * 0.03) + 's;">' +
        '<!-- 此处后续上传替换图片 - 赞助商 Logo -->' +
        '<div class="sponsor-logo">' + (item.name ? item.name.charAt(0) : 'LOGO') + '</div>' +
        '<p class="sponsor-name">' + (item.name || '赞助商名称') + '</p>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', init);
})();
