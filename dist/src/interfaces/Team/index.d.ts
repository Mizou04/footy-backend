export default interface Team {
    "id": number;
    "name": string;
    "code": string;
    "country": string;
    "founded": number;
    "national": boolean;
    "logo": string;
}
export interface TeamMin extends Pick<Team, "id" | "name" | "logo"> {
}
