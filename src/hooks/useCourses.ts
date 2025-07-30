import { useQuery } from '@tanstack/react-query';
import { firestore, queryHelpers } from '@/lib/firestore';

export interface Course {
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    additionalCourse?: boolean; // Added to fix EnrollmentForm usage
    pricePix?: Number;
    priceBoleto?: Number;
    priceCartao?: Number;
}

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: async (): Promise<Course[]> => {
            try {
                // Fetch only active courses, ordered by creation date
                const courses = await firestore.query<Course>('courses', [
                    // queryHelpers.where('isActive', '==', true),
                    queryHelpers.orderBy('createdAt', 'desc')
                ]);

                return courses;
            } catch (error) {
                console.error('Error fetching courses:', error);
                throw new Error('Failed to fetch courses');
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook to get a single course by ID
export const useCourse = (courseId: string) => {
    return useQuery({
        queryKey: ['course', courseId],
        queryFn: async (): Promise<Course | null> => {
            if (!courseId) return null;

            try {
                const course = await firestore.get<Course>('courses', courseId);
                return course;
            } catch (error) {
                console.error('Error fetching course:', error);
                throw new Error('Failed to fetch course');
            }
        },
        enabled: !!courseId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });
}; 