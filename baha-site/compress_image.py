from PIL import Image
import os

# 图片路径
img_path = 'public/images/img_812.jpg'

# 打开图片
img = Image.open(img_path)
print(f'原始尺寸: {img.size}')
print(f'原始模式: {img.mode}')

# 获取原始文件大小
original_size = os.path.getsize(img_path)
print(f'原始大小: {original_size / 1024 / 1024:.2f} MB')

# 调整尺寸（宽度限制在1920px）
max_width = 1920
if img.width > max_width:
    ratio = max_width / img.width
    new_height = int(img.height * ratio)
    img = img.resize((max_width, new_height), Image.LANCZOS)
    print(f'调整后尺寸: {img.size}')

# 保存为压缩后的JPEG
output_path = 'public/images/img_812_compressed.jpg'
img.save(output_path, 'JPEG', quality=85, optimize=True)

# 获取压缩后的文件大小
compressed_size = os.path.getsize(output_path)
print(f'压缩后大小: {compressed_size / 1024 / 1024:.2f} MB')
print(f'压缩率: {(1 - compressed_size / original_size) * 100:.1f}%')

# 替换原文件
os.replace(output_path, img_path)
print(f'已替换原文件: {img_path}')
