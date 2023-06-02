'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { FaPlay } from 'react-icons/fa'
interface ListItemProps {
  image: string
  name: string
  href: string
}
const ListItem: FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter()
  const onClick = () => {
    //add authentication  befor to redirect
    router.push(href)
  }
  return (
    <button
      className='relative flex group items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4'
      onClick={onClick}>
      <div className='relative min-h-[64px] min-w-[64px]'>
        <Image className='object-cover' fill src={image} alt={name} />
      </div>
      <p className='font-medium truncatepy-5'>{name}</p>
      <div className='absolute transition opacity-0 rounded-full items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-100'>
        <FaPlay className='text-black' />
      </div>
    </button>
  )
}

export default ListItem
