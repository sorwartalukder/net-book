import React from "react";
import { Link } from "react-router-dom";

function NoteModal({ closeModal, noteData, handleDelete, handleCompleted }) {
    return (
        <>
            {noteData ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={closeModal}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                                <div>
                                    {/* header btn */}
                                    <div className="items-center p-1 gap-2 flex justify-between">
                                        {/* delete btn */}
                                        <button
                                            onClick={() => handleDelete(noteData._id)}
                                            className="flex bg-red-300 p-2 rounded-full hover:shadow-sm hover:shadow-slate-900 "
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-9 h-9 text-red-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        {/* modal close btn */}
                                        <button
                                            onClick={closeModal}
                                            className="px-4 py-2 uppercase font-bold bg-slate-300 hover:shadow-sm hover:shadow-slate-900 rounded-full text-center text-3xl"
                                        >
                                            X
                                        </button>

                                    </div>

                                    {/* content */}
                                    <div className="mt-2 p-4 text-center sm:ml-4 sm:text-left">
                                        <p className="mt-2 text-[15px] leading-relaxed text-gray-500 text-justify">
                                            {noteData.note}
                                        </p>
                                        {
                                            noteData?.image && <img className='w-full max-h-[500px] max-w-lg p-3 mx-auto' src={noteData?.image} alt="" />
                                        }

                                    </div>
                                    {/* footer btn */}
                                    <div className="items-center gap-2 mt-3 sm:flex justify-between p-4">
                                        <Link to={`/update-task/${noteData._id}`}>
                                            <button
                                                className="w-full mt-2 px-7 py-3  uppercase font-semibold text-slate-100 bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-md hover:shadow-slate-900 rounded-md text-center"
                                            >
                                                Update
                                            </button>
                                        </Link>
                                        <div>
                                            <button
                                                onClick={() => handleCompleted(noteData._id)}
                                                className="w-full mt-2 px-5 py-3 uppercase font-semibold text-slate-100 bg-gradient-to-r from-cyan-400 to-green-500 hover:shadow-md hover:shadow-slate-900 rounded-md text-center"
                                            >
                                                Complete
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
export default NoteModal;