// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

const findProjectById = (
  projectId,
  work
): ?{
  selectedProject: Types.Project,
  selectedProjectId: string,
  selectedGroupId: string
} => {
  const workMap = Object.keys(work);
  for (let key of workMap) {
    const groupId = key;
    const subwork = work[groupId].work;
    const idx = Object.keys(subwork).indexOf(projectId);
    if (idx !== -1) {
      const idy = Math.floor(idx / 4);
      return {
        selectedProject: subwork[projectId],
        selectedProjectId: projectId,
        selectedGroupId: `group-${groupId}-${idy}`
      };
    }
  }
  return null;
};

export const getWork: ActionCreator<string, Promise<void>> = new ActionCreator(
  contentPath => async ops => {
    const work: Types.Work = await service.getWork(contentPath);
    const state = ops.getState();
    let newState = {
      ...state,
      work
    };
    if (state.initialRoute !== "") {
      const result = findProjectById(state.initialRoute, work);
      newState = {
        ...newState,
        ...result
      };
    }
    ops.dispatch(setState(newState));
  }
);

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

export const closeAllProjects: ActionCreator<void, void> = new ActionCreator(
  () => ops => {
    const state: Types.State = ops.getState();
    ops.dispatch(
      setState({
        ...state,
        selectedProject: null,
        selectedProjectId: null,
        selectedGroupId: null
      })
    );
  }
);

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

export const routeToProject: ActionCreator<string, void> = new ActionCreator(
  projectId => ops => {
    const state: Types.State = ops.getState();
    const result = findProjectById(projectId, state.work);
    if (result) {
      ops.dispatch(
        setState({
          ...state,
          ...result,
          selectedGallery: null
        })
      );
    }
  }
);

export const setInitialRoute: ActionCreator<string, void> = new ActionCreator(
  projectId => ops => {
    const state: Types.State = ops.getState();
    ops.dispatch(
      setState({
        ...state,
        initialRoute: projectId
      })
    );
  }
);
