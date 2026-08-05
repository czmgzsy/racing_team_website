/**
 * 管理后台公共 JS
 * 功能：登录检查、API 请求封装、通用工具
 */

var AdminAPI = (function () {
  'use strict';

  var BASE = '/api/admin';

  // 统一请求方法
  function request(method, url, data) {
    var options = {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data !== undefined) {
      options.body = JSON.stringify(data);
    }

    return fetch(BASE + url, options).then(function (res) {
      if (res.status === 401) {
        window.location.href = 'login.html';
        throw new Error('未登录');
      }
      return res.json();
    });
  }

  return {
    get: function (url) { return request('GET', url); },
    post: function (url, data) { return request('POST', url, data); },
    put: function (url, data) { return request('PUT', url, data); },
    del: function (url) { return request('DELETE', url); },

    // 上传文件
    upload: function (file, onProgress) {
      var formData = new FormData();
      formData.append('file', file);

      return fetch(BASE + '/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      }).then(function (res) {
        if (res.status === 401) {
          window.location.href = 'login.html';
          throw new Error('未登录');
        }
        return res.json();
      });
    }
  };
})();

// 检查登录状态
function checkAuth() {
  // 如果当前不是登录页，则校验登录状态
  if (window.location.pathname.indexOf('login.html') === -1) {
    AdminAPI.get('/stats').catch(function (err) {
      // 401 时会自动跳转登录页
      console.log('鉴权失败:', err.message);
    });
  }
}

// 加载统计数据
function loadStats() {
  AdminAPI.get('/stats').then(function (data) {
    setText('stat-racecar', data.racecarCount || 0);
    setText('stat-competition', data.competitionCount || 0);
    setText('stat-member', data.memberCount || 0);
    setText('stat-sponsor', data.sponsorCount || 0);
    setText('stat-application', data.applicationCount || 0);
    setText('stat-message', data.messageCount || 0);
  }).catch(function () {
    // 已在 checkAuth 中处理
  });
}

// 退出登录
function logout() {
  AdminAPI.post('/logout').then(function () {
    window.location.href = 'login.html';
  });
}

// 工具：设置元素文本
function setText(id, value) {
  var el = document.getElementById(id);
  if (el) el.textContent = value;
}

// 工具：显示提示
function showToast(message, type) {
  type = type || 'info';
  var toast = document.createElement('div');
  toast.style.cssText =
    'position:fixed;top:20px;left:50%;transform:translateX(-50%);' +
    'padding:12px 24px;border-radius:8px;z-index:9999;' +
    'font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
  if (type === 'success') {
    toast.style.backgroundColor = '#eafaf1';
    toast.style.color = '#1a7f4a';
  } else if (type === 'error') {
    toast.style.backgroundColor = '#fff0f0';
    toast.style.color = '#e64545';
  } else {
    toast.style.backgroundColor = '#fff';
    toast.style.color = '#333';
  }
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(function () { toast.remove(); }, 300);
  }, 2500);
}

// 确认对话框
function confirmDialog(message, onOk) {
  if (window.confirm(message)) {
    onOk();
  }
}
