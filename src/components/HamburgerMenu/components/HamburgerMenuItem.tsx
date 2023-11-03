'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { sourceCodePro } from '@/styles/fonts'

interface IProps {
  href: string
  imageSrc: string
  imageAlt: string
  title: string
  isSelected?: boolean
}

const HamburgerMenuItem = ({
  href,
  imageSrc,
  imageAlt,
  title,
  isSelected = false,
}: IProps): JSX.Element => {
  return (
    <Link
      href={href}
      className={isSelected ? 'cursor-default' : 'cursor-pointer'}
    >
      <span>
        <div className=" rounded-xl overflow-hidden h-40 w-32 drop-shadow">
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <p
          className={`text-m font-bold text-gray-200 ${sourceCodePro.className}`}
        >
          {title}
        </p>
      </span>
    </Link>
  )
}

export default HamburgerMenuItem
