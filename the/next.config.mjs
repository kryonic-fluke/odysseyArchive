/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ivxirmdahpflyzhbmwaq.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/Cabins-img/**',
          },
        ],
      },

      // output:"export",
}; 

export default nextConfig;
 