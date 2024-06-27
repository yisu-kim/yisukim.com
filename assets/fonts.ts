import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../public/static/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../public/static/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../public/static/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: "../public/static/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
    {
      path: "../public/static/fonts/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
    },
    {
      path: "../public/static/fonts/Pretendard-Black.subset.woff2",
      weight: "900",
    },
  ],
});
