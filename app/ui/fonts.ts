import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    { path: "./fonts/Pretendard-Thin.subset.woff2", weight: "100" },
    { path: "./fonts/Pretendard-ExtraLight.subset.woff2", weight: "200" },
    { path: "./fonts/Pretendard-Light.subset.woff2", weight: "300" },
    { path: "./fonts/Pretendard-Regular.subset.woff2", weight: "400" },
    { path: "./fonts/Pretendard-Medium.subset.woff2", weight: "500" },
    { path: "./fonts/Pretendard-SemiBold.subset.woff2", weight: "600" },
    { path: "./fonts/Pretendard-Bold.subset.woff2", weight: "700" },
    { path: "./fonts/Pretendard-ExtraBold.subset.woff2", weight: "800" },
    { path: "./fonts/Pretendard-Black.subset.woff2", weight: "900" },
  ],
});
