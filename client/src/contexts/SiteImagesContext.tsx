import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteImagesConfig, defaultSiteImages } from '@/data/siteImages';

interface SiteImagesContextType {
  images: SiteImagesConfig;
  updateImages: (newImages: SiteImagesConfig) => void;
  updateImage: (path: string, newImage: any) => void;
}

const SiteImagesContext = createContext<SiteImagesContextType | undefined>(undefined);

const STORAGE_KEY = 'baha-site-images';

export const SiteImagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<SiteImagesConfig>(defaultSiteImages);

  // 从 localStorage 加载图片配置
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setImages(parsed);
      } catch (e) {
        console.error('Failed to parse saved images:', e);
      }
    }
  }, []);

  // 保存到 localStorage
  const saveImages = (newImages: SiteImagesConfig) => {
    setImages(newImages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
  };

  // 更新全部图片配置
  const updateImages = (newImages: SiteImagesConfig) => {
    saveImages(newImages);
  };

  // 根据路径更新单张图片
  const updateImage = (path: string, newImage: any) => {
    const keys = path.split('.');
    const newImages = { ...images };
    let current: any = newImages;

    // 遍历到倒数第二层
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    // 如果是数组，找到对应id的项更新
    if (Array.isArray(current[lastKey])) {
      const index = current[lastKey].findIndex((item: any) => item.id === newImage.id);
      if (index !== -1) {
        current[lastKey][index] = newImage;
      } else {
        current[lastKey].push(newImage);
      }
    } else {
      current[lastKey] = newImage;
    }

    saveImages(newImages);
  };

  return (
    <SiteImagesContext.Provider value={{ images, updateImages, updateImage }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImages = () => {
  const context = useContext(SiteImagesContext);
  if (context === undefined) {
    throw new Error('useSiteImages must be used within a SiteImagesProvider');
  }
  return context;
};

export default SiteImagesContext;
