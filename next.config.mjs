/** @type {import('next').NextConfig} */
const nextConfig = {
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
