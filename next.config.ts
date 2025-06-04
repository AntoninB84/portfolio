import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
        bodySizeLimit: '10mb',
    }
  }
};

const withNextIntl = createNextIntlPlugin('./lib/dictionaries/request.ts');
export default withNextIntl(nextConfig);
