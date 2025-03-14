export interface MapMarker {
    branch: Branch;
    position: {
      lat: number;
      lng: number;
    };
    title: string;
    options: {
      animation: google.maps.Animation;
    };
    label: string;
    click?: () => void;
  }