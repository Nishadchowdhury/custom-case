/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io','8yhbykdou7.ufs.sh'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
