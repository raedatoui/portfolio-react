// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

export const getProjects: ActionCreator<
  void,
  Promise<void>
> = new ActionCreator(() => async ops => {
  const state = ops.getState();
  const projectsData: Array<Types.Project> = await service.getProjects();
  const projects = { ...state.projects };

  if (projectsData)
    for (const projectId in projectsData)
      projects[projectId] = projectsData[projectId];

  ops.dispatch(
    setState({
      ...state,
      projects
    })
  );
});
