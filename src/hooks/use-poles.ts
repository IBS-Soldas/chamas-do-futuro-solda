import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust based on your path

export interface Poles {
    id: string;
    name: string;
}

export const usePoles = () => {
    return useQuery({
        queryKey: ['poles'],
        queryFn: async () => {
            const snapshot = await getDocs(collection(db, 'poles'));
            const results: { id: string, name: string }[] = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                if (data?.name) {
                    results.push({ id: doc.id, name: data.name });
                }
            });

            return results;
        }
    });
};
