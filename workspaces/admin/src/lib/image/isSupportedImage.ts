const SUPPORTED_IMAGE_EXTENSIONS = ['bmp', 'jpeg', 'jpg', 'png', 'webp', 'avif', 'jxl'];

export async function isSupportedImage(image: File): Promise<boolean> {
  const extension = image.name.split('.').pop()?.toLowerCase();
  
  return SUPPORTED_IMAGE_EXTENSIONS.includes(extension ?? '');
}
