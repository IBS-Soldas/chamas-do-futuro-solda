import { useQuery } from '@tanstack/react-query';

export interface State {
    id: number;
    sigla: string;
    nome: string;
}

export interface City {
    id: number;
    nome: string;
}

export function useBrazilStates() {
    return useQuery<State[]>({
        queryKey: ['brazil-states'],
        queryFn: async () => {
            const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            return res.json();
        },
        staleTime: Infinity,
    });
}

export function useBrazilCities(uf: string | undefined) {
    return useQuery<City[]>({
        queryKey: ['brazil-cities', uf],
        queryFn: async () => {
            if (!uf) return [];
            const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
            return res.json();
        },
        enabled: !!uf,
        staleTime: Infinity,
    });
} 