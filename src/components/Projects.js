// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Actions from "@src/state/actions";
import * as Types from "@src/types";

type Props = {|
  projects: {
    [projectId: string]: Types.Project
  }
|};

const mapStateToProps = (state: Types.State): Props => ({
  projects: state.projects
});

class ProjectsInner extends React.Component<WithDispatch<Props>> {
  componentDidMount() {
    this.props.dispatch(Actions.getProjects());
  }
  render() {
    const list = Object.entries(this.props.projects || {});
    return (
      <Article>
        {list.map(([projectId, project]) => (
          <Project key={projectId}>
            <Header>{project.name}</Header>

            <Description>{project.description}</Description>
          </Project>
        ))}
      </Article>
    );
  }
}

export const Projects = connect(mapStateToProps)(ProjectsInner);

const Article = styled.article``;

const Project = styled.div``;

const Header = styled.h5``;

const Description = styled.p``;
