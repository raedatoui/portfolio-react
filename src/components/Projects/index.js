// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import getProjects from "./actions";
import * as Types from "@src/types";

type Props = {|
  projects: Types.ProjectMap
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

const mapStateToProps = (state: Types.State): Props => ({
  projects: state.projects
});

class ProjectsInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(getProjects(this.props.contentPath));
  }

  render() {
    const list = Object.keys(this.props.projects || {});

    return (
      <ProjectsWrapper>
        {list.map(projectId => {
          const project: Types.Project = this.props.projects[projectId];
          return (
            <Project key={projectId}>
              <Header>
                <img src={project.thumb} alt={project.title} />
                <span>{project.title}</span>
              </Header>
              {/*<Description>{project.description}</Description>*/}
              <hr />
            </Project>
          );
        })}
      </ProjectsWrapper>
    );
  }
}

export default connect(mapStateToProps)(ProjectsInner);

const ProjectsWrapper = styled.div`padding: 0 2em;`;

const Project = styled.div`
  hr {
    height: 1px;
    border: none;
    background-color: #ddd;
    margin: 0.61em 0;
  }
`;

const Header = styled.h3`
  min-height: 140px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0.5em 0;
  img {
    width: 20%;
    max-width: 140px;
    margin: 0 1em 0 0;
  }
  span {
    cursor: pointer;
  }
`;

const Description = styled.p``;
