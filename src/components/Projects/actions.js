// @flow
import { ActionCreator, setState } from "@src/store";
import * as service from "@src/services/content";
import * as Types from "@src/types";

const getProjects: ActionCreator<
  string,
  Promise<void>
> = new ActionCreator(contentPath => async ops => {
  const projectsData: Types.ProjectMap = await service.getProjects(contentPath);
  const state = ops.getState();
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

export default getProjects;
