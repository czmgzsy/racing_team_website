import { useState } from 'react';
import { useSiteImages } from '@/contexts/SiteImagesContext';
import { Upload, Save } from 'lucide-react';
import { toast } from 'sonner';

/**
 * 站点设置页面
 * 包含 Logo 管理、基础设置等
 */
export default function AdminSettingsPage() {
  const { images, updateImage } = useSiteImages();
  const [activeTab, setActiveTab] = useState('logos');
  const [uploading, setUploading] = useState<string | null>(null);

  const tabs = [
    { id: 'logos', label: 'Logo 设置' },
    { id: 'basic', label: '基础设置' },
  ];

  // 处理 Logo 上传
  const handleLogoUpload = (logoKey: 'schoolLogo' | 'teamLogo', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(logoKey);

    const reader = new FileReader();
    reader.onload = (e) => {
      const currentLogo = images.logos[logoKey];
      const newLogo = {
        ...currentLogo,
        url: e.target?.result as string,
      };

      updateImage(`logos.${logoKey}`, newLogo);
      setUploading(null);
      toast.success(`${logoKey === 'schoolLogo' ? '校徽' : '队徽'}更新成功`);
    };
    reader.onerror = () => {
      setUploading(null);
      toast.error('上传失败，请重试');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">站点设置</h1>
        <p className="text-muted-foreground">管理网站的基础设置与 Logo</p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-8 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Logo 设置 */}
      {activeTab === 'logos' && (
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">导航栏 Logo 设置</h2>
            <p className="text-sm text-muted-foreground mb-6">
              上传校徽与队徽，将显示在网站顶部导航栏左侧
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 校徽 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-4">校徽</h3>
                <div className="flex items-start gap-6">
                  {/* 预览 */}
                  <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center overflow-hidden border border-border">
                    <img
                      src={images.logos.schoolLogo.url}
                      alt={images.logos.schoolLogo.alt}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* 操作 */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-4">
                      建议尺寸：120x120px<br />
                      支持格式：PNG、JPG、SVG
                    </p>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      <Upload size={16} />
                      {uploading === 'schoolLogo' ? '上传中...' : '上传校徽'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLogoUpload('schoolLogo', e)}
                        disabled={uploading === 'schoolLogo'}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* 队徽 */}
              <div>
                <h3 className="text-base font-medium text-foreground mb-4">队徽</h3>
                <div className="flex items-start gap-6">
                  {/* 预览 */}
                  <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center overflow-hidden border border-border">
                    <img
                      src={images.logos.teamLogo.url}
                      alt={images.logos.teamLogo.alt}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* 操作 */}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-4">
                      建议尺寸：120x120px<br />
                      支持格式：PNG、JPG、SVG
                    </p>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                      <Upload size={16} />
                      {uploading === 'teamLogo' ? '上传中...' : '上传队徽'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLogoUpload('teamLogo', e)}
                        disabled={uploading === 'teamLogo'}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 预览提示 */}
            <div className="mt-8 p-4 bg-accent/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 提示：Logo 更新后会立即生效，刷新页面即可看到最新效果。
                所有图片数据保存在浏览器本地，后续可接入后端服务实现云端存储。
              </p>
            </div>
          </div>

          {/* 导航栏预览 */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">导航栏预览</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-white/80 backdrop-blur-md border-b border-border px-6 h-14 flex items-center gap-3">
                <img
                  src={images.logos.schoolLogo.url}
                  alt="校徽"
                  className="w-8 h-8 object-contain"
                />
                <img
                  src={images.logos.teamLogo.url}
                  alt="队徽"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-foreground font-medium text-sm">巴哈车队</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 基础设置 */}
      {activeTab === 'basic' && (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">基础设置</h2>
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                网站名称
              </label>
              <input
                type="text"
                defaultValue="巴哈车队"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                网站副标题
              </label>
              <input
                type="text"
                defaultValue="合肥经济技术职业学院巴哈车队"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                联系邮箱
              </label>
              <input
                type="email"
                defaultValue="baha@example.edu.cn"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                <Save size={16} />
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
