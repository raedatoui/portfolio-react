// @flow

import React from "react";
import { connect } from "react-redux";
import * as Types from "@src/types";
import styled from "styled-components";
import type { WithDispatch } from "@src/store";
import getList from "@src/components/Shared/actions";
import { colors } from "@src/styles";

type Props = {|
  list: Types.List
|};

type OwnProps = {|
  ...Props,
  listId: string,
  contentPath: string
|};

const mapStateToProps = (state: Types.State, ownProps: OwnProps): Props => ({
  list: state.lists[ownProps.listId]
});

class StuffListInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(
      getList({
        contentPath: this.props.contentPath,
        listId: this.props.listId
      })
    );
  }

  renderItem(item: { name: string, link?: string }) {
    if (item.link)
      return (
        <a href={item.link} target="_blank">
          {item.name}
        </a>
      );
    return item.name;
  }

  render() {
    return (
      <ListWrapper>
        {this.props.list &&
          this.props.list.map((item, i) => (
            <ListItem key={`${item.name}-${i}`}>
              {this.renderItem(item)}
            </ListItem>
          ))}
      </ListWrapper>
    );
  }
}

export default connect(mapStateToProps)(StuffListInner);

const ListWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: stretch;
  padding: 0 2rem;
`;

const ListItem = styled.li`
  margin: 0 1.5rem 0 0;
  cursor: default;
  transition: 0.25s all;
  &:hover {
    color: ${colors.red};
  }
`;
