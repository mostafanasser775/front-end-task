"use client";

import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, FileText, Video, Lock, FileQuestion } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Accordion, AccordionItem } from "@heroui/accordion";

import courseData from "../app/data.json"; // Import the JSON data



// Use the imported JSON data
export const courseWeeks: Week[] = courseData.courseWeeks.map((week: any) => ({
  ...week,
  lessons: week.lessons.map((lesson: any) => ({
    ...lesson,
    type: lesson.type as "video" | "file" | "exam"
  }))
}));



export default function CourseContent(
) {
  const { lessonId } = useParams()
  const section = courseWeeks.find(section => section.lessons.find(lesson => lesson.id === parseInt(lessonId as string)))

  {/*
   const defaultValue =
        typeof lessonId === "string"
            ? course.courseSections.find(section =>
                section.lessons.find(lesson => lesson.id === lessonId)
            )
            : course.courseSections[0]
  
  
  
    type="multiple"
            defaultValue={defaultValue ? [defaultValue.id] : undefined}
  
  
  */}
  const router = useRouter();


  const handleLessonClick = (weekId: string, lessonId: number) => {

    router.push(`/${lessonId}`);
    router.refresh();
  };

  return (
    <Card className="sticky overflow-hidden border shadow-none rounded-medium top-4 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="border-b bg-slate-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex flex-col w-full">
          <div className="text-lg dark:text-white">Topics for This Course</div>
          <div className="w-full mt-4">
            <div className="flex justify-between mb-1 text-sm dark:text-gray-300">
              <span>Progress</span>
              <span>73%</span>
            </div>
            <Progress className="h-2 bg-gray-200 dark:bg-gray-600" value={73} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="dark:bg-gray-800">
        <Accordion showDivider defaultExpandedKeys={section ? [section.id] : undefined}>
          {courseWeeks.map((week) => (
            <AccordionItem key={week.id} className="border-b dark:border-gray-600" subtitle={week.description} title={week.title} value={week.id}>
              <div className="">
                <div className="space-y-2">
                  {week.lessons.map((lesson) => (
                    <div key={lesson.id}
                      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors
                         ${lesson.id === parseInt(lessonId as string) ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : ''}
                       `}
                      role="button"
                      tabIndex={0}
                      onClick={() => lesson.videoUrl && handleLessonClick(week.id, lesson.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          lesson.videoUrl && handleLessonClick(week.id, lesson.id);
                        }
                      }}
                    >
                    
                      <div className="flex items-start p-3 border rounded-md dark:border-gray-600">
                        <div className="flex-shrink-0 mt-1">
                          {lesson.type === "file" ? (
                            <FileText className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                          ) : lesson.type === "exam" ? (
                            <FileQuestion className="w-5 h-5 text-orange-500" />
                          ) : (
                            <Video className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 ml-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium dark:text-gray-200">{lesson.title}</span>
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : lesson.locked ? (
                              <Lock className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                            ) : null}
                          </div>
                          {lesson.duration && (
                          
                            <div className="flex items-center mt-1">
                              {lesson.questions !== undefined && lesson.questions > 0 && (
                                <span className="mr-2 text-xs text-green-500">{lesson.questions} QUESTIONS</span>
                              )}
                              <span className="text-xs text-red-500">{lesson.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  icon: string;
  questions?: number;
  videoUrl?: string;
  thumbnail?: string;
  type?: "video" | "file" | "exam";
}

export interface Week {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}