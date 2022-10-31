export default function getLeagues(): Promise<{
    id: number;
    logo: string;
    name: string;
    seasons: number[];
}[]>;
