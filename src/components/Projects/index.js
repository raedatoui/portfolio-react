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
      <Article>
        {list.map(projectId => {
          const project: Types.Project = this.props.projects[projectId];
          return (
            <Project key={projectId}>
              <Header>{project.title}</Header>
              <Description>{project.description}</Description>
            </Project>
          );
        })}
      </Article>
    );
  }
}

export default connect(mapStateToProps)(ProjectsInner);

const Article = styled.article``;

const Project = styled.div``;

const Header = styled.h5``;

const Description = styled.p``;
