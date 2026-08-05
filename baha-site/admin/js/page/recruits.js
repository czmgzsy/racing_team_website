/**
 * 招新管理页 JS
 */

(function () {
  'use strict';

  var editingPostId = null;
  var currentTab = 'posts';

  // 切换 Tab
  window.switchTab = function (tab) {
    currentTab = tab;
    var tabs = document.querySelectorAll('.inline-tab');
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tab);
    });
    document.getElementById('tab-posts').style.display = tab === 'posts' ? 'block' : 'none';
    document.getElementById('tab-applications').style.display = tab === 'applications' ? 'block' : 'none';
    if (tab === 'posts') {
      loadPosts();
    } else {
      loadApplications();
    }
  };

  // === 岗位管理 ===
  window.loadPosts = function () {
    AdminAPI.get('/recruit-posts').then(function (res) {
      var items = (res && res.items) || [];
      renderPosts(items);
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  function renderPosts(items) {
    var tbody = document.getElementById('post-list');
    var empty = document.getElementById('posts-empty');
    if (!items.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = items.map(function (item) {
      var openBadge = item.open || item.isOpen
        ? '<span class="badge badge-success">招聘中</span>'
        : '<span class="badge badge-default">已关闭</span>';
      return '<tr>' +
        '<td>' + escapeHtml(item.title || '') + '</td>' +
        '<td>' + escapeHtml(item.department || '--') + '</td>' +
        '<td>' + openBadge + '</td>' +
        '<td>' +
          '<div class="table-actions">' +
            '<button class="btn btn-secondary btn-sm" onclick="editPost(\'' + item.id + '\')">编辑</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deletePost(\'' + item.id + '\')">删除</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.openPostModal = function () {
    editingPostId = null;
    document.getElementById('post-modal-title').textContent = '新增岗位';
    document.getElementById('post-id').value = '';
    document.getElementById('post-title').value = '';
    document.getElementById('post-department').value = '';
    document.getElementById('post-description').value = '';
    document.getElementById('post-requirements').value = '';
    document.getElementById('post-open').value = 'true';
    document.getElementById('post-modal').classList.add('show');
  };

  window.closePostModal = function () {
    document.getElementById('post-modal').classList.remove('show');
  };

  window.editPost = function (id) {
    AdminAPI.get('/recruit-posts').then(function (res) {
      var items = (res && res.items) || [];
      var item = items.find(function (i) { return String(i.id) === String(id); });
      if (!item) {
        showToast('未找到岗位', 'error');
        return;
      }
      editingPostId = id;
      document.getElementById('post-modal-title').textContent = '编辑岗位';
      document.getElementById('post-id').value = item.id || '';
      document.getElementById('post-title').value = item.title || '';
      document.getElementById('post-department').value = item.department || '';
      document.getElementById('post-description').value = item.description || '';
      var req = item.requirements;
      if (Array.isArray(req)) req = req.join('\n');
      document.getElementById('post-requirements').value = req || '';
      document.getElementById('post-open').value = item.open === false || item.isOpen === false ? 'false' : 'true';
      document.getElementById('post-modal').classList.add('show');
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  window.deletePost = function (id) {
    confirmDialog('确定要删除这个岗位吗？', function () {
      AdminAPI.del('/recruit-posts/' + id).then(function (res) {
        if (res && res.success === false) {
          showToast(res.message || '删除失败', 'error');
        } else {
          showToast('删除成功', 'success');
          loadPosts();
        }
      }).catch(function (err) {
        showToast('删除失败：' + (err.message || ''), 'error');
      });
    });
  };

  window.savePost = function () {
    var title = document.getElementById('post-title').value.trim();
    if (!title) {
      showToast('请输入岗位名称', 'error');
      return;
    }
    var reqText = document.getElementById('post-requirements').value;
    var requirements = reqText
      ? reqText.split('\n').map(function (s) { return s.trim(); }).filter(Boolean)
      : [];
    var data = {
      title: title,
      department: document.getElementById('post-department').value,
      description: document.getElementById('post-description').value,
      requirements: requirements,
      open: document.getElementById('post-open').value === 'true'
    };

    var promise;
    if (editingPostId) {
      promise = AdminAPI.put('/recruit-posts/' + editingPostId, data);
    } else {
      promise = AdminAPI.post('/recruit-posts', data);
    }
    promise.then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '保存失败', 'error');
      } else {
        showToast('保存成功', 'success');
        closePostModal();
        loadPosts();
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || ''), 'error');
    });
  };

  // === 报名记录 ===
  var STATUS_MAP = {
    pending: { label: '待审核', cls: 'badge-warning' },
    reviewed: { label: '已审核', cls: 'badge-primary' },
    approved: { label: '已通过', cls: 'badge-success' },
    rejected: { label: '已拒绝', cls: 'badge-danger' }
  };

  window.loadApplications = function () {
    AdminAPI.get('/recruit-applications').then(function (res) {
      var items = (res && res.items) || [];
      var statusFilter = document.getElementById('filter-app-status').value;
      if (statusFilter) {
        items = items.filter(function (i) { return i.status === statusFilter; });
      }
      renderApplications(items);
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  function renderApplications(items) {
    var tbody = document.getElementById('application-list');
    var empty = document.getElementById('apps-empty');
    if (!items.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = items.map(function (item) {
      var st = STATUS_MAP[item.status] || { label: item.status || '未知', cls: 'badge-default' };
      return '<tr>' +
        '<td>' + escapeHtml(item.name || '') + '</td>' +
        '<td>' + escapeHtml(item.phone || '--') + '</td>' +
        '<td>' + escapeHtml(item.email || '--') + '</td>' +
        '<td>' + escapeHtml(item.postTitle || item.intendedPost || '--') + '</td>' +
        '<td><span class="badge ' + st.cls + '">' + st.label + '</span></td>' +
        '<td>' + formatDate(item.createdAt || item.submitTime || '') + '</td>' +
        '<td>' +
          '<div class="table-actions">' +
            '<button class="btn btn-secondary btn-sm" onclick="viewApplication(\'' + item.id + '\')">查看</button>' +
            '<select class="status-select" onchange="updateAppStatus(\'' + item.id + '\', this.value)" value="' + (item.status || '') + '">' +
              '<option value="">更改状态</option>' +
              '<option value="pending">待审核</option>' +
              '<option value="reviewed">已审核</option>' +
              '<option value="approved">已通过</option>' +
              '<option value="rejected">已拒绝</option>' +
            '</select>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.updateAppStatus = function (id, status) {
    if (!status) return;
    AdminAPI.put('/recruit-applications/' + id + '/status', { status: status }).then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '更新失败', 'error');
      } else {
        showToast('状态已更新', 'success');
        loadApplications();
      }
    }).catch(function (err) {
      showToast('更新失败：' + (err.message || ''), 'error');
    });
  };

  window.viewApplication = function (id) {
    AdminAPI.get('/recruit-applications').then(function (res) {
      var items = (res && res.items) || [];
      var item = items.find(function (i) { return String(i.id) === String(id); });
      if (!item) {
        showToast('未找到记录', 'error');
        return;
      }
      var st = STATUS_MAP[item.status] || { label: item.status || '未知', cls: 'badge-default' };
      var html =
        '<div class="form-group"><label>姓名</label><div>' + escapeHtml(item.name || '') + '</div></div>' +
        '<div class="form-group"><label>电话</label><div>' + escapeHtml(item.phone || '--') + '</div></div>' +
        '<div class="form-group"><label>邮箱</label><div>' + escapeHtml(item.email || '--') + '</div></div>' +
        '<div class="form-group"><label>意向岗位</label><div>' + escapeHtml(item.postTitle || item.intendedPost || '--') + '</div></div>' +
        '<div class="form-group"><label>状态</label><div><span class="badge ' + st.cls + '">' + st.label + '</span></div></div>' +
        '<div class="form-group"><label>提交时间</label><div>' + formatDate(item.createdAt || item.submitTime || '') + '</div></div>' +
        (item.message || item.content ? '<div class="form-group"><label>附言</label><div style="white-space:pre-wrap; background:#f5f5f7; padding:10px; border-radius:6px; font-size:13px;">' + escapeHtml(item.message || item.content || '') + '</div></div>' : '');
      document.getElementById('application-detail').innerHTML = html;
      document.getElementById('application-modal').classList.add('show');
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  window.closeApplicationModal = function () {
    document.getElementById('application-modal').classList.remove('show');
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
