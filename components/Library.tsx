'use client'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { FC } from 'react'
import { Song } from '@/types'
import MediaItem from './MediaItem'
interface LibraryProps {
  songs: Song[]
}
const Library: FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const onClick = () => {
    if (!user) authModal.onOpen()
    //Todo check subscription
    return uploadModal.onOpen()
  }
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={26} className='text-neutral-400' />
          <p className='text-neutral font-medium text-md'>Your Library</p>
        </div>
        <AiOutlinePlus
          size={20}
          className='text-neutral-400 hover:text-white transition cursor-pointer'
          onClick={onClick}
        />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Library
