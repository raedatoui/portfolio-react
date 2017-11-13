// @flow
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import * as Actions from "./actions";
import Section from "./Section";
import Work from "./Work";
import Header from "./Header";
import StuffList from "./StuffList";
import Bio from "./Bio";

type Props = {
  sections: Types.SectionMap
};

const mapStateToProps = (state: Types.State): Props => ({
  sections: state.sections
});

const componentMap: { [string]: any } = {
  Work,
  Header,
  StuffList,
  Bio
};

export class AppInner extends React.Component<WithDispatch<Props>> {
  componentDidMount() {
    this.props.dispatch(Actions.getSections());
  }

  renderSection = (
    sectionId: string,
    section: Types.Section,
    index: number
  ) => {
    const View = componentMap[section.view];
    if (section.view === "Header")
      return <View key={sectionId} contentPath={section.contentPath} />;
    return (
      <Section key={sectionId} section={section} index={index}>
        <View contentPath={section.contentPath} listId={section.listId} />
      </Section>
    );
  };

  render() {
    const sections = Object.keys(this.props.sections || {});
    return (
      <AppWrapper>
        {sections.map((sectionId, index) => {
          const section: Types.Section = this.props.sections[sectionId];
          return this.renderSection(sectionId, section, index);
        })}
      </AppWrapper>
    );
  }
}

export const App = connect(mapStateToProps)(AppInner);

export const AppWrapper = styled.div`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 1440px;
`;
