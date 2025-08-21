/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	images: {
		domains: ["images.unsplash.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "connect.getseam.com",
				pathname: "/assets/images/**",
			},
		],
	},
};

module.exports = config;
