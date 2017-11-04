// @flow

import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

const getHeader: ActionCreator<
  { contentPath: string, listId: string },
  Promise<void>
> = new ActionCreator(({ contentPath, listId }) => async ops => {
  const {
    nets,
    viewsource
  }: { nets: Types.List, viewsource: string } = await service.getHeader(
    contentPath
  );

  const state = ops.getState();
  const lists = state.lists;
  lists[listId] = nets;
  ops.dispatch(
    setState({
      ...state,
      lists,
      viewsource
    })
  );
});

export default getHeader;
