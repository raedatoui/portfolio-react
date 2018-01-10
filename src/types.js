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
  agency: string,
  description: string,
  role: string,
  tech: string
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
  bio: Bio,
  viewsource: string,
  lists: {
    [listId: string]: List
  },
  frameRate: number
|};
