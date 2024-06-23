export default interface OrganisationUrl {
    id: number;
    url: string | null;
    organisationId: number;
    rank: number;
    partner: string;
    key: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}