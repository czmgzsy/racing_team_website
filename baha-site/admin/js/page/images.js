/**
 * 图片管理页面 JS
 */

(function () {
  'use strict';

  var allImages = [];
  var currentPage = 'all';
  var editingId = null;
  var currentImageUrl = '';

  // 页面名称映射
  var pageNames = {
    home: '首页',
    about: '车队介绍',
    racecar: '赛车展示',
    competition: '赛事历程',
    member: '队员风采',
    recruit: '招新',
    sponsor: '赞助商',
    contact: '联系我们'
  };

  // 图片位置说明映射（key → 中文位置描述）
  var positionLabels = {
    // 首页
    'home.hero': '首页·顶部主视觉',
    'home.feature1': '首页·车队亮点·第1张',
    'home.feature2': '首页·车队亮点·第2张',
    'home.feature3': '首页·车队亮点·第3张',
    'home.gallery1': '首页·精彩瞬间·第1张',
    'home.gallery2': '首页·精彩瞬间·第2张',
    'home.gallery3': '首页·精彩瞬间·第3张',
    'home.gallery4': '首页·精彩瞬间·第4张',
    // 车队介绍
    'about.banner': '车队介绍·顶部Banner',
    'about.team1': '车队介绍·团队协作·第1张',
    'about.team2': '车队介绍·团队协作·第2张',
    'about.workshop1': '车队介绍·专业设施·第1张',
    'about.workshop2': '车队介绍·专业设施·第2张',
    'about.workshop3': '车队介绍·专业设施·第3张',
    // 赛车展示
    'racecar.banner': '赛车展示·顶部Banner',
    'racecar.gallery1': '赛车展示·全方位展示·第1张',
    'racecar.gallery2': '赛车展示·全方位展示·第2张',
    'racecar.gallery3': '赛车展示·全方位展示·第3张',
    'racecar.gallery4': '赛车展示·全方位展示·第4张',
    'racecar.detail1': '赛车展示·动力系统·第1张',
    // 赛事历程
    'competition.banner': '赛事历程·顶部Banner',
    'competition.timeline1': '赛事历程·成长足迹·第1张',
    'competition.timeline2': '赛事历程·成长足迹·第2张',
    'competition.timeline3': '赛事历程·成长足迹·第3张',
    'competition.timeline4': '赛事历程·成长足迹·第4张',
    // 队员风采
    'member.banner': '队员风采·顶部Banner',
    'member.life1': '队员风采·精彩瞬间·第1张',
    'member.life2': '队员风采·精彩瞬间·第2张',
    'member.life3': '队员风采·精彩瞬间·第3张',
    'member.life4': '队员风采·精彩瞬间·第4张',
    'member.life5': '队员风采·精彩瞬间·第5张',
    // 招新
    'recruit.banner': '招新·顶部Banner',
    'recruit.gallery1': '招新·车队日常·第1张',
    'recruit.gallery2': '招新·车队日常·第2张',
    'recruit.gallery3': '招新·车队日常·第3张',
    // 赞助商
    'sponsor.banner': '赞助商·顶部Banner',
    // 联系我们
    'contact.banner': '联系我们·顶部Banner'
  };

  // 获取图片位置说明
  function getPositionLabel(img) {
    if (positionLabels[img.key]) {
      return positionLabels[img.key];
    }
    // 如果没有预设，用 page + section 组合
    var pageLabel = pageNames[img.page] || img.page;
    var sectionLabel = img.section || '未分类';
    return pageLabel + '·' + sectionLabel;
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', function () {
    loadImages();
    initFilter();
  });

  // 加载图片列表
  function loadImages() {
    AdminAPI.get('/images').then(function (data) {
      allImages = (data.images || []).filter(function (img) {
        return img.page !== 'logos';
      });
      renderImages();
    }).catch(function (err) {
      showToast('加载图片失败', 'error');
    });
  }

  // 初始化筛选
  function initFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentPage = btn.dataset.page;
        renderImages();
      });
    });
  }

  // 渲染图片列表
  function renderImages() {
    var grid = document.getElementById('imagesGrid');
    var filtered = allImages;
    
    if (currentPage !== 'all') {
      filtered = allImages.filter(function (img) {
        return img.page === currentPage;
      });
    }

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#999;">暂无图片</div>';
      return;
    }

    grid.innerHTML = filtered.map(function (img) {
      var pageLabel = pageNames[img.page] || img.page;
      var positionLabel = getPositionLabel(img);
      return `
        <div class="image-card">
          <div class="image-preview" style="background-image:url('${img.url}')">
            <span class="image-badge">${pageLabel}</span>
          </div>
          <div class="image-info">
            <div class="image-position" title="${img.key}">${positionLabel}</div>
            <div class="image-title">${img.title || '无标题'}</div>
            <div class="image-actions">
              <button class="btn-edit" onclick="editImage(${img.id})">编辑</button>
              <button class="btn-delete" onclick="deleteImage(${img.id})">删除</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 打开添加弹窗
  window.openAddModal = function () {
    editingId = null;
    currentImageUrl = '';
    document.getElementById('modalTitle').textContent = '添加图片';
    document.getElementById('imageKey').value = '';
    document.getElementById('imagePage').value = 'home';
    document.getElementById('imageSection').value = '';
    document.getElementById('imageTitle').value = '';
    document.getElementById('imageDesc').value = '';
    document.getElementById('imageAlt').value = '';
    document.getElementById('imageSort').value = '0';
    resetUploadArea();
    document.getElementById('imageModal').classList.add('show');
  };

  // 编辑图片
  window.editImage = function (id) {
    var img = allImages.find(function (i) { return i.id === id; });
    if (!img) return;

    editingId = id;
    currentImageUrl = img.url;
    document.getElementById('modalTitle').textContent = '编辑图片';
    document.getElementById('imageKey').value = img.key;
    document.getElementById('imagePage').value = img.page;
    document.getElementById('imageSection').value = img.section;
    document.getElementById('imageTitle').value = img.title || '';
    document.getElementById('imageDesc').value = img.description || '';
    document.getElementById('imageAlt').value = img.altText || '';
    document.getElementById('imageSort').value = img.sortOrder || 0;
    
    // 设置预览图
    var uploadArea = document.getElementById('uploadArea');
    uploadArea.classList.add('has-image');
    uploadArea.innerHTML = `<div class="upload-preview" style="background-image:url('${img.url}')"></div>`;
    
    document.getElementById('imageModal').classList.add('show');
  };

  // 关闭弹窗
  window.closeModal = function () {
    document.getElementById('imageModal').classList.remove('show');
  };

  // 重置上传区域
  function resetUploadArea() {
    var uploadArea = document.getElementById('uploadArea');
    uploadArea.classList.remove('has-image');
    uploadArea.innerHTML = `
      <div class="upload-icon">📷</div>
      <div class="upload-text">点击上传图片</div>
    `;
  }

  // 处理文件选择
  window.handleFileSelect = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    // 预览
    var reader = new FileReader();
    reader.onload = function (e) {
      var uploadArea = document.getElementById('uploadArea');
      uploadArea.classList.add('has-image');
      uploadArea.innerHTML = `<div class="upload-preview" style="background-image:url('${e.target.result}')"></div>`;
    };
    reader.readAsDataURL(file);

    // 上传
    AdminAPI.upload(file).then(function (data) {
      if (data.success && data.url) {
        currentImageUrl = data.url;
        showToast('上传成功', 'success');
      } else {
        showToast(data.message || '上传失败', 'error');
        resetUploadArea();
      }
    }).catch(function (err) {
      showToast('上传失败', 'error');
      resetUploadArea();
    });
  };

  // 保存图片
  window.saveImage = function () {
    var key = document.getElementById('imageKey').value.trim();
    var page = document.getElementById('imagePage').value;
    var section = document.getElementById('imageSection').value.trim();
    var title = document.getElementById('imageTitle').value.trim();
    var description = document.getElementById('imageDesc').value.trim();
    var altText = document.getElementById('imageAlt').value.trim();
    var sortOrder = parseInt(document.getElementById('imageSort').value) || 0;

    if (!key) {
      showToast('请输入图片Key', 'error');
      return;
    }
    if (!section) {
      showToast('请输入所属区域', 'error');
      return;
    }
    if (!currentImageUrl) {
      showToast('请上传图片', 'error');
      return;
    }

    var data = {
      key: key,
      page: page,
      section: section,
      url: currentImageUrl,
      title: title,
      description: description,
      altText: altText,
      sortOrder: sortOrder
    };

    var promise;
    if (editingId) {
      promise = AdminAPI.put('/images/' + editingId, data);
    } else {
      promise = AdminAPI.post('/images', data);
    }

    promise.then(function (res) {
      if (res.success) {
        showToast(editingId ? '更新成功' : '添加成功', 'success');
        closeModal();
        loadImages();
      } else {
        showToast(res.message || '保存失败', 'error');
      }
    }).catch(function (err) {
      showToast('保存失败', 'error');
    });
  };

  // 删除图片
  window.deleteImage = function (id) {
    if (!confirm('确定要删除这张图片吗？')) return;

    AdminAPI.del('/images/' + id).then(function (res) {
      if (res.success) {
        showToast('删除成功', 'success');
        loadImages();
      } else {
        showToast(res.message || '删除失败', 'error');
      }
    }).catch(function (err) {
      showToast('删除失败', 'error');
    });
  };
})();