// @flow
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import * as Actions from "./actions";
import Section from "./Section";
import Projects from "./Projects";
import Header from "./Header";
import StuffList from "./StuffList";
import Bio from "./Bio";
import { colors } from "@src/styles";

type Props = {
  sections: Types.SectionMap
};

const mapStateToProps = (state: Types.State): Props => ({
  sections: state.sections
});

const componentMap: { [string]: any } = {
  Projects,
  Header,
  StuffList,
  Bio
};

export class AppInner extends React.Component<WithDispatch<Props>> {
  componentDidMount() {
    this.props.dispatch(Actions.getSections());
  }

  renderSection = (sectionId: string, section: Types.Section) => {
    const View = componentMap[section.view];
    if (section.view === "Header")
      return <View key={sectionId} contentPath={section.contentPath} />;
    return (
      <Section key={sectionId} section={section}>
        <View contentPath={section.contentPath} listId={section.listId} />
      </Section>
    );
  };

  render() {
    const sections = Object.keys(this.props.sections || {});
    return (
      <AppWrapper>
        {sections.map(sectionId => {
          const section: Types.Section = this.props.sections[sectionId];
          return this.renderSection(sectionId, section);
        })}
      </AppWrapper>
    );
  }
}

export const App = connect(mapStateToProps)(AppInner);

const AppWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  background: white;
`;
