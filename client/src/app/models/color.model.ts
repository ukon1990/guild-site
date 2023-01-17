export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Color {
  id: number;
  rgba: Rgba;
}

export interface Background {
  color: Color;
}
