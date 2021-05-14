import PartnerDTO from '@layer/application/models/partner';

export default interface IPartnerRepository {
  findAll(): Promise<PartnerDTO[]>;

  findByQuery(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO[]>;

  findSpecific(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO>;
}
