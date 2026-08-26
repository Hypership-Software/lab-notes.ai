# Security

## Reporting a vulnerability

Report vulnerabilities through **GitHub private vulnerability reporting** on
this repository: open the repository's **Security** tab and choose **Report a
vulnerability**. That keeps the report private until a fix is available.

Please do not open a public issue for a security problem, and please do not
send reports to an individual — there is no personal contact route for this
project by design.

Include what you found, how to reproduce it, and what you think the impact
is. You will get an acknowledgement, and you will be told when a fix ships.

## Supported version

`main` is the only supported version. Fixes land there; there are no
maintained release branches.

## Scope

This project has no runtime model call, no database, no authentication, no
uploads, and no API keys. It builds to a set of static pages computed from data committed in this
repository.

The findings most likely to matter here are therefore:

- committed data that is person-shaped, or that came from a real record;
- a secret, credential, private endpoint, or personal path in a tracked file;
- a dependency or build-supply-chain issue;
- content that could be read as an official government service, or as
  official data.

The last one is a real security concern for this project, not just a
presentation one. Report it the same way.
