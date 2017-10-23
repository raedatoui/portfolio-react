// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

export const getSections: ActionCreator<
  void,
  Promise<void>
> = new ActionCreator(() => async ops => {
  const state = ops.getState();
  const sections: Types.SectionMap = await service.getSections();

  ops.dispatch(
    setState({
      ...state,
      sections
    })
  );
});
