'use client'
import { Button } from '@heroui/button';
import { Link2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

// Static data
const lesson = {
    title: "Sample Lesson",
    description: "This is a sample lesson description.",
    questions: [
        {
            text: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"]
        },
        {
            text: "What is 2 + 2?",
            options: ["3", "4", "5", "6"]
        }
    ]
};

const StaticDataPage = () => {
    const router = useRouter();

    return (
        <div className="container relative p-4 mx-auto border rounded-medium">
            <h1 className="mb-4 text-4xl font-bold">{lesson.title}</h1>
            <p className="mb-6 text-lg">{lesson.description}</p>
            {/* Add more static data fields as needed */}
            <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">Exam Questions</h2>
                {lesson.questions && lesson.questions.length > 0 ? (
                    <ul className="pl-5 space-y-4 list-disc">
                        {lesson.questions.map((question: any, index: number) => (
                            <li key={index} className="mb-4">
                                <p className="font-medium">{question.text}</p>
                                <ul className="pl-5 mt-2 space-y-2 list-disc">
                                    {question.options.map((option: string, idx: number) => (
                                        <li key={idx} className="text-gray-700">{option}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No questions available.</p>
                )}
            </div>
            <Button className="absolute bottom-4 right-4" startContent={<Link2 />} onPress={() => router.push("/course-details/2")}>
                Next Lesson
            </Button>
        </div >
    );
};

export default StaticDataPage;
