import React, { useState, useEffect } from 'react';
import { BsTrash, BsX } from 'react-icons/bs'; // Icons for deleting comments (admin feature) and closing modal
import Avatar from 'react-avatar'; // Library for avatar icons
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, deleteComment, addComment, getRepliesByCommentId } from "../../redux/action/communityAction";

const CommunityComments = () => {
    const dispatch = useDispatch();
    const POLLING_INTERVAL = 1000;

    const commentsData = useSelector(({ communityReducer }) => communityReducer?.allComments?.data?.comments);
    const replies = useSelector(({ communityReducer }) => communityReducer?.commentReplies?.data?.replies);
    console.log("Replies:", replies); // Debugging
    
    useEffect(() => {
        dispatch(getAllComments());

        // Polling: Fetch comments at regular intervals
        const intervalId = setInterval(() => {
            dispatch(getAllComments());
        }, POLLING_INTERVAL);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const [commentText, setCommentText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [selectedComment, setSelectedComment] = useState(null);

    const handleCommentSubmit = () => {
        // Retrieve userid from localStorage
        // const userid = localStorage.getItem('userid');
        const userID='4'
        
        // Dispatch action to add comment with the new form data including userid
        dispatch(addComment({ content: commentText, category: selectedCategory, userID }));
    
        // Reset form data after dispatching the action
        setCommentText('');
        setSelectedCategory('General');
    };

    // Function to fetch replies when a comment is selected
    const handleCommentClick = (comment) => {
        console.log("Selected Comment ID:", comment.CommentID); // Debugging
        setSelectedComment(comment);
        // Dispatch action to fetch replies for the selected comment
        dispatch(getRepliesByCommentId(comment.CommentID));
    };

    const handleDeleteComment = (commentID) => {
        // Dispatch action to delete the comment
        console.log("Deleting comment with ID:", commentID); // Debugging
        dispatch(deleteComment(commentID));
    };
    

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedComment(null);
    };

    return (
        <div className="container mx-auto px-4 mt-8">
            <h1 className="text-2xl font-semibold text-019874 mb-6">Community Comments</h1>

            {/* Comment input */}
            <div className="mb-6">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-019874"
                    placeholder="Write a comment..."
                />
                {/* Dropdown for selecting category */}
                <div className="flex items-center mt-2">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-019874 mr-2"
                    >
                        <option value="General">General</option>
                        <option value="Announcement">Announcement</option>
                        <option value="Question">Question</option>
                        {/* Add more options as needed */}
                    </select>
                    <button
                        onClick={handleCommentSubmit}
                        className="bg-[#019874] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Post Comment
                    </button>
                </div>
            </div>

            {/* Render comments */}
            <div>
                {Array.isArray(commentsData) && commentsData.map((comment) => (
                    <div key={comment.id} className="bg-white p-4 mb-6 rounded-lg shadow cursor-pointer" onClick={() => handleCommentClick(comment)}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Avatar name={comment.fullName} round size="40" className="mr-2" />
                                <div>
                                    <p className="text-lg font-semibold">{comment.fullName}</p>
                                    <p className="text-gray-500 text-sm">{comment.createdAt}</p>
                                </div>
                            </div>
                            <button onClick={(e) => {e.stopPropagation(); handleDeleteComment(comment.CommentID)}} className="text-gray-500 hover:text-red-500 transition duration-300">
                                <BsTrash />
                            </button>
                        </div>
                        <div className="flex items-center mt-3">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {comment.category}
                            </span>
                            <p className="flex-grow">{comment.Content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for displaying comment and its replies */}
            {selectedComment && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg overflow-hidden w-96">
                        <div className="bg-[#019874] text-white px-4 py-2 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{selectedComment.fullName}'s Comment</h2>
                            <button onClick={handleCloseModal} className="text-white hover:text-red-500 transition duration-300">
                                <BsX />
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600">{selectedComment.Content}</p>
                            {/* Display replies */}
                            {replies && replies.length > 0 && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-semibold mb-2">Replies</h3>
                                    {replies.map((reply) => (
                                        <div key={reply.id} className="flex items-start mb-4">
                                            <Avatar name={reply.fullName} round size="30" className="mr-2" />
                                            <div>
                                                <p className="text-gray-600">{reply.Content}</p>
                                                <div className="mt-1">
                                                    <span className="text-gray-400 text-sm ml-2">{reply.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunityComments;
