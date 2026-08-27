/**
 * Where this repository lives, in one place.
 *
 * Every "read the source" link on the site is built from this, so a fork
 * changes one constant rather than hunting literals through the pages. It is a
 * public repository URL and nothing else: no token, no private endpoint, and
 * no path that depends on where a contributor happens to have checked out.
 */
export const repositoryUrl = "https://github.com/Hypership-Software/lab-notes.ai"

const defaultBranch = "main"

/**
 * A link to one tracked file, viewable in a browser.
 *
 * The path is repository-relative — the same string the playbook schema already
 * validates for `dataPath` — so a page can hand a reader the exact file it
 * rendered from.
 */
export function repositoryFileUrl(path: string): string {
  return `${repositoryUrl}/blob/${defaultBranch}/${path}`
}

/** The same file as raw JSON, for someone who wants to download it. */
export function repositoryRawUrl(path: string): string {
  return `${repositoryUrl}/raw/${defaultBranch}/${path}`
}
