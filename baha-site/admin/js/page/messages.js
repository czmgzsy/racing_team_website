/**
 * 留言管理页 JS
 */

(function () {
  'use strict';

  window.loadMessages = function () {
    AdminAPI.get('/messages').then(function (res) {
      var items = (res && res.items) || [];
      var readFilter = document.getElementById('filter-read').value;
      if (readFilter !== '') {
        var wantRead = readFilter === 'true';
        items = items.filter(function (i) {
          var isRead = i.read === true || i.isRead === true;
          return isRead === wantRead;
        });
      }
      renderList(items);
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  function renderList(items) {
    var tbody = document.getElementById('message-list');
    var empty = document.getElementById('empty-state');
    if (!items.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = items.map(function (item) {
      var isRead = item.read === true || item.isRead === true;
      var readBadge = isRead
        ? '<span class="badge badge-default">已读</span>'
        : '<span class="badge badge-warning">未读</span>';
      return '<tr>' +
        '<td>' + escapeHtml(item.name || '') + '</td>' +
        '<td>' + escapeHtml(item.email || '--') + '</td>' +
        '<td>' + escapeHtml(item.subject || item.title || '--') + '</td>' +
        '<td>' + readBadge + '</td>' +
        '<td>' + formatDate(item.createdAt || item.submitTime || '') + '</td>' +
        '<td>' +
          '<div class="table-actions">' +
            '<button class="btn btn-secondary btn-sm" onclick="viewMessage(\'' + item.id + '\')">查看</button>' +
            (isRead ? '' : '<button class="btn btn-primary btn-sm" onclick="markRead(\'' + item.id + '\')">标已读</button>') +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.viewMessage = function (id) {
    AdminAPI.get('/messages').then(function (res) {
      var items = (res && res.items) || [];
      var item = items.find(function (i) { return String(i.id) === String(id); });
      if (!item) {
        showToast('未找到留言', 'error');
        return;
      }
      // 查看时自动标记已读
      var isRead = item.read === true || item.isRead === true;
      if (!isRead) {
        AdminAPI.put('/messages/' + id + '/read', {}).catch(function () {});
      }
      var html =
        '<div class="form-group"><label>姓名</label><div>' + escapeHtml(item.name || '') + '</div></div>' +
        '<div class="form-group"><label>邮箱</label><div>' + escapeHtml(item.email || '--') + '</div></div>' +
        '<div class="form-group"><label>主题</label><div>' + escapeHtml(item.subject || item.title || '--') + '</div></div>' +
        '<div class="form-group"><label>提交时间</label><div>' + formatDate(item.createdAt || item.submitTime || '') + '</div></div>' +
        '<div class="form-group"><label>留言内容</label><div style="white-space:pre-wrap; background:#f5f5f7; padding:12px; border-radius:6px; font-size:13px; line-height:1.6;">' + escapeHtml(item.message || item.content || '--') + '</div></div>';
      document.getElementById('message-detail').innerHTML = html;
      document.getElementById('message-modal').classList.add('show');
      loadMessages(); // 刷新列表状态
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  window.closeMessageModal = function () {
    document.getElementById('message-modal').classList.remove('show');
  };

  window.markRead = function (id) {
    AdminAPI.put('/messages/' + id + '/read', {}).then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '操作失败', 'error');
      } else {
        showToast('已标记为已读', 'success');
        loadMessages();
      }
    }).catch(function (err) {
      showToast('操作失败：' + (err.message || ''), 'error');
    });
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatDate(d) {
    if (!d) return '--';
    var date = new Date(d);
    if (isNaN(date.getTime())) return String(d);
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var h = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    return y + '-' + m + '-' + day + ' ' + h + ':' + min;
  }

})();
