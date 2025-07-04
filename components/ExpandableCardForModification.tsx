'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { CustomerPresentableInterface } from '@/lib/serviceFormInterface'
import { Trash } from 'lucide-react'

export function ExpandableCardDemo({
  cards,
  activeId,
  onCardClick,
  onDeleteCard,
}: {
  cards: CustomerPresentableInterface[]
  activeId?: string | number | null
  onCardClick?: (id: string | number | null) => void
   onDeleteCard?: (id: string) => void
}) {

  
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (activeId) {
      const matched = cards.find((c) => c.id === activeId)
      if (matched) setActive(matched)
    }
  }, [activeId, cards])

   const deleteCard = async (id: string) => {
    try {
      await fetch(`/api/service/${id}`, {
    method: 'DELETE',
    }
      )
      alert('Service Deleted Successfully')
      setActive(null)
      onDeleteCard?.(id) // <-- update parent state
    } catch (error) {
      alert('Failed to Delete Service')
      console.log('Something Wrong ', error)
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false)
        onCardClick?.(null)
      }
    }
    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => {
    setActive(null)
    onCardClick?.(null)
  })

  return (
    <div className="font-mono  min-h-[75vh] w-full mx-auto">

      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className=" z-20 w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.button
                key={`button-${active.id}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.05 },
                }}
                className="flex absolute m-5   lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => {
                  setActive(null)
                  onCardClick?.(null)
                }}
              >
                <CloseIcon />
              </motion.button>
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.image}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.services}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.services.map((s) => s).join(', ')}
                    </motion.p>
                    <motion.p
                      layoutId={`description-${active}-${id}`}
                      className="text-amber-600 dark:text-neutral-400"
                    >
                      {active.distance !== undefined
                        ? `${active.distance.toFixed(2)} KM Away`
                        : ''}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${active.id}-${id}`}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-amber-600 text-white"
                    onClick={() => {
                      if (active.number) {
                        navigator.clipboard.writeText(active.number)
                        alert('Phone number copied!')
                      }
                    }}
                  >
                    Copy Phone Number
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-xs md:text-sm lg:text-base  md:h-fit pb-10 flex items-center gap-2 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <span className='block text-body text-gray-400 pr-5'>Skills:</span>
                    {active.skills.map((skill, index) => (
                      <span key={index} className='inline-block '>
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {active.bio}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
<ul className=" mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.id}-${id}`}
            key={`card-${card.id}-${id}`}
            onClick={() => {
              setActive(card)
              onCardClick?.(card.id)
            }}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row items-center ">
              <motion.div layoutId={`image-${card.id}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.image}
                  alt={card.name}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left max-w-[300px] min-w-[300px] max-h-5 overflow-hidden"
                >
                  {card.name}
                </motion.h3>
            
                  <motion.p
                    className="inline-block text-neutral-600 dark:text-neutral-400 text-center md:text-left max-w-[300px] min-w-[300px]  max-h-5 overflow-hidden"
                  >
                    {card.services.join(', ')}
                  </motion.p>
                

              </div>
              <motion.p
                    className="md:ml-10 inline-block text-amber-600  text-center md:text-right min-w-[80px] "
                  >
                    {
                      card.distance !== undefined
                        ? `${card.distance.toFixed(2)} KM Away`
                        : ''
                    }
                </motion.p>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                deleteCard(card.id)
              }}
              className="text-white my-5 bg-red-500 px-2 py-2 rounded-md hover:scale-111 transition-all cursor-pointer"
            >
             <Trash/>
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
  )
}


export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.05 },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}