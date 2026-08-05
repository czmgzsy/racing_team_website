/**
 * 内容管理页 JS
 */

(function () {
  'use strict';

  var currentPage = 'home';
  var pageData = {}; // 缓存各页面数据

  // ====== 各页面默认内容（与前端HTML一致） ======
  var defaultContent = {
    // 首页
    home: {
      heroTitle: '速度与激情，工程与梦想',
      heroSubtitle: '合肥经济技术职业学院巴哈车队',
      featuresTitle: '车队亮点',
      featuresSubtitle: '工程实践 · 团队协作 · 创新精神',
      feature1Title: '自主设计制造',
      feature1Desc: '从设计图纸到赛车落地，全程自主完成车架、动力、悬挂等核心系统的研发制造。',
      feature2Title: '精密工程工艺',
      feature2Desc: '每一个细节都经过精心打磨，追求极致的性能与可靠性。',
      feature3Title: '团队协作精神',
      feature3Desc: '一群热爱赛车的年轻人并肩作战，在汗水中收获成长。',
      galleryTitle: '精彩瞬间',
      gallerySubtitle: '记录每一个值得铭记的时刻',
      quickTitle: '探索更多',
      quickSubtitle: '发现车队的每一面',
      quick1Title: '车队介绍',
      quick1Desc: '了解我们的故事',
      quick2Title: '赛事历程',
      quick2Desc: '回看荣耀时刻',
      quick3Title: '队员风采',
      quick3Desc: '认识车队成员',
      quick4Title: '加入我们',
      quick4Desc: '一起追逐梦想',
      ctaTitle: '准备好加入我们了吗？',
      ctaSubtitle: '与一群热爱赛车的年轻人，一起创造属于你们的传奇'
    },

    // 车队介绍
    about: {
      aboutTitle: '关于我们',
      aboutSubtitle: '一群追逐赛车梦想的年轻人',
      storyTitle: '我们的故事',
      storyP1: '合肥经济技术职业学院巴哈车队成立于2019年，是一支由学生自主管理、自主设计、自主制造的大学生赛车团队。',
      storyP2: '车队成员来自汽车、机械、电子、管理等多个专业，大家因为对赛车的热爱聚在一起，在实践中学习，在竞赛中成长。',
      storyP3: '我们相信，每一颗螺丝都承载着梦想，每一次调试都向着胜利迈进。',
      teamTitle: '团队协作',
      teamP1: '车队下设车架组、动力组、悬挂组、电气组、营销组等多个部门，各司其职又紧密协作。',
      teamP2: '从设计图纸到实物落地，从零件加工到整车装配，每一个环节都凝聚着团队的智慧与汗水。',
      teamP3: '在这里，你不仅能学到专业技能，更能收获珍贵的友谊和团队精神。',
      facilityTitle: '专业设施',
      facilitySubtitle: '完善的实验条件，为梦想保驾护航',
      valueTitle: '我们的理念',
      valueSubtitle: '以赛促学，以车育人',
      value1Title: '工匠精神',
      value1Desc: '精益求精，追求极致。每一个细节都经过反复打磨，每一次改进都向着完美迈进。',
      value2Title: '团队协作',
      value2Desc: '一人走得快，众人走得远。我们相信团队的力量，在协作中共同成长。',
      value3Title: '创新突破',
      value3Desc: '不满足于现状，勇于尝试新方案。在失败中学习，在探索中进步。'
    },

    // 赛车展示
    racecar: {
      racecarTitle: '赛车展示',
      racecarSubtitle: '精密制造，极限性能',
      specsTitle: '核心参数',
      specsSubtitle: '每一个数字，都是汗水的结晶',
      spec1Value: '250+',
      spec1Label: '整车零件数',
      spec2Value: '180kg',
      spec2Label: '整车重量',
      spec3Value: '100+',
      spec3Label: '马力输出',
      spec4Value: '6+',
      spec4Label: '月研发周期',
      galleryTitle: '全方位展示',
      gallerySubtitle: '每一个角度，都值得细看',
      engineTitle: '强劲心脏',
      engineDesc: '经过精心调校的动力系统，在各种复杂地形下都能提供充沛的动力输出。',
      enginePoint1: '高性能发动机',
      enginePoint2: '优化传动系统',
      enginePoint3: '定制排气系统',
      enginePoint4: '高效散热设计'
    },

    // 赛事历程
    competitions: {
      competitionTitle: '赛事历程',
      competitionSubtitle: '每一步，都算数',
      statsTitle: '荣耀数据',
      statsSubtitle: '用成绩证明实力',
      stat1Value: '5+',
      stat1Label: '参赛场次',
      stat2Value: '3',
      stat2Label: '获奖次数',
      stat3Value: '20+',
      stat3Label: '参赛队员',
      stat4Value: '1000+',
      stat4Label: '训练时长',
      timelineTitle: '成长足迹',
      timelineSubtitle: '一路走来，不断超越',
      futureTitle: '未来展望',
      futureDesc: '我们将继续努力，在更多赛场上展现合肥经济技术职业学院的风采。'
    },

    // 队员风采
    members: {
      memberTitle: '队员风采',
      memberSubtitle: '青春与热血的故事',
      deptTitle: '团队架构',
      deptSubtitle: '分工明确，紧密协作',
      dept1Title: '技术组',
      dept1Desc: '负责赛车设计、制造、调试，是车队的核心技术力量。',
      dept2Title: '运营组',
      dept2Desc: '负责车队宣传、赞助、活动策划，让更多人了解巴哈。',
      dept3Title: '管理组',
      dept3Desc: '负责车队日常管理、人员协调，保障团队高效运转。',
      dept4Title: '新成员',
      dept4Desc: '新鲜血液，未来的希望，在学习中快速成长。',
      photoTitle: '精彩瞬间',
      photoSubtitle: '记录每一张笑脸',
      cultureTitle: '团队文化',
      cultureSubtitle: '不只是赛车，更是成长',
      culture1Title: '家的温暖',
      culture1Desc: '车队就像一个大家庭，大家互相关心，互相帮助。',
      culture2Title: '共同成长',
      culture2Desc: '在这里，每个人都能找到自己的位置，收获成长与友谊。',
      culture3Title: '永不言弃',
      culture3Desc: '遇到困难不退缩，遇到失败不气馁，这就是巴哈精神。'
    },

    // 招新
    recruit: {
      recruitTitle: '加入我们',
      recruitSubtitle: '一起追逐赛车梦想',
      whyTitle: '为什么加入我们',
      whySubtitle: '你将收获的不止是技能',
      positionsTitle: '招聘岗位',
      positionsSubtitle: '总有一个适合你',
      stepsTitle: '报名流程',
      stepsSubtitle: '简单四步，开启你的巴哈之旅',
      dailyTitle: '车队日常',
      dailySubtitle: '不只是造车，更是生活',
      ctaTitle: '还在等什么？',
      ctaSubtitle: '立即报名，加入巴哈大家庭！'
    },

    // 赞助商
    sponsors: {
      sponsorTitle: '合作伙伴',
      sponsorSubtitle: '感谢一路相伴',
      whyTitle: '为什么选择我们',
      whySubtitle: '与年轻同行，与未来同行',
      partnersTitle: '合作伙伴',
      partnersSubtitle: '感谢以下企业的支持',
      plansTitle: '赞助方案',
      plansSubtitle: '多种合作方式，期待与您携手',
      ctaTitle: '成为合作伙伴',
      ctaSubtitle: '与巴哈车队一起，创造更多可能'
    },

    // 联系我们
    contact: {
      contactTitle: '联系我们',
      contactSubtitle: '期待与你相遇',
      contactInfoTitle: '联系方式',
      contactInfoSubtitle: '多种方式，随时联系',
      messageTitle: '给我们留言',
      messageSubtitle: '你的每一条建议都很重要'
    }
  };

  // 页面加载完成后加载首页内容
  document.addEventListener('DOMContentLoaded', function () {
    // 加载首页内容（会同时加载图片和优化板块）
    loadPageContent('home');
  });

  // 切换 Tab
  var navItems = document.querySelectorAll('.tabs-nav-item');
  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var page = item.getAttribute('data-page');
      switchTab(page);
    });
  });

  function switchTab(page) {
    currentPage = page;

    // nav 高亮
    navItems.forEach(function (it) {
      it.classList.toggle('active', it.getAttribute('data-page') === page);
    });

    // 切换 pane
    var panes = document.querySelectorAll('.tabs-pane');
    panes.forEach(function (pane) {
      pane.classList.toggle('active', pane.getAttribute('data-pane') === page);
    });

    // 加载该页面内容
    loadPageContent(page);
  }

  // 加载页面内容
  function loadPageContent(page) {
    AdminAPI.get('/pages/' + page).then(function (res) {
      // 从默认内容开始
      var data = {};
      if (defaultContent[page]) {
        // 深拷贝默认内容
        Object.assign(data, defaultContent[page]);
      }
      
      // 用数据库中的内容覆盖默认内容
      if (res && res.sections) {
        res.sections.forEach(function (sec) {
          if (sec.content !== undefined && sec.content !== null && sec.content !== '') {
            data[sec.sectionKey] = sec.content;
          }
        });
      }
      
      pageData[page] = data;
      fillForm(page, data);
    }).catch(function (err) {
      console.error('加载页面内容失败:', err);
      // 加载失败时也显示默认内容
      if (defaultContent[page]) {
        fillForm(page, defaultContent[page]);
      }
    });
  }

  // 填充表单
  function fillForm(page, data) {
    var pane = document.querySelector('.tabs-pane[data-pane="' + page + '"]');
    if (!pane) return;
    
    var inputs = pane.querySelectorAll('input, textarea, select');
    inputs.forEach(function (input) {
      var name = input.name;
      if (!name) return;
      if (data[name] !== undefined && data[name] !== null) {
        if (input.type === 'checkbox') {
          input.checked = !!data[name];
        } else {
          input.value = data[name];
        }
      }
    });
  }

  // 上传图片（通用）
  window.uploadImage = function (fieldName) {
    var fileInput = document.getElementById(fieldName + '-file');
    if (!fileInput) return;
    fileInput.click();

    fileInput.onchange = function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('请上传图片文件', 'error');
        return;
      }
      AdminAPI.upload(file).then(function (data) {
        var url = data.url || (data.data && data.data.url);
        if (!url) throw new Error('上传失败：无返回URL');
        // 设置预览、URL、隐藏 input
        var preview = document.getElementById(fieldName + '-preview');
        if (preview) {
          preview.innerHTML = '<img src="' + url + '" alt="preview">';
        }
        var urlEl = document.getElementById(fieldName + '-url');
        if (urlEl) urlEl.textContent = url;
        var inputEl = document.getElementById(fieldName + '-input');
        if (inputEl) inputEl.value = url;
        showToast('上传成功', 'success');
      }).catch(function (err) {
        showToast('上传失败：' + (err.message || '未知错误'), 'error');
      });
    };
  };

  // 收集当前页面表单数据
  function collectForm(page) {
    var pane = document.querySelector('.tabs-pane[data-pane="' + page + '"]');
    if (!pane) return {};
    var data = {};
    var inputs = pane.querySelectorAll('input, textarea, select');
    inputs.forEach(function (input) {
      var name = input.name;
      if (!name) return;
      if (input.type === 'checkbox') {
        data[name] = input.checked;
      } else {
        data[name] = input.value;
      }
    });
    return data;
  }

  // 保存页面内容
  window.savePage = function (page) {
    var data = collectForm(page);
    AdminAPI.put('/pages/' + page, data).then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '保存失败', 'error');
      } else {
        showToast('保存成功', 'success');
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || '网络错误'), 'error');
    });
  };

  // 暴露 switchTab 供外部调用
  window.switchContentTab = switchTab;

  // ====== 图片管理功能 ======
  var pageImages = {}; // 缓存各页面图片

  // 板块标题到section的映射
  var sectionTitleMap = {
    home: {
      'Hero 区域': 'hero',
      '车队亮点': 'features',
      '精彩瞬间': 'gallery',
      '快速入口': 'quick',
      'CTA 区域': 'cta'
    },
    about: {
      '页面头部': 'banner',
      '我们的故事': 'story',
      '团队协作': 'team',
      '专业设施': 'workshop',
      '我们的理念': 'values'
    },
    racecar: {
      '页面头部': 'banner',
      '核心参数': 'specs',
      '图片展示': 'gallery',
      '动力系统': 'details'
    },
    competitions: {
      '页面头部': 'banner',
      '荣耀数据': 'stats',
      '成长足迹': 'timeline',
      '未来展望': 'future'
    },
    members: {
      '页面头部': 'banner',
      '团队架构': 'dept',
      '精彩瞬间': 'life',
      '团队文化': 'culture'
    },
    recruit: {
      '页面头部': 'banner',
      '为什么加入我们': 'why',
      '招聘岗位': 'positions',
      '报名流程': 'steps',
      '车队日常': 'gallery',
      'CTA 区域': 'cta'
    },
    sponsors: {
      '页面头部': 'banner',
      '为什么选择我们': 'why',
      '合作伙伴': 'partners',
      '赞助方案': 'plans',
      'CTA 区域': 'cta'
    },
    contact: {
      '页面头部': 'banner',
      '联系方式': 'info',
      '留言表单': 'form'
    }
  };

  // 图片位置说明映射
  var positionLabels = {
    'home.hero': '首页·顶部主视觉',
    'home.feature1': '首页·车队亮点·第1张',
    'home.feature2': '首页·车队亮点·第2张',
    'home.feature3': '首页·车队亮点·第3张',
    'home.gallery1': '首页·精彩瞬间·第1张',
    'home.gallery2': '首页·精彩瞬间·第2张',
    'home.gallery3': '首页·精彩瞬间·第3张',
    'home.gallery4': '首页·精彩瞬间·第4张',
    'about.banner': '车队介绍·顶部Banner',
    'about.team1': '车队介绍·团队协作·第1张',
    'about.team2': '车队介绍·团队协作·第2张',
    'about.workshop1': '车队介绍·专业设施·第1张',
    'about.workshop2': '车队介绍·专业设施·第2张',
    'about.workshop3': '车队介绍·专业设施·第3张',
    'racecar.banner': '赛车展示·顶部Banner',
    'racecar.gallery1': '赛车展示·全方位展示·第1张',
    'racecar.gallery2': '赛车展示·全方位展示·第2张',
    'racecar.gallery3': '赛车展示·全方位展示·第3张',
    'racecar.gallery4': '赛车展示·全方位展示·第4张',
    'racecar.detail1': '赛车展示·动力系统·第1张',
    'competition.banner': '赛事历程·顶部Banner',
    'competition.timeline1': '赛事历程·成长足迹·第1张',
    'competition.timeline2': '赛事历程·成长足迹·第2张',
    'competition.timeline3': '赛事历程·成长足迹·第3张',
    'competition.timeline4': '赛事历程·成长足迹·第4张',
    'member.banner': '队员风采·顶部Banner',
    'member.life1': '队员风采·精彩瞬间·第1张',
    'member.life2': '队员风采·精彩瞬间·第2张',
    'member.life3': '队员风采·精彩瞬间·第3张',
    'member.life4': '队员风采·精彩瞬间·第4张',
    'member.life5': '队员风采·精彩瞬间·第5张',
    'recruit.banner': '招新·顶部Banner',
    'recruit.gallery1': '招新·车队日常·第1张',
    'recruit.gallery2': '招新·车队日常·第2张',
    'recruit.gallery3': '招新·车队日常·第3张',
    'sponsor.banner': '赞助商·顶部Banner',
    'contact.banner': '联系我们·顶部Banner'
  };

  // 获取图片位置说明
  function getPositionLabel(img) {
    if (positionLabels[img.key]) {
      return positionLabels[img.key];
    }
    return img.section || img.key || '未分类';
  }

  // 加载页面图片
  function loadPageImages(page) {
    var pane = document.querySelector('.tabs-pane[data-pane="' + page + '"]');
    if (!pane) return;

    AdminAPI.get('/images').then(function (data) {
      // 只显示当前页面的图片
      var images = (data.images || []).filter(function (img) {
        return img.page === page;
      });
      pageImages[page] = images;
      renderImagesToSections(page, images);
    }).catch(function (err) {
      console.error('加载图片失败:', err);
    });
  }

  // 把图片渲染到各个板块
  function renderImagesToSections(page, images) {
    var pane = document.querySelector('.tabs-pane[data-pane="' + page + '"]');
    if (!pane) return;

    var titleMap = sectionTitleMap[page] || {};

    // 找到所有h4标题（板块标题）
    var sectionTitles = pane.querySelectorAll('h4');
    sectionTitles.forEach(function (titleEl) {
      var titleText = titleEl.textContent.trim();
      var sectionName = titleMap[titleText];
      if (!sectionName) return;

      // 找到该section的所有图片
      var sectionImages = images.filter(function (img) {
        return img.section === sectionName;
      });

      // 检查是否已经有图片区域了
      var nextEl = titleEl.nextElementSibling;
      if (nextEl && nextEl.classList.contains('section-images-wrapper')) {
        // 更新已有图片区域
        var grid = nextEl.querySelector('.section-images-grid');
        if (grid) {
          renderImageGrid(grid, sectionImages, page, sectionName);
        }
        return;
      }

      // 创建图片区域
      var wrapper = document.createElement('div');
      wrapper.className = 'section-images-wrapper';
      wrapper.style.cssText = 'margin-bottom: 20px;';

      var grid = document.createElement('div');
      grid.className = 'section-images-grid';
      grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin-bottom: 8px;';

      wrapper.appendChild(grid);

      // 插入到板块标题下面
      titleEl.parentNode.insertBefore(wrapper, titleEl.nextSibling);

      // 渲染图片
      renderImageGrid(grid, sectionImages, page, sectionName);
    });
  }

  // 当前上传的上下文（新增/替换）
  var uploadContext = {
    mode: 'add', // 'add' 或 'replace'
    page: null,
    section: null,
    imageId: null
  };

  // 渲染图片网格
  function renderImageGrid(grid, images, page, section) {
    var html = '';
    
    // 添加上传卡片
    html += `
      <div class="image-upload-card" onclick="triggerAddImage('${page}', '${section}')">
        <div class="image-upload-icon">+</div>
        <div class="image-upload-text">上传图片</div>
      </div>
    `;
    
    // 添加图片卡片
    if (images.length > 0) {
      html += images.map(function (img) {
        var positionLabel = getPositionLabel(img);
        return `
          <div class="page-image-card" onclick="editPageImage('${page}', ${img.id})" style="cursor:pointer;border:1px solid #eee;border-radius:8px;overflow:hidden;transition:all 0.2s ease;position:relative;">
            <button class="replace-image-btn" onclick="event.stopPropagation(); triggerReplaceImageById('${page}', ${img.id})">更换</button>
            <div class="page-image-preview" style="width:100%;aspect-ratio:4/3;background-size:cover;background-position:center;background-image:url('${img.url}')"></div>
            <div class="page-image-info" style="padding:8px;">
              <div class="page-image-position" style="font-size:12px;color:#666;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${positionLabel}">${positionLabel}</div>
              <div class="page-image-title" style="font-size:12px;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${img.title || '无标题'}</div>
            </div>
          </div>
        `;
      }).join('');
    }
    
    grid.innerHTML = html;
  }

  // 触发新增图片
  window.triggerAddImage = function (page, section) {
    uploadContext.mode = 'add';
    uploadContext.page = page;
    uploadContext.section = section;
    uploadContext.imageId = null;
    
    var fileInput = document.getElementById('imageFileInput');
    fileInput.value = '';
    fileInput.click();
  };

  // 触发替换图片（从模态框）
  window.triggerReplaceImage = function () {
    if (!currentEditImage) return;
    uploadContext.mode = 'replace';
    uploadContext.page = currentEditPage;
    uploadContext.section = currentEditImage.section;
    uploadContext.imageId = currentEditImage.id;
    
    var fileInput = document.getElementById('imageFileInput');
    fileInput.value = '';
    fileInput.click();
  };

  // 触发替换图片（从图片卡片）
  window.triggerReplaceImageById = function (page, imageId) {
    var images = pageImages[page] || [];
    var img = images.find(function (item) {
      return item.id === imageId;
    });
    if (!img) return;
    
    uploadContext.mode = 'replace';
    uploadContext.page = page;
    uploadContext.section = img.section;
    uploadContext.imageId = imageId;
    
    var fileInput = document.getElementById('imageFileInput');
    fileInput.value = '';
    fileInput.click();
  };

  // 文件选择处理
  document.addEventListener('DOMContentLoaded', function () {
    var fileInput = document.getElementById('imageFileInput');
    if (fileInput) {
      fileInput.addEventListener('change', handleFileSelect);
    }
  });

  function handleFileSelect(e) {
    var file = e.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    
    // 上传图片
    uploadImage(file);
  }

  // 上传图片
  function uploadImage(file) {
    var formData = new FormData();
    formData.append('file', file);
    
    // 显示加载状态
    var loadingMsg = uploadContext.mode === 'add' ? '正在上传图片...' : '正在更换图片...';
    console.log(loadingMsg);
    
    fetch('/api/admin/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.success && data.url) {
        if (uploadContext.mode === 'add') {
          // 新增图片
          addNewImage(data.url);
        } else if (uploadContext.mode === 'replace') {
          // 替换图片
          replaceImage(data.url);
        }
      } else {
        alert('上传失败：' + (data.message || '未知错误'));
      }
    })
    .catch(function (err) {
      alert('上传失败：' + err.message);
    });
  }

  // 新增图片记录
  function addNewImage(url) {
    var page = uploadContext.page;
    var section = uploadContext.section;
    
    // 生成一个唯一的key
    var key = page + '.' + section + '.' + Date.now();
    
    AdminAPI.post('/images', {
      key: key,
      page: page,
      section: section,
      url: url,
      title: '新图片',
      description: '',
      altText: '',
      sortOrder: 999
    }).then(function (data) {
      if (data.success) {
        // 重新加载该页面图片
        loadPageImages(page);
        alert('图片上传成功！');
      } else {
        alert('添加图片失败：' + (data.message || '未知错误'));
      }
    }).catch(function (err) {
      alert('添加图片失败：' + err.message);
    });
  }

  // 替换图片
  function replaceImage(url) {
    var imageId = uploadContext.imageId;
    var page = uploadContext.page;
    
    AdminAPI.put('/images/' + imageId, {
      url: url
    }).then(function (data) {
      if (data.success) {
        // 更新本地缓存
        if (page && pageImages[page]) {
          var img = pageImages[page].find(function (item) {
            return item.id === imageId;
          });
          if (img) {
            img.url = url;
          }
          // 重新渲染该页面的图片
          renderImagesToSections(page, pageImages[page]);
        }
        
        // 如果模态框打开着，更新预览
        if (currentEditImage && currentEditImage.id === imageId) {
          currentEditImage.url = url;
          var preview = document.getElementById('imageEditPreview');
          if (preview) {
            preview.style.backgroundImage = 'url(' + url + ')';
          }
        }
        
        alert('图片更换成功！');
      } else {
        alert('更换图片失败：' + (data.message || '未知错误'));
      }
    }).catch(function (err) {
      alert('更换图片失败：' + err.message);
    });
  }

  // 当前编辑的图片信息
  var currentEditImage = null;
  var currentEditPage = null;

  // 编辑页面图片（打开模态框）
  window.editPageImage = function (page, imageId) {
    currentEditPage = page;
    // 找到对应的图片
    var images = pageImages[page] || [];
    var img = images.find(function (item) {
      return item.id === imageId;
    });
    if (!img) {
      // 如果没找到，重新加载该页面图片
      AdminAPI.get('/images').then(function (data) {
        pageImages[page] = (data.images || []).filter(function (item) {
          return item.page === page;
        });
        img = pageImages[page].find(function (item) {
          return item.id === imageId;
        });
        if (img) {
          openImageEditModal(img);
        }
      });
      return;
    }
    openImageEditModal(img);
  };

  // 打开图片编辑模态框
  function openImageEditModal(img) {
    currentEditImage = img;
    var modal = document.getElementById('imageEditModal');
    var preview = document.getElementById('imageEditPreview');
    var titleInput = document.getElementById('imageEditTitle');
    var descInput = document.getElementById('imageEditDesc');
    var altInput = document.getElementById('imageEditAlt');
    var positionInput = document.getElementById('imageEditPosition');

    preview.style.backgroundImage = 'url(' + img.url + ')';
    titleInput.value = img.title || '';
    descInput.value = img.description || '';
    altInput.value = img.altText || '';
    positionInput.value = getPositionLabel(img);

    modal.classList.add('show');
  }

  // 关闭图片编辑模态框
  window.closeImageEditModal = function () {
    var modal = document.getElementById('imageEditModal');
    modal.classList.remove('show');
    currentEditImage = null;
  };

  // 保存图片编辑
  window.saveImageEdit = function () {
    if (!currentEditImage) return;

    var title = document.getElementById('imageEditTitle').value;
    var description = document.getElementById('imageEditDesc').value;
    var altText = document.getElementById('imageEditAlt').value;

    AdminAPI.put('/images/' + currentEditImage.id, {
      title: title,
      description: description,
      altText: altText
    }).then(function () {
      // 更新本地缓存
      if (currentEditPage && pageImages[currentEditPage]) {
        var img = pageImages[currentEditPage].find(function (item) {
          return item.id === currentEditImage.id;
        });
        if (img) {
          img.title = title;
          img.description = description;
          img.altText = altText;
        }
        // 重新渲染该页面的图片
        renderImagesToSections(currentEditPage, pageImages[currentEditPage]);
      }
      closeImageEditModal();
      alert('保存成功！');
    }).catch(function (err) {
      alert('保存失败：' + (err.message || '未知错误'));
    });
  };

  // 删除当前图片
  window.deleteCurrentImage = function () {
    if (!currentEditImage) return;
    if (!confirm('确定要删除这张图片吗？删除后无法恢复。')) return;

    AdminAPI.del('/images/' + currentEditImage.id).then(function () {
      // 更新本地缓存
      if (currentEditPage && pageImages[currentEditPage]) {
        pageImages[currentEditPage] = pageImages[currentEditPage].filter(function (item) {
          return item.id !== currentEditImage.id;
        });
        // 重新渲染该页面的图片
        renderImagesToSections(currentEditPage, pageImages[currentEditPage]);
      }
      closeImageEditModal();
      alert('删除成功！');
    }).catch(function (err) {
      alert('删除失败：' + (err.message || '未知错误'));
    });
  };

  // 打开图片管理
  window.openImageManager = function (page) {
    window.location.href = 'images.html?page=' + page;
  };

  // 优化板块视觉区分
  function optimizeSectionBlocks() {
    var panes = document.querySelectorAll('.tabs-pane');
    panes.forEach(function (pane) {
      var h4s = pane.querySelectorAll('h4');
      h4s.forEach(function (h4) {
        // 如果已经在section-block中了，就跳过
        if (h4.parentNode && h4.parentNode.classList.contains('section-block')) {
          return;
        }
        
        // 创建板块容器
        var block = document.createElement('div');
        block.className = 'section-block';
        
        // 把h4插入到容器中
        h4.parentNode.insertBefore(block, h4);
        block.appendChild(h4);
        
        // 把h4后面的所有元素都移到容器中，直到遇到下一个h4或h3或保存按钮
        var next = h4.nextSibling;
        while (next) {
          var nextEl = next;
          next = next.nextSibling;
          
          if (nextEl.nodeType === 1) { // 元素节点
            var tag = nextEl.tagName.toLowerCase();
            if (tag === 'h4' || tag === 'h3' || (tag === 'button' && nextEl.classList.contains('btn-primary'))) {
              break;
            }
          }
          
          block.appendChild(nextEl);
        }
      });
    });
  }

  // 在loadPageContent中同时加载图片并优化板块
  var originalLoadPageContent = loadPageContent;
  loadPageContent = function (page) {
    originalLoadPageContent(page);
    loadPageImages(page);
    optimizeSectionBlocks();
  };

})();
