import { NextRequest, NextResponse } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "@/utils/i18n";

function getLocale(request: NextRequest) {
  const headers = { "accept-language": "en;q=0.5" };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, i18n.locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static (custom asset files)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|static|sitemap.xml|robots.txt|favicon.ico).*)",
  ],
};
