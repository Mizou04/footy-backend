export default function getLeague(params: string): Promise<{
    id: number;
    logo: string;
    name: string;
    seasons: number[];
}>;
