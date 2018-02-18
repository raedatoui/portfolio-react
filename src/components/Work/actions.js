// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

export const getWork: ActionCreator<
  string,
  Promise<void>
> = new ActionCreator(contentPath => async ops => {
  const work: Types.Work = await service.getWork(contentPath);
  const state = ops.getState();

  ops.dispatch(
    setState({
      ...state,
      work
    })
  );
});

export const openProject: ActionCreator<
  { project: Types.Project, projectId: string, groupId: string },
  void
> = new ActionCreator(({ project, projectId, groupId }) => ops => {
  const state: Types.State = ops.getState();
  ops.dispatch(
    setState({
      ...state,
      selectedProject: project,
      selectedProjectId: projectId,
      selectedGroupId: groupId,
      selectedGallery: null
    })
  );
});

export const closeAllProjects: ActionCreator<
  void,
  void
> = new ActionCreator(() => ops => {
  const state: Types.State = ops.getState();
  ops.dispatch(
    setState({
      ...state,
      selectedProject: null,
      selectedProjectId: null,
      selectedGroupId: null
    })
  );
});

export const openGallery: ActionCreator<
  { gallery: ?Types.Gallery, selectedItem: ?number },
  void
> = new ActionCreator(({ gallery, selectedItem }) => ops => {
  const state: Types.State = ops.getState();
  ops.dispatch(
    setState({
      ...state,
      selectedGallery: gallery,
      selectedGalleryItem: selectedItem
    })
  );
});
