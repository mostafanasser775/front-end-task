import data from '../../data.json';
import { VideoPlayer } from '../../../components/VideoPlayer';
import StaticDataPage from '../../../components/StaticDataPage';

export default async function LessonDetails({ params }: { params: Promise<{ lessonId: string }>; }) {
    const { lessonId } = await params;
    const lesson = data.courseWeeks.flatMap(week => week.lessons).find(lesson => lesson.id === parseInt(lessonId));

    const nextLesson = data.courseWeeks.flatMap(week => week.lessons).find(lesson => lesson.type === 'video' && lesson.id === parseInt(lessonId) + 1);
    const privousLesson = data.courseWeeks.flatMap(week => week.lessons).find(lesson => lesson.type === 'video' && lesson.id === parseInt(lessonId) - 1);

    if (!lesson) {
        return <div>Lesson not found.</div>;
    }

    if (lesson.type !== 'video') {
        return <StaticDataPage  />;
    }

    return (
        <div>
            <VideoPlayer
                nextUrl={nextLesson ? `/course-details/${nextLesson.id}` : null}
                privousLesson={privousLesson ? `/course-details/${privousLesson.id}` : null}
                url={lesson.videoUrl || ''}
            />
        </div>
    );
}
