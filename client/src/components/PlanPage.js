import logging from 'loglevel';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Install react-modal for editing functionality
import api from '../services/api'; // Adjust the import path as necessary

// Configure logging
const logger = logging.getLogger("PlanPage");
logger.setLevel('debug');

// Set the app element for accessibility
Modal.setAppElement('#root');

export default function PlanPage({ token }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [plans, setPlans] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [filter, setFilter] = useState('all'); // For filtering plans
    const [sort, setSort] = useState('created_at'); // For sorting plans
    const [dueDate, setDueDate] = useState(''); // State for due date in create form

    // Fetch plans when component mounts or token changes
    useEffect(() => {
        if (token) {
            logger.debug("Token detected, fetching plans.");
            fetchPlans();
        } else {
            logger.info("No token available. Skipping plan fetch.");
        }
    }, [token]);

    // Function to create a new plan
    const handleCreatePlan = async (e) => {
        e.preventDefault();
        logger.debug("Creating plan with title:", title, "and description:", description);
        try {
            const payload = { title, description };
            if (dueDate) payload.due_date = dueDate;
            logger.debug("Sending POST request to /plans/");
            await api.post('/plans/', payload, {
                headers: {
                    'token': token
                }
            });
            logger.info("Plan created successfully.");
            setTitle('');
            setDescription('');
            setDueDate('');
            fetchPlans();
        } catch (err) {
            logger.error("Error creating plan:", err);
            alert('Could not create plan.');
        }
    };

    // Function to fetch all plans
    const fetchPlans = async () => {
        logger.debug("Fetching plans with token:", token);
        try {
            logger.debug("Sending GET request to /plans/");
            const res = await api.get('/plans/', {
                headers: {
                    'token': token
                }
            });
            logger.debug("Received plans:", res.data);
            setPlans(res.data);
        } catch (err) {
            logger.error("Error fetching plans:", err);
            alert('Error fetching plans.');
        }
    };

    // Function to open edit modal
    const openEditModal = (plan) => {
        setCurrentPlan(plan);
        setIsEditModalOpen(true);
        logger.debug("Opening edit modal for plan:", plan);
    };

    // Function to close edit modal
    const closeEditModal = () => {
        setCurrentPlan(null);
        setIsEditModalOpen(false);
        logger.debug("Closing edit modal.");
    };

    // Function to handle plan update
    const handleUpdatePlan = async (e) => {
        e.preventDefault();
        logger.debug("Updating plan with ID:", currentPlan.id);
        try {
            const payload = { title: currentPlan.title, description: currentPlan.description };
            if (currentPlan.due_date) payload.due_date = currentPlan.due_date;
            logger.debug(`Sending PUT request to /plans/${currentPlan.id}/`);
            await api.put(`/plans/${currentPlan.id}/`, payload, {
                headers: {
                    'token': token
                }
            });
            logger.info("Plan updated successfully.");
            closeEditModal();
            fetchPlans();
        } catch (err) {
            logger.error("Error updating plan:", err);
            alert('Could not update plan.');
        }
    };

    // Function to handle plan deletion
    const handleDeletePlan = async (planId) => {
        if (!window.confirm("Are you sure you want to delete this plan?")) return;
        logger.debug("Deleting plan with ID:", planId);
        try {
            logger.debug(`Sending DELETE request to /plans/${planId}/`);
            await api.delete(`/plans/${planId}/`, {
                headers: {
                    'token': token
                }
            });
            logger.info("Plan deleted successfully.");
            fetchPlans();
        } catch (err) {
            logger.error("Error deleting plan:", err);
            alert('Could not delete plan.');
        }
    };

    // Function to toggle plan completion
    const toggleCompletion = async (plan) => {
        logger.debug("Toggling completion for plan ID:", plan.id);
        try {
            const updatedPlan = { ...plan, is_completed: !plan.is_completed };
            logger.debug(`Sending PATCH request to /plans/${plan.id}/`);
            await api.patch(`/plans/${plan.id}/`, { is_completed: updatedPlan.is_completed }, {
                headers: {
                    'token': token
                }
            });
            logger.info("Plan completion status updated.");
            fetchPlans();
        } catch (err) {
            logger.error("Error updating completion status:", err);
            alert('Could not update plan status.');
        }
    };

    // Function to handle filtering
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        logger.debug("Filter changed to:", e.target.value);
    };

    // Function to handle sorting
    const handleSortChange = (e) => {
        setSort(e.target.value);
        logger.debug("Sort changed to:", e.target.value);
    };

    // Apply filtering and sorting to plans
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
        <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Your Plans</h2>
            {/* Filter and Sort Controls */}
            <div className="flex justify-between mb-4">
                <div>
                    <label className="mr-2">Filter:</label>
                    <select value={filter} onChange={handleFilterChange} className="border p-1 rounded">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label className="mr-2">Sort By:</label>
                    <select value={sort} onChange={handleSortChange} className="border p-1 rounded">
                        <option value="created_at">Creation Date</option>
                        <option value="due_date">Due Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
            {/* Create Plan Form */}
            <form onSubmit={handleCreatePlan} className="flex flex-col gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={title}
                    onChange={(e) => {
                        logger.debug("Title input changed:", e.target.value);
                        setTitle(e.target.value);
                    }}
                    required
                />
                <textarea
                    rows="3"
                    placeholder="Description"
                    className="border p-2 rounded"
                    value={description}
                    onChange={(e) => {
                        logger.debug("Description input changed:", e.target.value);
                        setDescription(e.target.value);
                    }}
                />
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={dueDate}
                    onChange={(e) => {
                        logger.debug("Due date input changed:", e.target.value);
                        setDueDate(e.target.value);
                    }}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create Plan
                </button>
            </form>
            {/* Plans List */}
            <ul className="space-y-4">
                {displayedPlans.map(plan => (
                    <li key={plan.id} className={`p-4 border rounded ${plan.is_completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className={`font-semibold ${plan.is_completed ? 'line-through' : ''}`}>{plan.title}</h3>
                                <p className={`${plan.is_completed ? 'line-through' : ''}`}>{plan.description || 'No description provided.'}</p>
                                {plan.due_date && <p className="text-sm text-gray-600">Due: {new Date(plan.due_date).toLocaleDateString()}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => toggleCompletion(plan)}
                                    className={`px-2 py-1 rounded ${plan.is_completed ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
                                >
                                    {plan.is_completed ? 'Mark as Pending' : 'Mark as Completed'}
                                </button>
                                <button
                                    onClick={() => openEditModal(plan)}
                                    className="px-2 py-1 rounded bg-blue-500 text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePlan(plan.id)}
                                    className="px-2 py-1 rounded bg-red-500 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Edit Plan Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Plan"
                className="max-w-md mx-auto bg-white p-6 rounded shadow mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
            >
                {currentPlan && (
                    <form onSubmit={handleUpdatePlan} className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold">Edit Plan</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border p-2 rounded"
                            value={currentPlan.title}
                            onChange={(e) => {
                                logger.debug("Edit Title input changed:", e.target.value);
                                setCurrentPlan({ ...currentPlan, title: e.target.value });
                            }}
                            required
                        />
                        <textarea
                            rows="3"
                            placeholder="Description"
                            className="border p-2 rounded"
                            value={currentPlan.description}
                            onChange={(e) => {
                                logger.debug("Edit Description input changed:", e.target.value);
                                setCurrentPlan({ ...currentPlan, description: e.target.value });
                            }}
                        />
                        <input
                            type="date"
                            className="border p-2 rounded"
                            value={currentPlan.due_date ? new Date(currentPlan.due_date).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                logger.debug("Edit Due date input changed:", e.target.value);
                                setCurrentPlan({ ...currentPlan, due_date: e.target.value });
                            }}
                        />
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={closeEditModal} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
