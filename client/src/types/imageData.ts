export interface Image {
  image: File | null;
  image64: string | ArrayBuffer;
}

export interface Images {
  images: File[];
  image64: string[];
}
