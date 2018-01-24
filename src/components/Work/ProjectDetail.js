// @flow

import React from "react";
import styled from "styled-components";
import * as Types from "@src/types";
import { copy } from "@src/styles";
import { Text } from "@src/components/Shared";

type Props = {|
  project: Types.Project,
  projectId: string,
  galleryFn: Function
|};

const projectFields: Array<{| field: string, label: string |}> = [
  { field: "agency", label: "Agency: " },
  { field: "year", label: "Year: " },
  { field: "role", label: "Role: " },
  { field: "tech", label: "Tech: " }
];

class ProjectDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { project, projectId } = this.props;
    const subs: Array<Types.SubProject> = project.sub || [];
    const gallery: Types.Gallery = project.gallery || [];
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
          {subs.map((sub: Types.SubProject, idx: number) => {
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
        {gallery && (
          <GallerylWrapper>
            {gallery.map((item, idx) => {
              return (
                <div
                  role="button"
                  tabIndex="0"
                  onClick={() => this.props.galleryFn()}
                  onKeyDown={ev => {
                    if (ev.keyCode === 13) this.props.galleryFn();
                  }}
                  key={`${projectId}-gallery-${idx}`}
                  className="carousel-item"
                />
              );
            })}
          </GallerylWrapper>
        )}
      </DetailWrapper>
    );
  }
}

export default ProjectDetail;

const DetailWrapper = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 1em;
`;

const MetaWrapper = styled.div``;

const MetaLine = styled(copy)`display: flex;`;

const MetaLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5em;
  display: inline-block;
`;

const MetaValue = styled.span`display: inline-block;`;

const GallerylWrapper = styled.div`
  margin: 1em;
  display: flex;
  flex-basis: row;
  flex-wrap: wrap;
  :focus {
    outline: 0;
  }
  .carousel-item {
    height: 75px;
    cursor: pointer;
    z-index: 0;
    img {
      height: 75px;
      transition: 0.25s all;
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    &:hover {
      z-index: 1;
      img {
        transform: scale3d(1.2, 1.2, 1);
      }
    }
  }
`;

const Header = styled.h4`
  text-decoration: underline;
  margin-bottom: 0.33em;
`;

const SubContainer = styled.div`padding: 0 1em;`;
