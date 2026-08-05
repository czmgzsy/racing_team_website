/**
 * 队员风采页 JS
 * 功能：加载队员数据、Tab 切换（现任/往届）、届别筛选、网格渲染
 */
(function () {
  'use strict';

  var currentStatus = 'current';
  var currentGeneration = '';
  var allMembers = [];
  var allGenerations = [];

  // ====== 初始化 ======
  function init() {
    loadMembers();
    bindTabs();
    bindGenerationFilter();
  }

  // ====== 加载队员数据 ======
  function loadMembers() {
    fetch('/api/members?status=' + currentStatus)
      .then(function (res) {
        if (!res.ok) throw new Error('网络错误');
        return res.json();
      })
      .then(function (data) {
        allMembers = data.items || [];
        allGenerations = data.generations || [];
        renderGenerationOptions();
        renderMembers();
      })
      .catch(function () {
        var grid = document.getElementById('membersGrid');
        if (grid) {
          grid.innerHTML = '<div class="state-msg error" style="grid-column: 1 / -1;">数据加载失败，请稍后重试</div>';
        }
      });
  }

  // ====== 渲染届别下拉选项 ======
  function renderGenerationOptions() {
    var select = document.getElementById('generationSelect');
    if (!select) return;

    var html = '<option value="">全部</option>';
    allGenerations.forEach(function (gen) {
      var selected = gen === currentGeneration ? ' selected' : '';
      html += '<option value="' + gen + '"' + selected + '>' + gen + '届</option>';
    });
    select.innerHTML = html;
  }

  // ====== Tab 切换 ======
  function bindTabs() {
    var tabButtons = document.getElementById('tabButtons');
    if (!tabButtons) return;

    var buttons = tabButtons.querySelectorAll('.tab-btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var status = btn.getAttribute('data-status');
        if (status === currentStatus) return;

        currentStatus = status;
        currentGeneration = '';
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // 重置下拉
        var select = document.getElementById('generationSelect');
        if (select) select.value = '';

        loadMembers();
      });
    });
  }

  // ====== 届别筛选 ======
  function bindGenerationFilter() {
    var select = document.getElementById('generationSelect');
    if (!select) return;

    select.addEventListener('change', function () {
      currentGeneration = select.value;
      renderMembers();
    });
  }

  // ====== 渲染队员网格 ======
  function renderMembers() {
    var grid = document.getElementById('membersGrid');
    if (!grid) return;

    var items = allMembers;
    if (currentGeneration) {
      items = allMembers.filter(function (item) {
        return String(item.generation) === String(currentGeneration);
      });
    }

    if (items.length === 0) {
      grid.innerHTML = '<div class="state-msg" style="grid-column: 1 / -1;">暂无队员数据</div>';
      return;
    }

    var html = '';
    items.forEach(function (item, idx) {
      html += renderMemberCard(item, idx);
    });

    grid.innerHTML = html;

    // 触发淡入动画
    var fadeEls = grid.querySelectorAll('.fade-up');
    fadeEls.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('is-visible');
      }, i * 40);
    });
  }

  // ====== 渲染单张队员卡片 ======
  function renderMemberCard(item, idx) {
    var tags = '';
    if (item.generation) {
      tags += '<span class="member-tag">' + item.generation + '届</span>';
    }
    if (item.department) {
      tags += '<span class="member-tag">' + item.department + '</span>';
    }

    return (
      '<div class="member-card fade-up" style="transition-delay: ' + (idx * 0.04) + 's;">' +
        '<!-- 此处后续上传替换图片 - 队员头像 -->' +
        '<div class="member-avatar">头像</div>' +
        '<h3 class="member-name">' + (item.name || '姓名') + '</h3>' +
        '<p class="member-position">' + (item.position || '职位') + '</p>' +
        '<div class="member-tags">' + tags + '</div>' +
      '</div>'
    );
  }

  document.addEventListener('DOMContentLoaded', init);
})();
