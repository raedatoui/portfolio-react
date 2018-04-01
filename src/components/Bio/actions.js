// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

const getBio: ActionCreator<string, Promise<void>> = new ActionCreator(
  contentPath => async ops => {
    const bio: Types.Bio = await service.getBio(contentPath);
    const state = ops.getState();

    ops.dispatch(
      setState({
        ...state,
        bio
      })
    );
  }
);

export default getBio;
