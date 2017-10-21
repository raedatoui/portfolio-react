// @flow

import * as Types from "@src/types";

export async function getProjects(): Promise<Array<Types.Project>> {
  const resp = await fetch("/projects.json");
  return await resp.json();
}
