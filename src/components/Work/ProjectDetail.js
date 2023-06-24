// @flow

import React from "react";
import styled from "styled-components";
import * as Types from "@src/types";
import { copy } from "@src/styles";
import { Text } from "@src/components/Shared";
import Carousel from "./Carousel";
import { breakMd, breakLg } from "@src/styles";

type Props = {|
  project: Types.Project,
  projectId: string,
  openGalleryFn: Function,
  closeGalleryFn: Function,
  selectedGallery: ?Types.Gallery,
  selectedGalleryItem: ?number
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
    const {
      project,
      projectId,
      selectedGallery,
      selectedGalleryItem,
      openGalleryFn,
      closeGalleryFn
    } = this.props;
    const subs: Array<Types.SubProject> = project.sub || [];
    const gallery: Types.Gallery = project.gallery || [];
    return (
      <DetailWrapper>
        <Text content={project.description} />
        <MetaWrapper>
          {projectFields.map(field => {
            return (
              field.field in project && (
                <MetaLine key={`${projectId}-${field.field}`}>
                  <MetaLabel>{field.label}</MetaLabel>
                  <MetaValue
                    dangerouslySetInnerHTML={{
                      __html: project[field.field]
                    }}
                  />
                </MetaLine>
              )
            );
          })}
          {subs.map((sub: Types.SubProject, idx: number) => {
            return (
              <SubContainer key={`sub-${projectId}-${idx}`}>
                <Header>{sub.title}</Header>
                <Text content={sub.description} />
                {projectFields.map(field => {
                  return (
                    field.field in sub && (
                      <MetaLine key={`sub-${projectId}-${idx}-${field.field}`}>
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
        {gallery && !selectedGallery && (
          <GallerylWrapper>
            {gallery.map((item, idx) => {
              return (
                <div
                  role="button"
                  tabIndex="0"
                  onClick={() => openGalleryFn(idx)}
                  onKeyDown={ev => {
                    if (ev.keyCode === 13) openGalleryFn(idx);
                  }}
                  key={`${projectId}-gallery-${idx}`}
                  className="carousel-item"
                >
                  <img
                    alt={item.caption}
                    src={`/assets/images/projects/${projectId}/${item.image}`}
                  />
                </div>
              );
            })}
          </GallerylWrapper>
        )}
        {selectedGallery && (
          <Carousel
            gallery={selectedGallery}
            selectedItem={selectedGalleryItem || 0}
            galleryFn={closeGalleryFn}
            projectId={projectId || ""}
          />
        )}
      </DetailWrapper>
    );
  }
}

export default ProjectDetail;

const DetailWrapper = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  h4 {
    text-decoration: underline;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const MetaWrapper = styled.div``;

const MetaLine = styled(copy)`
  display: flex;
`;

const MetaLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
  display: inline-block;
`;

const MetaValue = styled.span`
  display: inline-block;
`;

const GallerylWrapper = styled.div`
  margin: 1rem;
  display: flex;
  flex-basis: row;
  flex-wrap: wrap;
  :focus {
    outline: 0;
  }
  .carousel-item {
    height: 25px;
    cursor: pointer;
    z-index: 0;
    @media (${breakMd}) {
      height: 50px;
    }
    @media (${breakLg}) {
      height: 75px;
    }
    img {
      height: 100%;
      transition: 0.25s all;
      opacity: 1;
      transform: scale3d(1, 1, 1);
      display: inline-block;
    }
    &:hover {
      z-index: 1;
      img {
        transform: scale3d(1.2, 1.2, 1);
      }
    }
  }
`;

const Header = styled.h4``;

const SubContainer = styled.div`
  padding: 0 1rem;
`;
