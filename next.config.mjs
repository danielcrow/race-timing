/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
    experimental: {

        serverComponentsExternalPackages: ["mongoose"],
    },
    async redirects() {
        return [
          {
            source: "/",
            destination: "/dashboard/raceboard/0",
            permanent: true,
          },
        ];
      },   
      

}




export default nextConfig;
