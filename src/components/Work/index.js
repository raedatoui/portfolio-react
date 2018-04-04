// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import Project from "./Project";
import { Text } from "@src/components/Shared/index";
import ProjectDetail from "./ProjectDetail";
import { colors } from "@src/styles";
import * as ProjectActions from "./actions";
import { Element, scroller } from "react-scroll";

type Props = {|
  work: Types.Work,
  selectedProject: ?Types.Project,
  selectedProjectId: ?string,
  selectedGroupId: ?string,
  selectedGallery: ?Types.Gallery,
  selectedGalleryItem: ?number
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

type Group = Array<string>;

const mapStateToProps = (state: Types.State): Props => ({
  work: state.work,
  selectedProject: state.selectedProject,
  selectedGroupId: state.selectedGroupId,
  selectedProjectId: state.selectedProjectId,
  selectedGallery: state.selectedGallery,
  selectedGalleryItem: state.selectedGalleryItem
});

class ProjectsInner extends React.Component<WithDispatch<OwnProps>> {
  details: {
    [string]: ContentBox
  };

  constructor(props: WithDispatch<OwnProps>) {
    super(props);
    this.details = {};
  }

  componentDidMount() {
    this.props.dispatch(ProjectActions.getWork(this.props.contentPath));
  }

  openGallery = (idx: number) => {
    if (this.props.selectedProject && this.props.selectedProject.gallery)
      this.props.dispatch(
        ProjectActions.openGallery({
          gallery: this.props.selectedProject.gallery,
          selectedItem: idx
        })
      );
  };

  closeGallery = () => {
    this.props.dispatch(
      ProjectActions.openGallery({ gallery: null, selectedItem: null })
    );
  };

  componentDidUpdate(prevProps) {
    const { selectedProjectId: prevProjectId } = prevProps;
    const { selectedProjectId } = this.props;
    if (selectedProjectId !== null && prevProjectId !== selectedProjectId) {
      let offset = 0;
      const header = document.getElementById("header");
      if (header) offset = header.clientHeight;
      scroller.scrollTo(selectedProjectId, {
        duration: 800,
        smooth: "easeInOutQuart",
        offset: -offset
      });
    }
  }
  // componentDidUpdate(prevProps: WithDispatch<OwnProps>): void {
  //   const transitioned: boolean =
  //     this.props.selectedProject !== prevProps.selectedProject;
  //   this.setState({
  //     showProjectDetail: transitioned && this.props.selectedProject !== null
  //   });
  //   // if (selected && transitioned && this.slider) this.slider.resize();
  // }

  createGroupedArray = (arr: Group, chunkSize: number): Array<Group> => {
    let groups: Array<Group> = [];
    let i: number;
    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  };

  render() {
    const list = Object.keys(this.props.work || {});
    const {
      selectedProject,
      selectedGroupId,
      selectedProjectId,
      selectedGallery,
      selectedGalleryItem
    } = this.props;
    let counter = 0;

    return (
      <ProjectsWrapper>
        {list.map(workId => {
          const work: {
            description: string,
            label: string,
            work: { +[projectId: string]: Project }
          } = this.props.work[workId];
          const pList = this.createGroupedArray(
            Object.keys(work.work || {}),
            4
          );
          return (
            <WorkWrapper key={workId}>
              <WorkHeader>{work.label}</WorkHeader>
              <Text content={work.description} />
              {pList.map((group, j) => (
                <div key={`group-${workId}-${j}`}>
                  <ListWrapper className="Grid Grid--gutters small-Grid--1of2 large-Grid--1of4">
                    {group.map(projectId => {
                      const project = work.work[projectId];
                      const disabled =
                        selectedGroupId === `group-${workId}-${j}` &&
                        projectId !== selectedProjectId;
                      counter++;
                      return (
                        <Element
                          name={projectId}
                          id={projectId}
                          key={projectId}
                          className="Grid-cell"
                        >
                          <Project
                            project={project}
                            projectId={projectId}
                            groupId={`group-${workId}-${j}`}
                            detune={counter}
                            disabled={disabled}
                          />
                        </Element>
                      );
                    })}
                  </ListWrapper>
                  <ContentBox
                    id={`group-${workId}-${j}`}
                    ref={ref => {
                      if (ref)
                        this.details[
                          `group-${workId}-${j}`
                        ] = (ref: ContentBox);
                    }}
                  >
                    {selectedGroupId === `group-${workId}-${j}` &&
                      selectedProject && (
                        <ProjectDetail
                          project={selectedProject}
                          projectId={selectedProjectId || ""}
                          openGalleryFn={this.openGallery}
                          closeGalleryFn={this.closeGallery}
                          selectedGallery={selectedGallery}
                          selectedGalleryItem={selectedGalleryItem}
                        />
                      )}
                  </ContentBox>
                </div>
              ))}
            </WorkWrapper>
          );
        })}
      </ProjectsWrapper>
    );
  }
}

export default connect(mapStateToProps)(ProjectsInner);

const ProjectsWrapper = styled.div`
  padding: 0 2rem;
`;

const WorkHeader = styled.h3`
  margin-bottom: 0;
`;

const WorkWrapper = styled.div`
  padding: 0;
  p {
    margin-top: 0.5rem;
  }
`;

const ListWrapper = styled.div`
  margin-top: 2rem;
`;

const ContentBox = styled.div`
  border: 0px solid ${colors.red};
`;
