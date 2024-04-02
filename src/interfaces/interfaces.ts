export interface ResponseGetPlaceDetailInterface {
  about: string;
  operation: PlaceOperationalTimeInterface[];
  features: PlaceOverviewFeaturesInterface[];
  categoryName: string;
}

export interface ResponseTableByDateTableList {
  tableId: string;
  text: string;
  price: number;
  minDeposit: number;
  clubId: string;
  table_status: string | null;
}

export interface ResponseTableByDateFacilitiesList {
  facilitiesId: string;
  icon: string;
  subtitle: number;
  title: number;
}

export interface ResponseTableByDate {
  facilities_list: ResponseTableByDateFacilitiesList[];
  table_list: ResponseTableByDateTableList[];
}

export interface ResponseOperationalSchedule {
  date: string;
  events: string[],
  club_operational_day: boolean;
  club_table_full_book: boolean;
}

export interface PlaceOperationalTimeInterface {
  day: string;
  open: string | null;
  close: string | null;
  isClose: boolean;
}

export interface PlaceOverviewFeaturesInterface {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export interface PlaceInterface extends ResponseGetPlaceDetailInterface {
  clubId: string;
  id: string;
  name: string;
  featuredToday: string[];
  address: string;
  rating: number;
  bannerImage: string;
  logo: string;
  city: string;
  isAuctionMode: boolean;
  category: string[];
  photos: PlacePhotoInterface[];
  latitude?: number;
  longtitude?: number;
  categoryName: string;
  businessCategoryName: string;
  phone: string;
}

export interface PlacePhotoInterface {
  title: string;
  url: string;
}

