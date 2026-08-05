/**
 * 账号设置页 JS
 */

(function () {
  'use strict';

  // 页面加载时加载Logo和底部设置
  document.addEventListener('DOMContentLoaded', function () {
    loadLogos();
    loadSiteTitle();
    loadFooterSettings();
  });

  // 加载站点名称
  function loadSiteTitle() {
    fetch('/api/settings')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.siteTitle) {
          document.getElementById('site-title').value = data.siteTitle;
        }
      })
      .catch(function (err) {
        console.error('加载站点名称失败:', err);
      });
  }

  // 保存站点名称
  window.saveSiteTitle = function () {
    var settings = {
      siteTitle: document.getElementById('site-title').value
    };
    
    AdminAPI.put('/settings', settings).then(function (res) {
      if (res.success) {
        showToast('站点名称保存成功', 'success');
      } else {
        showToast(res.message || '保存失败', 'error');
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || ''), 'error');
    });
  };

  // 加载底部设置
  function loadFooterSettings() {
    fetch('/api/settings')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.footerAbout) {
          document.getElementById('footer-about').value = data.footerAbout;
        }
        if (data.footerCopyright) {
          document.getElementById('footer-copyright').value = data.footerCopyright;
        }
        if (data.contactEmail) {
          document.getElementById('contact-email').value = data.contactEmail;
        }
        if (data.contactAddress) {
          document.getElementById('contact-address').value = data.contactAddress;
        }
        if (data.addressUrl) {
          document.getElementById('address-url').value = data.addressUrl;
        }
        if (data.contactPhone) {
          document.getElementById('contact-phone').value = data.contactPhone;
        }
        if (data.wechatOfficial) {
          document.getElementById('wechat-official').value = data.wechatOfficial;
        }
      })
      .catch(function (err) {
        console.error('加载底部设置失败:', err);
      });
  }

  // 保存底部设置
  window.saveFooterSettings = function () {
    var settings = {
      footerAbout: document.getElementById('footer-about').value,
      footerCopyright: document.getElementById('footer-copyright').value,
      contactEmail: document.getElementById('contact-email').value,
      contactAddress: document.getElementById('contact-address').value,
      addressUrl: document.getElementById('address-url').value,
      contactPhone: document.getElementById('contact-phone').value,
      wechatOfficial: document.getElementById('wechat-official').value
    };
    
    AdminAPI.put('/settings', settings).then(function (res) {
      if (res.success) {
        showToast('底部设置保存成功', 'success');
      } else {
        showToast(res.message || '保存失败', 'error');
      }
    }).catch(function (err) {
      showToast('保存失败：' + (err.message || ''), 'error');
    });
  };

  // 加载当前Logo
  function loadLogos() {
    fetch('/api/settings')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.schoolLogoUrl) {
          setLogoPreview('school', data.schoolLogoUrl);
        }
        if (data.teamLogoUrl) {
          setLogoPreview('team', data.teamLogoUrl);
        }
      })
      .catch(function (err) {
        console.error('加载Logo失败:', err);
      });
  }

  // 设置Logo预览
  function setLogoPreview(type, url) {
    var el = document.getElementById(type + 'LogoPreview');
    if (el) {
      el.style.backgroundImage = 'url(' + url + ')';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.border = 'none';
      el.innerHTML = '';
    }
  }

  // 上传Logo
  window.uploadLogo = function (type, e) {
    var file = e.target.files[0];
    if (!file) return;

    AdminAPI.upload(file).then(function (data) {
      if (data.success && data.url) {
        // 更新预览
        setLogoPreview(type, data.url);
        
        // 保存到设置
        var settings = {};
        if (type === 'school') {
          settings.schoolLogoUrl = data.url;
        } else {
          settings.teamLogoUrl = data.url;
        }
        
        AdminAPI.put('/settings', settings).then(function (res) {
          if (res.success) {
            showToast((type === 'school' ? '校徽' : '队徽') + '更新成功', 'success');
          } else {
            showToast(res.message || '保存失败', 'error');
          }
        }).catch(function (err) {
          showToast('保存失败', 'error');
        });
      } else {
        showToast(data.message || '上传失败', 'error');
      }
    }).catch(function (err) {
      showToast('上传失败', 'error');
    });
  };

  window.changePassword = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    var oldPwd = document.getElementById('old-password').value;
    var newPwd = document.getElementById('new-password').value;
    var confirmPwd = document.getElementById('confirm-password').value;

    if (!oldPwd || !newPwd || !confirmPwd) {
      showToast('请填写完整密码', 'error');
      return false;
    }
    if (newPwd.length < 6) {
      showToast('新密码至少 6 位', 'error');
      return false;
    }
    if (newPwd !== confirmPwd) {
      showToast('两次输入的新密码不一致', 'error');
      return false;
    }
    if (newPwd === oldPwd) {
      showToast('新密码不能与旧密码相同', 'error');
      return false;
    }

    AdminAPI.put('/password', {
      oldPassword: oldPwd,
      newPassword: newPwd
    }).then(function (res) {
      if (res && res.success === false) {
        showToast(res.message || '修改失败', 'error');
      } else {
        showToast('密码修改成功', 'success');
        document.getElementById('old-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
      }
    }).catch(function (err) {
      showToast('修改失败：' + (err.message || ''), 'error');
    });

    return false;
  };

  window.handleLogout = function () {
    confirmDialog('确定要退出登录吗？', function () {
      logout();
    });
  };

})();
