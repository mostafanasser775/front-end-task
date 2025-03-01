import Link from "next/link";

import data from "../data.json";

export default function Home() {
    const totalWeeks = data.courseWeeks.length;
    const totalLessons = data.courseWeeks.reduce((acc, week) => acc + week.lessons.length, 0);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 text-center bg-white border border-gray-300 shadow-lg rounded-xl">
                <h1 className="mb-4 text-2xl font-bold text-gray-800">📚 Course Overview</h1>
                <p className="mb-2 text-lg text-gray-600">Total Weeks: <span className="font-semibold text-gray-900">{totalWeeks}</span></p>
                <p className="mb-4 text-lg text-gray-600">Total Lessons: <span className="font-semibold text-gray-900">{totalLessons}</span></p>
                <Link 
                    className="inline-block px-5 py-2 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700" 
                    href="/1"
                >
                    Start Course 🚀
                </Link>
            </div>
        </div>
    );
}
