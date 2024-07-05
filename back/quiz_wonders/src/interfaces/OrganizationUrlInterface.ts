export default interface OrganisationUrl {
  id: number;
  url: string | null;
  organizationId: number;
  rank: number;
  partner: string;
  key: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}