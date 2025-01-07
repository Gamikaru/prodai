import { Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation({ navigation, token, handleLogout }) {
    const location = useLocation();

    // Define motion variants for links
    const linkVariants = {
        hover: {
            scale: 1.05,
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            transition: { duration: 0.3 },
        },
        tap: {
            scale: 0.95,
        },
    };

    return (
        <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link to="/" className="text-2xl font-bold text-indigo-500 dark:text-gray-100">
                                        prodai
                                    </Link>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
                                    {navigation.map((item, index) => {
                                        if (item.auth === 'guest' && token) return null;
                                        if (item.auth === 'user' && !token) return null;

                                        const isActive = location.pathname === item.path;

                                        return (
                                            <motion.div
                                                key={index}
                                                variants={linkVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                                className="flex"
                                            >
                                                <Link
                                                    to={item.path}
                                                    className={`px-3 py-2 rounded-md text-sm font-medium ${isActive
                                                            ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900'
                                                            : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white'
                                                        }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center">
                                {token && (
                                    <motion.button
                                        onClick={handleLogout}
                                        className="hidden lg:inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Logout
                                    </motion.button>
                                )}
                                <div className="-mr-2 flex lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <FaTimes className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <FaBars className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                        >
                            {navigation.map((item, index) => {
                                if (item.auth === 'guest' && token) return null;
                                if (item.auth === 'user' && !token) return null;

                                const isActive = location.pathname === item.path;

                                return (
                                    <motion.div
                                        key={index}
                                        variants={linkVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        className="flex"
                                    >
                                        <Link
                                            to={item.path}
                                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                                                    ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900'
                                                    : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            {token && (
                                <motion.button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
                                    variants={linkVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    Logout
                                </motion.button>
                            )}
                        </motion.div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

Navigation.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            auth: PropTypes.string,
        })
    ).isRequired,
    token: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
};