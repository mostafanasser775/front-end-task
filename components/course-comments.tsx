"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Avatar } from "@heroui/avatar";

export default function CourseComments() {
  const [comment, setComment] = useState("");

  const comments = [
    {
      id: 1,
      user: {
        name: "Student Name Goes Here",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        initials: "SN"
      },
      date: "Oct 10, 2021",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      user: {
        name: "Student Name Goes Here",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        initials: "SN"
      },
      date: "Oct 15, 2021",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 3,
      user: {
        name: "Student Name Goes Here",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        initials: "SN"
      },
      date: "Oct 19, 2021",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  return (
    <Card className="overflow-hidden border shadow-none rounded-medium dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="p-6 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="text-xl font-bold dark:text-white">Comments</div>
      </CardHeader>
      <CardBody className="p-6 dark:bg-gray-800">
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar alt={comment.user.name} className="w-12 h-12 rounded-full" src={comment.user.avatar} />

              <div className="flex-1">
                <div className="mb-1">
                  <h4 className="font-medium dark:text-gray-200">{comment.user.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Textarea 
            placeholder="Write a comment..."
            value={comment}
            variant="bordered"
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className="mt-4 text-white bg-teal-500 hover:bg-teal-600">
            Submit Review <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}