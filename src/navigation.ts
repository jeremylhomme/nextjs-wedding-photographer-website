import { createNavigation } from 'next-intl/navigation'

const locales = ['fr', 'en'] as const

export const { Link, redirect, usePathname, useRouter } =
createNavigation({
    locales
  })
