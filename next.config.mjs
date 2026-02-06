/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Se eliminó ignoreBuildErrors para asegurar la integridad de tipos
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cwkizbofunkdqvwlzxth.supabase.co', // Proyecto especifico Lataberna
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },
}

export default nextConfig
