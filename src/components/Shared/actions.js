// @flow

import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

const getList: ActionCreator<
  { contentPath: string, listId: string },
  Promise<void>
> = new ActionCreator(({ contentPath, listId }) => async ops => {
  const list: Types.List = await service.getList(contentPath);
  const state = ops.getState();
  const lists = state.lists;
  lists[listId] = list;
  ops.dispatch(
    setState({
      ...state,
      lists
    })
  );
});

export default getList;

export const setFrameRate: ActionCreator<number, void> = new ActionCreator(
  frameRate => ops => {
    const state: Types.State = ops.getState();
    ops.dispatch(
      setState({
        ...state,
        frameRate
      })
    );
  }
);
