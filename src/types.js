// @flow

export type Section = {|
  header: string,
  content: string
|};

export type Carousel = {|
  assets: { [string]: string }
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

export type State = {|
  sections: ?{
    [sectionId: string]: Section
  },
  projects: ?{
    [projectId: string]: Project
  },
  selectedProject: ?string
|};
