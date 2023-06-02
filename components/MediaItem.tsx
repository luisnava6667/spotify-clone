'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}
const MediaItem: FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data)
  const handleClik = () => {
    if (onClick) {
      return onClick(data.id)
    }
    //todo default turn of player
  }
  return (
    <div
      className='flex items-center gap-x-3 cursor-pointer w-full p-2 rounded-md  hover:bg-neutral-800/50 '
      onClick={handleClik}>
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          fill
          src={imageUrl || '/images/liked.png'}
          alt='Media Item'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-neutral-400 text-sm truncate'>{data.author}</p>
      </div>
    </div>
  )
}

export default MediaItem
