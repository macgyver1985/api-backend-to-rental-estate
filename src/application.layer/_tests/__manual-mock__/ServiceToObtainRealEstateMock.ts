import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets/services';
import ResultOnDemandDTO from '@layer/application/models/common';
import { RealEstateDTO } from '@layer/application/models/realEstate';

const sourceRealEstateRepo: Array<RealEstateDTO> = [{
  usableAreas: 70,
  listingType: 'USED',
  createdAt: '2018-04-26T14:51:42.045Z',
  listingStatus: 'ACTIVE',
  id: 'f7fd10d6ecce',
  parkingSpaces: 1,
  updatedAt: '2018-04-26T14:51:42.045Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/0078a0d5f8c80983edf3dc9b65bcc7b9.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/fc13ad2b33804a3c73bf21ed46f42ae9.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/4f6f41feae4acae8b9f3cc13d5f73424.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/3d119c8c5e9761bda68f810f29b6ea96.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/32e72ba7162028d5c786e0e001e0578f.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Alto da Boa Vista', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.692323, lat: -23.634708 } } },
  bathrooms: 1,
  bedrooms: 2,
  pricingInfos: {
    yearlyIptu: '80', price: '470000', businessType: 'SALE', monthlyCondoFee: '450',
  },
}, {
  usableAreas: 38,
  listingType: 'USED',
  createdAt: '2017-03-06T15:47:02Z',
  listingStatus: 'ACTIVE',
  id: '7695cc9681a6',
  parkingSpaces: 1,
  updatedAt: '2017-03-06T15:47:02Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/44e87a53a829e087fc4efa253f8e13ab.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/d3bc2fe78ca377b3d5447268ae9a156f.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/bd41e1219e38b614125eb402f2c4349c.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/60acbe6a250cf7fa2f066680e18232a2.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/f8be122060654c3797db4c7f460545dc.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Santo Amaro', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.713931, lat: -23.63417 } } },
  bathrooms: 1,
  bedrooms: 1,
  pricingInfos: {
    yearlyIptu: '0', price: '500000', businessType: 'SALE', monthlyCondoFee: '570',
  },
}, {
  usableAreas: 210,
  listingType: 'USED',
  createdAt: '2016-09-05T15:03:38Z',
  listingStatus: 'ACTIVE',
  id: '1eeef4f6fde9',
  parkingSpaces: 4,
  updatedAt: '2016-09-05T15:03:38Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/b7e5d454cb027e04fbe55f8d5fcac4ac.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/cb9363d9d61277f8eb299d79c67521e6.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/7410677dc04a9bb1aa0d388c6d010ba4.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/c7b291c7c5ba036962cadd97c66a68cd.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/2f4c4f605affc6ca531e576a18ea4712.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Santo Amaro', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.714629, lat: -23.634705 } } },
  bathrooms: 5,
  bedrooms: 3,
  pricingInfos: {
    yearlyIptu: '600', price: '2175000', businessType: 'SALE', monthlyCondoFee: '1600',
  },
}, {
  usableAreas: 115,
  listingType: 'USED',
  createdAt: '2016-03-04T18:15:52Z',
  listingStatus: 'ACTIVE',
  id: '6d01450561c4',
  parkingSpaces: 2,
  updatedAt: '2016-03-04T18:15:52Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/ad83a2907230b65ecef7a7820303db46.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/aec2fc26570b52e3638a458cd121f885.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/ef91192d68ea7239b6d3e907ef632344.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/a8238df087181b641e08da2ff86249c5.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/ff87ccfc182563df838d9da86ee4153f.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Vila Andrade', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.732536, lat: -23.634245 } } },
  bathrooms: 0,
  bedrooms: 3,
  pricingInfos: {
    yearlyIptu: '290', price: '470000', businessType: 'SALE', monthlyCondoFee: '1400',
  },
}, {
  usableAreas: 96,
  listingType: 'USED',
  createdAt: '2017-05-09T19:36:28.526Z',
  listingStatus: 'ACTIVE',
  id: 'a73fa4c17953',
  parkingSpaces: 2,
  updatedAt: '2017-05-09T19:36:28.526Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/da882cb5f9542a1a79c22206a986d69c.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/d2552c6fd81d3d75798735f9d6dc7c78.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/26e97c2814af0fea395c409e8222861d.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/8a2e6b95be05774c3be9404e995b060f.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/b9e6d424c525c00bbae1afe57db323ec.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Vila Andrade', geoLocation: { precision: 'GEOMETRIC_CENTER', location: { lon: -46.732878, lat: -23.634306 } } },
  bathrooms: 3,
  bedrooms: 3,
  pricingInfos: {
    yearlyIptu: '190', price: '609000', businessType: 'SALE', monthlyCondoFee: '870',
  },
}, {
  usableAreas: 103,
  listingType: 'USED',
  createdAt: '2017-11-13T23:09:55.702Z',
  listingStatus: 'ACTIVE',
  id: '5da5856a8309',
  parkingSpaces: 3,
  updatedAt: '2017-11-13T23:09:55.702Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/e1f29f6562d455cee1f1328cc9504645.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/756082ca420e28358e18432204e7e250.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/81f633654f7a9ab370c9b122eff7bc8a.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/7ca8b22ea673bde3b3335a308cdc9d74.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/c6e90f96b06353f65a86786077774dfb.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Vila Andrade', geoLocation: { precision: 'GEOMETRIC_CENTER', location: { lon: -46.732227, lat: -23.634862 } } },
  bathrooms: 3,
  bedrooms: 3,
  pricingInfos: {
    yearlyIptu: '420', price: '700000', businessType: 'SALE', monthlyCondoFee: '900',
  },
}, {
  usableAreas: 109,
  listingType: 'USED',
  createdAt: '2017-06-22T17:03:15.360Z',
  listingStatus: 'ACTIVE',
  id: '43584963f040',
  parkingSpaces: 2,
  updatedAt: '2017-06-22T17:03:15.360Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/1fd65ae4ad8d3d7fbdde13f2f96ee7ea.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/b6398c52fb8d03d42ebe7b2a0dac8b91.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/4d8d2db5a1b8bd31f42b136c159eebc9.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/9e847981a5badd477abf98f50a1e3eb2.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/42694e24b7dada9cad7add3a99565586.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Vila Andrade', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.732384, lat: -23.634012 } } },
  bathrooms: 2,
  bedrooms: 3,
  pricingInfos: {
    period: 'MONTHLY', yearlyIptu: '325', price: '4000', rentalTotalPrice: '5341', businessType: 'RENTAL', monthlyCondoFee: '1341',
  },
}, {
  usableAreas: 740,
  listingType: 'USED',
  createdAt: '2017-05-02T11:32:42.506Z',
  listingStatus: 'ACTIVE',
  id: 'a6c82735be7e',
  parkingSpaces: 16,
  updatedAt: '2017-05-02T11:32:42.506Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/c985f7d222c337ccf83016a7a805047f.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/f8ac58aa9e10832e134d156861c30fcf.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/e3ec775fa4bd0edd0ac98044682c93b8.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Chácara Santo Antônio (Zona Sul)', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.695539, lat: -23.634325 } } },
  bathrooms: 0,
  bedrooms: 0,
  pricingInfos: {
    period: 'MONTHLY', yearlyIptu: '0', price: '30000', rentalTotalPrice: '30000', businessType: 'RENTAL', monthlyCondoFee: '0',
  },
}, {
  usableAreas: 210,
  listingType: 'USED',
  createdAt: '2016-08-25T09:41:05Z',
  listingStatus: 'ACTIVE',
  id: '26e61f526af8',
  parkingSpaces: 4,
  updatedAt: '2016-08-25T09:41:05Z',
  owner: false,
  images: ['https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/ef9dae70095512372137f35c6bfce41e.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/3db0f6b5d1cf15c262b2c03c38484be4.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/83f374779caf13af825d5e90da8af718.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/fad9f133192be47b8318feeb35168fac.jpg', 'https://resizedimgs.prontoparamorar.com/crop/400x300/vr.images.sp/15c82ea39f4d83f8761eace3cc33cb19.jpg'],
  address: { city: 'São Paulo', neighborhood: 'Santo Amaro', geoLocation: { precision: 'ROOFTOP', location: { lon: -46.714629, lat: -23.634705 } } },
  bathrooms: 5,
  bedrooms: 3,
  pricingInfos: {
    yearlyIptu: '0', price: '1860000', businessType: 'SALE', monthlyCondoFee: '1600',
  },
}];
let realEstates: RealEstateDTO[] = null;

