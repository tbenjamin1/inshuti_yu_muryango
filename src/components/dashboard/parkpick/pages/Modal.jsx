import { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';



export default function Modal({ setOpenModal, onChildEvent, Title, button, children, onChildSaveEvent }) {

    let completeButtonRef = useRef(null)
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        onChildEvent()
    }
    const handleClicks = (event) => {
        // event.preventDefault();
    }
    const handlePropClick = (event) => {
        event.preventDefault();
        onChildSaveEvent()
    }

    useEffect(() => {
        setOpen(setOpenModal)
    }, [setOpenModal]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog initialFocus={completeButtonRef} as="div" className="relative z-10" onClose={handleClicks}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed  bg-gray-500 bg-opacity-75   transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-lg  ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute right-4 top-6 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={handleClick}
                                            >

                                                <span className="sr-only">Close panel</span>

                                                <XMarkIcon className="h-7 w-7 p-1 bg-red-500 rounded-full  font-bold text-white " aria-hidden="true" onClose={handleClick} />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6 border-b-4 border-red-500">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 p-4  flex justify-between ">
                                                <span>{Title}</span>
                                                {/* <span>
                                                    <button className='create_btn px-5 py-2 rounded-lg bg-red-500 text-white' onClick={handlePropClick} >{button} </button>
                                                </span> */}
                                                
                                            </Dialog.Title>
                                        </div>
                                        <div ref={completeButtonRef} className="relative mt-6 flex-1 px-4 sm:px-6 ">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}