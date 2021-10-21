import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import ChevronDownIcon from './ChevronDownIcon';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
import { AiOutlinePercentage } from 'react-icons/ai';

const FilterPopup = ({ handleSubmit, handleChange, handleDiscount, filters }) => {
    return (
        <div className='w-full'>
            <Popover className='relative'>
                {({ open }) => (
                    <>
                        <Popover.Button className='flex justify-center'>
                            <ChevronDownIcon />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                        >
                            <Popover.Panel className='absolute z-10 max-w-sm px-4 mt-3 transform right-0 sm:px-0 lg:max-w-3xl'>
                                <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                                    <div className='relative gap-8 bg-white p-7'>
                                        <div className='flex flex-col gap-4'>
                                            <select
                                                className='border cursor-pointer p-2 rounded-md text-white bg-gray-300 outline-none hover:bg-cocoMall-400'
                                                onChange={handleChange}
                                            >
                                                <option name='' value=''>
                                                    Most Relevant
                                                </option>
                                                <option name='ASC' value='ASC'>
                                                    High Price
                                                </option>
                                                <option name='DESC' value='DESC'>
                                                    Low Price
                                                </option>
                                            </select>

                                            <button
                                                className='border flex items-center gap-2 cursor-pointer p-2 rounded-md text-white bg-gray-300 outline-none hover:bg-cocoMall-400'
                                                onClick={handleDiscount}
                                            >
                                                <span>Promotions</span>
                                                <AiOutlinePercentage className='inline-block' />
                                            </button>

                                            <form
                                                onSubmit={(e) => handleSubmit(e)}
                                                className='flex items-center gap-1'
                                            >
                                                <input
                                                    type='number'
                                                    placeholder='min'
                                                    name='min'
                                                    className=' appearance-none border border-gray-50 rounded shadow-sm py-1 px-3 w-24
                                            focus:outline-none focus:bg-white focus:border-cocoMall-100 '
                                                    value={filters.min}
                                                    onChange={handleChange}
                                                ></input>
                                                <AiOutlineLine className='text-cocoMall-400 h-full' />
                                                <input
                                                    type='number'
                                                    placeholder='max'
                                                    name='max'
                                                    className=' appearance-none border border-gray-50 rounded shadow-sm py-1 px-3 w-24
                                            focus:outline-none focus:bg-white focus:border-cocoMall-100 '
                                                    value={filters.max}
                                                    onChange={handleChange}
                                                ></input>
                                                <button
                                                    className='flex text-cocoMall-300 h-6'
                                                    type='submit'
                                                >
                                                    <BsFillArrowRightCircleFill className='h-full w-full' />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
};

export default FilterPopup;
