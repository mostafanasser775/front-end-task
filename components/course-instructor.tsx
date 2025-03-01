"use client";

import { Card, CardBody } from "@heroui/card";
import { Clock, Users, BookOpen, Globe } from "lucide-react";
import { CardHeader } from "@heroui/card";

export default function CourseInstructor() {
  return (
    <Card className="overflow-hidden border shadow-none rounded-medium dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="p-6 border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="text-xl font-bold dark:text-white">Instructor Details</div>
      </CardHeader>
      <CardBody className="p-6 dark:bg-gray-800">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Experience:</p>
                <p className="font-medium dark:text-gray-200">10 years</p>
              </div>
            </div>

            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Courses:</p>
                <p className="font-medium dark:text-gray-200">15</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Students:</p>
                <p className="font-medium dark:text-gray-200">500+</p>
              </div>
            </div>

            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Languages:</p>
                <p className="font-medium dark:text-gray-200">English, Spanish</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Experience:</p>
                <p className="font-medium dark:text-gray-200">10 years</p>
              </div>
            </div>

            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Courses:</p>
                <p className="font-medium dark:text-gray-200">15</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Students:</p>
                <p className="font-medium dark:text-gray-200">500+</p>
              </div>
            </div>

            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-3 text-muted-foreground dark:text-gray-300" />
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">Languages:</p>
                <p className="font-medium dark:text-gray-200">English, Spanish</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}