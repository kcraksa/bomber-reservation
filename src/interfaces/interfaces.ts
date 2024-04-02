export interface ResponseGetPlaceDetailInterface {
  about: string;
  operation: PlaceOperationalTimeInterface[];
  features: PlaceOverviewFeaturesInterface[];
  categoryName: string;
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

