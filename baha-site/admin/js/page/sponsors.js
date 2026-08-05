/**
 * 赞助商管理页 JS
 */

(function () {
  'use strict';

  var editingId = null;

  var LEVEL_MAP = {
    gold: { label: '金牌', cls: 'badge-warning' },
    silver: { label: '银牌', cls: 'badge-default' },
    bronze: { label: '铜牌', cls: 'badge-default' },
    partner: { label: '合作伙伴', cls: 'badge-primary' }
  };

  window.loadSponsors = function () {
    AdminAPI.get('/sponsors').then(function (res) {
      var items = (res && res.items) || [];
      // 按 sort 排序
      items.sort(function (a, b) { return (a.sort || 0) - (b.sort || 0); });
      renderList(items);
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  function renderList(items) {
    var tbody = document.getElementById('sponsor-list');
    var empty = document.getElementById('empty-state');
    if (!items.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = items.map(function (item) {
      var logo = item.logo || item.logoUrl || '';
      var logoHtml = logo
        ? '<img src="' + logo + '" alt="" style="width:80px; height:40px; object-fit:contain; background:#fafafa; border-radius:4px;">'
        : '<span style="color:#ccc; font-size:12px;">无Logo</span>';
      var lv = LEVEL_MAP[item.level] || { label: item.level || '--', cls: 'badge-default' };
      var website = item.website ? '<a href="' + escapeAttr(item.website) + '" target="_blank" style="color:#4a90d9;">' + escapeHtml(item.website) + '</a>' : '--';
      return '<tr>' +
        '<td>' + logoHtml + '</td>' +
        '<td>' + escapeHtml(item.name || '') + '</td>' +
        '<td><span class="badge ' + lv.cls + '">' + lv.label + '</span></td>' +
        '<td>' + website + '</td>' +
        '<td>' + (item.sort != null ? item.sort : 0) + '</td>' +
        '<td>' +
          '<div class="table-actions">' +
            '<button class="btn btn-secondary btn-sm" onclick="editSponsor(\'' + item.id + '\')">编辑</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deleteSponsor(\'' + item.id + '\')">删除</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  window.openModal = function () {
    editingId = null;
    document.getElementById('modal-title').textContent = '新增赞助商';
    document.getElementById('sponsor-id').value = '';
    document.getElementById('sponsor-name').value = '';
    document.getElementById('sponsor-level').value = 'gold';
    document.getElementById('sponsor-website').value = '';
    document.getElementById('sponsor-intro').value = '';
    document.getElementById('sponsor-sort').value = 0;
    document.getElementById('logo-input').value = '';
    document.getElementById('logo-url').textContent = '';
    document.getElementById('logo-preview').innerHTML = '<span class="upload-placeholder">暂无Logo</span>';
    document.getElementById('sponsor-modal').classList.add('show');
  };

  window.closeModal = function () {
    document.getElementById('sponsor-modal').classList.remove('show');
  };

  window.editSponsor = function (id) {
    AdminAPI.get('/sponsors').then(function (res) {
      var items = (res && res.items) || [];
      var item = items.find(function (i) { return String(i.id) === String(id); });
      if (!item) {
        showToast('未找到赞助商', 'error');
        return;
      }
      editingId = id;
      document.getElementById('modal-title').textContent = '编辑赞助商';
      document.getElementById('sponsor-id').value = item.id || '';
      document.getElementById('sponsor-name').value = item.name || '';
      document.getElementById('sponsor-level').value = item.level || 'gold';
      document.getElementById('sponsor-website').value = item.website || '';
      document.getElementById('sponsor-intro').value = item.intro || item.description || '';
      document.getElementById('sponsor-sort').value = item.sort != null ? item.sort : 0;
      var logoUrl = item.logo || item.logoUrl || '';
      document.getElementById('logo-input').value = logoUrl;
      document.getElementById('logo-url').textContent = logoUrl;
      if (logoUrl) {
        document.getElementById('logo-preview').innerHTML = '<img src="' + logoUrl + '" alt="logo">';
      } else {
        document.getElementById('logo-preview').innerHTML = '<span class="upload-placeholder">暂无Logo</span>';
      }
      document.getElementById('sponsor-modal').classList.add('show');
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  window.deleteSponsor = function (id) {
    confirmDialog('确定要删除这个赞助商吗？', function () {
      AdminAPI.del('/sponsors/' + id).then(function (res) {
        if (res && res.success === false) {
          showToast(res.message || '删除失败', 'error');
        } else {
          showToast('删除成功', 'success');
          loadSponsors();
        }
      }).catch(function (err) {
        showToast('删除失败：' + (err.message || ''), 'error');
      });
    });
  };

  window.saveSponsor = function () {
    var name = document.getElementById('sponsor-name').value.trim();
    if (!name) {
      showToast('请输入名称', 'error');
      return;
    }
    var data = {
      name: name,
      level: document.getElementById('sponsor-level').value,
      website: document.getElementById('sponsor-website').value,
      logo: document.getElementById('logo-input').value,
      intro: document.getElementById('sponsor-intro').value,
      sort: parseInt(document.getElementById('sponsor-sort').value, 10) || 0
    };

    var promise;
    if (editingId) {
      promise = AdminAPI.put('/sponsors/' + editingId, data);
    } else {
      promise = AdminAPI.post('/sponsors', data);
    }
    promise.then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '保存失败', 'error');
      } else {
        showToast('保存成功', 'success');
        closeModal();
        loadSponsors();
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || ''), 'error');
    });
  };

  window.uploadLogoImage = function () {
    var fileInput = document.getElementById('logo-file');
    fileInput.click();
    fileInput.onchange = function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      AdminAPI.upload(file).then(function (data) {
        var url = data.url || (data.data && data.data.url);
        if (!url) throw new Error('无返回URL');
        document.getElementById('logo-input').value = url;
        document.getElementById('logo-url').textContent = url;
        document.getElementById('logo-preview').innerHTML = '<img src="' + url + '" alt="logo">';
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

  function escapeAttr(str) {
    return escapeHtml(str);
  }

})();
