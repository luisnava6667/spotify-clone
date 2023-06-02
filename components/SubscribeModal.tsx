'use client'

import { FC, useState } from 'react'
import Modal from './Modal'
import { Price, ProductWithPrice } from '@/types'
import Button from './Button'
import { useUser } from '@/hooks/useUser'
import { toast } from 'react-hot-toast'
import { postData } from '@/libs/helpers'
import { getStripe } from '@/libs/stripeClient'
import useSubscribeModal from '@/hooks/useSubscribeModal'
interface SubscribeModalProps {
  products: ProductWithPrice[]
}
const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100)
  return priceString
}
const SubscribeModal: FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal()
  const { user, isLoading, subscription } = useUser()
  const [priceIdLoading, setPriceIdLoading] = useState<String>()
  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose()
    }
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)
    if (!user) {
      setPriceIdLoading(undefined)
      return toast.error('You must be logged in to subscribe')
    }
    if (subscription) {
      setPriceIdLoading(undefined)
      return toast('You already have a subscription')
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      })
      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error((error as Error)?.message)
    } finally {
      setPriceIdLoading(undefined)
    }
  }
  let content = <div className='text-center'>No products available</div>
  if (products.length) {
    content = (
      <div className=''>
        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <div className='' key={product.id}>
                No price available
              </div>
            )
          }
          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className='mb-4'>
              {`Subcribe fot ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ))
        })}
      </div>
    )
  }
  if (subscription) {
    content = <div className='text-center'>You already have a subscription</div>
  }
  return (
    <Modal
      title='Only for premium users'
      description='Listen to music with Spotify Premium'
      onChange={onChange}
      isOpen={subscribeModal.isOpen}>
      {content}
    </Modal>
  )
}

export default SubscribeModal
