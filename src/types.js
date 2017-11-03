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

export type Project = {
  title: string,
  thumb: string,
  description: string,
  carousel?: Carousel,
  agency?: string,
  description: string,
  duties: string
};

export type ProjectMap = {|
  +[projectId: string]: Project
|};

export type Carousel = {|
  assets: { [string]: string }
|};

export type List = Array<{|
  name: string,
  link?: string
|}>;

export type Bio = {|
  content: string,
  link: string
|};

export type State = {|
  sections: SectionMap,
  projects: ProjectMap,
  selectedProject: ?string,
  bio: ?Bio,
  lists: {
    [listId: string]: List
  }
|};
