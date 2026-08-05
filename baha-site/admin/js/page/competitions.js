/**
 * 赛事管理页 JS
 */

(function () {
  'use strict';

  var editingId = null;
  var galleryImages = []; // 当前图集 URL 列表

  // 加载赛事列表
  window.loadCompetitions = function () {
    AdminAPI.get('/competitions').then(function (res) {
      var items = (res && res.items) || [];
      renderList(items);
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  function renderList(items) {
    var tbody = document.getElementById('competition-list');
    var empty = document.getElementById('empty-state');
    if (!items.length) {
      tbody.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    tbody.innerHTML = items.map(function (item) {
      return '<tr>' +
        '<td>' + (item.id || '--') + '</td>' +
        '<td>' + escapeHtml(item.title || '') + '</td>' +
        '<td>' + (item.year || '--') + '</td>' +
        '<td>' + escapeHtml(item.location || '--') + '</td>' +
        '<td>' + escapeHtml(item.result || '--') + '</td>' +
        '<td>' +
          '<div class="table-actions">' +
            '<button class="btn btn-secondary btn-sm" onclick="editCompetition(\'' + item.id + '\')">编辑</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deleteCompetition(\'' + item.id + '\')">删除</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  // 打开新增模态框
  window.openModal = function () {
    editingId = null;
    galleryImages = [];
    document.getElementById('modal-title').textContent = '新增赛事';
    document.getElementById('competition-id').value = '';
    document.getElementById('competition-title').value = '';
    document.getElementById('competition-year').value = '';
    document.getElementById('competition-date').value = '';
    document.getElementById('competition-location').value = '';
    document.getElementById('competition-result').value = '';
    document.getElementById('competition-description').value = '';
    document.getElementById('cover-input').value = '';
    document.getElementById('cover-url').textContent = '';
    document.getElementById('cover-preview').innerHTML = '<span class="upload-placeholder">暂无图片</span>';
    renderGallery();
    document.getElementById('competition-modal').classList.add('show');
  };

  // 关闭模态框
  window.closeModal = function () {
    document.getElementById('competition-modal').classList.remove('show');
  };

  // 编辑
  window.editCompetition = function (id) {
    AdminAPI.get('/competitions').then(function (res) {
      var items = (res && res.items) || [];
      var item = items.find(function (i) { return String(i.id) === String(id); });
      if (!item) {
        showToast('未找到赛事', 'error');
        return;
      }
      editingId = id;
      galleryImages = (item.gallery && item.gallery.slice()) || [];
      document.getElementById('modal-title').textContent = '编辑赛事';
      document.getElementById('competition-id').value = item.id || '';
      document.getElementById('competition-title').value = item.title || '';
      document.getElementById('competition-year').value = item.year || '';
      document.getElementById('competition-date').value = item.date || '';
      document.getElementById('competition-location').value = item.location || '';
      document.getElementById('competition-result').value = item.result || '';
      document.getElementById('competition-description').value = item.description || '';
      var coverUrl = item.coverImage || item.cover || '';
      document.getElementById('cover-input').value = coverUrl;
      document.getElementById('cover-url').textContent = coverUrl;
      if (coverUrl) {
        document.getElementById('cover-preview').innerHTML = '<img src="' + coverUrl + '" alt="cover">';
      } else {
        document.getElementById('cover-preview').innerHTML = '<span class="upload-placeholder">暂无图片</span>';
      }
      renderGallery();
      document.getElementById('competition-modal').classList.add('show');
    }).catch(function (err) {
      showToast('加载失败：' + (err.message || ''), 'error');
    });
  };

  // 删除
  window.deleteCompetition = function (id) {
    confirmDialog('确定要删除这条赛事记录吗？', function () {
      AdminAPI.del('/competitions/' + id).then(function (res) {
        if (res && res.success === false) {
          showToast(res.message || '删除失败', 'error');
        } else {
          showToast('删除成功', 'success');
          loadCompetitions();
        }
      }).catch(function (err) {
        showToast('删除失败：' + (err.message || ''), 'error');
      });
    });
  };

  // 保存
  window.saveCompetition = function () {
    var title = document.getElementById('competition-title').value.trim();
    var year = document.getElementById('competition-year').value;
    if (!title) {
      showToast('请输入赛事标题', 'error');
      return;
    }
    if (!year) {
      showToast('请输入年份', 'error');
      return;
    }
    var data = {
      title: title,
      year: parseInt(year, 10),
      date: document.getElementById('competition-date').value,
      location: document.getElementById('competition-location').value,
      result: document.getElementById('competition-result').value,
      description: document.getElementById('competition-description').value,
      coverImage: document.getElementById('cover-input').value,
      gallery: galleryImages
    };

    var promise;
    if (editingId) {
      promise = AdminAPI.put('/competitions/' + editingId, data);
    } else {
      promise = AdminAPI.post('/competitions', data);
    }
    promise.then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '保存失败', 'error');
      } else {
        showToast('保存成功', 'success');
        closeModal();
        loadCompetitions();
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || ''), 'error');
    });
  };

  // 封面上传
  window.uploadCoverImage = function () {
    var fileInput = document.getElementById('cover-file');
    fileInput.click();
    fileInput.onchange = function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      AdminAPI.upload(file).then(function (data) {
        var url = data.url || (data.data && data.data.url);
        if (!url) throw new Error('无返回URL');
        document.getElementById('cover-input').value = url;
        document.getElementById('cover-url').textContent = url;
        document.getElementById('cover-preview').innerHTML = '<img src="' + url + '" alt="cover">';
        showToast('上传成功', 'success');
      }).catch(function (err) {
        showToast('上传失败：' + (err.message || ''), 'error');
      });
    };
  };

  // 图集上传
  window.addGalleryImage = function () {
    var fileInput = document.getElementById('gallery-file');
    fileInput.click();
    fileInput.onchange = function () {
      var files = fileInput.files;
      if (!files || !files.length) return;
      var remaining = 12 - galleryImages.length;
      if (remaining <= 0) {
        showToast('最多上传 12 张图片', 'error');
        return;
      }
      var toUpload = Array.prototype.slice.call(files, 0, remaining);
      var uploads = toUpload.map(function (f) {
        return AdminAPI.upload(f).then(function (data) {
          var url = data.url || (data.data && data.data.url);
          if (url) galleryImages.push(url);
        });
      });
      Promise.all(uploads).then(function () {
        renderGallery();
        showToast('上传完成', 'success');
        fileInput.value = '';
      }).catch(function (err) {
        showToast('上传失败：' + (err.message || ''), 'error');
      });
    };
  };

  function renderGallery() {
    var list = document.getElementById('gallery-list');
    list.innerHTML = galleryImages.map(function (url, idx) {
      return '<div class="gallery-item">' +
        '<img src="' + url + '" alt="gallery">' +
        '<button type="button" class="gallery-remove" onclick="removeGalleryImage(' + idx + ')" title="删除">&times;</button>' +
      '</div>';
    }).join('');
  }

  window.removeGalleryImage = function (idx) {
    galleryImages.splice(idx, 1);
    renderGallery();
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

})();
