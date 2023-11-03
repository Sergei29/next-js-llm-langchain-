'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import Image from 'next/image'

import { NAV_LINKS } from '@/constants'
import { pressStart2P, sourceCodePro, instrumentSans } from '@/styles/fonts'
import styles from './hamburgerMenu.module.css'
import HamburgerMenuItem from './components/HamburgerMenuItem'

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleDocumentClick = (event: React.MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as any) &&
        !buttonRef.current?.contains(event.target as any)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleDocumentClick as any)
      document.addEventListener('keydown', handleKeyDown as any)
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick as any)
      document.removeEventListener('keydown', handleKeyDown as any)
    }
  }, [isOpen])

  return (
    <div
      ref={menuRef}
      className={classnames(
        styles.menuContainer,
        `m-auto relative z-50`,
        // isOpen && styles.open,
      )}
    >
      <button
        ref={buttonRef}
        className="px-4 py-2 shadow m-auto rounded-full border-gray-200"
        onClick={toggleMenu}
      >
        <Image
          src="/hamburger.svg"
          alt="Hamburger Icon"
          width={24}
          height={24}
          className="w-full"
        />
      </button>
      <nav
        className={classnames(
          styles.menu,
          isOpen &&
            'rounded-3xl px-12 py-4 flex flex-col justify-center gap-x-4 shadow z-20',
          isOpen && styles.open,
        )}
      >
        <p className={`text-center ${pressStart2P.className} mb-4`}>Menu</p>
        <ul className="flex flex-row gap-4 uppercase">
          {NAV_LINKS.map(({ id, href, imageAlt, imageSrc, title }) => (
            <li key={id} className="flex flex-col gap-4">
              <HamburgerMenuItem
                href={href}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                title={title}
                isSelected={pathname === href}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default HamburgerMenu
