/**
 * 联系我们页面专属 JS
 * 功能：留言表单异步提交、loading 状态、toast 反馈
 */

(function () {
  'use strict';

  // ====== Toast 工具 ======
  function showToast(message, type) {
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;
    document.body.appendChild(toast);

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

  // ====== 邮箱格式校验 ======
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ====== 留言表单提交 ======
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var submitBtn = form.querySelector('.form-submit');
    var originalText = submitBtn ? submitBtn.textContent : '发送留言';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var subject = form.querySelector('#subject').value.trim();
      var message = form.querySelector('#message').value.trim();

      // 前端校验
      if (!name) {
        showToast('请填写姓名', 'error');
        return;
      }
      if (!email) {
        showToast('请填写邮箱', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showToast('请输入正确的邮箱格式', 'error');
        return;
      }
      if (!subject) {
        showToast('请填写主题', 'error');
        return;
      }
      if (!message) {
        showToast('请填写留言内容', 'error');
        return;
      }

      // loading 状态
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中…';
        submitBtn.classList.add('btn-loading');
      }

      var payload = {
        name: name,
        email: email,
        subject: subject,
        message: message
      };

      fetch('/api/contact/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) {
            return res.json().catch(function () {
              throw new Error('发送失败');
            }).then(function (data) {
              throw new Error(
                (data && data.message) || '发送失败，请稍后重试'
              );
            });
          }
          return res.json().catch(function () {
            return {};
          });
        })
        .then(function () {
          showToast('留言已发送，感谢你的反馈！', 'success');
          form.reset();
        })
        .catch(function (err) {
          showToast(err.message || '发送失败，请稍后重试', 'error');
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
    initContactForm();
  });
})();
