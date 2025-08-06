import { useQuery } from '@tanstack/react-query';
import { firestore, queryHelpers } from '@/lib/firestore';

export interface Users {
    accessLevel: number;
    asaasCustomerId: string;
    asaasPaymentId: string;
    city: string;
    contratoUrl: string;
    courses: { id: string; time: string } [];
    cpfCnpj: string;
    createdAt: Date; // ou string, se estiver vindo como string
    email: string;
    firebaseUid: string;
    isActive: boolean;
    motivoInadimplencia: string;
    name: string;
    neighborhood: string;
    number: string;
    phone: string;
    state: string;
    updatedAt: Date; // ou string
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<Users[]> => {
            try {
                // Fetch only active courses, ordered by creation date
                const users = await firestore.query<Users>('users', [
                    // queryHelpers.where('isActive', '==', true),
                    queryHelpers.orderBy('createdAt', 'desc')
                ]);

                return users;
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