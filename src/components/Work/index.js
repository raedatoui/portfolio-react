// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import { getWork } from "./actions";
import * as Types from "@src/types";
import Project from "./Project";
import { Text } from "@src/components/Shared/index";
import ProjectDetail from "./ProjectDetail";
import { colors } from "@src/styles";

type Props = {|
  work: Types.Work,
  selectedProject: ?Types.Project,
  selectedProjectId: ?string,
  selectedGroupId: ?string
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
  selectedProjectId: state.selectedProjectId
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
    this.props.dispatch(getWork(this.props.contentPath));
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
    const { selectedGroupId, selectedProjectId } = this.props;
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
                  <ListWrapper className="Grid Grid--gutters">
                    {group.map(projectId => {
                      const project = work.work[projectId];
                      const disabled =
                        selectedGroupId === `group-${workId}-${j}` &&
                        projectId !== selectedProjectId;
                      counter++;
                      return (
                        <Project
                          key={projectId}
                          project={project}
                          projectId={projectId}
                          groupId={`group-${workId}-${j}`}
                          detune={counter}
                          disabled={disabled}
                        />
                      );
                    })}
                  </ListWrapper>
                  <ContentBox
                    ref={ref => {
                      if (ref)
                        this.details[
                          `group-${workId}-${j}`
                        ] = (ref: ContentBox);
                    }}
                  >
                    {selectedGroupId === `group-${workId}-${j}` &&
                      this.props.selectedProject && (
                        <ProjectDetail
                          project={this.props.selectedProject}
                          projectId={this.props.selectedProjectId || ""}
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

const ProjectsWrapper = styled.div`padding: 0 2em;`;

const WorkHeader = styled.h3`margin-bottom: 0;`;

const WorkWrapper = styled.div`
  padding: 1em 0;
  p {
    margin-top: 0.5em;
  }
`;

const ListWrapper = styled.div`margin-top: 2em;`;

const ContentBox = styled.div`border: 0px solid ${colors.red};`;
