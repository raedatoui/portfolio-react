// @flow

export type Section = {|
  name: string,
  view: string,
  contentPath: string,
  listId: ?string
|};

export type SectionMap = {|
  +[sectionId: string]: Section
|};

export type SubProject = {
  title: string,
  description: string,
  tech: string,
  video?: string
};

export type GalleryItemType = "image" | "vimeo" | "youtube";

export type Gallery = Array<{
  asset: string,
  type: GalleryItemType,
  caption?: string
}>;

export type Project = {
  title: string,
  thumb: string,
  description: string,
  agency: string,
  description: string,
  role: string,
  tech: string,
  sub?: Array<SubProject>,
  gallery?: Gallery
};

export type List = Array<{|
  name: string,
  link?: string
|}>;

export type Bio = {|
  content: string,
  link: string
|};

export type Work = {|
  +[workType: string]: {
    label: string,
    description: string,
    work: { +[projectId: string]: Project }
  }
|};

export type State = {|
  sections: SectionMap,
  work: Work,
  selectedProject: ?Project,
  selectedGroupId: ?string,
  selectedProjectId: ?string,
  selectedGallery: ?Gallery,
  bio: Bio,
  viewsource: string,
  lists: {
    [listId: string]: List
  },
  frameRate: number
|};
