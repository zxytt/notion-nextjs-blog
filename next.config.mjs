import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'source.unsplash.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'www.notion.so',
      },
      {
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // 匹配所有路径
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|gif|webp|svg|ico)',
        headers: [
          { 
            key: 'Cache-Control', 
            value: 'public, max-age=86400, stale-while-revalidate=3600' 
          }
        ],
      },
    ];
  },
   // 图片优化配置
  // images: {
    // formats: ['image/webp'],
    // minimumCacheTTL: 86400,  // 1天缓存
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // imageSizes: [16, 32, 48, 64, 96],
    // domains: ['source.unsplash.com', 'images.unsplash.com'],
  // },

  // 构建产物优化
  productionBrowserSourceMaps: false,  // 关闭SourceMap
  output: 'standalone',  // 独立输出模式
  compress: true,  // 压缩构建产物
  
  // SWC编译优化
  swcMinify: true, 
  experimental: {
    // optimizeCss: true,  // 优化CSS
  },
};

export default withPlaiceholder(nextConfig);
