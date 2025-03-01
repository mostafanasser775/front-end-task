'use client'
import CourseComments from "@/components/course-comments";
import CourseContent from "@/components/course-content";
import CourseInstructor from "@/components/course-instructor";
import { useExpandStore } from "@/store/useExpandStore";
import EncouragingMessage from "@/components/EncouragingMessage";
import { LinkSBTNS } from "@/components/LinksBTNs";

export default function CourseDetails({ children }: { children: React.ReactNode }) {
  const { expand } = useExpandStore();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Toggle Content Position */}
        {expand && (
          <div className="lg:col-span-3">
            {children}
            <LinkSBTNS/>
          </div>
        )}
        <div className="space-y-6 lg:col-span-2">
          {!expand && (
            <div className="lg:col-span-2">
              {!expand && children}
              <LinkSBTNS/>

            </div>
          )}
          <CourseInstructor />
          <CourseComments />
        </div>
        <div className="lg:col-span-1">
          <EncouragingMessage />
          <CourseContent />
        </div>
      </div>
    </div>
  );
}
