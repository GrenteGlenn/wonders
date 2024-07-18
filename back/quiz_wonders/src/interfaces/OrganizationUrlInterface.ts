export default interface OrganisationUrl {
  id: number;
  url: string | null;
  organization_id: number;
  rank: number;
  partner: string;
  status_id: number;
  key: string | null;
  created_at?: Date;
  updated_at?: Date;
}