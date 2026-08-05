import { useState, useRef } from 'react';
import { useSiteImages, ImageItem } from '@/contexts/SiteImagesContext';
import { Upload, Pencil, Save, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

/**
 * 图片管理页面
 * 管理网站所有页面的图片
 */
export default function AdminImagesPage() {
  const { images, updateImage } = useSiteImages();
  const [activeTab, setActiveTab] = useState('home');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ImageItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

  const tabs = [
    { id: 'home', label: '首页' },
    { id: 'about', label: '车队介绍' },
    { id: 'racecar', label: '赛车展示' },
    { id: 'competition', label: '赛事历程' },
    { id: 'member', label: '队员风采' },
    { id: 'recruit', label: '招新' },
    { id: 'sponsor', label: '赞助商' },
    { id: 'contact', label: '联系我们' },
  ];

  // 获取当前tab的图片数据
  const getCurrentImages = () => {
    const pageImages = (images as any)[activeTab];
    if (!pageImages) return [];

    const result: { key: string; label: string; images: ImageItem[] }[] = [];

    Object.keys(pageImages).forEach((key) => {
      const value = pageImages[key];
      if (Array.isArray(value)) {
        result.push({
          key,
          label: getSectionLabel(key),
          images: value,
        });
      } else if (value && typeof value === 'object' && value.url) {
        result.push({
          key,
          label: getSectionLabel(key),
          images: [value],
        });
      }
    });

    return result;
  };

  const getSectionLabel = (key: string): string => {
    const labels: Record<string, string> = {
      hero: '主图 (Hero)',
      banner: '横幅图',
      features: '特色展示',
      gallery: '图片画廊',
      teamPhotos: '团队照片',
      workshop: '实验室/工作场景',
      details: '技术细节',
      timeline: '时间线',
      lifePhotos: '生活照',
    };
    return labels[key] || key;
  };

  // 处理图片上传
  const handleImageUpload = (imagePath: string, imageItem: ImageItem, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImageId(imageItem.id);

    // 读取文件为base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage: ImageItem = {
        ...imageItem,
        url: e.target?.result as string,
      };

      updateImage(imagePath, newImage);
      setUploadingImageId(null);
      toast.success('图片上传成功');
    };
    reader.onerror = () => {
      setUploadingImageId(null);
      toast.error('图片上传失败');
    };
    reader.readAsDataURL(file);

    // 重置input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 开始编辑
  const startEdit = (image: ImageItem) => {
    setEditingId(image.id);
    setEditForm({ ...image });
  };

  // 保存编辑
  const saveEdit = (imagePath: string) => {
    if (!editForm) return;
    updateImage(imagePath, editForm);
    setEditingId(null);
    setEditForm(null);
    toast.success('保存成功');
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const sections = getCurrentImages();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">图片管理</h1>
        <p className="text-muted-foreground">管理网站所有页面的图片内容</p>
      </div>

      {/* Tab 切换 */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
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

      {/* 图片区域 */}
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.key}>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {section.label}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.images.map((image) => {
                const imagePath = `${activeTab}.${section.key}`;
                const isEditing = editingId === image.id;

                return (
                  <div
                    key={image.id}
                    className="bg-card rounded-xl overflow-hidden shadow-sm border border-border"
                  >
                    {/* 图片预览 */}
                    <div className="relative aspect-video bg-muted group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />

                      {/* 上传按钮 - hover显示 */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white text-foreground rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">
                          <Upload size={16} />
                          替换图片
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(imagePath, image, e)}
                            disabled={uploadingImageId === image.id}
                          />
                        </label>
                      </div>

                      {/* 上传中状态 */}
                      {uploadingImageId === image.id && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-white text-sm">上传中...</div>
                        </div>
                      )}
                    </div>

                    {/* 图片信息 */}
                    <div className="p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">
                              标题
                            </label>
                            <input
                              type="text"
                              value={editForm?.title || ''}
                              onChange={(e) =>
                                setEditForm((prev) =>
                                  prev ? { ...prev, title: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">
                              描述
                            </label>
                            <input
                              type="text"
                              value={editForm?.description || ''}
                              onChange={(e) =>
                                setEditForm((prev) =>
                                  prev ? { ...prev, description: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">
                              Alt 文本
                            </label>
                            <input
                              type="text"
                              value={editForm?.alt || ''}
                              onChange={(e) =>
                                setEditForm((prev) =>
                                  prev ? { ...prev, alt: e.target.value } : null
                                )
                              }
                              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => saveEdit(imagePath)}
                              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                              <Save size={14} />
                              保存
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-accent text-foreground rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors"
                            >
                              <X size={14} />
                              取消
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {image.title && (
                            <h3 className="font-medium text-foreground mb-1 text-sm">
                              {image.title}
                            </h3>
                          )}
                          {image.description && (
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                          <button
                            onClick={() => startEdit(image)}
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <Pencil size={12} />
                            编辑信息
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 隐藏的 file input - 用于重置 */}
      <input ref={fileInputRef} type="file" className="hidden" />
    </div>
  );
}
