import { motion } from 'framer-motion';
import logging from 'loglevel';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import api from '../services/api';

// Configure logging
const logger = logging.getLogger("PlanPage");
logger.setLevel('debug');

// Set the app element for accessibility
Modal.setAppElement('#root');

export default function PlanPage({ token }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [plans, setPlans] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('created_at');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            logger.debug("Token detected, fetching plans.");
            fetchPlans();
        } else {
            logger.info("No token available. Skipping plan fetch.");
        }
    }, [token]);

    const handleCreatePlan = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }
        logger.debug("Creating plan with title:", title, "and description:", description);
        setIsSaving(true);
        try {
            const payload = { title, description, due_date: dueDate || null };
            await api.post('/plans/', payload, {
                headers: { 'token': token }
            });
            logger.info("Plan created successfully.");
            setTitle('');
            setDescription('');
            setDueDate('');
            fetchPlans();
            setError('');
        } catch (err) {
            logger.error("Error creating plan:", err);
            setError('Could not create plan.');
        } finally {
            setIsSaving(false);
        }
    };

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            logger.debug("Sending GET request to /plans/");
            const res = await api.get('/plans/', {
                headers: { 'token': token }
            });
            logger.debug("Received plans:", res.data);
            setPlans(res.data);
        } catch (err) {
            logger.error("Error fetching plans:", err);
            setError('Error fetching plans.');
        } finally {
            setIsLoading(false);
        }
    };

    const openEditModal = (plan) => {
        setCurrentPlan(plan);
        setIsEditModalOpen(true);
        logger.debug("Opening edit modal for plan:", plan);
    };

    const closeEditModal = () => {
        setCurrentPlan(null);
        setIsEditModalOpen(false);
        logger.debug("Closing edit modal.");
    };

    const handleUpdatePlan = async (e) => {
        e.preventDefault();
        if (!currentPlan.title.trim()) {
            setError('Title is required.');
            return;
        }
        logger.debug("Updating plan with ID:", currentPlan.id);
        setIsSaving(true);
        try {
            const payload = {
                title: currentPlan.title,
                description: currentPlan.description,
                due_date: currentPlan.due_date || null
            };
            await api.put(`/plans/${currentPlan.id}/`, payload, {
                headers: { 'token': token }
            });
            logger.info("Plan updated successfully.");
            closeEditModal();
            fetchPlans();
            setError('');
        } catch (err) {
            logger.error("Error updating plan:", err);
            setError('Could not update plan.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeletePlan = async (planId) => {
        if (!window.confirm("Are you sure you want to delete this plan?")) return;
        logger.debug("Deleting plan with ID:", planId);
        setIsSaving(true);
        try {
            await api.delete(`/plans/${planId}/`, {
                headers: { 'token': token }
            });
            logger.info("Plan deleted successfully.");
            fetchPlans();
            setError('');
        } catch (err) {
            logger.error("Error deleting plan:", err);
            setError('Could not delete plan.');
        } finally {
            setIsSaving(false);
        }
    };

    const toggleCompletion = async (plan) => {
        logger.debug("Toggling completion for plan ID:", plan.id);
        setIsSaving(true);
        try {
            const updatedPlan = { ...plan, is_completed: !plan.is_completed };
            await api.patch(`/plans/${plan.id}/`, { is_completed: updatedPlan.is_completed }, {
                headers: { 'token': token }
            });
            logger.info("Plan completion status updated.");
            fetchPlans();
            setError('');
        } catch (err) {
            logger.error("Error updating completion status:", err);
            setError('Could not update plan status.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        logger.debug("Filter changed to:", e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        logger.debug("Sort changed to:", e.target.value);
    };

    const displayedPlans = plans
        .filter(plan => {
            if (filter === 'completed') return plan.is_completed;
            if (filter === 'pending') return !plan.is_completed;
            return true;
        })
        .sort((a, b) => {
            if (sort === 'due_date') {
                return new Date(a.due_date) - new Date(b.due_date);
            }
            return new Date(a[sort]) - new Date(b[sort]);
        });

    return (
        <motion.div
            className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Your Plans</h2>
            {error && (
                <motion.div
                    className="mb-4 p-4 bg-red-100 text-red-700 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.div>
            )}
            {/* Filter and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center">
                    <label className="mr-2 font-medium">Filter:</label>
                    <select value={filter} onChange={handleFilterChange} className="border p-2 rounded">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <label className="mr-2 font-medium">Sort By:</label>
                    <select value={sort} onChange={handleSortChange} className="border p-2 rounded">
                        <option value="created_at">Creation Date</option>
                        <option value="due_date">Due Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
            {/* Create Plan Form */}
            <form onSubmit={handleCreatePlan} className="flex flex-col gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    rows="4"
                    placeholder="Description"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button
                    type="submit"
                    className={`mt-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition ${
                        isSaving ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSaving}
                >
                    {isSaving ? 'Creating...' : 'Create Plan'}
                </button>
            </form>
            {/* Plans List */}
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                </div>
            ) : (
                <ul className="space-y-4">
                    {displayedPlans.map(plan => (
                        <motion.li
                            key={plan.id}
                            className={`p-6 rounded-lg shadow-md flex justify-between items-center ${
                                plan.is_completed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div>
                                <h3 className={`text-xl font-semibold ${plan.is_completed ? 'line-through text-gray-500' : ''}`}>
                                    {plan.title}
                                </h3>
                                <p className={`${plan.is_completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {plan.description || 'No description provided.'}
                                </p>
                                {plan.due_date && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Due: {new Date(plan.due_date).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <button
                                    onClick={() => toggleCompletion(plan)}
                                    className={`flex items-center justify-center px-3 py-2 rounded-lg text-white ${
                                        plan.is_completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                                    } transition`}
                                    aria-label={plan.is_completed ? 'Mark as Pending' : 'Mark as Completed'}
                                >
                                    {plan.is_completed ? <FaTimes /> : <FaCheck />}
                                </button>
                                <button
                                    onClick={() => openEditModal(plan)}
                                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                    aria-label="Edit Plan"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeletePlan(plan.id)}
                                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                                    aria-label="Delete Plan"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            )}
            {/* Edit Plan Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Plan"
                className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                {currentPlan && (
                    <motion.form
                        onSubmit={handleUpdatePlan}
                        className="flex flex-col gap-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-center">Edit Plan</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={currentPlan.title}
                            onChange={(e) =>
                                setCurrentPlan({ ...currentPlan, title: e.target.value })
                            }
                            required
                        />
                        <textarea
                            rows="4"
                            placeholder="Description"
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={currentPlan.description}
                            onChange={(e) =>
                                setCurrentPlan({ ...currentPlan, description: e.target.value })
                            }
                        />
                        <input
                            type="date"
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={
                                currentPlan.due_date
                                    ? new Date(currentPlan.due_date).toISOString().split('T')[0]
                                    : ''
                            }
                            onChange={(e) =>
                                setCurrentPlan({ ...currentPlan, due_date: e.target.value })
                            }
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded-lg text-white ${
                                    isSaving
                                        ? 'bg-indigo-300 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                } transition`}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </motion.form>
                )}
            </Modal>
        </motion.div>
    );
}