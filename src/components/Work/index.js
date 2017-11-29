// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import { getWork } from "./actions";
import * as Types from "@src/types";
import Project from "./Project";
import { Text } from "@src/components/Shared/index";

type Props = {|
  work: Types.Work
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

type Group = Array<string>;

const mapStateToProps = (state: Types.State): Props => ({
  work: state.work
});

class ProjectsInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(getWork(this.props.contentPath));
  }
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
                <ListWrapper
                  className="Grid Grid--gutters"
                  key={`group-${workId}-${j}`}
                >
                  {group.map(projectId => {
                    const project = work.work[projectId];
                    counter++;
                    return (
                      <Project
                        key={projectId}
                        project={project}
                        projectId={projectId}
                        detune={counter}
                      />
                    );
                  })}
                </ListWrapper>
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

const ListWrapper = styled.div`margin: 2em 0;`;