const ServiceToObtainRealEstateMock = jest.fn<IServiceToObtainRealEstate, unknown[]>(() => {
  const temp: IServiceToObtainRealEstate = {
    nextIndex: null,
    obtainOnDemand: null,
  };

  temp.obtainOnDemand = async (): Promise<IServiceToObtainRealEstate> => {
    realEstates = await new Promise<RealEstateDTO[]>(
      (resolve) => resolve(sourceRealEstateRepo),
    );

    return temp;
  };

  temp.nextIndex = async (
    index?: number,
    range?: number,
  ): Promise<ResultOnDemandDTO<RealEstateDTO>> => {
    const currentIndex = index ?? 1;
    const rangeList = range ?? 5;
    const totalIndex = Math.trunc((realEstates.length) / rangeList)
      + ((realEstates.length % range) > 0 ? 1 : 0);
    const nextIndex = currentIndex === totalIndex ? currentIndex : currentIndex + 1;
    const prevIndex = currentIndex === 1 ? currentIndex : currentIndex - 1;
    const hasNext = currentIndex < totalIndex;
    const hasPrev = currentIndex > 1;
    const start = (rangeList * currentIndex) - rangeList;
    const end = realEstates[(rangeList * currentIndex) - 1]
      ? (rangeList * currentIndex) : undefined;

    const list = await new Promise<Array<RealEstateDTO>>((resolve, reject) => {
      try {
        const items = realEstates.slice(start, end);

        resolve(items);
      } catch (e) {
        reject(e);
      }
    });

    return {
      totalIndex,
      currentIndex,
      nextIndex,
      prevIndex,
      hasNext,
      hasPrev,
      rangeList,
      list,
    };
  };

  return temp;
});

export default ServiceToObtainRealEstateMock;
