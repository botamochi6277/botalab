
// ProtoPedia
type PrototypeRawData = {
  image1: string,
  image2: string,
  image3: string,
  image4: string,
  image5: string,
  prototypeNm: string,
  status: number,
  summary: string,
  userNm: string,
  teamNm: string,
  materialNm: string,
  tags: string,
  id: number,
  viewCount: number,
  goodCount: number,
}

type PrototypeData = {
  name: string,
  summary: string,
  developing_status: number,
  images: string[],
  developer: string,
  team: string,
  tags: string[],
  materials: string[],
  prototype_id: number,
}

type PrototypeV2Data = {
  name: string,
  id: number,
  developingStatus: number,
  mainImage?: string
  summary?: string,
  developers?: string[],
  team?: styring,
  materials?: string[],
  tags?: string[],
  updateDate: string,
  createDate: string,
  awards?: string[],
  events?: string[],
  viewCount: number,
  goodCount: number,
}

// projects.yml / works.yml
type ProjectData = {
  id: string,
  name: string,
  protopedia_id?: number,
  developingStatus: number,
  mainImage?: string,
  description?: string,
  developers?: string[],
  team?: string,
  topics?: string[],
  createDate: string,
  updateDate: string,
  viewCount: number,
  goodCount: number,
}

type WorkData = {
  id: string,
  project_id: string,
  name: string,
  mainImage?: string,
  description?: string,
  materials: string[],
  tools: string[],
  awards?: string[],
}
