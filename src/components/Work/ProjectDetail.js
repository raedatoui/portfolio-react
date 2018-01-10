// @flow

import React from "react";
import styled from "styled-components";
import Flickity from "flickity";
import * as Types from "@src/types";
import { copy } from "@src/styles";
import { Text } from "@src/components/Shared";

type Props = {|
  project: Types.Project,
  projectId: string
|};

const projectFields: Array<{| field: string, label: string |}> = [
  { field: "agency", label: "Agency: " },
  { field: "year", label: "Year: " },
  { field: "role", label: "Role: " },
  { field: "tech", label: "Tech: " }
];

class ProjectDetail extends React.Component<Props> {
  slider: Flickity;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.slider = new Flickity(`.carousel-${this.props.projectId}`, {
      pageDots: false
    });
  }

  render() {
    const subs = this.props.project.sub || [];
    return (
      <DetailWrapper>
        <Text content={this.props.project.description} />
        <MetaWrapper>
          {projectFields.map(field => {
            return (
              field.field in this.props.project && (
                <MetaLine key={`${this.props.projectId}-${field.field}`}>
                  <MetaLabel>{field.label}</MetaLabel>
                  <MetaValue
                    dangerouslySetInnerHTML={{
                      __html: this.props.project[field.field]
                    }}
                  />
                </MetaLine>
              )
            );
          })}
          {subs.map((sub, idx) => {
            return (
              <SubContainer key={`sub-${this.props.projectId}-${idx}`}>
                <Header>{sub.title}</Header>
                <Text content={sub.description} />
                {projectFields.map(field => {
                  return (
                    field.field in sub && (
                      <MetaLine
                        key={`sub-${this.props
                          .projectId}-${idx}-${field.field}`}
                      >
                        <MetaLabel>{field.label}</MetaLabel>
                        <MetaValue
                          dangerouslySetInnerHTML={{
                            __html: sub[field.field]
                          }}
                        />
                      </MetaLine>
                    )
                  );
                })}
              </SubContainer>
            );
          })}
        </MetaWrapper>
        <CarouselWrapper
          className={`carousel carousel-${this.props.projectId} show-true`}
        >
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
        </CarouselWrapper>
      </DetailWrapper>
    );
  }
}

export default ProjectDetail;

const DetailWrapper = styled.div``;

const MetaWrapper = styled.div``;

const MetaLine = styled(copy)`display: flex;`;

const MetaLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5em;
  display: inline-block;
`;

const MetaValue = styled.span`display: inline-block;`;

const CarouselWrapper = styled.div`
  position: relative;
  margin: 1em;
  :focus {
    outline: 0;
  }
  &.show-false {
    display: none;
  }
  .carousel-cell {
    width: 25%;
    height: 300px;
    background: red;
    margin: 0.5em;
  }
`;

const Header = styled.h4`
  text-decoration: underline;
  margin-bottom: 0.33em;
`;

const SubContainer = styled.div`padding: 0 1em;`;
