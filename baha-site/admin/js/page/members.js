/**
 * 队员管理页 JS
 */

(function () {
  'use strict';

  var editingId = null;

  window.loadMembers = function () {
    AdminAPI.get('/members').then(function (res) {
      var items = (res && res.items) || [];
      var statusFilter = document.getElementById('filter-status').value;
      var gradeFilter = document.getElementById('filter-grade').value.trim();
      if (statusFilter) {
        items = items.filter(function (i) { return i.status === statusFilter; });
      }
      if (gradeFilter) {
        items = items.filter(function (i) {
          return String(i.grade || '').indexOf(gradeFilter) !== -1;
        });
      }
      renderList(items);
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  function renderList(items) {
    var tbody = document.getElementById('member-list');
    var empty = document.getElementById('empty-state');
    if (!items.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = items.map(function (item) {
      var avatar = item.avatar || item.avatarUrl || '';
      var avatarHtml = avatar
        ? '<img class="avatar-thumb" src="' + avatar + '" alt="">'
        : '<img class="avatar-thumb" src="" alt="" style="background:#eee;">';
      var statusHtml = item.status === 'current'
        ? '<span class="badge badge-success">现任</span>'
        : '<span class="badge badge-default">往届</span>';
      return '<tr>' +
        '<td>' + avatarHtml + escapeHtml(item.name || '') + '</td>' +
        '<td>' + escapeHtml(item.position || '--') + '</td>' +
        '<td>' + escapeHtml(item.department || '--') + '</td>' +
        '<td>' + escapeHtml(item.grade || '--') + '</td>' +
        '<td>' + statusHtml + '</td>' +
        '<td>' +
          '<div class="table-actions">' +
            '<button class="btn btn-secondary btn-sm" onclick="editMember(\'' + item.id + '\')">编辑</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deleteMember(\'' + item.id + '\')">删除</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.openModal = function () {
    editingId = null;
    document.getElementById('modal-title').textContent = '新增队员';
    document.getElementById('member-id').value = '';
    document.getElementById('member-name').value = '';
    document.getElementById('member-position').value = '';
    document.getElementById('member-department').value = '';
    document.getElementById('member-grade').value = '';
    document.getElementById('member-status').value = 'current';
    document.getElementById('member-bio').value = '';
    document.getElementById('avatar-input').value = '';
    document.getElementById('avatar-url').textContent = '';
    document.getElementById('avatar-preview').innerHTML = '<span class="upload-placeholder">暂无头像</span>';
    document.getElementById('member-modal').classList.add('show');
  };

  window.closeModal = function () {
    document.getElementById('member-modal').classList.remove('show');
  };

  window.editMember = function (id) {
    AdminAPI.get('/members').then(function (res) {
      var items = (res && res.items) || [];
      var item = items.find(function (i) { return String(i.id) === String(id); });
      if (!item) {
        showToast('未找到队员', 'error');
        return;
      }
      editingId = id;
      document.getElementById('modal-title').textContent = '编辑队员';
      document.getElementById('member-id').value = item.id || '';
      document.getElementById('member-name').value = item.name || '';
      document.getElementById('member-position').value = item.position || '';
      document.getElementById('member-department').value = item.department || '';
      document.getElementById('member-grade').value = item.grade || '';
      document.getElementById('member-status').value = item.status || 'current';
      document.getElementById('member-bio').value = item.bio || '';
      var avatarUrl = item.avatar || item.avatarUrl || '';
      document.getElementById('avatar-input').value = avatarUrl;
      document.getElementById('avatar-url').textContent = avatarUrl;
      if (avatarUrl) {
        document.getElementById('avatar-preview').innerHTML = '<img src="' + avatarUrl + '" alt="avatar">';
      } else {
        document.getElementById('avatar-preview').innerHTML = '<span class="upload-placeholder">暂无头像</span>';
      }
      document.getElementById('member-modal').classList.add('show');
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  window.deleteMember = function (id) {
    confirmDialog('确定要删除这位队员吗？', function () {
      AdminAPI.del('/members/' + id).then(function (res) {
        if (res && res.success === false) {
          showToast(res.message || '删除失败', 'error');
        } else {
          showToast('删除成功', 'success');
          loadMembers();
        }
      }).catch(function (err) {
        showToast('删除失败：' + (err.message || ''), 'error');
      });
    });
  };

  window.saveMember = function () {
    var name = document.getElementById('member-name').value.trim();
    if (!name) {
      showToast('请输入姓名', 'error');
      return;
    }
    var data = {
      name: name,
      position: document.getElementById('member-position').value,
      department: document.getElementById('member-department').value,
      grade: document.getElementById('member-grade').value,
      status: document.getElementById('member-status').value,
      avatar: document.getElementById('avatar-input').value,
      bio: document.getElementById('member-bio').value
    };

    var promise;
    if (editingId) {
      promise = AdminAPI.put('/members/' + editingId, data);
    } else {
      promise = AdminAPI.post('/members', data);
    }
    promise.then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '保存失败', 'error');
      } else {
        showToast('保存成功', 'success');
        closeModal();
        loadMembers();
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || ''), 'error');
    });
  };

  window.uploadAvatarImage = function () {
    var fileInput = document.getElementById('avatar-file');
    fileInput.click();
    fileInput.onchange = function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      AdminAPI.upload(file).then(function (data) {
        var url = data.url || (data.data && data.data.url);
        if (!url) throw new Error('无返回URL');
        document.getElementById('avatar-input').value = url;
        document.getElementById('avatar-url').textContent = url;
        document.getElementById('avatar-preview').innerHTML = '<img src="' + url + '" alt="avatar">';
        showToast('上传成功', 'success');
      }).catch(function (err) {
        showToast('上传失败：' + (err.message || ''), 'error');
      });
    };
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

})();
