/**
 * 招新页面专属 JS
 * 功能：动态加载岗位列表、动态填充岗位下拉、表单异步提交、loading 状态、toast 反馈
 */

(function () {
  'use strict';

  // ====== Toast 工具 ======
  function showToast(message, type) {
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;
    document.body.appendChild(toast);

    // 触发入场动画
    requestAnimationFrame(function () {
      toast.classList.add('toast-show');
    });

    setTimeout(function () {
      toast.classList.remove('toast-show');
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // ====== 手机号格式校验 ======
  function validatePhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
  }

  // ====== 邮箱格式简单校验 ======
  function validateEmail(email) {
    if (!email) return true; // 选填
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ====== 加载岗位列表 ======
  function loadPosts() {
    var grid = document.getElementById('jobsGrid');
    var select = document.getElementById('postSelect');
    if (!grid && !select) return;

    fetch('/api/recruit/posts')
      .then(function (res) {
        if (!res.ok) throw new Error('网络异常');
        return res.json();
      })
      .then(function (data) {
        var items = (data && data.items) || [];
        if (grid) {
          renderPostCards(grid, items);
        }
        if (select) {
          renderPostOptions(select, items);
        }
        // 重新触发滚动淡入
        if (window.initFadeUpPage) {
          window.initFadeUpPage();
        } else {
          // 兼容：公共 app.js 的 IntersectionObserver 已在 DOMContentLoaded 时观察过
          // 对新加载元素手动触发显示
          var newFades = grid
            ? grid.querySelectorAll('.fade-up')
            : [];
          newFades.forEach(function (el) {
            el.classList.add('is-visible');
          });
        }
      })
      .catch(function () {
        if (grid) {
          grid.innerHTML =
            '<p class="load-error">岗位信息加载失败，请稍后重试</p>';
        }
        if (select) {
          var opt = document.createElement('option');
          opt.value = '';
          opt.textContent = '岗位加载失败';
          select.appendChild(opt);
        }
      });
  }

  // ====== 渲染岗位卡片 ======
  function renderPostCards(grid, items) {
    if (!items || items.length === 0) {
      grid.innerHTML =
        '<p class="load-error">暂无招新岗位，敬请期待</p>';
      return;
    }

    var html = '';
    items.forEach(function (item, index) {
      var delay = (index * 0.05).toFixed(2);
      var reqs = item.requirements || [];
      var reqsHtml = reqs
        .map(function (req) {
          return '<li>' + escapeHtml(req) + '</li>';
        })
        .join('');

      html +=
        '<div class="job-card fade-up" style="transition-delay: ' +
        delay +
        's;">' +
        '<div class="job-header">' +
        '<div class="job-title">' +
        escapeHtml(item.title || '未命名岗位') +
        '</div>' +
        '<span class="job-dept">' +
        escapeHtml(item.department || '未分组') +
        '</span>' +
        '</div>';

      if (item.description) {
        html +=
          '<p class="job-desc">' + escapeHtml(item.description) + '</p>';
      }

      if (reqsHtml) {
        html += '<ul class="job-reqs">' + reqsHtml + '</ul>';
      }

      html += '</div>';
    });

    grid.innerHTML = html;
  }

  // ====== 渲染岗位下拉选项 ======
  function renderPostOptions(select, items) {
    if (!items || items.length === 0) return;

    // 保留第一项 placeholder
    while (select.options.length > 1) {
      select.remove(1);
    }

    items.forEach(function (item) {
      var opt = document.createElement('option');
      opt.value = item.id || '';
      opt.textContent =
        item.title +
        (item.department ? '（' + item.department + '）' : '');
      // 同时把 department 存在 dataset 方便提交时读取
      if (item.department) {
        opt.setAttribute('data-department', item.department);
      }
      select.appendChild(opt);
    });
  }

  // ====== HTML 转义 ======
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ====== 报名表单提交 ======
  function initApplyForm() {
    var form = document.getElementById('applyForm');
    if (!form) return;

    var submitBtn = form.querySelector('.form-submit');
    var originalText = submitBtn ? submitBtn.textContent : '提交报名';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var email = form.querySelector('#email').value.trim();
      var postSelect = form.querySelector('#postSelect');
      var postId = postSelect ? postSelect.value : '';
      var department = postSelect && postSelect.selectedIndex > 0
        ? postSelect.options[postSelect.selectedIndex].getAttribute(
            'data-department'
          ) || ''
        : '';
      var introduction = form.querySelector('#introduction').value.trim();

      // 前端校验
      if (!name) {
        showToast('请填写姓名', 'error');
        return;
      }
      if (!phone) {
        showToast('请填写联系电话', 'error');
        return;
      }
      if (!validatePhone(phone)) {
        showToast('请输入正确的手机号码', 'error');
        return;
      }
      if (email && !validateEmail(email)) {
        showToast('请输入正确的邮箱格式', 'error');
        return;
      }
      if (!postId) {
        showToast('请选择意向岗位', 'error');
        return;
      }
      if (!introduction) {
        showToast('请填写个人介绍', 'error');
        return;
      }

      // loading 状态
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中…';
        submitBtn.classList.add('btn-loading');
      }

      var payload = {
        name: name,
        phone: phone,
        email: email,
        postId: postId,
        department: department,
        introduction: introduction
      };

      fetch('/api/recruit/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) {
            return res.json().catch(function () {
              throw new Error('提交失败');
            }).then(function (data) {
              throw new Error(
                (data && data.message) || '提交失败，请稍后重试'
              );
            });
          }
          return res.json().catch(function () {
            return {};
          });
        })
        .then(function () {
          showToast('报名提交成功！我们会尽快与你联系', 'success');
          form.reset();
        })
        .catch(function (err) {
          showToast(err.message || '提交失败，请稍后重试', 'error');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('btn-loading');
          }
        });
    });
  }

  // ====== 页面初始化 ======
  document.addEventListener('DOMContentLoaded', function () {
    loadPosts();
    initApplyForm();
  });
})();
