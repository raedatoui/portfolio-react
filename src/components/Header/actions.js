// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

const getList: ActionCreator<
  string,
  Promise<void>
> = new ActionCreator(contentPath => async ops => {
  const headerLinks: Types.List = await service.getList(contentPath);
  const state = ops.getState();

  ops.dispatch(
    setState({
      ...state,
      headerLinks
    })
  );
});

export default getList;
